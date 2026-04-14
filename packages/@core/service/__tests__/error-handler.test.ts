import { BACKEND_ERROR_CODE } from '@skyroc/axios';
import type { RequestInstance } from '@skyroc/axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';
import { backEndFail, handleError } from '../src/request/error-handler';
import type { RequestAdapter, RequestInstanceState, ServiceCodes } from '../src/request/types';

const TEST_CODES: ServiceCodes = {
  success: '0000',
  logout: ['8888'],
  modalLogout: ['7777'],
  expiredToken: ['9999']
};

function createMockAdapter(overrides: Partial<RequestAdapter> = {}): RequestAdapter {
  return {
    getCurrentPath: vi.fn(() => '/dashboard'),
    getRefreshToken: vi.fn(() => 'refresh-tok'),
    getToken: vi.fn(() => 'access-tok'),
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

function createMockRequest(stateOverrides: Partial<RequestInstanceState> = {}) {
  return {
    state: {
      errMsgStack: [],
      refreshTokenPromise: null,
      ...stateOverrides
    }
  } as unknown as RequestInstance<any, RequestInstanceState>;
}

function createMockResponse(code: string, msg = 'error') {
  return {
    data: { code, data: null, msg },
    config: { headers: {} }
  } as unknown as AxiosResponse<{ code: string | number; data: any; msg: string }>;
}

describe('backEndFail', () => {
  it('handles logout codes — shows message and redirects', async () => {
    const adapter = createMockAdapter();
    const request = createMockRequest();
    const instance = { request: vi.fn() } as any;
    const response = createMockResponse('8888');

    const result = await backEndFail(response, instance, request, adapter, TEST_CODES);

    expect(result).toBeNull();
    expect(adapter.showErrorMessage).toHaveBeenCalledWith('request.logoutMsg');
    expect(adapter.redirectToLogin).toHaveBeenCalledWith('/dashboard');
  });

  it('handles modalLogout codes — shows modal', async () => {
    const adapter = createMockAdapter();
    const request = createMockRequest();
    const instance = { request: vi.fn() } as any;
    const response = createMockResponse('7777', 'Session expired');

    const result = await backEndFail(response, instance, request, adapter, TEST_CODES);

    expect(result).toBeNull();
    expect(adapter.showErrorModal).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Session expired',
        title: 'common.error'
      })
    );
    expect(request.state.errMsgStack).toContain('Session expired');
  });

  it('skips modal if message already in stack', async () => {
    const adapter = createMockAdapter();
    const request = createMockRequest({ errMsgStack: ['Session expired'] });
    const instance = { request: vi.fn() } as any;
    const response = createMockResponse('7777', 'Session expired');

    await backEndFail(response, instance, request, adapter, TEST_CODES);

    expect(adapter.showErrorModal).not.toHaveBeenCalled();
  });

  it('handles expired token — refreshes and retries', async () => {
    const adapter = createMockAdapter();
    const request = createMockRequest();
    const retryResponse = { data: { code: '0000', data: 'ok', msg: '' } };
    const instance = { request: vi.fn().mockResolvedValue(retryResponse) } as any;
    const response = createMockResponse('9999');

    const result = await backEndFail(response, instance, request, adapter, TEST_CODES);

    expect(adapter.fetchRefreshToken).toHaveBeenCalled();
    expect(adapter.setAuth).toHaveBeenCalled();
    expect(instance.request).toHaveBeenCalledWith(response.config);
    expect(result).toBe(retryResponse);
  });

  it('returns null for unknown codes', async () => {
    const adapter = createMockAdapter();
    const request = createMockRequest();
    const instance = { request: vi.fn() } as any;
    const response = createMockResponse('1234');

    const result = await backEndFail(response, instance, request, adapter, TEST_CODES);

    expect(result).toBeNull();
  });
});

describe('handleError', () => {
  it('shows error message for regular errors', () => {
    const adapter = createMockAdapter();
    const request = createMockRequest();
    const error = { message: 'Network Error', code: 'ERR_NETWORK' } as AxiosError<any>;

    handleError(error, request, adapter, TEST_CODES);

    expect(adapter.showErrorMessage).toHaveBeenCalledWith('Network Error', expect.any(Function));
  });

  it('uses backend message for BACKEND_ERROR_CODE', () => {
    const adapter = createMockAdapter();
    const request = createMockRequest();
    const error = {
      message: 'the backend request error',
      code: BACKEND_ERROR_CODE,
      response: { data: { code: '1234', msg: 'Custom backend error' } }
    } as AxiosError<any>;

    handleError(error, request, adapter, TEST_CODES);

    expect(adapter.showErrorMessage).toHaveBeenCalledWith('Custom backend error', expect.any(Function));
  });

  it('skips message for modalLogout codes', () => {
    const adapter = createMockAdapter();
    const request = createMockRequest();
    const error = {
      message: 'error',
      code: BACKEND_ERROR_CODE,
      response: { data: { code: '7777', msg: 'modal error' } }
    } as AxiosError<any>;

    handleError(error, request, adapter, TEST_CODES);

    expect(adapter.showErrorMessage).not.toHaveBeenCalled();
  });

  it('skips message for expiredToken codes', () => {
    const adapter = createMockAdapter();
    const request = createMockRequest();
    const error = {
      message: 'error',
      code: BACKEND_ERROR_CODE,
      response: { data: { code: '9999', msg: 'token expired' } }
    } as AxiosError<any>;

    handleError(error, request, adapter, TEST_CODES);

    expect(adapter.showErrorMessage).not.toHaveBeenCalled();
  });
});
