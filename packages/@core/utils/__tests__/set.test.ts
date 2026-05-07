import { describe, expect, it } from 'vitest';
import { construct, set, unset } from '../src/set';

describe('set', () => {
  it('writes nested object values immutably', () => {
    const source = { profile: { name: 'Alex' } };
    const next = set(source, 'profile.age', 18);

    expect(next).toEqual({ profile: { age: 18, name: 'Alex' } });
    expect(source).toEqual({ profile: { name: 'Alex' } });
    expect(next).not.toBe(source);
    expect(next.profile).not.toBe(source.profile);
  });

  it('creates array containers for numeric path segments', () => {
    expect(set({}, 'items[0].title', 'First')).toEqual({ items: [{ title: 'First' }] });
    expect(set(undefined, [0, 'title'], 'First')).toEqual([{ title: 'First' }]);
  });

  it('writes into existing array containers immutably', () => {
    const source = ['first'];
    const next = set(source, 1, 'second');

    expect(next).toEqual(['first', 'second']);
    expect(source).toEqual(['first']);
    expect(next).not.toBe(source);
  });

  it('returns the original object for empty paths', () => {
    const source = { profile: { name: 'Alex' } };

    expect(set(source, [], 'Next')).toBe(source);
  });

  it('blocks unsafe keys by default', () => {
    const source = { profile: { name: 'Alex' } };

    expect(set(source, '__proto__.polluted', true)).toBe(source);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it('allows unsafe keys when safeKeys is disabled', () => {
    expect(set({}, 'constructor.value', 1, { safeKeys: false })).toEqual({ constructor: { value: 1 } });
  });
});

describe('unset', () => {
  it('removes object keys immutably', () => {
    const source = { profile: { age: 18, name: 'Alex' } };
    const next = unset(source, 'profile.age');

    expect(next).toEqual({ profile: { name: 'Alex' } });
    expect(source).toEqual({ profile: { age: 18, name: 'Alex' } });
  });

  it('removes array items by index', () => {
    const source = { items: ['first', 'second'] };

    expect(unset(source, ['items', 0])).toEqual({ items: ['second'] });
  });

  it('removes nested values inside array items immutably', () => {
    const source = [{ meta: { stale: true }, title: 'First' }];
    const next = unset(source, [0, 'meta', 'stale']);

    expect(next).toEqual([{ meta: {}, title: 'First' }]);
    expect(source).toEqual([{ meta: { stale: true }, title: 'First' }]);
    expect(next).not.toBe(source);
    expect(next[0]).not.toBe(source[0]);
  });

  it('returns primitive roots unchanged when there is nothing to remove', () => {
    expect(unset(1 as any, 'profile.name')).toBe(1);
  });

  it('returns the original value for empty paths and unsafe keys', () => {
    const source = { profile: { name: 'Alex' } };

    expect(unset(source, [])).toBe(source);
    expect(unset(source, '__proto__.polluted')).toBe(source);
  });
});

describe('construct', () => {
  it('expands flat path records into nested structures', () => {
    expect(
      construct({
        'items[0].title': 'First',
        'profile.name': 'Alex'
      })
    ).toEqual({
      items: [{ title: 'First' }],
      profile: { name: 'Alex' }
    });
  });

  it('returns an empty object for nullish input', () => {
    expect(construct(null as any)).toEqual({});
  });
});
