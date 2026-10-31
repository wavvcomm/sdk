/**
 * Stamped onto every dispatched action so core can log which module and version a call came from
 * (`logFunctionCall` in `storm-js/src/dispatch.js`) and decide whether to validate its payload.
 *
 * Keep `VERSION` in step with `package.json`. `scripts/check-actions.mjs` asserts they match, which is
 * cheaper than the generated file the old modules used.
 */
export const MODULE = 'sdk';
export const VERSION = '0.0.3';
