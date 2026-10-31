# Publishing @wavv/sdk

Publishing is public and effectively permanent — npm only allows an unpublish within 72 hours, and
never reuses a version number. Follow this in order.

## 0. Core first

**Every core change a release depends on must be deployed to production before the package is
published.** The SDK talks to `app.wavv.com`; a partner who installs it before core is live hits every
bug the release was waiting on. The publish script asks you to confirm this and will not continue
without it.

The README sends integrators to **sdk.wavv.com** for documentation, so that site must be live and
covering this version too.

## 1. One-time setup

- An npm account that is a member of the `@wavv` org with publish rights (currently `steve.wavv`,
  `eli.wavv`, `raleigh.wavv`, `clintkunz28`).
- Logged in on the machine you publish from: `npm login`, then `npm whoami` to check. If your account
  has 2FA on writes, npm prompts for a one-time code during publish.

## 2. Bump the version

Set the same version in `package.json` and `src/version.ts` (`check-actions` fails if they differ), add a
line to the changelog below, and commit. Under 0.x, a breaking change bumps the minor (0.1 → 0.2);
anything else bumps the patch.

## 3. Rehearse

```sh
cd sdk
node scripts/release.mjs publish --dry-run
```

This runs every check below and `npm publish --dry-run`, without publishing or tagging. It can run from
any branch and with uncommitted changes, which it reports rather than refuses.

## 4. Publish

From `master`, with `sdk/` committed:

```sh
cd sdk
node scripts/release.mjs publish
```

The script:

1. Checks you are logged in to npm.
2. Checks you are on `master`, `sdk/` has no uncommitted changes, and the `sdk-v<version>` tag is free.
3. Checks the version is not already on npm.
4. Cleans `dist/`, runs `check-actions` (every action name still matches `common/src/types.js`), and
   compiles.
5. Inspects what `npm pack` would ship and fails on anything other than `package.json`, `README.md`,
   `LICENSE`, `dist/*.js` and `dist/*.d.ts`. The old modules shipped workspace internals; this stops a
   repeat.
6. Asks you to confirm core is deployed to production, then to type the version.
7. Runs `npm publish` (access is public via `publishConfig`).
8. Creates and pushes the `sdk-v<version>` git tag.

A bare `npm publish` also runs steps 4–5 through `prepublishOnly`, so it cannot ship an unchecked build —
but it skips the confirmations and the tag, so use the script.

## 5. Afterwards

- Check https://www.npmjs.com/package/@wavv/sdk shows the new version and README.
- The CDN copy is automatic: `https://cdn.jsdelivr.net/npm/@wavv/sdk@<version>/dist/index.js`.

## Changelog

### 0.1.0

First release: `init`, `show`, `onOpenContact`, `onContactSearch`, `dialer`, `messenger`, `callboards`.
