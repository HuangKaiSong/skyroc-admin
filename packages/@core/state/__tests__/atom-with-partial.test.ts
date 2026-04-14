import { createStore } from 'jotai';
import { describe, expect, it } from 'vitest';
import { atomWithPartial } from '../src/utils/atom-with-partial';

describe('atomWithPartial', () => {
  it('返回初始值', () => {
    const store = createStore();
    const testAtom = atomWithPartial({ a: 1, b: 'hello' });
    expect(store.get(testAtom)).toEqual({ a: 1, b: 'hello' });
  });

  it('部分更新只修改指定字段', () => {
    const store = createStore();
    const testAtom = atomWithPartial({ x: 10, y: 20, z: 30 });

    store.set(testAtom, { y: 99 });
    expect(store.get(testAtom)).toEqual({ x: 10, y: 99, z: 30 });
  });

  it('多次合并累积更新', () => {
    const store = createStore();
    const testAtom = atomWithPartial({ a: 1, b: 2, c: 3 });

    store.set(testAtom, { a: 10 });
    store.set(testAtom, { c: 30 });
    expect(store.get(testAtom)).toEqual({ a: 10, b: 2, c: 30 });
  });

  it('空更新不改变引用值', () => {
    const store = createStore();
    const testAtom = atomWithPartial({ foo: 'bar' });

    const before = store.get(testAtom);
    store.set(testAtom, {});
    const after = store.get(testAtom);

    expect(after).toEqual(before);
  });
});
