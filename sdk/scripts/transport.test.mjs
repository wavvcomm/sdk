// node --test scripts/transport.test.mjs   (Node 22.18+ for default type stripping)
//
// Runs src/transport.ts directly on Node's type stripping, against a fake `window.WAVV` that records
// what reaches core and lets each test settle it. Each test imports a fresh copy, since the transport
// keeps module state the way a page does.
import assert from 'node:assert/strict';
import { register } from 'node:module';
import { test } from 'node:test';

// The sources import './version.js'; on disk it is version.ts.
register(
	`data:text/javascript,${encodeURIComponent(
		"export async function resolve(s, c, n) { try { return await n(s, c); } catch (e) { if (s.endsWith('.js')) return n(s.slice(0, -3) + '.ts', c); throw e; } }"
	)}`
);

const transportUrl = new URL('../src/transport.ts', import.meta.url).href;
let copy = 0;

/** A page: `document.head` takes scripts, `window.WAVV` is whatever the test installs. */
const page = () => {
	const scripts = [];
	globalThis.window = {};
	globalThis.document = {
		createElement: () => ({ remove() {} }),
		head: { appendChild: (el) => scripts.push(el) },
	};
	return scripts;
};

/** Core: records each action and leaves it for the test to settle. */
const fakeCore = () => {
	const sent = [];
	window.WAVV = { dispatch: (action) => sent.push(action) };
	return sent;
};

const load = async () => import(`${transportUrl}?copy=${++copy}`);
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));
const types = (sent) => sent.map((action) => action.type);

test('same user re-init resolves, and calls made during it wait until it has', async () => {
	page();
	const sent = fakeCore();
	const t = await load();

	const first = t.authenticate('AUTH', { token: 'a1' });
	await tick();
	sent[0].resolve();
	await first;

	const again = t.authenticate('AUTH', { token: 'a2' });
	const call = t.dispatch('CALL_PHONE', {});
	await tick();
	assert.deepEqual(types(sent), ['AUTH', 'AUTH'], 'the call is held while the AUTH is in flight');

	sent[1].resolve();
	await again;
	assert.deepEqual(types(sent), ['AUTH', 'AUTH', 'CALL_PHONE']);
	sent[2].resolve('ok');
	assert.equal(await call, 'ok');
});

test('a refused user switch rejects the init and the calls behind it, and later calls too', async () => {
	page();
	const sent = fakeCore();
	const t = await load();

	const first = t.authenticate('AUTH', { token: 'a' });
	await tick();
	sent[0].resolve();
	await first;

	const switched = t.authenticate('AUTH', { token: 'b' });
	const call = t.dispatch('CALL_PHONE', {});
	await tick();
	sent[1].reject(t.USER_CHANGED_RELOAD_REQUIRED);
	await assert.rejects(switched, (e) => e === t.USER_CHANGED_RELOAD_REQUIRED);
	await assert.rejects(call, (e) => e === t.USER_CHANGED_RELOAD_REQUIRED);
	await assert.rejects(t.dispatch('OPEN_MESSENGER', {}), (e) => e === t.USER_CHANGED_RELOAD_REQUIRED);
	assert.deepEqual(types(sent), ['AUTH', 'AUTH'], 'nothing ran under the old session');
});

test('two overlapping inits both settle, one AUTH at a time', async () => {
	page();
	const sent = fakeCore();
	const t = await load();

	const one = t.authenticate('AUTH', { token: '1' });
	const two = t.authenticate('AUTH', { token: '2' });
	await tick();
	assert.deepEqual(types(sent), ['AUTH'], 'the second waits for the first');

	sent[0].reject('Invalid vendor token');
	await assert.rejects(one);
	await tick();
	assert.deepEqual(types(sent), ['AUTH', 'AUTH']);
	sent[1].resolve();
	await two;
});

test('calls held across a failed AUTH reject and do not replay behind the next init', async () => {
	page();
	const sent = fakeCore();
	const t = await load();

	const early = t.dispatch('CALL_PHONE', {}); // before any init
	t.notify('SET_CALLBACK', { event: 'CALL_ENDED' });
	const failed = t.authenticate('AUTH', { token: 'expired' });
	await tick();
	sent.find((a) => a.type === 'AUTH').reject('Invalid vendor token');
	await assert.rejects(failed);
	await assert.rejects(early, (e) => e === 'Invalid vendor token');

	const retry = t.authenticate('AUTH', { token: 'fresh' });
	await tick();
	sent.filter((a) => a.type === 'AUTH')[1].resolve();
	await retry;
	assert.deepEqual(types(sent), ['SET_CALLBACK', 'AUTH', 'AUTH'], 'the listener went out; the stale call did not');
});

test('a failed load rejects what waited on it, and a later init retries the script', async () => {
	const scripts = page();
	const t = await load();

	const listener = t.notify('SET_CALLBACK', { event: 'CALL_ENDED' });
	const failed = t.authenticate('AUTH', { token: 'a' });
	const call = t.dispatch('CALL_PHONE', {});
	await tick();
	assert.equal(scripts.length, 1);
	scripts[0].onerror();
	await assert.rejects(failed, (e) => e === t.LOAD_FAILED);
	await assert.rejects(call, (e) => e === t.LOAD_FAILED);
	await assert.rejects(t.dispatch('CALL_PHONE', {}), (e) => e === t.LOAD_FAILED, 'refused, not buffered forever');
	assert.equal(listener, undefined);

	const retry = t.authenticate('AUTH', { token: 'a' });
	await tick();
	assert.equal(scripts.length, 2, 'the errored script is replaced');
	const sent = fakeCore(); // the new script ran
	await new Promise((resolve) => setTimeout(resolve, 60)); // one poll
	assert.deepEqual(types(sent), ['SET_CALLBACK', 'AUTH'], 'the listener survived the failed load');
	sent[1].resolve();
	await retry;
});
