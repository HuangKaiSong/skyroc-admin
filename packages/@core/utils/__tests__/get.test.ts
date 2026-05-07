import { describe, expect, it } from 'vitest';
import { get } from '../src/get';

describe('get', () => {
  const source = {
    items: [{ title: 'First' }],
    profile: {
      age: undefined,
      name: 'Alex',
      nullable: null
    }
  };

  it('reads nested values from dot paths and tuple paths', () => {
    expect(get(source, 'profile.name')).toBe('Alex');
    expect(get(source, ['items', 0, 'title'])).toBe('First');
  });

  it('reads array indexes from bracket paths', () => {
    expect(get(source, 'items[0].title')).toBe('First');
  });

  it('returns the default value for nullish or empty paths', () => {
    expect(get(source, null, 'fallback')).toBe('fallback');
    expect(get(source, undefined, 'fallback')).toBe('fallback');
    expect(get(source, [], 'fallback')).toBe('fallback');
  });

  it('returns the default value when the path cannot be resolved', () => {
    expect(get(source, 'profile.missing', 'fallback')).toBe('fallback');
    expect(get(source, 'profile.age', 'fallback')).toBe('fallback');
    expect(get(1, 'profile.name', 'fallback')).toBe('fallback');
  });

  it('keeps explicit null values', () => {
    expect(get(source, 'profile.nullable', 'fallback')).toBeNull();
  });
});
