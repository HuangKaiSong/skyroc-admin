import type { ViewStyle } from 'react-native';

/** 图片源类型，支持远程 URL 对象和本地 require 资源 */
type ImageSource = { uri: string } | number;

/** 图片组件属性 */
export interface ImageProps {
  /** NativeWind 类名 */
  className?: string;

  /** 图片填充模式 */
  contentFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

  /** 图片源，支持字符串 URL 或标准 source 对象 */
  src: ImageSource | string;

  /** 自定义样式 */
  style?: ViewStyle;

  /** 过渡动画时长（毫秒） */
  transition?: number;

  /** 加载失败回调 */
  onError?: () => void;

  /** 加载完成回调 */
  onLoad?: () => void;
}

/** 带降级状态的图片组件属性 */
export interface ImageFallbackProps extends ImageProps {
  /** 加载失败时的自定义渲染 */
  errorSlot?: React.ReactNode;

  /** 加载中时的自定义渲染 */
  loadingSlot?: React.ReactNode;

  /** 是否显示加载失败占位 */
  showError?: boolean;

  /** 是否显示加载中占位 */
  showLoading?: boolean;
}
