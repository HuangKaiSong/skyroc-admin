import { AnimatePresence } from 'motion/react';

import { watermarkTimeFormatOptions } from '@/constants/app';
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

import AnimatedItem from '../../components/AnimatedItem';
import SettingItem from '../../components/SettingItem';

const WatermarkSettings = () => {
  const { t } = useTranslation();

  const { setSettings, setWatermarkEnableTime, setWatermarkEnableUserName, watermark } = useSettingsTheme();

  const isWatermarkTextVisible = watermark.visible && !watermark.enableUserName && !watermark.enableTime;

  const updateWatermark = (patch: Partial<typeof watermark>) => {
    setSettings({
      watermark: {
        ...watermark,
        ...patch
      }
    });
  };

  const handleVisibleChange = (visible: boolean) => {
    updateWatermark({ visible });
  };

  const handleEnableUserNameChange = (enable: boolean) => {
    setWatermarkEnableUserName(enable);
  };

  const handleEnableTimeChange = (enable: boolean) => {
    setWatermarkEnableTime(enable);
  };

  const handleTimeFormatChange = (timeFormat: string) => {
    updateWatermark({ timeFormat });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateWatermark({ text: e.target.value });
  };

  return (
    <div className="flex-col-stretch gap-12px">
      <SettingItem label={t('theme.general.watermark.visible')}>
        <ASwitch
          checked={watermark.visible}
          onChange={handleVisibleChange}
        />
      </SettingItem>

      <AnimatePresence mode="popLayout">
        <AnimatedItem
          className="flex-col-stretch gap-12px"
          itemKey="enableUserName"
          visible={watermark.visible}
        >
          <SettingItem label={t('theme.general.watermark.enableUserName')}>
            <ASwitch
              checked={watermark.enableUserName}
              onChange={handleEnableUserNameChange}
            />
          </SettingItem>
        </AnimatedItem>

        <AnimatedItem
          itemKey="enableTime"
          visible={watermark.visible}
        >
          <SettingItem label={t('theme.general.watermark.enableTime')}>
            <ASwitch
              checked={watermark.enableTime}
              onChange={handleEnableTimeChange}
            />
          </SettingItem>
        </AnimatedItem>

        <AnimatedItem
          itemKey="timeFormat"
          visible={watermark.visible && watermark.enableTime}
        >
          <SettingItem label={t('theme.general.watermark.timeFormat')}>
            <ASelect
              className="w-210px"
              options={watermarkTimeFormatOptions}
              size="small"
              value={watermark.timeFormat}
              onChange={handleTimeFormatChange}
            />
          </SettingItem>
        </AnimatedItem>

        <AnimatedItem
          itemKey="text"
          visible={isWatermarkTextVisible}
        >
          <SettingItem label={t('theme.general.watermark.text')}>
            <AInput
              className="w-120px"
              placeholder="SoybeanAdmin"
              size="small"
              value={watermark.text}
              onChange={handleTextChange}
            />
          </SettingItem>
        </AnimatedItem>
      </AnimatePresence>
    </div>
  );
};

export default WatermarkSettings;
