# WAVV SDK

> Embed WAVV's dialer, messenger and callboards in your product with `@wavv/sdk`, and read the same data back over REST. One reference for both halves: what your frontend calls, and what your backend does.

**Version:** 3.0.0 · **Package:** @wavv/sdk@0.1.1 · **Format:** JSON over HTTPS · **Base URL:** `https://api.wavv.com/v3`

## How an integration fits together

You hold one **SDK key**. Your backend exchanges it for a short-lived token naming one of
your users; your frontend hands that token to `init()`. From there the SDK draws WAVV's
surfaces over your page and tells you what happened through callbacks, and your backend reads
the same activity over REST or receives it as webhooks.

Nothing about this asks your users to hold a WAVV credential, and nothing asks you to put your
SDK key in a browser.

- **Your backend mints** — `POST /tokens` with your SDK key, once per page load. You get a token that lives **60 seconds and works once** — an authorization code, not a session.
- **Your frontend calls init** — `init({ token })` spends the token immediately and exchanges it for a WAVV session, which renews itself. Nothing expires in the middle of a call. If the signed-in user changes, reload the page before calling `init()` for the new one: an `init()` naming a different user while a session is live rejects with `USER_CHANGED_RELOAD_REQUIRED`.
- **Your own user ids** — You choose `userId` and WAVV keys the account to it, so the same id always reaches the same account. Send a stable primary key, never an email address someone can change.
- **Never cache a token** — A cached token is one that has already been spent or expired. Mint per page load. If you are tempted to cache, cache nothing — minting is one request and it is meant to be cheap.

## Your key and your customers' keys

Two kinds of key reach this API, and they are not interchangeable. Presenting one where the
other belongs is refused rather than quietly scoped down.

- **Your SDK key** — Yours, issued when you registered. Mints user tokens. Keep it on your server — it speaks for every one of your users.
- **Team key** — Your customer's, belonging to their WAVV account. Reads their call data. They issue it from their own Integrations panel, and they can revoke it.
- **Refused, not narrowed** — An SDK key on a customer endpoint, or a customer's key where yours belongs, answers `KEY_SCOPE_INSUFFICIENT`. Neither silently returns a smaller result, because a response that quietly holds less than you asked for is worse than an error.

## Webhooks across your customers

The events are the same ones documented below, and so is the signature scheme — registering as
an SDK partner does not give you a different event type, it gives the same event a wider
subscription.

