import { z } from 'zod';

import { transformRecordToOption } from '@/utils/common';

const roleNullableStringSearchSchema = z
  .string()
  .nullish()
  .catch(null)
  .transform(value => value || null);

export const RoleSearchSchema = z.object({
  current: z.coerce.number().positive().catch(1).default(1),
  roleCode: roleNullableStringSearchSchema,
  roleName: roleNullableStringSearchSchema,
  size: z.coerce.number().positive().catch(10).default(10),
  status: z
    .enum(['1', '2'])
    .nullish()
    .catch(null)
    .transform(value => value ?? null)
});

export const roleStatusRecord = {
  status: {
    '1': 'page.manage.common.status.enable',
    '2': 'page.manage.common.status.disable'
  }
} as const satisfies {
  status: Record<Api.Common.EnableStatus, I18n.I18nKey>;
};

export const enableStatusOptions = transformRecordToOption(roleStatusRecord.status);

export const enableStatusTagColorRecord: Record<Api.Common.EnableStatus, string> = {
  '1': 'success',
  '2': 'error'
};

export function getRoleSearchInitialParams(): Api.SystemManage.RoleSearchParams {
  return {
    current: 1,
    roleCode: null,
    roleName: null,
    size: 10,
    status: null
  };
}

export function normalizeRoleSearchParams(
  params: Partial<Api.SystemManage.RoleSearchParams>
): Api.SystemManage.RoleSearchParams {
  return RoleSearchSchema.parse(params);
}
