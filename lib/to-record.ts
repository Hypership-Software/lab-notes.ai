/**
 * Build a total record from a known key list.
 *
 * `Object.fromEntries` widens its keys to `string`, which loses the very thing
 * a lookup table needs: that every member of the union has an entry. The cast
 * is contained here, over keys the caller supplies, so no call site has to
 * write one of its own.
 */
export function toRecord<Key extends string, Value>(
  keys: readonly Key[],
  select: (key: Key) => Value,
): Record<Key, Value> {
  return Object.fromEntries(keys.map((key) => [key, select(key)])) as Record<
    Key,
    Value
  >
}
