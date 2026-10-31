#!/usr/bin/env node
/**
 * Serve the `@wavv/sdk` test harness against a running dev stack.
 *
 *   node harness/serve.mjs                       # devstorm, wallet member (user 3)
 *   WAVV_USER_ID=4 node harness/serve.mjs        # another seeded user
 *   WAVV_SERVER=qa1.wavv.com node harness/serve.mjs
 *
 * Gets the user token the way a platform's backend does. With `WAVV_PLATFORM_KEY` set it calls the
 * real `POST /v3/platform/tokens` with that master key, which is the documented path and the one worth
 * exercising. Without one it signs a vendor JWT locally with the app's API key — the older mechanism,
 * kept so the harness runs against a stack with no platform key provisioned.
 *
 * Nothing here is a secret worth protecting: these are the seeded dev credentials from
 * `cli/configs/seed.sql` and they only work against a dev stack.
 *
 * Serves `/` from this folder and `/dist/*` from the built package, so the page imports the real build
 * rather than a copy.
 */
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const HERE = dirname(fileURLToPath(import.meta.url));
const SDK = resolve(HERE, '..');
// jsonwebtoken is not a dependency of this package — the harness borrows the one already installed for
// the back-end, so running it needs no install of its own.
const jwt = require(resolve(SDK, '../back-end/node_modules/jsonwebtoken'));

const PORT = Number(process.env.PORT ?? 4321);
const SERVER = process.env.WAVV_SERVER ?? 'devstorm.wavv.com';
const USER_ID = process.env.WAVV_USER_ID ?? '3';
// Seeded TEST VENDOR wallet user. Member (3) can dial; owner (2) deliberately has no seat.
const VENDOR_ID = process.env.WAVV_VENDOR_ID ?? '00000000000000000000000000000000';
const API_KEY = process.env.WAVV_API_KEY ?? 'GXkxpyuqT9kmTdMcbn4EWUatkjTSD5H8mqRZQSEz8JCPuKThquTdmw2GGt2iVMHf';
/** An SDK key (`integration_api_keys` row scoped to an app). Set it to use the real endpoint. */
const PLATFORM_KEY = process.env.WAVV_PLATFORM_KEY;

/** The old path: sign a vendor JWT here. An hour, because nothing spends it. */
const signLocally = () => jwt.sign({ userId: USER_ID }, API_KEY, { issuer: VENDOR_ID, expiresIn: 3600 });

/** The documented path: the partner's backend exchanges its SDK key for a 60-second user token. */
const mintViaEndpoint = async () => {
	const res = await fetch(`https://${SERVER}/api/v3/tokens`, {
		method: 'POST',
		headers: { authorization: `Bearer ${PLATFORM_KEY}`, 'content-type': 'application/json' },
		body: JSON.stringify({ userId: USER_ID }),
	});
	if (!res.ok) throw new Error(`POST /v3/tokens -> ${res.status} ${await res.text()}`);
	const { token } = await res.json();
	return token;
};

const mintToken = () => (PLATFORM_KEY ? mintViaEndpoint() : Promise.resolve(signLocally()));

const TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.map': 'application/json; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
};

const send = (res, status, body, type = 'text/plain; charset=utf-8') => {
	res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' });
	res.end(body);
};

const serveFile = async (res, path) => {
	try {
		const info = await stat(path);
		if (!info.isFile()) return send(res, 404, 'not found');
		res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
		createReadStream(path).pipe(res);
	} catch {
		send(res, 404, 'not found');
	}
};

createServer(async (req, res) => {
	const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);
	const path = normalize(url.pathname);

	// What a platform's backend endpoint returns. Fresh on every call, because the real token is
	// single-use and short-lived.
	if (path === '/api/token') {
		try {
			const token = await mintToken();
			return send(res, 200, JSON.stringify({ token, server: SERVER, userId: USER_ID }), TYPES['.json']);
		} catch (err) {
			return send(res, 502, JSON.stringify({ error: String(err?.message ?? err) }), TYPES['.json']);
		}
	}

	if (path === '/' || path === '/index.html') return serveFile(res, join(HERE, 'index.html'));
	if (path.startsWith('/dist/')) return serveFile(res, join(SDK, path));

	send(res, 404, 'not found');
}).listen(PORT, () => {
	process.stdout.write(`harness on http://localhost:${PORT}  -> ${SERVER}, user ${USER_ID}\n`);
});
