import { describe, expect, it, vi } from 'vitest';
import { createAppRequest } from '../src/request/create-request';
import type { RequestAdapter, ServiceCodes } from '../src/request/types';

function createMockAdapter(overrides: Partial<RequestAdapter> = {}): RequestAdapter {
  return {
    getCurrentPath: vi.fn(() => '/'),
    getRefreshToken: vi.fn(() => null),
    getToken: vi.fn(() => 'test-token'),
    redirectToLogin: vi.fn(),
    resetAuth: vi.fn(),
    setAuth: vi.fn(),
    showErrorMessage: vi.fn(),
    showErrorModal: vi.fn(),
    t: vi.fn((key: string) => key),
    fetchRefreshToken: vi.fn(async () => ({ token: 'new', refreshToken: 'new-r' })),
    ...overrides
  };
}

const TEST_CODES: ServiceCodes = {
  success: '0000',
  logout: ['8888'],
  modalLogout: ['7777'],
  expiredToken: ['9999']
};

describe('createAppRequest', () => {
  it('creates a request instance with state initialized', () => {
    const adapter = createMockAdapter();
    const request = createAppRequest({
      adapter,
      codes: TEST_CODES
    });

    expect(request).toBeTypeOf('function');
    expect(request.state).toBeDefined();
    expect(request.state.errMsgStack).toEqual([]);
    expect(request.state.refreshTokenPromise).toBeNull();
  });

  it('has cancelAllRequest method', () => {
    const adapter = createMockAdapter();
    const request = createAppRequest({
      adapter,
      codes: TEST_CODES
    });

    expect(request.cancelAllRequest).toBeTypeOf('function');
  });

  it('accepts custom axiosConfig', () => {
    const adapter = createMockAdapter();
    const request = createAppRequest({
      adapter,
      codes: TEST_CODES,
      axiosConfig: {
        baseURL: 'https://api.example.com',
        headers: { 'X-Custom': 'value' }
      }
    });

    expect(request).toBeTypeOf('function');
  });
});