Register an endpoint for your app in the [SDK portal](https://sdk.wavv.com/) and you receive the
event for every one of your users — including inbound calls, which arrive whether or not the user
is signed in at the time. A customer registering their own webhook receives only their own team's
calls and messages. Every `call.*` and `message.*` event below is delivered to your endpoint.

Verify `X-WAVV-Signature` exactly as the section below describes, and deduplicate on
`(event, data.id)`: delivery is at-least-once and events for one call can arrive out of order.

## Overview

The v3 Public API gives you programmatic access to your team's call activity in several ways:

- **REST** — `GET /calls`, plus per-call recording and transcript endpoints, for backfills,
  reconciliation, and on-demand lookups.
- **Webhooks** — `call.*` and `message.*` events pushed to an HTTPS endpoint you register, for real-time work.
- **MCP** — the WAVV MCP server gives Claude, ChatGPT, and other AI assistants the same
  call reads as tools, plus tools for working call boards. See [MCP server](#mcp-server).

Both call surfaces serialize a call through the same code path, so a call fetched from
`GET /calls/{id}` and the `data` object inside a `call.ended` webhook are field-for-field
identical. Build your model once.

All requests and responses are JSON. Timestamps are ISO 8601 in UTC (e.g.
`2026-05-21T14:30:00Z`). Phone numbers are unformatted 10-digit NANP strings
(e.g. `5125551234`).

## Authentication

Every REST endpoint requires an API key, passed as a Bearer token in the `Authorization`
header:

```http
Authorization: Bearer <your_api_key>
```

A missing, malformed, or revoked key returns `401` with error code `INVALID_API_KEY`.

Keys are **team-scoped**: a key can only ever read calls belonging to the team it was issued
for. There is no cross-team or agency-wide call access in this version, and no team id is
accepted as a parameter — the key determines the team. Manage keys in the WAVV
**Integrations** panel.

Webhooks are **not** authenticated with an API key. Each webhook has its own signing secret
and is verified by signature — see [Verifying signatures](#verifying-signatures).

## Rate limits

Requests are counted in one-minute windows, in several buckets at once. A request has to fit
in every bucket that applies to it:

- **Per credential** — **300 requests a minute** for each API key, and **60 a minute** for each signed-in user. Two keys on the same team have a bucket each; one person signed in to two assistants shares one.
- **Heavy reads** — **10 a minute** per credential, on top of the per-credential limit, for the reads that cost the most: [call lists with transcripts](#get-calls) (`includeTranscripts`), and, for signed-in users, [transcripts](#get-callsidtranscript). An API key fetching one transcript at a time counts it as an ordinary read. Some [MCP](#mcp-server) tools are heavy reads too.
- **Per team** — **600 requests a minute** across every credential on the team, so several integrations and assistants together cannot exceed it.

Limits are **never by IP address**. Assistants such as Claude and ChatGPT call from their own
servers, so an IP limit would make customers share one another's budget.

Over a limit, REST answers `429` with code `RATE_LIMITED` and a `Retry-After` header giving the
whole seconds until that bucket's window resets:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 23
```

Wait at least that long. A rejected request still counts against the window it was made in, so
retrying in a tight loop only keeps you limited.

The [MCP server](#mcp-server) and the REST API share the same counters — a tool call and a REST request
cost the same, so switching between the two does not double your budget. Requests rejected
before they reach an endpoint — a `401`, a `403`, or a `400` for a malformed parameter — are
not counted. A `400` an endpoint raises after reading the request is.

## Pagination and filtering

`GET /calls` returns calls newest-first and pages with a keyset cursor.

- **Cursor** — Each response carries a `nextCursor`. Pass it back as the `cursor` query parameter to get the next page. `nextCursor` is `null` on the last page. The value is the `startedAt` of the last returned call — treat it as opaque; the format may change.
- **Page size** — `limit` defaults to `50` and is capped at `200`. A value above the cap is reduced to `200` rather than rejected. A value that is zero, negative, or not a number falls back to the default of `50`. With `includeTranscripts=true` the cap is `25`, since each call then carries its full transcript.
- **Time range** — `startedAfter` and `startedBefore` bound `startedAt` inclusively, and each may be used on its own. Send both as ISO 8601 — a value that can't be parsed as a date is treated as absent, so validate before sending to be sure you get the window you intend.
- **Stable paging** — Paging is keyset rather than offset, so calls created while you page through will not shift or duplicate the rows you have already read. The cursor has one-second resolution; deduplicate on `id` if your integration requires exactness across page boundaries.

## Verifying signatures

Every delivery carries an `X-WAVV-Signature` header:

```http
X-WAVV-Signature: t=1779720600,v1=6f2a…c91b
```

- `t` — Unix timestamp in **seconds**, stamped fresh at send time (so a retry carries a new `t`).
- `v1` — hex `HMAC-SHA256` of the timestamp, a literal dot, and the raw body concatenated
  together, keyed with the webhook's signing secret.

To verify, in order:

- Read the **raw** request body as bytes, before any JSON parsing. Re-serializing a parsed
  body changes the bytes and the signatures will not match.
- Recompute the HMAC over `t + "." + rawBody` with your signing secret.
- Compare against `v1` in **constant time** (`crypto.timingSafeEqual`, not `===`).
- Reject the delivery if `|now - t|` exceeds your tolerance. 300 seconds is a common choice;
  this check is what prevents a captured delivery from being replayed later.

The signing secret is prefixed `whsec_` and is available in the Integrations panel. Because
verification requires the secret itself, it remains retrievable there — handle it with the
same care as a password. Deleting a webhook also deletes its signing secret.

```js
const crypto = require('node:crypto');

function verify(rawBody, header, secret, toleranceSec = 300) {
  const parts = Object.fromEntries(header.split(',').map((kv) => kv.split('=')));
  const t = Number(parts.t);
  if (!Number.isFinite(t)) return false;
  if (Math.abs(Date.now() / 1000 - t) > toleranceSec) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${t}.${rawBody}`).digest('hex');
  const a = Buffer.from(expected, 'hex');
  const b = Buffer.from(parts.v1 ?? '', 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

## Delivery and retries

Register endpoints in the WAVV **Integrations** panel: give the webhook a name, an HTTPS URL,
and the set of events it should receive. Each webhook can subscribe to any combination of the
events, and a team can have several.

- **Request** — `POST` with `Content-Type: application/json` and the `X-WAVV-Signature` header. Your endpoint has 10 seconds to respond before the attempt times out.
- **Success** — Any `2xx` acknowledges the delivery. Any other status, including a redirect, is treated as a failure and retried. Acknowledge first and process the payload afterwards.
- **Retries** — Up to **5 attempts** with exponential backoff starting at 1 second. Each webhook retries independently, so a failing endpoint does not delay or duplicate delivery to your other endpoints. A delivery that fails all five attempts is not retried further.
- **Rate** — Deliveries are grouped per webhook and paced at roughly **10 per second**. A slow endpoint throttles only its own queue.
- **Make handlers idempotent** — Delivery is at-least-once, so the same event may arrive more than once, and because each event is queued independently, events for one call may arrive out of order. Deduplicate on `(event, data.id)` and design each handler to be safely replayable.
- **URL requirements** — The URL must be an absolute `http` or `https` URL on a publicly routable host. `localhost` and addresses in loopback, RFC-1918 private, link-local, and CGNAT ranges are not accepted. This is validated at registration and confirmed again before each delivery.

## SDK · Lifecycle

### init

```ts
init({ token, server }: InitOptions) => Promise<void>
```

Authenticate your product and identify the current user.

Call once on load. Calling it again for the **same** user, with a fresh token, is fine. If the
signed-in user changes, reload the page (or otherwise remount WAVV) before calling `init` for the new
one: WAVV cannot switch users in place, so an `init` naming a different user while a session is live
rejects with `USER_CHANGED_RELOAD_REQUIRED`, and so does every call after it until the page reloads.
There is no sign-out: that belongs to the user, not to your product.

Calls made before this settles wait for it. They are delivered once it resolves and rejected with the
same reason if it rejects. A second `init` waits for the first to settle.

### show

```ts
show(target: Target, options?: ShowOptions) => Promise<void>
```

Send the user to a place inside WAVV's manager.

Named rather than given a function each, so nothing implies one section lives under another. The
products — dialer, messenger, callboards — have their own namespaces instead.

### onOpenContact

```ts
onOpenContact(handler: (payload: OpenContact) => void) => Listener
```

WAVV asking your product to display a contact.

You do not need to infer this from call state — whenever WAVV wants a contact on screen this fires
with a `reason`, and you honour the ones you care about. Respecting `DIALER_FOCUS` alone gives you a
screen pop.

Registers for both events: `CONTACT_LINK` is what ships today and only ever meant the user asked to
see a contact, so it maps to `USER_CLICK`. `OPEN_CONTACT` carries its own reason and passes through.

### onContactSearch

```ts
onContactSearch(handler: ContactSearchHandler) => Listener
```

A contact search WAVV needs answered from your page.

The quickest way to get searching working — no endpoint to build. It only runs while your page is
open, though, so a user on the WAVV mobile app gets nothing back. Configure the contacts endpoint in
the portal once you are past the first integration; that one always works.

## SDK · Dialer

### dialer.show

```ts
dialer.show() => Promise<void>
```

Open the dialer on the user's call lists.

### dialer.openCallList

```ts
dialer.openCallList({ listId }: OpenCallListOptions) => Promise<void>
```

Open one saved call list, by the id `createCallList` returned.

### dialer.createCallList

```ts
dialer.createCallList(options: CreateCallListOptions) => Promise<CreateCallListResult>
```

Create a call list and get its id back.

Convenient for small lists. For anything substantial create it over REST instead — the browser is
a less reliable place to send data from, and REST gives you positioning and incremental inserts.

### dialer.call

```ts
dialer.call({ contact }: CallOptions) => Promise<void>
```

Dial one contact.

Saves no call list and is not resumable, but it appears in call history and emits the same events
as any other call. Core wants `number` beside the contact as well as inside it, so we lift it
rather than making you pass it twice.

### dialer.addContact

```ts
dialer.addContact({ contact }: AddContactOptions) => Promise<void>
```

Add a contact to the live dial session. For an extra number on someone already there, use `addPhone`.

### dialer.removeContact

```ts
dialer.removeContact({ contactId, hangup }: RemoveContactOptions) => Promise<void>
```

Remove a contact from the live dial session.

### dialer.addPhone

```ts
dialer.addPhone({ number, contactId }: AddPhoneOptions) => Promise<void>
```

Add a number to a contact already in the session.

### dialer.removePhone

```ts
dialer.removePhone({ number, contactId, hangup }: RemovePhoneOptions) => Promise<void>
```

Remove a number from the live dial session.

Without `contactId` the number is scrubbed from every contact it appears on, which is the usual
do-not-call case. `hangup` ends a call already in progress on it.

### dialer.startRecording

```ts
dialer.startRecording() => Promise<void>
```

Resume recording after a pause.

WAVV records according to the user's own settings — this does not switch recording on for someone
who has it off. It unmasks a stream `pauseRecording` masked.

### dialer.pauseRecording

```ts
dialer.pauseRecording() => Promise<void>
```

Pause recording — the PCI case, while a payment screen is open.

### dialer.onCallStarted

```ts
dialer.onCallStarted(handler: (call: Call) => void) => Listener
```

### dialer.onCallAnswered

```ts
dialer.onCallAnswered(handler: (call: Call) => void) => Listener
```

### dialer.onCallIncoming

```ts
dialer.onCallIncoming(handler: (call: Call) => void) => Listener
```

### dialer.onCallEnded

```ts
dialer.onCallEnded(handler: (call: Call) => void) => Listener
```

### dialer.onCallRecorded

```ts
dialer.onCallRecorded(handler: (call: Call) => void) => Listener
```

### dialer.onDispositionSet

```ts
dialer.onDispositionSet(handler: (disposition: Disposition) => void) => Listener
```

Fires when the user dispositions a call. WAVV owns dispositions, so this is how you learn the outcome.

## SDK · Messenger

### messenger.show

```ts
messenger.show() => Promise<void>
```

Open the messenger on the user's conversations.

### messenger.openConversation

```ts
messenger.openConversation({ conversationId }: OpenConversationOptions) => Promise<void>
```

Open one existing conversation — the `conversationId` a message event carries.

### messenger.compose

```ts
messenger.compose({ contact, body }: ComposeOptions) => Promise<void>
```

Open a message to a contact, optionally pre-filled.

The user reads it and presses send. There is deliberately no way to send programmatically: a
message that leaves without them seeing it is still attributed to them, and carries their consent
and A2P obligations.

### messenger.onMessageSent

```ts
messenger.onMessageSent(handler: (message: Message) => void) => Listener
```

### messenger.onMessageReceived

```ts
messenger.onMessageReceived(handler: (message: Message) => void) => Listener
```

### messenger.onMessageFailed

```ts
messenger.onMessageFailed(handler: (message: Message) => void) => Listener
```

## SDK · Callboards

### callboards.show

```ts
callboards.show() => Promise<void>
```

Open callboards on the user's boards.

### callboards.openBoard

```ts
callboards.openBoard({ boardId }: OpenBoardOptions) => Promise<void>
```

Open one board, by WAVV's id for it.

Boards are read-only to the SDK: starting the dial session is the user's action, and boards are
built in WAVV rather than through the SDK.

## SDK types

### Contact

A contact WAVV can call or message.

`name` and `number` are the minimum. Everything else is optional and passed through — WAVV stores as
little contact data as it can, so treat anything beyond these as a display convenience rather than a
record we keep.

| Field | Type | Description |
| --- | --- | --- |
| `id` (required) | `string` | Your id for this contact. Required, because it is what ties every call and message event back to your own records — without it WAVV has nothing to report and `contactId` comes back null. |
| `name` (required) | `string` |  |
| `number` (required) | `string` |  |
| `firstName` | `string` |  |
| `lastName` | `string` |  |
| `city` | `string` |  |
| `state` | `string` |  |
| `zip` | `string` |  |
| `timezone` | `string` |  |
| `address` | `string` |  |

### InitOptions

| Field | Type | Description |
| --- | --- | --- |
| `token` (required) | `string` | A short-lived, single-use token minted by your backend with your WAVV API key. |
| `server` | `string` | Which WAVV host serves `wavv.js`. Defaults to `app.wavv.com`. For WAVV's own QA and development layers — partners should never set this. |

### Target

```ts
(typeof Target)[keyof typeof Target]
```

### CallType

`type` rather than `direction` because later values — missed, voicemail — are not directions.

```ts
'INBOUND' | 'OUTBOUND'
```

### ShowOptions

| Field | Type | Description |
| --- | --- | --- |
| `callId` | `string` | Only read for `CALL_HISTORY`: opens that call's detail view. |
| `type` | `CallType` | Only read for `CALL_HISTORY`. |
| `scriptId` | `string` | Only read for `CALL_SCRIPTS`. |

### OpenCallListOptions

| Field | Type | Description |
| --- | --- | --- |
| `listId` (required) | `string` |  |

### CreateCallListOptions

| Field | Type | Description |
| --- | --- | --- |
| `name` (required) | `string` |  |
| `contacts` (required) | `Contact[]` |  |
| `show` | `boolean` | Display the list once created. Without it you get the id back and decide when to show it. |

### CreateCallListResult

| Field | Type | Description |
| --- | --- | --- |
| `listId` (required) | `string` |  |

### CallOptions

| Field | Type | Description |
| --- | --- | --- |
| `contact` (required) | `Contact` |  |

### AddContactOptions

| Field | Type | Description |
| --- | --- | --- |
| `contact` (required) | `Contact` |  |

### RemoveContactOptions

| Field | Type | Description |
| --- | --- | --- |
| `contactId` (required) | `string` |  |
| `hangup` | `boolean` | End the call in progress if this contact is on one. The real do-not-call moment. |

### AddPhoneOptions

| Field | Type | Description |
| --- | --- | --- |
| `number` (required) | `string` |  |
| `contactId` (required) | `string` | The contact to add it to. For a contact WAVV has not seen, use `addContact` instead. |

### RemovePhoneOptions

| Field | Type | Description |
| --- | --- | --- |
| `number` (required) | `string` |  |
| `contactId` | `string` | Narrow the removal to one contact. Omitted, the number is scrubbed wherever it appears. |
| `hangup` | `boolean` | End the call in progress if this number is on one. |

### OpenConversationOptions

| Field | Type | Description |
| --- | --- | --- |
| `conversationId` (required) | `string` |  |

### ComposeOptions

| Field | Type | Description |
| --- | --- | --- |
| `contact` (required) | `Contact` |  |
| `body` | `string` | Pre-fills the composer. The user still presses send — the SDK never sends for them. |

### OpenBoardOptions

| Field | Type | Description |
| --- | --- | --- |
| `boardId` (required) | `string` |  |

### Listener

Returned by every callback registration.

| Field | Type | Description |
| --- | --- | --- |
| `remove` (required) | `() => void` |  |

### Call

| Field | Type | Description |
| --- | --- | --- |
| `callId` (required) | `string \| null` | The call's id — the same one `GET /v3/calls/{id}` takes and `show('CALL_HISTORY', { callId })` opens. Null in the rare case a leg fires an event before its channel exists. |
| `contactId` (required) | `string \| null` | Your id for the contact, when WAVV knows it. Null when nobody told us — a number typed straight into the dial pad, for instance. Anything your product initiated should carry one. |
| `number` (required) | `string` |  |
| `backgrounded` | `boolean` | Answered and ended: a leg the user is not watching, such as a voicemail drop or a callback. |
| `outcome` | `string` | Ended only — WAVV's own outcome for the call. Dispositions are separate and user-chosen. |
| `human` | `boolean` | Ended only: whether a person was detected, whether the call connected, and how long it ran. |
| `answered` | `boolean` |  |
| `duration` | `number` |  |
| `voicemailId` | `string` | Ended only, and only when the outcome was voicemail. |
| `recordingId` | `string` | Recorded only. The same id as `callId` — recordings are addressed by their call. |
| `autoSaveRecordings` | `boolean` | Recorded only: whether this was saved by the user's record-everything setting rather than by hand. |

### Message

| Field | Type | Description |
| --- | --- | --- |
| `id` (required) | `string` | The message's own id. |
| `conversationId` (required) | `string` | The conversation it belongs to — the same id `openConversation` takes. |
| `contactId` (required) | `string \| null` |  |
| `number` (required) | `string` | The contact's number, whichever direction the message went. |
| `to` (required) | `string` | Recipient and sender, in that order, so direction is readable without comparing to `number`. |
| `from` (required) | `string` |  |
| `body` (required) | `string` |  |
| `attachments` (required) | `string[]` |  |
| `userId` (required) | `string \| null` | Your id for the user who sent the message (outbound) or whose number received it (inbound) — the `userId` you passed to `POST /tokens`. Null when that is not the signed-in user, e.g. a teammate's message on a shared team number. |
| `failedReason` | `string` | Failed only: why the carrier rejected it, in words meant for a person. |
| `failedAt` | `string` |  |

### Disposition

A disposition the user chose for a call.

WAVV owns dispositions — they are configured per team and chosen by hand — so this is how your product
learns the outcome a person settled on, as opposed to `Call.outcome`, which is what the system saw.

| Field | Type | Description |
| --- | --- | --- |
| `id` (required) | `string` | This disposition record's own id. |
| `callId` (required) | `string` | The call it belongs to, matching `Call.callId`. |
| `contactId` (required) | `string \| null` |  |
| `number` (required) | `string` |  |
| `name` (required) | `string` | What the user saw, e.g. "Not Interested". Renaming one in WAVV changes this. |
| `category` (required) | `string` | The stable grouping behind the name, e.g. `INTERESTED`. Match on this rather than on `name`. |
| `tag` (required) | `string` | Machine-readable slug, e.g. `wavv-interested`. |
| `note` (required) | `string` | Free text the user typed alongside it. Empty string when they typed none. |
| `auto` (required) | `boolean` | Set by a rule rather than chosen by the user. |
| `userId` (required) | `string \| null` | Your id for the user who dispositioned the call — the `userId` you passed to `POST /tokens`. |

### OpenContactReason

Why WAVV is asking you to display a contact. Honour the ones you care about and ignore the rest.

```ts
'DIALER_FOCUS' | 'MESSENGER_OPEN' | 'USER_CLICK'
```

### OpenContact

| Field | Type | Description |
| --- | --- | --- |
| `contactId` (required) | `string` |  |
| `reason` (required) | `OpenContactReason` |  |

### ContactSearch

A contact search WAVV needs answered.

Return the matches and WAVV shows them. This is the quick path — it only works while your page is
open, so a user on the WAVV mobile app gets nothing. The contacts endpoint configured in the portal
is the one that always works, and is what we recommend once you are past the first integration.

| Field | Type | Description |
| --- | --- | --- |
| `query` (required) | `string` |  |

### ContactSearchHandler

```ts
(search: ContactSearch) => Contact[] | Promise<Contact[]>
```

### ErrorCode

Error codes on a rejected SDK promise.

`USER_CHANGED_RELOAD_REQUIRED`: `init` named a different user while a session was live. Reload the
page, then call `init` for the new user.

```ts
'INVALID_TOKEN' | 'NOT_INITIALIZED' | 'INVALID_REQUEST' | 'NOT_FOUND' | 'USER_CHANGED_RELOAD_REQUIRED'
```

## Tokens

For products embedding WAVV with [`@wavv/sdk`](https://www.npmjs.com/package/@wavv/sdk).

These endpoints take your **SDK key**, not a customer's API key. Your SDK key belongs to your
integration rather than to one WAVV account, and the only thing it does is mint short-lived
tokens for your own users. Keep it on your server: it speaks for every one of them.

### POST /tokens

**Mint a user token**

Exchanges your SDK key for a short-lived token naming one of your users. Your frontend passes
it to `init({ token })`; your SDK key never reaches the browser.

**Mint one per page load.** The token lives for 60 seconds and works exactly once — it is an
authorization code, not a session. `init` spends it immediately and exchanges it for a WAVV
session, which handles its own renewal from then on, so nothing expires mid-call. A cached
token is one that has already failed.

`userId` is **your** id for the person, not a WAVV id. You choose it, and WAVV keys the
account to it, so the same `userId` always reaches the same WAVV account. Send a stable id —
a primary key, not an email address someone can change.

A user who has not used WAVV before is created on first use; there is nothing to provision
in advance.

**Request body**

| Field | Type | Required | Description |
|---|---|---|---|
| `userId` | `string` | yes | Your own id for this user. Stable, and unique within your product. |
| `groupId` | `string` | no | Optional grouping, if your product has one — an organisation, office or workspace. Passed through and reported back on call and message records. |
| `subgroupId` | `string` | no | Optional second level of grouping beneath `groupId`. |

**Responses**

| Status | Description |
|---|---|
| `201` | A token to hand to the browser. |
| `400` | `userId` missing, empty, or not a string — `INVALID_REQUEST`. |
| `401` | API key missing, malformed, or revoked — `INVALID_API_KEY`. |
| `403` | A customer's API key was presented where your SDK key is required — `KEY_SCOPE_INSUFFICIENT`. |
| `500` | Failed to mint a token — `SERVER_ERROR`. |

**Request shape**

```json
{
  "userId": "user_8814",
  "groupId": "string",
  "subgroupId": "string"
}
```

**Response shape**

```json
{
  "token": "string",
  "expiresIn": 60
}
```

## Calls

Read call activity for the team the credential belongs to.

### GET /calls

**List calls**

Returns the team's calls, newest first. Every parameter is optional.

`transcript` is omitted from this response to keep pages small. Fetch it per-call from
[`GET /calls/{id}/transcript`](#get-callsidtranscript), or, to read many transcripts at once (scoring
calls against a script, comparing openers), set `includeTranscripts=true`: each call then
carries a `transcript` field, pages hold at most **25** calls because a transcript can run to
tens of kilobytes, and the request counts as a [heavy read](#rate-limits).

Filters combine with AND.

The `direction` filter selects by call type: `outbound` returns the calls your team dialed,
`inbound` returns calls received on a team number, including forwarded ones, and `all` — the
default — returns both, merged newest first. Internal call types such as whispers and
transfers are not returned by any `direction`, although such a call fetched by id reports
`direction: outbound`.

Calls made by an agent who has since left the team are still returned by every filter:
`userId` takes any agent who appears on a call, and the contact filters
(`contactId`, `contactName`) search your team's CRM locations, not just its current members.

With an API key, a repeated `limit` uses its first value, and a repeated `campaignId`,
`startedAfter`, `startedBefore` or `cursor` is ignored. With a Sign in with WAVV token, any
repeated parameter is rejected with `INVALID_REQUEST`.

**Query parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `direction` | `string` | no | Which calls to return: `outbound` (calls the team dialed), `inbound` (calls received, including forwarded ones), or `all`. Defaults to `all`. A repeated or unrecognised value is rejected with `INVALID_REQUEST` rather than falling back to the default. One of: `inbound`, `outbound`, `all`. |
| `campaignId` | `string (uuid)` | no | Restrict to a single dialing campaign. Must be a UUID — anything else is rejected with `INVALID_REQUEST` rather than simply matching no calls. With an API key, an empty value is ignored. |
| `userId` | `string` | no | Only this agent's calls: the agent's id in your CRM, the same value as a call's `userId`. An id that matches nobody on the team returns an empty page, not an error, so a typo looks exactly like an agent with no calls. |
| `phone` | `string` | no | Only calls with the contact on this number: matched against `phone` on outbound calls, and against `callerId` on inbound and forwarded ones, since there the contact is the one calling. Your own WAVV numbers are never matched, so this finds a contact's calls in both directions. Any format is accepted: non-digits are stripped and a leading country code `1` is dropped, so `+1 (512) 555-1234` matches `5125551234`. At least 7 characters. |
| `contactId` | `string` | no | Only calls with this contact: the contact's id in your CRM, the same value as a call's `contactId`. Inbound calls only carry a `contactId` when the caller matched a known contact. |
| `contactName` | `string` | no | Only calls whose `contactName` contains this text, ignoring case. At least 3 characters. Without `startedAfter`, only the 90 days before `startedBefore` (or before now) are searched; send `startedAfter` to search further back. |
| `startedAfter` | `string (date-time)` | no | Only calls with `startedAt` at or after this instant. Unparseable values are ignored. |
| `startedBefore` | `string (date-time)` | no | Only calls with `startedAt` at or before this instant. Unparseable values are ignored. |
| `cursor` | `string` | no | The `nextCursor` from a previous response. Omit for the first page. An unparseable value is ignored, which returns the first page again. |
| `limit` | `integer` | no | Page size, 1–200. Defaults to 50. A larger value is reduced to 200; a value that is zero, negative, or not a number falls back to 50. With `includeTranscripts=true`, a value above 25 (including the default) is reduced to 25. |
| `includeTranscripts` | `boolean` | no | `true` (or `1`) to give each call its full `transcript` — `null` for a call that has none, or none yet. Pages then hold at most 25 calls, and the request counts as a heavy read. Defaults to `false`. Any value other than `true`, `false`, `1`, or `0` is rejected with `INVALID_REQUEST`. |

**Responses**

| Status | Description |
|---|---|
| `200` | OK. Returns `CallListEnvelope`. |
| `400` | `direction` was not one of `inbound`, `outbound`, `all`; `campaignId` was not a UUID; `phone` was shorter than 7 characters or `contactName` shorter than 3; `userId` or `contactId` was empty; `includeTranscripts` was not `true`, `false`, `1`, or `0`; or a parameter was sent more than once — `INVALID_REQUEST`. |
| `401` | Credential missing, malformed, revoked, or expired — `INVALID_API_KEY`. |
| `403` | The signed-in user's role cannot use the API, or they are not on an active team — `FORBIDDEN`. |
| `429` | Over a rate limit — `RATE_LIMITED`, with `Retry-After`. |
| `500` | Failed to list calls — `SERVER_ERROR`. |
| `503` | The request took too long — `QUERY_TIMEOUT`. Narrow the date range or filters. |

**Response shape**

```json
{
  "data": [
    {
      "id": "3c9a17b4-2f5e-4d81-b0a7-6e2c9d4f1a03",
      "teamId": "8f3b2c10-4e7a-4b1c-9d2e-1a2b3c4d5e6f",
      "userId": "crm-user-4471",
      "groupId": "west-region",
      "subgroupId": "team-4",
      "campaignId": "5d1e8a72-9c34-4f60-8b2a-7e0d3c5f9b18",
      "direction": "outbound",
      "phone": "5125551234",
      "callerId": "5125559876",
      "contactId": "crm-99213",
      "contactName": "Dana Reyes",
      "startedAt": "2026-05-21T14:28:12Z",
      "answeredAt": "2026-05-21T14:28:19Z",
      "endedAt": "2026-05-21T14:30:00Z",
      "seconds": 101,
      "outcome": "HUNG_UP",
      "disposition": "Interested",
      "human": true,
      "note": "Sending pricing.",
      "summary": "Prospect asked for pricing on the multi-line plan.",
      "recorded": true
    }
  ],
  "nextCursor": "2026-05-21T14:28:12Z"
}
```

### GET /calls/{id}

**Get a call**

Returns one call. `transcript` is excluded, as it is from the list endpoint unless the list
is asked for `includeTranscripts`.

A call that exists but belongs to another team returns `404`, not `403` — the API does not
confirm the existence of calls outside your team.

**Path parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string (uuid)` | yes | The call's unique identifier. |

**Responses**

| Status | Description |
|---|---|
| `200` | OK. Returns `Call`. |
| `400` | `id` was not a UUID — `INVALID_REQUEST`. |
| `401` | Credential missing, malformed, revoked, or expired — `INVALID_API_KEY`. |
| `403` | The signed-in user's role cannot use the API, or they are not on an active team — `FORBIDDEN`. |
| `404` | Call not found, or not on this team — `NOT_FOUND`. |
| `429` | Over a rate limit — `RATE_LIMITED`, with `Retry-After`. |
| `500` | Failed to fetch call — `SERVER_ERROR`. |

**Response shape**

```json
{
  "id": "3c9a17b4-2f5e-4d81-b0a7-6e2c9d4f1a03",
  "teamId": "8f3b2c10-4e7a-4b1c-9d2e-1a2b3c4d5e6f",
  "userId": "crm-user-4471",
  "groupId": "west-region",
  "subgroupId": "team-4",
  "campaignId": "8f3b2c10-4e7a-4b1c-9d2e-1a2b3c4d5e6f",
  "direction": "inbound",
  "phone": "5125551234",
  "callerId": "5125559876",
  "contactId": "crm-99213",
  "contactName": "Dana Reyes",
  "startedAt": "2026-05-21T14:30:00Z",
  "answeredAt": "2026-05-21T14:30:00Z",
  "endedAt": "2026-05-21T14:30:00Z",
  "seconds": 101,
  "outcome": "BUSY",
  "disposition": "Interested",
  "human": true,
  "note": "string",
  "summary": "string",
  "recorded": true
}
```

### GET /calls/{id}/recording

**Get a recording URL**

Returns a freshly signed URL for the call's audio recording.

The URL is generated per request and is valid for the window given in `expiresAt`, currently
72 hours. Store the call `id` rather than the URL, and request a new one whenever you need
access.

A `404` covers both a call that has no recording and a call id that isn't available to your
credential. Read `recorded` on the call object beforehand when you need to tell the two apart.

**Path parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string (uuid)` | yes | The call's unique identifier. |

**Responses**

| Status | Description |
|---|---|
| `200` | OK. Returns `RecordingUrl`. |
| `400` | `id` was not a UUID — `INVALID_REQUEST`. |
| `401` | Credential missing, malformed, revoked, or expired — `INVALID_API_KEY`. |
| `403` | The signed-in user's role cannot use the API, or they are not on an active team — `FORBIDDEN`. |
| `404` | Call not found, or the call has no recording — `NOT_FOUND`. |
| `429` | Over a rate limit — `RATE_LIMITED`, with `Retry-After`. |
| `500` | Failed to fetch recording — `SERVER_ERROR`. |

**Response shape**

```json
{
  "url": "https://example.com",
  "expiresAt": "2026-05-21T14:30:00Z"
}
```

### GET /calls/{id}/transcript

**Get a transcript**

Returns the call's transcript and AI-generated summary, or just one of them.

Both fields are populated asynchronously once the call ends, so a `200` carrying
`transcript: null` indicates the transcript is not yet available for that call. Waiting for
the `call.recorded` event before fetching is more efficient than polling.

`summary` also appears on the call object; it is repeated here so one request returns both
halves of the post-call content. Transcripts can be long: when the summary may be enough, ask
for `part=summary` first. With `part=summary` or `part=transcript` the response carries only
that key — the other is absent, not `null`.

A [heavy read](#rate-limits) for signed-in users; an ordinary read for API keys.

**Path parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string (uuid)` | yes | The call's unique identifier. |

**Query parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `part` | `string` | no | Which half to return: `summary`, `transcript`, or `both`. Defaults to `both`. One of: `summary`, `transcript`, `both`. |

**Responses**

| Status | Description |
|---|---|
| `200` | OK. Returns `Transcript`. |
| `400` | `id` was not a UUID, or `part` was not one of `summary`, `transcript`, `both` — `INVALID_REQUEST`. |
| `401` | Credential missing, malformed, revoked, or expired — `INVALID_API_KEY`. |
| `403` | The signed-in user's role cannot use the API, or they are not on an active team — `FORBIDDEN`. |
| `404` | Call not found, or not on this team — `NOT_FOUND`. |
| `429` | Over a rate limit — `RATE_LIMITED`, with `Retry-After`. |
| `500` | Failed to fetch transcript — `SERVER_ERROR`. |

**Response shape**

```json
{
  "transcript": "Agent: Hi Dana, this is…",
  "summary": "Prospect asked for pricing on the multi-line plan."
}
```

## Call events

Five events cover the life of a call. Every payload uses the same envelope — `event`, `sentAt`,
and a `data` object holding the [Call](#call) — so one handler can serve all five and
branch on `event`.

### call.started (event)

**Outbound call started**

Fires the moment an **outbound** call is created — when the dialer places it, before the far
end has answered or rejected.

Because the call has only just begun, `endedAt`, `seconds`, `answeredAt`, `disposition`,
`human`, `note`, and `summary` are `null`, and `outcome` is `UNKNOWN`. Use this event to
open a record that `call.ended` will complete; call results are not available until then.

**Payload** — `CallEvent`

| Field | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | yes | Which event fired. Branch your handler on this. One of: `call.started`, `call.incoming`, `call.answered`, `call.ended`, `call.recorded`. |
| `sentAt` | `string (date-time)` | yes | When this payload was rendered. It is set once when the event is dispatched, so retries of the same delivery carry the original value. Use the `t` parameter in `X-WAVV-Signature` for freshness and replay checks. |
| `data` | `Call` | yes | The canonical call shape. Identical in REST responses and webhook payloads. `transcript` is not part of it; fetch it from `GET /calls/{id}/transcript`, or list calls with `includeTranscripts=true`, which returns [CallWithTranscript](#callwithtranscript). Webhooks never carry it. |

**Your endpoint should return**

| Status | Description |
|---|---|
| `2XX` | Any 2xx acknowledges the delivery. Anything else is retried. |

**Example delivery**

```json
{
  "event": "call.started",
  "sentAt": "2026-05-21T14:28:12Z",
  "data": {
    "id": "3c9a17b4-2f5e-4d81-b0a7-6e2c9d4f1a03",
    "teamId": "8f3b2c10-4e7a-4b1c-9d2e-1a2b3c4d5e6f",
    "userId": "crm-user-4471",
    "groupId": "west-region",
    "subgroupId": "team-4",
    "campaignId": "5d1e8a72-9c34-4f60-8b2a-7e0d3c5f9b18",
    "direction": "outbound",
    "phone": "5125551234",
    "callerId": "5125559876",
    "contactId": "crm-99213",
    "contactName": "Dana Reyes",
    "startedAt": "2026-05-21T14:28:12Z",
    "answeredAt": null,
    "endedAt": null,
    "seconds": null,
    "outcome": "UNKNOWN",
    "disposition": null,
    "human": null,
    "note": null,
    "summary": null,
    "recorded": false
  }
}
```

### call.incoming (event)

**Inbound call received**

Fires when an **inbound** call arrives on one of the team's numbers, at the point the call
record is created — before it is answered, routed, or forwarded.

The counterpart to `call.started` for the inbound direction, with the same fields still
unpopulated. `phone` and `callerId` follow the call rather than the account, so here `phone`
is **your** WAVV number that was dialed and `callerId` is the **caller's** number.
`campaignId` and `contactId` are `null` unless the caller matches a known CRM contact.

**Payload** — `CallEvent`

| Field | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | yes | Which event fired. Branch your handler on this. One of: `call.started`, `call.incoming`, `call.answered`, `call.ended`, `call.recorded`. |
| `sentAt` | `string (date-time)` | yes | When this payload was rendered. It is set once when the event is dispatched, so retries of the same delivery carry the original value. Use the `t` parameter in `X-WAVV-Signature` for freshness and replay checks. |
| `data` | `Call` | yes | The canonical call shape. Identical in REST responses and webhook payloads. `transcript` is not part of it; fetch it from `GET /calls/{id}/transcript`, or list calls with `includeTranscripts=true`, which returns [CallWithTranscript](#callwithtranscript). Webhooks never carry it. |

**Your endpoint should return**

| Status | Description |
|---|---|
| `2XX` | Any 2xx acknowledges the delivery. Anything else is retried. |

**Example delivery**

```json
{
  "event": "call.incoming",
  "sentAt": "2026-05-21T16:02:44Z",
  "data": {
    "id": "b7e4d290-13af-4c65-9a08-fd2e6b510c77",
    "teamId": "8f3b2c10-4e7a-4b1c-9d2e-1a2b3c4d5e6f",
    "userId": "crm-user-4471",
    "groupId": "west-region",
    "subgroupId": "team-4",
    "campaignId": null,
    "direction": "inbound",
    "phone": "5125559876",
    "callerId": "5125551234",
    "contactId": null,
    "contactName": null,
    "startedAt": "2026-05-21T16:02:44Z",
    "answeredAt": null,
    "endedAt": null,
    "seconds": null,
    "outcome": "UNKNOWN",
    "disposition": null,
    "human": null,
    "note": null,
    "summary": null,
    "recorded": false
  }
}
```

### call.answered (event)

**Call answered**

Fires when a call connects to the agent — an outbound call the contact picked up, or an inbound
call the agent took. It fires once per call: putting the call on hold or transferring it does not
fire it again.

Calls that never connect never fire it. Neither does a voicemail that answering-machine detection
screens out before it reaches the agent. A voicemail that does reach the agent fires it like any
other answer, so check `human` on `call.ended` before treating the call as a conversation.

`answeredAt` is populated with the moment the call connected. As on `call.started`, the call is
still live, so `endedAt`, `seconds`, `disposition`, `human`, `note`, and `summary` are `null`,
and `outcome` is `UNKNOWN`.

**Payload** — `CallEvent`

| Field | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | yes | Which event fired. Branch your handler on this. One of: `call.started`, `call.incoming`, `call.answered`, `call.ended`, `call.recorded`. |
| `sentAt` | `string (date-time)` | yes | When this payload was rendered. It is set once when the event is dispatched, so retries of the same delivery carry the original value. Use the `t` parameter in `X-WAVV-Signature` for freshness and replay checks. |
| `data` | `Call` | yes | The canonical call shape. Identical in REST responses and webhook payloads. `transcript` is not part of it; fetch it from `GET /calls/{id}/transcript`, or list calls with `includeTranscripts=true`, which returns [CallWithTranscript](#callwithtranscript). Webhooks never carry it. |

**Your endpoint should return**

| Status | Description |
|---|---|
| `2XX` | Any 2xx acknowledges the delivery. Anything else is retried. |

**Example delivery**

```json
{
  "event": "call.answered",
  "sentAt": "2026-05-21T14:28:21Z",
  "data": {
    "id": "3c9a17b4-2f5e-4d81-b0a7-6e2c9d4f1a03",
    "teamId": "8f3b2c10-4e7a-4b1c-9d2e-1a2b3c4d5e6f",
    "userId": "crm-user-4471",
    "groupId": "west-region",
    "subgroupId": "team-4",
    "campaignId": "5d1e8a72-9c34-4f60-8b2a-7e0d3c5f9b18",
    "direction": "outbound",
    "phone": "5125551234",
    "callerId": "5125559876",
    "contactId": "crm-99213",
    "contactName": "Dana Reyes",
    "startedAt": "2026-05-21T14:28:12Z",
    "answeredAt": "2026-05-21T14:28:19Z",
    "endedAt": null,
    "seconds": null,
    "outcome": "UNKNOWN",
    "disposition": null,
    "human": null,
    "note": null,
    "summary": null,
    "recorded": false
  }
}
```

### call.ended (event)

**Call ended and dispositioned**

Fires when the call is over and its outcome has been recorded. This is the **complete** call:
`endedAt`, `seconds`, `answeredAt`, `outcome`, `human`, and any `disposition` or `note` the
agent entered are all populated.

For most integrations this is the only event you need. It fires for both directions.

Two fields may still be `null` here and arrive later: `summary` (AI-generated) and any
recording — see `call.recorded`.

**Payload** — `CallEvent`

| Field | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | yes | Which event fired. Branch your handler on this. One of: `call.started`, `call.incoming`, `call.answered`, `call.ended`, `call.recorded`. |
| `sentAt` | `string (date-time)` | yes | When this payload was rendered. It is set once when the event is dispatched, so retries of the same delivery carry the original value. Use the `t` parameter in `X-WAVV-Signature` for freshness and replay checks. |
| `data` | `Call` | yes | The canonical call shape. Identical in REST responses and webhook payloads. `transcript` is not part of it; fetch it from `GET /calls/{id}/transcript`, or list calls with `includeTranscripts=true`, which returns [CallWithTranscript](#callwithtranscript). Webhooks never carry it. |

**Your endpoint should return**

| Status | Description |
|---|---|
| `2XX` | Any 2xx acknowledges the delivery. Anything else is retried. |

**Example delivery**

```json
{
  "event": "call.ended",
  "sentAt": "2026-05-21T14:30:01Z",
  "data": {
    "id": "3c9a17b4-2f5e-4d81-b0a7-6e2c9d4f1a03",
    "teamId": "8f3b2c10-4e7a-4b1c-9d2e-1a2b3c4d5e6f",
    "userId": "crm-user-4471",
    "groupId": "west-region",
    "subgroupId": "team-4",
    "campaignId": "5d1e8a72-9c34-4f60-8b2a-7e0d3c5f9b18",
    "direction": "outbound",
    "phone": "5125551234",
    "callerId": "5125559876",
    "contactId": "crm-99213",
    "contactName": "Dana Reyes",
    "startedAt": "2026-05-21T14:28:12Z",
    "answeredAt": "2026-05-21T14:28:19Z",
    "endedAt": "2026-05-21T14:30:00Z",
    "seconds": 101,
    "outcome": "HUNG_UP",
    "disposition": "Interested",
    "human": true,
    "note": "Sending pricing.",
    "summary": null,
    "recorded": true
  }
}
```

### call.recorded (event)

**Recording available**

Fires when a call's audio recording has finished processing and is available.

This is the only event whose `data` carries an extra field: `recordingUrl`, a signed URL for
the audio. The URL is generated at send time and is time-limited, so download the audio when
you receive it, or request a fresh URL from
[`GET /calls/{id}/recording`](#get-callsidrecording) later. Store the call `id` rather than the URL.

This event typically follows `call.ended` within seconds. As with all events, order is not
guaranteed — see [Delivery and retries](#delivery-and-retries).

**Payload** — `CallRecordedEvent`

| Field | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | yes | Always `call.recorded`. |
| `sentAt` | `string (date-time)` | yes | When this payload was rendered. |
| `data` | `CallWithRecording` | yes | A [Call](#call) plus the signed recording URL. Used only as the `data` of a `call.recorded` event. |

**Your endpoint should return**

| Status | Description |
|---|---|
| `2XX` | Any 2xx acknowledges the delivery. Anything else is retried. |

**Example delivery**

```json
{
  "event": "call.recorded",
  "sentAt": "2026-05-21T14:30:14Z",
  "data": {
    "id": "3c9a17b4-2f5e-4d81-b0a7-6e2c9d4f1a03",
    "teamId": "8f3b2c10-4e7a-4b1c-9d2e-1a2b3c4d5e6f",
    "userId": "crm-user-4471",
    "groupId": "west-region",
    "subgroupId": "team-4",
    "campaignId": "5d1e8a72-9c34-4f60-8b2a-7e0d3c5f9b18",
    "direction": "outbound",
    "phone": "5125551234",
    "callerId": "5125559876",
    "contactId": "crm-99213",
    "contactName": "Dana Reyes",
    "startedAt": "2026-05-21T14:28:12Z",
    "answeredAt": "2026-05-21T14:28:19Z",
    "endedAt": "2026-05-21T14:30:00Z",
    "seconds": 101,
    "outcome": "HUNG_UP",
    "disposition": "Interested",
    "human": true,
    "note": "Sending pricing.",
    "summary": "Prospect asked for pricing on the multi-line plan.",
    "recorded": true,
    "recordingUrl": "https://recordings.wavv.com/3c9a17b4…?X-Amz-Expires=259200&X-Amz-Signature=…"
  }
}
```

## Message events

Three events follow a text message: sent, received, and failed. The envelope matches the call
events — `event`, `sentAt`, and a `data` object — with a [Message](#message) in `data`, so the
same handler and the same signature check serve both.

### message.sent (event)

**Text message sent**

Fires once when the carrier accepts an outbound text — sent, not yet delivered. A message the
carrier later reports as undelivered follows with `message.failed`, so a message can fire both.

Scheduled messages fire when they actually go out, not when they are scheduled.

**Payload** — `MessageEvent`

| Field | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | yes | Which event fired. Branch your handler on this. One of: `message.sent`, `message.received`, `message.failed`. |
| `sentAt` | `string (date-time)` | yes | When this payload was rendered. Retries of the same delivery carry the original value. |
| `data` | `Message` | yes | A text message, as delivered in every `message.*` webhook. Like the [Call](#call), its ids are yours: `userId` is the id you passed to `POST /tokens`, and `contactId` is your contact id. |

**Your endpoint should return**

| Status | Description |
|---|---|
| `2XX` | Any 2xx acknowledges the delivery. Anything else is retried. |

**Example delivery**

```json
{
  "event": "message.sent",
  "sentAt": "2026-05-21T14:31:03Z",
  "data": {
    "id": "0b6f2d1e-8a4c-4e3b-9f71-2c5d8e1a4b90",
    "teamId": "8f3b2c10-4e7a-4b1c-9d2e-1a2b3c4d5e6f",
    "userId": "crm-user-4471",
    "conversationId": "6a2e9c47-1d3b-4f58-a0e6-93b7c5d21f84",
    "direction": "outbound",
    "userNumber": "5125559876",
    "contactNumber": "5125551234",
    "contactId": "crm-99213",
    "body": "Thanks for your time today — here is the pricing sheet.",
    "attachments": [],
    "segments": 1,
    "status": "sent",
    "failedReason": null,
    "createdAt": "2026-05-21T14:31:02Z",
    "sentAt": "2026-05-21T14:31:03Z",
    "failedAt": null
  }
}
```

### message.received (event)

**Text message received**

Fires when a contact texts one of your users' WAVV numbers.

`userId` is the user whose conversation it landed in. On a number the whole team shares there is
no single owner, so `userId` is `null`; use `teamId` and `conversationId` to place the message.

**Payload** — `MessageEvent`

| Field | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | yes | Which event fired. Branch your handler on this. One of: `message.sent`, `message.received`, `message.failed`. |
| `sentAt` | `string (date-time)` | yes | When this payload was rendered. Retries of the same delivery carry the original value. |
| `data` | `Message` | yes | A text message, as delivered in every `message.*` webhook. Like the [Call](#call), its ids are yours: `userId` is the id you passed to `POST /tokens`, and `contactId` is your contact id. |

**Your endpoint should return**

| Status | Description |
|---|---|
| `2XX` | Any 2xx acknowledges the delivery. Anything else is retried. |

**Example delivery**

```json
{
  "event": "message.received",
  "sentAt": "2026-05-21T14:40:17Z",
  "data": {
    "id": "4d1c7e93-2b6a-4f0e-8c35-a9e2f7b16d08",
    "teamId": "8f3b2c10-4e7a-4b1c-9d2e-1a2b3c4d5e6f",
    "userId": "crm-user-4471",
    "conversationId": "6a2e9c47-1d3b-4f58-a0e6-93b7c5d21f84",
    "direction": "inbound",
    "userNumber": "5125559876",
    "contactNumber": "5125551234",
    "contactId": "crm-99213",
    "body": "Got it, thanks. Can we talk Thursday?",
    "attachments": [],
    "segments": 1,
    "status": "received",
    "failedReason": null,
    "createdAt": "2026-05-21T14:40:16Z",
    "sentAt": "2026-05-21T14:40:16Z",
    "failedAt": null
  }
}
```

### message.failed (event)

**Text message failed**

Fires once when an outbound text fails — rejected before it left WAVV (for example, the number is
on a do-not-contact list), refused by the carrier, or reported undelivered after it was sent.
`failedReason` says why, in words you can show the user.

A message the carrier accepted and later reported undelivered has already fired `message.sent`, so
treat `message.failed` as overriding it rather than as a message that was never sent.

**Payload** — `MessageEvent`

| Field | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | yes | Which event fired. Branch your handler on this. One of: `message.sent`, `message.received`, `message.failed`. |
| `sentAt` | `string (date-time)` | yes | When this payload was rendered. Retries of the same delivery carry the original value. |
| `data` | `Message` | yes | A text message, as delivered in every `message.*` webhook. Like the [Call](#call), its ids are yours: `userId` is the id you passed to `POST /tokens`, and `contactId` is your contact id. |

**Your endpoint should return**

| Status | Description |
|---|---|
| `2XX` | Any 2xx acknowledges the delivery. Anything else is retried. |

**Example delivery**

```json
{
  "event": "message.failed",
  "sentAt": "2026-05-21T14:31:09Z",
  "data": {
    "id": "0b6f2d1e-8a4c-4e3b-9f71-2c5d8e1a4b90",
    "teamId": "8f3b2c10-4e7a-4b1c-9d2e-1a2b3c4d5e6f",
    "userId": "crm-user-4471",
    "conversationId": "6a2e9c47-1d3b-4f58-a0e6-93b7c5d21f84",
    "direction": "outbound",
    "userNumber": "5125559876",
    "contactNumber": "5125551234",
    "contactId": "crm-99213",
    "body": "Thanks for your time today — here is the pricing sheet.",
    "attachments": [],
    "segments": 1,
    "status": "failed",
    "failedReason": "The carrier could not deliver this message to the recipient.",
    "createdAt": "2026-05-21T14:31:02Z",
    "sentAt": "2026-05-21T14:31:03Z",
    "failedAt": "2026-05-21T14:31:08Z"
  }
}
```

## MCP server

WAVV runs a [Model Context Protocol](https://modelcontextprotocol.io) server, so an AI assistant
such as Claude or ChatGPT can work with your team's calls and call boards directly: "how many
conversations did we have yesterday", "why did this lead leave the Follow up stage", "get a
calling session ready for everyone in Follow up".

```http
https://app.wavv.com/api/v3/mcp
```

The server speaks **Streamable HTTP** and is **stateless**: every request is a `POST` that
stands on its own, with no session to keep. `GET` and `DELETE` answer `405`.

**Connecting**

**Claude.** Open **Customize → Connectors**, click **+**, choose **Add custom connector**, and
paste the URL above. Click **Connect**, sign in with WAVV, pick the WAVV account to connect if
you have more than one, and choose **Allow**.

**ChatGPT.** Go to **chatgpt.com/plugins**, click **+**, choose **Add custom MCP server**, paste
the URL above, choose OAuth, and sign in with WAVV when asked.

**Cursor or VS Code.** Add the URL above as an HTTP server — in Cursor, an entry in `mcp.json`
with `"url"`; in VS Code, **MCP: Add Server → HTTP** — and sign in with WAVV when the editor
asks.

**With an API key.** Clients that let you set headers, such as Claude Code, can connect with an
API key instead of signing in:

```bash
claude mcp add --transport http wavv https://app.wavv.com/api/v3/mcp --header "Authorization: Bearer <key>"
```

**What the assistant can do**

That depends on how it connected:

- **Signed in with WAVV** — every tool below. The assistant acts as the person who signed in:
  it sees only the boards and contacts they see in WAVV, and can change only what they could
  change there. The reports are the exception: like the Reports page, they cover the whole
  team. Only owners, admins, and managers can connect this way.
- **API key** — the call tools, `get_me`, and `get_call_report`. A key belongs to the team
  rather than a person, so the call board and calling tools are not offered.

**Who is connected.** `get_me` returns the team and, for someone signed in, the person: their
role, their id in your CRM (pass it as `userId` for "my calls"), their time zone, and the WAVV
tabs they have open. Assistants call it first.

**Calls.** Each mirrors a REST endpoint and takes the same parameters:

- `list_calls` — [`GET /calls`](#get-calls)
- `get_call` — [`GET /calls/{id}`](#get-callsid)
- `get_call_transcript` — [`GET /calls/{id}/transcript`](#get-callsidtranscript)
- `get_call_recording_url` — [`GET /calls/{id}/recording`](#get-callsidrecording)

**Call report.** `get_call_report` returns one section of the call report on WAVV's Reports
page, with the same numbers the page shows, for the team or one agent and optionally one call
board: activity per agent and per day, week, or month; totals per agent; or a heatmap of
dispositions by weekday and hour. Assistants use it for "how many calls did we make yesterday"
rather than paging through calls. Like the page, it goes back to the 1st of the month a year
ago; an earlier start is moved up to that day. The report is team-wide: it covers every agent
on the team, whoever is asking.

**Call boards** (signed in only):

- `list_boards` — the boards the person can open.
- `get_board` — a board's setup: stages, automations written out as rules, calling settings,
  where its contacts come from, and its members.
- `list_stage_contacts` — the contacts in one stage, in dialing order, with attempts, time in
  stage, and who they're assigned to.
- `find_board_contacts` — finds contacts on a board.
- `get_contact_trail` — a contact's history on a board: stage moves, calls, and the rules that
  moved them.
- `get_automation_run` — what one automation run did.
- `get_board_calls` — a board's calls over a window of time, and whether each contact moved
  stage or an automation ran afterwards.
- `get_board_activity` — everything that happened on a board over a window of time.
- `get_board_import_history` and `get_board_automation_history` — contacts added to a board,
  and changes to its rules.
- `get_board_report` — one section of the Call Boards report, with the same numbers as WAVV's
  Reports page. Like the page, it is team-wide: it covers every active board on the team,
  including boards the person signed in can't open.

The board tools name people the way calls do: `userId` is the person's user id in your CRM
(null if they have none), and `wavvUserId` is WAVV's own id for them. A board member from
`get_board` can be passed as either to filter `get_board_report` or to assign contacts.

**Changing a board** (signed in only):

- `preview_import`, `import_to_board`, `get_import_status` — add contacts from your CRM to a
  board.
- `preview_bulk_action`, `run_bulk_action`, `get_bulk_action_status` — act on many contacts at
  once, such as moving, assigning, snoozing, or removing them, or moving them to another
  board.

Both always go in two steps. The preview says exactly what will happen, to how many contacts,
and changes nothing. The change runs only with that preview's confirm token, which works once
and expires after 10 minutes, so the assistant has to show the preview and get a yes first.

**Calling** (signed in only):

- `prepare_campaign` — gets a calling session ready, on a call board or for a list of CRM
  contacts. It appears in the person's open WAVV tab, and they press Start.

The assistant **never dials**. `import_to_board`, `run_bulk_action`, and `prepare_campaign`
are marked as changing something, so clients ask before running them.

**Feedback** (signed in only):

- `submit_feedback` — sends the WAVV team a feature request, bug report, or other feedback.
  When someone asks for something the tools can't do, the assistant offers to send it, and
  sends it only if they say yes.

**Prompts**

Ready-made requests a person picks from their assistant's prompt menu (`/` in Claude):

- `review_yesterdays_calls` — totals, standout calls, and follow-ups from yesterday.
- `score_calls_against_script` — grades recent conversations against a script you give it.
  Arguments: `script`, and `days` to look back (default 7).
- `who_should_i_call_next` — suggests which call board leads to work next, and why. Signed in
  only.
- `clean_up_a_board` — finds contacts on a board that look stuck or over-called and suggests
  what to do with each group, previewing any change before it runs. Argument: `board`, the
  board's name. Signed in only.

**Responses, errors, and limits**

A tool returns JSON, as text; the call tools return the same JSON as their endpoints. A failure
comes back as a tool error carrying the same message the REST `error` field would. Tool calls
count against the same [rate limits](#rate-limits) as REST requests. The call report, the board report, the board
calls and activity reads, both previews, and a calling session for a list of CRM contacts are
heavy reads.

**OAuth discovery**

You only need this if you are writing an MCP client. A request without a valid credential gets
`401` with a challenge pointing at the server's protected-resource metadata (RFC 9728), which
names WAVV's authorization server:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://app.wavv.com/api/v3/mcp/.well-known/oauth-protected-resource"
```

The metadata is also served at the RFC 9728 well-known path,
`https://app.wavv.com/.well-known/oauth-protected-resource/api/v3/mcp`. Tokens are issued for
the resource `https://app.wavv.com/api/v3/mcp` with the `mcp` scope.

## Object reference

### Call

The canonical call shape. Identical in REST responses and webhook payloads. `transcript` is not part of it; fetch it from `GET /calls/{id}/transcript`, or list calls with `includeTranscripts=true`, which returns [CallWithTranscript](#callwithtranscript). Webhooks never carry it.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string (uuid)` | yes | The call's unique identifier. Stable; safe to store and use as your dedupe key. |
| `teamId` | `string (uuid)` | yes | The team the call belongs to. Always the team your credential is scoped to. |
| `userId` | `string` | yes | The agent who made or received the call, in **your** identifier space — the same id you supplied when provisioning the user, not a WAVV-internal one. Never null. |
| `groupId` | `string \| null` | yes | Your grouping for the agent, if you set one when provisioning them. `null` when the account does not use groups. |
| `subgroupId` | `string \| null` | yes | Your second-level grouping, if you set one. `null` when unused. |
| `campaignId` | `string (uuid) \| null` | yes | The dialing campaign this call was placed under. `null` for inbound and ad-hoc calls. |
| `direction` | `string` | yes | `inbound` covers calls received on a team number, including forwarded ones. Everything else — dialer-placed calls, and internal types such as whispers and transfers — reports as `outbound`. The `direction` filter on `GET /calls` is narrower: its `outbound` returns only dialer-placed calls, so the internal types are never listed. One of: `inbound`, `outbound`. |
| `phone` | `string` | yes | The number that was **called**. On `outbound` that is the contact you dialed; on `inbound` it is your own WAVV number that the caller reached. Unformatted 10 digits. |
| `callerId` | `string` | yes | The number the call came **from**. On `outbound` that is the WAVV caller ID you presented; on `inbound` it is the external caller's number. Unformatted 10 digits. Because `phone` and `callerId` follow the call rather than the account, read `direction` first to determine which of the two identifies your contact. |
| `contactId` | `string \| null` | yes | The contact's id in the connected CRM, when the call was placed against a known contact. `null` for manual dials and unmatched inbound calls. |
| `contactName` | `string \| null` | yes | The contact's display name at the time of the call. `null` when unknown. |
| `startedAt` | `string (date-time)` | yes | When the call was created — dialed, or received. Also the sort key and pagination cursor. |
| `answeredAt` | `string (date-time) \| null` | yes | When the call connected, derived as `endedAt - seconds`. `null` until both of those are known, and for calls that were never answered. On `call.answered` it is instead the moment the call connected, since the call has not ended yet; the derived value on later events can differ from it by a second or two. |
| `endedAt` | `string (date-time) \| null` | yes | When the call finished. `null` while the call is still in progress. |
| `seconds` | `integer \| null` | yes | Talk time in whole seconds. `null` while the call is in progress or if it never connected. |
| `outcome` | `string` | yes | How the call resolved, as determined by WAVV. Always present: a call that has not resolved yet reports `UNKNOWN` rather than `null`. Treat this list as open — new members may be added. One of: `BUSY`, `DISCONNECTED`, `NO_ANSWER`, `HUNG_UP`, `USER_HUNG_UP`, `UNKNOWN`, `VOICEMAIL`, `CALLBACK`, `NO_VOICEMAIL`, `NO_CALLBACK`, `TRANSFERRED`, `VOICEMAIL_RETRY`, `REJECTED`. |
| `disposition` | `string \| null` | yes | The free-text disposition the agent selected, drawn from your team's own configured list. `null` if none was set. Values are team-defined, not a WAVV enum. |
| `human` | `boolean \| null` | yes | Whether a human answered, according to WAVV's answering-machine detection. `false` means a machine was detected; `null` means no determination was made, which is a distinct result from `false`. |
| `note` | `string \| null` | yes | Free-text note the agent attached to the call. `null` if none. |
| `summary` | `string \| null` | yes | AI-generated call summary. Produced asynchronously after the call ends, so it is typically `null` on `call.ended` and populated shortly after. |
| `recorded` | `boolean` | yes | Whether audio was recorded. When `true`, fetch the audio from `GET /calls/{id}/recording` — the URL is never embedded in this object. |

### CallWithRecording

*extends Call*

A [Call](#call) plus the signed recording URL. Used only as the `data` of a `call.recorded` event.

| Field | Type | Required | Description |
|---|---|---|---|
| `recordingUrl` | `string (uri)` | yes | Signed, time-limited URL to the call audio. Generated at send time and valid for 72 hours. Download promptly; do not store the URL. |

### CallWithTranscript

*extends Call*

A [Call](#call) plus its transcript. Returned only by [list calls](#get-calls) with `includeTranscripts=true`; never by `GET /calls/{id}` or in a webhook payload, which share the plain `Call` shape.

| Field | Type | Required | Description |
|---|---|---|---|
| `transcript` | `string \| null` | yes | The full call transcript, as [`GET /calls/{id}/transcript`](#get-callsidtranscript) returns it. `null` when the call was not transcribed, or the transcript is not ready yet. Can run to tens of kilobytes, which is why pages that carry it hold at most 25 calls. |

### CallListEnvelope

One page of calls.

| Field | Type | Required | Description |
|---|---|---|---|
| `data` | `Call[]` | yes | The page of calls, newest first. With `includeTranscripts=true`, each is a [CallWithTranscript](#callwithtranscript). |
| `nextCursor` | `string \| null` | yes | Pass back as `cursor` for the next page. `null` on the last page. |

### RecordingUrl

A freshly signed link to a call's audio.

| Field | Type | Required | Description |
|---|---|---|---|
| `url` | `string (uri)` | yes | Signed URL to the audio file. |
| `expiresAt` | `string (date-time)` | yes | When the signature stops working — 72 hours from the request. |

### Transcript

Post-call text content. Both fields are populated asynchronously. Each is present only when `part` asks for it — both by default — so neither is marked required.

| Field | Type | Required | Description |
|---|---|---|---|
| `transcript` | `string \| null` | no | Full call transcript. `null` if not transcribed, or not ready yet. Absent when `part=summary`. |
| `summary` | `string \| null` | no | AI-generated summary. Same value as `summary` on the call object; `null` until it has been generated. Absent when `part=transcript`. |

### CallEvent

The envelope every webhook delivery uses.

| Field | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | yes | Which event fired. Branch your handler on this. One of: `call.started`, `call.incoming`, `call.answered`, `call.ended`, `call.recorded`. |
| `sentAt` | `string (date-time)` | yes | When this payload was rendered. It is set once when the event is dispatched, so retries of the same delivery carry the original value. Use the `t` parameter in `X-WAVV-Signature` for freshness and replay checks. |
| `data` | `Call` | yes | The canonical call shape. Identical in REST responses and webhook payloads. `transcript` is not part of it; fetch it from `GET /calls/{id}/transcript`, or list calls with `includeTranscripts=true`, which returns [CallWithTranscript](#callwithtranscript). Webhooks never carry it. |

### CallRecordedEvent

*the call.recorded envelope*

Identical to [CallEvent](#callevent), except `data` also carries `recordingUrl`.

| Field | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | yes | Always `call.recorded`. |
| `sentAt` | `string (date-time)` | yes | When this payload was rendered. |
| `data` | `CallWithRecording` | yes | A [Call](#call) plus the signed recording URL. Used only as the `data` of a `call.recorded` event. |

### Message

A text message, as delivered in every `message.*` webhook. Like the [Call](#call), its ids are yours: `userId` is the id you passed to `POST /tokens`, and `contactId` is your contact id.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string (uuid)` | yes | WAVV's id for the message. Stable across the events for one message, so deduplicate on `(event, id)`. |
| `teamId` | `string (uuid) \| null` | yes | The team the conversation belongs to. |
| `userId` | `string \| null` | yes | Your id for the user — the sender of an outbound message, or the owner of the conversation an inbound one arrived in. `null` for a message received on a number the whole team shares, since no single user owns it. |
| `conversationId` | `string (uuid) \| null` | yes | The conversation thread the message belongs to. Every message in one thread shares it. |
| `direction` | `string` | yes | `outbound` when your user sent it, `inbound` when the contact did. One of: `outbound`, `inbound`. |
| `userNumber` | `string \| null` | yes | The WAVV number on your user's side of the conversation, whichever direction the message went. |
| `contactNumber` | `string \| null` | yes | The contact's number, whichever direction the message went. |
| `contactId` | `string \| null` | yes | Your id for the contact, when the conversation is linked to one of your contacts. `null` for a number WAVV has not matched to a contact of yours. |
| `body` | `string` | yes | The message text. Empty string for a message that carries only attachments. |
| `attachments` | `string (uri)[]` | yes | URLs of any images or files sent with the message. Empty when there are none. |
| `segments` | `integer` | yes | How many SMS segments the carrier billed the body as. |
| `status` | `string` | yes | Matches the event — `sent` on `message.sent`, and so on. One of: `sent`, `received`, `failed`. |
| `failedReason` | `string \| null` | yes | Why the carrier rejected the message, in words meant for a person. `null` unless `status` is `failed`. |
| `createdAt` | `string (date-time)` | yes | When WAVV created the message. |
| `sentAt` | `string (date-time) \| null` | yes | For an outbound message, when the carrier accepted it; for an inbound one, when WAVV received it. `null` for an outbound message that failed before the carrier took it. |
| `failedAt` | `string (date-time) \| null` | yes | When the message failed. `null` unless `status` is `failed`. |

### MessageEvent

The envelope every `message.*` delivery uses — the same as [CallEvent](#callevent), with a Message in `data`.

| Field | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | yes | Which event fired. Branch your handler on this. One of: `message.sent`, `message.received`, `message.failed`. |
| `sentAt` | `string (date-time)` | yes | When this payload was rendered. Retries of the same delivery carry the original value. |
| `data` | `Message` | yes | A text message, as delivered in every `message.*` webhook. Like the [Call](#call), its ids are yours: `userId` is the id you passed to `POST /tokens`, and `contactId` is your contact id. |

### Error

Every non-2xx REST response uses this shape.

| Field | Type | Required | Description |
|---|---|---|---|
| `error` | `string` | yes | Human-readable message intended for logs and diagnostics. Branch on `code` rather than this field, as the wording may change. |
| `code` | `string` | yes | Machine-readable code — see [Error codes](#error-codes). |

## Error codes

| Code | Meaning |
|---|---|
| `INVALID_API_KEY` | Missing, malformed, or revoked API key, or a Sign in with WAVV access token that is invalid or expired. Always `401`. |
| `FORBIDDEN` | The signed-in user may not use the API — their role is not owner, admin, or manager, or they are not on an active team. `403`. |
| `NOT_FOUND` | The call does not exist, or belongs to another team. Also returned when a call exists but has no recording. |
| `INVALID_REQUEST` | The request was malformed, or a parameter failed validation. `400`. |
| `RATE_LIMITED` | Too many requests. The response carries a `Retry-After` header giving the seconds to wait — see [Rate limits](#rate-limits). `429`. |
| `QUERY_TIMEOUT` | The request took too long to answer and was stopped: 30 seconds for a call list, 60 for a call board report. Retrying the same request will likely time out again; narrow the date range or filters. `503`. |
| `SERVER_ERROR` | Something failed on our side. Safe to retry. Usually `500`; `503` when WAVV briefly can't check a credential. |

**Error response shape**

```json
{
  "error": "Call not found",
  "code": "NOT_FOUND"
}
```
