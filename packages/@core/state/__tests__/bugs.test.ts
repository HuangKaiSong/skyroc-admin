/**
 * Regression tests covering 4 bugs that previously existed in @skyroc/core-state.
 *
 * Each `describe` block documents the original symptom and asserts the fixed behaviour. If any of these start failing
 * again, you've reintroduced one of the bugs.
 */
import { createStore } from 'jotai';
import { describe, expect, expectTypeOf, it } from 'vitest';

import { setAtomValue, updateAtomValue } from '../src/store/global';
import type { AtomStorage } from '../src/types';
import { atomWithPartial } from '../src/utils/atom-with-partial';
import { createAtomWithStorage } from '../src/utils/atom-with-storage';
import { registerStorage } from '../src/utils/storage-registry';

describe('Bug #1 (fixed): setAtomValue / updateAtomValue 类型签名', () => {
  it('setAtomValue 的参数类型应跟随 atom 的写参数（兼容 atomWithPartial）', () => {
    const uiAtom = atomWithPartial({ mixSiderFixed: false, siderCollapse: false });

    type Args = Parameters<typeof setAtomValue<typeof uiAtom>>;
    expectTypeOf<Args[1]>().toEqualTypeOf<Parameters<typeof uiAtom.write>[2]>();

    setAtomValue(uiAtom, { siderCollapse: true });
    expect(true).toBe(true);
  });

  it('updateAtomValue 仍然只服务"写参数 = 读类型"的简单场景', () => {
    const countAtom = atomWithPartial({ value: 1 });

    setAtomValue(countAtom, prev => ({ value: prev.value + 1 }));
    expect(true).toBe(true);

    type ParamFn = Parameters<typeof updateAtomValue<number>>[1];
    expectTypeOf<ParamFn>().toEqualTypeOf<(prev: number) => number>();
  });
});

describe('Bug #2 (fixed): createAtomWithStorage 不再因序列化分歧崩模块', () => {
  it('storage 直接返回 object 时不再调用 String() / JSON.parse', () => {
    const objectStorage: AtomStorage = {
      getItem: () => ({ mode: 'dark' }),
      removeItem: () => {},
      setItem: () => {}
    };
    registerStorage('fix2-object', objectStorage);

    const store = createStore();

    expect(() => {
      const themeAtom = createAtomWithStorage('theme', { mode: 'light' }, { storageName: 'fix2-object' });
      expect(store.get(themeAtom)).toEqual({ mode: 'dark' });
    }).not.toThrow();
  });

  it('storage 抛错时降级到 initialValue，不向上传播', () => {
    const brokenStorage: AtomStorage = {
      getItem: () => {
        throw new Error('disk corrupted');
      },
      removeItem: () => {},
      setItem: () => {}
    };
    registerStorage('fix2-broken', brokenStorage);

    const store = createStore();
    const safeAtom = createAtomWithStorage('safe', { fallback: true }, { storageName: 'fix2-broken' });

    expect(store.get(safeAtom)).toEqual({ fallback: true });
  });

  it('getOnInit 选项可关闭，避免在 SSR/水合阶段读 storage', () => {
    let getCalls = 0;
    const countingStorage: AtomStorage = {
      getItem: () => {
        getCalls += 1;
        return null;
      },
      removeItem: () => {},
      setItem: () => {}
    };
    registerStorage('fix2-init', countingStorage);

    createAtomWithStorage('lazy', 'init', { getOnInit: false, storageName: 'fix2-init' });
    expect(getCalls).toBe(0);
  });
});

describe('Bug #3 (fixed): AtomStorage 接口与实现都收敛为同步', () => {
  it('AtomStorage.getItem 的返回类型不再包含 Promise', () => {
    type GetItemReturn = ReturnType<AtomStorage['getItem']>;
    expectTypeOf<GetItemReturn>().toEqualTypeOf<unknown>();
    expectTypeOf<GetItemReturn>().not.toEqualTypeOf<Promise<unknown>>();
  });
});

describe('Bug #4 (fixed): atomWithPartial 引用稳定 + 支持 updater fn', () => {
  it('空对象更新不应改变引用', () => {
    const store = createStore();
    const a = atomWithPartial({ foo: 'bar' });

    const before = store.get(a);
    store.set(a, {});
    expect(store.get(a)).toBe(before);
  });

  it('值未变的 partial 更新不应改变引用', () => {
    const store = createStore();
    const a = atomWithPartial({ mixSiderFixed: false, siderCollapse: false });

    const before = store.get(a);
    store.set(a, { siderCollapse: false });
    expect(store.get(a)).toBe(before);
  });

  it('值真正变化时正常返回新引用', () => {
    const store = createStore();
    const a = atomWithPartial({ mixSiderFixed: false, siderCollapse: false });

    const before = store.get(a);
    store.set(a, { siderCollapse: true });
    const after = store.get(a);

    expect(after).not.toBe(before);
    expect(after).toEqual({ mixSiderFixed: false, siderCollapse: true });
  });

  it('支持 updater fn 形式', () => {
    const store = createStore();
    const a = atomWithPartial({ count: 5 });

    store.set(a, prev => ({ count: prev.count * 2 }));
    expect(store.get(a)).toEqual({ count: 10 });
  });
});
