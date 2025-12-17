import { watermarkTimeFormatOptions } from '@/constants/app';
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

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

      {watermark.visible && (
        <>
          <SettingItem label={t('theme.general.watermark.enableUserName')}>
            <ASwitch
              checked={watermark.enableUserName}
              onChange={handleEnableUserNameChange}
            />
          </SettingItem>

          <SettingItem label={t('theme.general.watermark.enableTime')}>
            <ASwitch
              checked={watermark.enableTime}
              onChange={handleEnableTimeChange}
            />
          </SettingItem>

          {watermark.enableTime && (
            <SettingItem label={t('theme.general.watermark.timeFormat')}>
              <ASelect
                className="w-210px"
                options={watermarkTimeFormatOptions}
                size="small"
                value={watermark.timeFormat}
                onChange={handleTimeFormatChange}
              />
            </SettingItem>
          )}

          {isWatermarkTextVisible && (
            <SettingItem label={t('theme.general.watermark.text')}>
              <AInput
                className="w-120px"
                placeholder="SoybeanAdmin"
                size="small"
                value={watermark.text}
                onChange={handleTextChange}
              />
            </SettingItem>
          )}
        </>
      )}
    </div>
  );
};

export default WatermarkSettings;
