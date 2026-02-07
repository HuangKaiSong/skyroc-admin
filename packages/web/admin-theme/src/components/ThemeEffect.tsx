import { useEffect } from 'react';
import { useTheme } from '../hooks/use-theme';
import { toggleAuxiliaryColorModes, toggleCssDarkMode } from '../utils';

const STORAGE_KEYS = {
  darkMode: 'darkMode',
  themeColor: 'themeColor',
  themeSettings: 'themeSettings'
} as const;

/**
 * Set a value to localStorage
 */
function setStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail if storage is full or unavailable
  }
}

const ThemeEffect = () => {
  /** Theme settings */
  const { colourWeaknessMode, darkMode, grayscaleMode, settings, themeColors, updateWatermarkTimer, watermark } =
    useTheme();

  /** Cache theme settings */
  function cacheThemeSettings() {
    const isProd = import.meta.env.PROD;

    if (!isProd) return;

    setStorage(STORAGE_KEYS.themeSettings, settings);
  }

  // Cache theme settings when page is closed or refreshed
  useEffect(() => {
    function handleBeforeUnload() {
      cacheThemeSettings();
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Watch dark mode
  useEffect(() => {
    toggleCssDarkMode(darkMode);
    setStorage(STORAGE_KEYS.darkMode, darkMode);
  }, [darkMode]);

  // Watch grayscale and colour weakness modes
  useEffect(() => {
    toggleAuxiliaryColorModes(grayscaleMode, colourWeaknessMode);
  }, [grayscaleMode, colourWeaknessMode]);

  // Watch theme colors change, update storage theme color
  useEffect(() => {
    setStorage(STORAGE_KEYS.themeColor, themeColors.primary);
  }, [themeColors]);

  // Watch watermark settings to control timer
  useEffect(() => {
    updateWatermarkTimer();
  }, [watermark.visible, watermark.enableTime]);

  return null;
};

export default ThemeEffect;
