/** Public types for `@wavv/sdk`. */

/**
 * A contact WAVV can call or message.
 *
 * `name` and `number` are the minimum. Everything else is optional and passed through — WAVV stores as
 * little contact data as it can, so treat anything beyond these as a display convenience rather than a
 * record we keep.
 */
export type Contact = {
	/**
	 * Your id for this contact. Required, because it is what ties every call and message event back to
	 * your own records — without it WAVV has nothing to report and `contactId` comes back null.
	 */
	id: string;
	name: string;
	number: string;
	firstName?: string;
	lastName?: string;
	city?: string;
	state?: string;
	zip?: string;
	timezone?: string;
	address?: string;
};

export type InitOptions = {
	/**
	 * A short-lived, single-use token minted by your backend with your WAVV API key.
	 */
	token: string;
	/**
	 * Which WAVV host serves `wavv.js`. Defaults to `app.wavv.com`.
	 *
	 * For WAVV's own QA and development layers — partners should never set this.
	 */
	server?: string;
};

/**
 * Where `show()` can send the user.
 *
 * These are destinations inside WAVV's manager rather than products of their own, which is why they are
 * named rather than given a function each: nothing here implies one section belongs to another.
 */
export const Target = {
	CALL_HISTORY: 'CALL_HISTORY',
	BILLING: 'BILLING',
	NUMBERS: 'NUMBERS',
	TEAM: 'TEAM',
	CALL_SCRIPTS: 'CALL_SCRIPTS',
	SETTINGS: 'SETTINGS',
} as const;

export type Target = (typeof Target)[keyof typeof Target];

/** `type` rather than `direction` because later values — missed, voicemail — are not directions. */
export type CallType = 'INBOUND' | 'OUTBOUND';

export type ShowOptions = {
	/** Only read for `CALL_HISTORY`: opens that call's detail view. */
	callId?: string;
	/** Only read for `CALL_HISTORY`. */
	type?: CallType;
	/** Only read for `CALL_SCRIPTS`. */
	scriptId?: string;
};

// ---------------------------------------------------------------------------
// Dialer
// ---------------------------------------------------------------------------

export type OpenCallListOptions = { listId: string };

export type CreateCallListOptions = {
	name: string;
	contacts: Contact[];
	/** Display the list once created. Without it you get the id back and decide when to show it. */
	show?: boolean;
};

export type CreateCallListResult = { listId: string };

export type CallOptions = { contact: Contact };

export type AddContactOptions = { contact: Contact };

export type RemoveContactOptions = {
	contactId: string;
	/** End the call in progress if this contact is on one. The real do-not-call moment. */
	hangup?: boolean;
};

export type AddPhoneOptions = {
	number: string;
	/** The contact to add it to. For a contact WAVV has not seen, use `addContact` instead. */
	contactId: string;
};

export type RemovePhoneOptions = {
	number: string;
	/** Narrow the removal to one contact. Omitted, the number is scrubbed wherever it appears. */
	contactId?: string;
	/** End the call in progress if this number is on one. */
	hangup?: boolean;
};

// ---------------------------------------------------------------------------
// Messenger
// ---------------------------------------------------------------------------

export type OpenConversationOptions = { conversationId: string };

export type ComposeOptions = {
	contact: Contact;
	/** Pre-fills the composer. The user still presses send — the SDK never sends for them. */
	body?: string;
};

// ---------------------------------------------------------------------------
// Callboards
// ---------------------------------------------------------------------------

export type OpenBoardOptions = { boardId: string };

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

/** Returned by every callback registration. */
export type Listener = { remove: () => void };

export type Call = {
	/**
	 * The call's id — the same one `GET /v3/calls/{id}` takes and `show('CALL_HISTORY', { callId })`
	 * opens. Null in the rare case a leg fires an event before its channel exists.
	 */
	callId: string | null;
	/**
	 * Your id for the contact, when WAVV knows it. Null when nobody told us — a number typed straight
	 * into the dial pad, for instance. Anything your product initiated should carry one.
	 */
	contactId: string | null;
	number: string;
	/** Answered and ended: a leg the user is not watching, such as a voicemail drop or a callback. */
	backgrounded?: boolean;
	/** Ended only — WAVV's own outcome for the call. Dispositions are separate and user-chosen. */
	outcome?: string;
	/** Ended only: whether a person was detected, whether the call connected, and how long it ran. */
	human?: boolean;
	answered?: boolean;
	duration?: number;
	/** Ended only, and only when the outcome was voicemail. */
	voicemailId?: string;
	/** Recorded only. The same id as `callId` — recordings are addressed by their call. */
	recordingId?: string;
	/** Recorded only: whether this was saved by the user's record-everything setting rather than by hand. */
	autoSaveRecordings?: boolean;
};

export type Message = {
	/** The message's own id. */
	id: string;
	/** The conversation it belongs to — the same id `openConversation` takes. */
	conversationId: string;
	contactId: string | null;
	/** The contact's number, whichever direction the message went. */
	number: string;
	/** Recipient and sender, in that order, so direction is readable without comparing to `number`. */
	to: string;
	from: string;
	body: string;
	attachments: string[];
	/**
	 * Your id for the user who sent the message (outbound) or whose number received it (inbound) — the
	 * `userId` you passed to `POST /tokens`. Null when that is not the signed-in user, e.g. a teammate's
	 * message on a shared team number.
	 */
	userId: string | null;
	/** Failed only: why the carrier rejected it, in words meant for a person. */
	failedReason?: string;
	failedAt?: string;
};

/**
 * A disposition the user chose for a call.
 *
 * WAVV owns dispositions — they are configured per team and chosen by hand — so this is how your product
 * learns the outcome a person settled on, as opposed to `Call.outcome`, which is what the system saw.
 */
export type Disposition = {
	/** This disposition record's own id. */
	id: string;
	/** The call it belongs to, matching `Call.callId`. */
	callId: string;
	contactId: string | null;
	number: string;
	/** What the user saw, e.g. "Not Interested". Renaming one in WAVV changes this. */
	name: string;
	/** The stable grouping behind the name, e.g. `INTERESTED`. Match on this rather than on `name`. */
	category: string;
	/** Machine-readable slug, e.g. `wavv-interested`. */
	tag: string;
	/** Free text the user typed alongside it. Empty string when they typed none. */
	note: string;
	/** Set by a rule rather than chosen by the user. */
	auto: boolean;
	/** Your id for the user who dispositioned the call — the `userId` you passed to `POST /tokens`. */
	userId: string | null;
};

/** Why WAVV is asking you to display a contact. Honour the ones you care about and ignore the rest. */
export type OpenContactReason = 'DIALER_FOCUS' | 'MESSENGER_OPEN' | 'USER_CLICK';

export type OpenContact = { contactId: string; reason: OpenContactReason };

/**
 * A contact search WAVV needs answered.
 *
 * Return the matches and WAVV shows them. This is the quick path — it only works while your page is
 * open, so a user on the WAVV mobile app gets nothing. The contacts endpoint configured in the portal
 * is the one that always works, and is what we recommend once you are past the first integration.
 */
export type ContactSearch = { query: string };

export type ContactSearchHandler = (search: ContactSearch) => Contact[] | Promise<Contact[]>;

/** Error codes on a rejected SDK promise. */
export type ErrorCode = 'INVALID_TOKEN' | 'NOT_INITIALIZED' | 'INVALID_REQUEST' | 'NOT_FOUND';
