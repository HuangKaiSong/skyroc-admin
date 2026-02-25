/** 滚动方向 */
export type RollingTextDirection = 'down' | 'up';

/** 停止顺序 */
export type RollingTextStopOrder = 'ltr' | 'rtl';

/** RollingText 组件属性 */
export interface RollingTextProps {
  /** 是否自动开始动画 */
  autoStart?: boolean;

  /** 自定义容器 className */
  className?: string;

  /** 滚动方向 */
  direction?: RollingTextDirection;

  /** 动画时长（毫秒） */
  duration?: number;

  /** 每个字符的高度 */
  height?: number;

  /** 目标数字 */
  targetNum?: number;

  /** 起始数字 */
  startNum?: number;

  /** 停止顺序 */
  stopOrder?: RollingTextStopOrder;

  /** 自定义文本列表（文本模式） */
  textList?: string[];
}

/** RollingText 暴露方法 */
export interface RollingTextRef {
  /** 重置动画 */
  reset: () => void;

  /** 开始动画 */
  start: () => void;
}

/** RollingTextItem 属性 */
export interface RollingTextItemProps {
  /** 动画延迟（毫秒） */
  delay: number;

  /** 滚动方向 */
  direction: RollingTextDirection;

  /** 动画时长（毫秒） */
  duration: number;

  /** 该列的字符数组 */
  figureArr: string[];

  /** 每项高度 */
  height: number;

  /** 是否正在动画 */
  isStart: boolean;
}
