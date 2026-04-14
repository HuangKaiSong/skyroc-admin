import { createStore } from 'jotai';
import { RESET } from 'jotai/utils';
import { describe, expect, it } from 'vitest';
import type { AtomStorage } from '../src/types';
import { createAtomWithStorage } from '../src/utils/atom-with-storage';
import { registerStorage } from '../src/utils/storage-registry';

function createMockStorage(initial?: Record<string, unknown>): AtomStorage {
  const store = new Map<string, unknown>(Object.entries(initial ?? {}));
  return {
    getItem: key => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, value),
    removeItem: key => store.delete(key)
  };
}

describe('createAtomWithStorage', () => {
  it('无已有数据时返回初始值', () => {
    const mock = createMockStorage();
    registerStorage('aws-init', mock);

    const store = createStore();
    const testAtom = createAtomWithStorage('key1', 42, { storageName: 'aws-init' });
    expect(store.get(testAtom)).toBe(42);
  });

  it('从 storage 读取已有值', () => {
    const mock = createMockStorage({ 'persisted-key': 'saved-value' });
    registerStorage('aws-read', mock);

    const store = createStore();
    const testAtom = createAtomWithStorage('persisted-key', 'default', { storageName: 'aws-read' });
    expect(store.get(testAtom)).toBe('saved-value');
  });

  it('写入值同步到 storage', () => {
    const mock = createMockStorage();
    registerStorage('aws-write', mock);

    const store = createStore();
    const testAtom = createAtomWithStorage('write-key', 'initial', { storageName: 'aws-write' });

    store.set(testAtom, 'updated');
    expect(mock.getItem('write-key')).toBe('updated');
  });

  it('直传 storage 绕过 registry', () => {
    const directMock = createMockStorage({ 'direct-key': 99 });

    const store = createStore();
    const testAtom = createAtomWithStorage('direct-key', 0, { storage: directMock });
    expect(store.get(testAtom)).toBe(99);
  });

  it('未注册的 storageName 抛出错误', () => {
    expect(() => {
      createAtomWithStorage('key', 'val', { storageName: 'nonexistent-storage' });
    }).toThrowError('[core-state] Storage "nonexistent-storage" is not registered');
  });

  it('自定义 deserialize 反序列化读取值', () => {
    const mock = createMockStorage({ 'de-key': '{"v":100}' });
    registerStorage('aws-deser', mock);

    const store = createStore();
    const testAtom = createAtomWithStorage('de-key', 0, {
      storageName: 'aws-deser',
      deserialize: str => JSON.parse(str).v as number
    });
    expect(store.get(testAtom)).toBe(100);
  });

  it('自定义 serialize 序列化写入值', () => {
    const mock = createMockStorage();
    registerStorage('aws-ser', mock);

    const store = createStore();
    const testAtom = createAtomWithStorage('ser-key', 0, {
      storageName: 'aws-ser',
      serialize: value => JSON.stringify({ v: value })
    });

    store.set(testAtom, 42);
    expect(mock.getItem('ser-key')).toBe('{"v":42}');
  });

  it('removeItem 从 storage 中删除键', () => {
    const mock = createMockStorage({ 'rm-key': 'to-delete' });
    registerStorage('aws-rm', mock);

    const store = createStore();
    const testAtom = createAtomWithStorage('rm-key', 'default', { storageName: 'aws-rm' });

    // jotai atomWithStorage uses RESET symbol to trigger removeItem
    store.set(testAtom, RESET as any);
    expect(mock.getItem('rm-key')).toBeNull();
  });
});
