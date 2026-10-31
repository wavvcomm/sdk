#!/usr/bin/env node
/**
 * Guard against the drift that broke the old modules.
 *
 * `sdk/src/actions.ts` restates action and event names as literals so the published package carries no
 * runtime dependency on repository internals. That freedom is only safe if something checks the values
 * still match `common/src/types.js` — otherwise we recreate the old `SettingsTab` enum, which advertised
 * 15 tabs of which 7 were dead.
 *
 * Also asserts `VERSION` matches `package.json`, since it is stamped onto every dispatched action.
 *
 * Deliberately dependency-free: `node scripts/check-actions.mjs`.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SDK = resolve(HERE, '..');
const CORE_TYPES = resolve(SDK, '../common/src/types.js');

const read = (path) => readFileSync(path, 'utf8');

/** Every `export const NAME = 'VALUE';` in common, as value -> name. */
const coreValues = new Map();
for (const [, name, value] of read(CORE_TYPES).matchAll(/export const ([A-Z0-9_]+)\s*=\s*'([^']+)'/g)) {
	coreValues.set(value, name);
}

/** String literals the SDK dispatches, gathered from actions.ts. */
const actionsSrc = read(resolve(SDK, 'src/actions.ts'));
/** TAB values are core's, but the Target names in types.ts are ours alone. */
const withoutSurface = actionsSrc;
const literals = new Set();
for (const [, value] of withoutSurface.matchAll(/^export const [A-Z0-9_]+ = '([^']+)';$/gm)) literals.add(value);
for (const [, value] of withoutSurface.matchAll(/^\t[A-Z0-9_]+: '([^']+)',$/gm)) literals.add(value);

/** Names core does not define. Some are expected — the four things core has yet to build. */
// Names this package uses that core does not define yet. Empty is the healthy state: every entry is a
// promise the published surface is making that nothing fulfils.
const EXPECTED_MISSING = new Set([]);

const missing = [...literals].filter((v) => !coreValues.has(v));
const unexpected = missing.filter((v) => !EXPECTED_MISSING.has(v));
const built = [...EXPECTED_MISSING].filter((v) => coreValues.has(v));

const pkg = JSON.parse(read(resolve(SDK, 'package.json')));
const [, declaredVersion] = read(resolve(SDK, 'src/version.ts')).match(/VERSION = '([^']+)'/) ?? [];

const problems = [];

if (unexpected.length) {
	problems.push(`Not defined in common/src/types.js:\n    ${unexpected.join('\n    ')}`);
}
if (declaredVersion !== pkg.version) {
	problems.push(`version.ts says ${declaredVersion}, package.json says ${pkg.version}`);
}

if (built.length) {
	process.stdout.write(`Core now defines: ${built.join(', ')} — drop from EXPECTED_MISSING.\n`);
}

if (problems.length) {
	process.stderr.write(`check-actions failed\n\n  ${problems.join('\n\n  ')}\n`);
	process.exit(1);
}

process.stdout.write(
	`check-actions: ${literals.size} names, ${literals.size - missing.length} matched in core, ${missing.length} pending.\n`
);
