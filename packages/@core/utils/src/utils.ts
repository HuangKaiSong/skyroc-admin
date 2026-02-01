/**
 * - No operation
 */
export function noop() {}

/**
 * - Check if the value is null or undefined
 */
export function isNil(val: unknown): val is null | undefined {
  return val === null || val === undefined;
}
