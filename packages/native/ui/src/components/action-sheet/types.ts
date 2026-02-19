import type { SlotClassNames } from '../../types';

/** ActionSheet 单个操作项 */
export interface ActionSheetAction {
  /** 点击后的回调函数 */
  callback?: () => void;

  /** 自定义样式类名 */
  className?: string;

  /** 文字颜色 */
  color?: string;

  /** 是否禁用 */
  disabled?: boolean;

  /** 是否显示加载状态 */
  loading?: boolean;

  /** 操作项名称 */
  name: string;

  /** 操作项描述信息 */
  subname?: string;
}

/** ActionSheet 组件可覆盖的 slot 名称 */
export type ActionSheetSlots = 'action' | 'actionName' | 'actionSubname' | 'cancel' | 'cancelGap' | 'root';

/** ActionSheet 操作面板组件属性 */
export interface ActionSheetProps {
  /** 操作项列表 */
  actions?: ActionSheetAction[];

  /** 取消按钮文字，不设置则不显示取消按钮 */
  cancelText?: string;

  /** 自定义容器样式类名 */
  className?: string;

  /** 覆盖各 slot 的类名 */
  classNames?: SlotClassNames<ActionSheetSlots>;

  /** 是否显示关闭按钮 */
  closeable?: boolean;

  /** 点击选项后是否自动关闭 */
  closeOnClickAction?: boolean;

  /** 描述信息，显示在标题下方 */
  description?: string;

  /** 取消按钮点击回调 */
  onCancel?: () => void;

  /** 选项点击回调 */
  onSelect?: (action: ActionSheetAction, index: number) => void;

  /** 显示状态变化回调 */
  onUpdateShow?: (show: boolean) => void;

  /** 是否显示面板 */
  show: boolean;

  /** 面板标题 */
  title?: string;
}

/** ActionSheet 选项选择结果 */
export interface ActionSheetResult {
  /** 选中的操作项 */
  action: ActionSheetAction;

  /** 选中项的索引 */
  index: number;
}

/** showActionSheet 函数调用选项 */
export interface ActionSheetOptions extends Omit<ActionSheetProps, 'onUpdateShow' | 'show'> {
  /** 选项选中或取消后的通用回调 */
  callback?: (result: ActionSheetResult | null) => void;
}
