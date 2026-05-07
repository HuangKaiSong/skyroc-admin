'use client';

import { useState } from 'react';
import styles from './phone-frame.module.css';

interface PhoneFrameProps {
  /** Height of the phone frame */
  height?: number;

  /** Source URL for the iframe */
  src: string;

  /** Title for the iframe (accessibility) */
  title?: string;
}

type DeviceType = 'android' | 'ios';

const PhoneFrame = (props: PhoneFrameProps) => {
  const { height = 667, src, title = 'Component Preview' } = props;
  const [device, setDevice] = useState<DeviceType>('ios');

  return (
    <div className={styles.container}>
      <div className={styles.switcher}>
        <button
          className={`${styles.switcherButton} ${device === 'ios' ? styles.switcherButtonActive : ''}`}
          onClick={() => setDevice('ios')}
          type="button"
        >
          iOS
        </button>
        <button
          className={`${styles.switcherButton} ${device === 'android' ? styles.switcherButtonActive : ''}`}
          onClick={() => setDevice('android')}
          type="button"
        >
          Android
        </button>
      </div>

      <div
        className={`${styles.phone} ${device === 'ios' ? styles.phoneIos : styles.phoneAndroid}`}
        style={{ height: height + 120 }}
      >
        {device === 'ios' && <div className={styles.notch} />}
        {device === 'android' && <div className={styles.statusBar} />}

        <div className={styles.screen}>
          <iframe className={styles.iframe} src={src} style={{ height }} title={title} />
        </div>

        {device === 'ios' && <div className={styles.homeBar} />}
      </div>
    </div>
  );
};

export { PhoneFrame };
