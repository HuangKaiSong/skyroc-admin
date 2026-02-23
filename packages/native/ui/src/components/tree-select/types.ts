import type { ReactNode } from 'react';
import type { SlotClassNames } from '../../types/shared';

/** 子项数据 */
interface TreeSelectChild {
  /** 是否禁用 */
  disabled?: boolean;

  /** 唯一标识 */
  id: number | string;

  /** 显示文本 */
  text: string;
}

/** 分组数据 */
interface TreeSelectItem {
  /** 徽标内容 */
  badge?: ReactNode;

  /** 子项列表 */
  children?: TreeSelectChild[];

  /** 是否禁用 */
  disabled?: boolean;

  /** 是否显示小红点 */
  dot?: boolean;

  /** 显示文本 */
  text: string;
}

/** 插槽名称 */
type TreeSelectSlots = 'content' | 'contentItem' | 'contentItemText' | 'root' | 'selectedIcon';

/** 选中值的合法类型 */
type TreeSelectActiveId = number | string | (number | string)[];

/** TreeSelect 组件属性 */
interface TreeSelectProps<T extends TreeSelectActiveId = TreeSelectActiveId> {
  /** 选中的子项 ID（单选传值，多选传数组） */
  activeId?: T;

  /** 各插槽自定义 className */
  classNames?: SlotClassNames<TreeSelectSlots>;

  /** 默认选中的子项 ID */
  defaultActiveId?: T;

  /** 默认激活的左侧导航索引 */
  defaultMainActiveIndex?: number;

  /** 组件高度 */
  height?: number;

  /** 分组数据 */
  items?: TreeSelectItem[];

  /** 激活的左侧导航索引 */
  mainActiveIndex?: number;

  /** 多选时最大可选数量 */
  max?: number;

  /** 选中子项变化回调 */
  onActiveIdChange?: (activeId: T) => void;

  /** 点击子项回调 */
  onClickItem?: (item: TreeSelectChild) => void;

  /** 点击左侧导航回调 */
  onClickNav?: (index: number) => void;

  /** 左侧导航激活索引变化回调 */
  onMainActiveIndexChange?: (index: number) => void;

  /** 自定义右侧内容 */
  renderContent?: () => ReactNode;
}

export type { TreeSelectActiveId, TreeSelectChild, TreeSelectItem, TreeSelectProps, TreeSelectSlots };
