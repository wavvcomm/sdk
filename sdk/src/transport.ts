/**
 * Transport: get `wavv.js` onto the page, then turn calls into promises at `window.WAVV.dispatch`.
 *
 * This replaces `common/utils.ts`, which was copy-pasted byte-identically into all four of the old
 * modules. There is one copy now, and it lives in the same repository as the actions it dispatches.
 */

import { MODULE, VERSION } from './version.js';

const DEFAULT_SERVER = 'app.wavv.com';
/** How long to wait for `window.WAVV` to appear before giving up on buffered calls. */
const BOOTSTRAP_TIMEOUT = 10_000;

type WavvAction = {
	type: string;
	payload?: unknown;
	resolve: (data?: unknown) => void;
	reject: (reason?: unknown) => void;
	module: string;
	version: string;
};

type WavvGlobal = { dispatch: (action: WavvAction) => void };

declare global {
	interface Window {
		WAVV?: WavvGlobal;
	}
}

let bootstrapped = false;
let ready = false;
/** Calls made before `window.WAVV` exists. Flushed in order once it does. */
const buffer: WavvAction[] = [];

const flush = () => {
	ready = true;
	while (buffer.length) {
		const action = buffer.shift();
		if (action) window.WAVV?.dispatch(action);
	}
};

const failBuffer = (reason: string) => {
	while (buffer.length) buffer.shift()?.reject(reason);
};

/**
 * Poll for `window.WAVV`. The snippet installs it synchronously once `wavv.js` has run, so this is a
 * short wait rather than a real handshake.
 */
const waitForWavv = () => {
	const started = Date.now();
	const tick = () => {
		if (window.WAVV) {
			flush();
			return;
		}
		if (Date.now() - started > BOOTSTRAP_TIMEOUT) {
			return failBuffer('WAVV failed to load');
		}
		setTimeout(tick, 50);
	};
	tick();
};

/** Inject `wavv.js` once. Safe to call repeatedly — `init` does, on every user change. */
export const bootstrap = (server: string = DEFAULT_SERVER) => {
	if (bootstrapped) return;
	bootstrapped = true;

	if (window.WAVV) {
		flush();
		return;
	}

	const script = document.createElement('script');
	script.src = `https://${server}/wavv.js`;
	script.async = true;
	script.onerror = () => failBuffer('WAVV failed to load');
	document.head.appendChild(script);

	waitForWavv();
};

/**
 * Dispatch one action and resolve when core settles it.
 *
 * Core reads `resolve`/`reject` straight off the action and holds them against a 15 second timeout
 * (30 for `AUTH`) — see `registerPromise` in `storm-js/src/dispatch.js`. We do not add a timeout of our
 * own; two would race and the error would depend on which won.
 *
 * Core validates every payload from this module against its AJV schemas, whatever the version
 * (`transformAndValidate` in `storm-js/src/validate.js`). A payload that fails rejects with
 * 'Validation failed', and fields a schema does not list are stripped.
 */
export const dispatch = <T = void>(type: string, payload?: unknown): Promise<T> =>
	new Promise<T>((resolve, reject) => {
		const action: WavvAction = {
			type,
			payload,
			resolve: resolve as (data?: unknown) => void,
			reject,
			module: MODULE,
			version: VERSION,
		};

		if (ready && window.WAVV) return window.WAVV.dispatch(action);
		buffer.push(action);
	});

/**
 * Dispatch without waiting for a reply.
 *
 * `SET_CALLBACK` and `REMOVE_CALLBACK` register listeners and never settle, so a promise for them would
 * reject on core's 15 second timeout and surface as an unhandled rejection. Core still calls
 * `registerPromise` for every action, so we hand it no-ops to discard.
 */
export const notify = (type: string, payload?: unknown): void => {
	const action: WavvAction = {
		type,
		payload,
		resolve: () => {},
		reject: () => {},
		module: MODULE,
		version: VERSION,
	};

	if (ready && window.WAVV) {
		window.WAVV.dispatch(action);
		return;
	}
	buffer.push(action);
};

/** True once `window.WAVV` has been seen. Used to reject callback registration made too early. */
export const isReady = () => ready;
