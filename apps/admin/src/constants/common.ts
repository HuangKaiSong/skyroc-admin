import { transformRecordToOption } from '@/utils/common';

export const yesOrNoRecord: Record<Common.YesOrNo, I18n.I18nKey> = {
  N: 'common.yesOrNo.no',
  Y: 'common.yesOrNo.yes'
};

export const yesOrNoOptions = transformRecordToOption(yesOrNoRecord);
