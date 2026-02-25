import type { TextProps as RNTextProps } from 'react-native';

/** TextEllipsis 组件属性 */
export interface TextEllipsisProps extends Omit<RNTextProps, 'children' | 'numberOfLines'> {
  /** 展开后的操作文本 */
  collapseText?: string;

  /** 文本内容 */
  content: string;

  /** 省略号内容 */
  dots?: string;

  /** 收起时的操作文本 */
  expandText?: string;

  /** 显示行数 */
  rows?: number;
}

/** TextEllipsis 暴露方法 */
export interface TextEllipsisRef {
  /** 切换展开/收起 */
  toggle: (expanded?: boolean) => void;
}
