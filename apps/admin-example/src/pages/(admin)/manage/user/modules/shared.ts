import { transformRecordToOption } from '@/utils/common';

export const userStatusRecord = {
  gender: {
    '1': 'page.manage.user.gender.male',
    '2': 'page.manage.user.gender.female'
  },
  status: {
    '1': 'page.manage.common.status.enable',
    '2': 'page.manage.common.status.disable'
  }
} as const satisfies {
  gender: Record<Api.SystemManage.UserGender, I18n.I18nKey>;
  status: Record<Api.Common.EnableStatus, I18n.I18nKey>;
};

export const userGenderOptions = transformRecordToOption(userStatusRecord.gender);

export const enableStatusOptions = transformRecordToOption(userStatusRecord.status);

export const userGenderTagColorRecord: Record<Api.SystemManage.UserGender, string> = {
  '1': 'processing',
  '2': 'error'
};

export const enableStatusTagColorRecord: Record<Api.Common.EnableStatus, string> = {
  '1': 'success',
  '2': 'error'
};

export function getUserSearchInitialParams(): Api.SystemManage.UserSearchParams {
  return {
    current: 1,
    nickName: null,
    size: 10,
    status: null,
    userEmail: null,
    userGender: null,
    userName: null,
    userPhone: null
  };
}

export function normalizeUserSearchParams(params: Api.SystemManage.UserSearchParams): Api.SystemManage.UserSearchParams {
  return {
    ...params,
    current: normalizePageParam(params.current, 1),
    nickName: normalizeNullableString(params.nickName),
    size: normalizePageParam(params.size, 10),
    status: normalizeEnableStatus(params.status),
    userEmail: normalizeNullableString(params.userEmail),
    userGender: normalizeUserGender(params.userGender),
    userName: normalizeNullableString(params.userName),
    userPhone: normalizeNullableString(params.userPhone)
  };
}

function normalizePageParam(value: number | string | null | undefined, fallback: number) {
  const nextValue = Number(value);

  if (!Number.isFinite(nextValue) || nextValue <= 0) {
    return fallback;
  }

  return nextValue;
}

function normalizeNullableString(value: string | null | undefined) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  return value;
}

function normalizeUserGender(value: Api.SystemManage.UserGender | string | null | undefined) {
  const normalized = normalizeNullableString(value);

  if (normalized === '1' || normalized === '2') {
    return normalized;
  }

  return null;
}

function normalizeEnableStatus(value: Api.Common.EnableStatus | string | null | undefined) {
  const normalized = normalizeNullableString(value);

  if (normalized === '1' || normalized === '2') {
    return normalized;
  }

  return null;
}
