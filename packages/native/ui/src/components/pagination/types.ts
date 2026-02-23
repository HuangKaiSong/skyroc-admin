import type { ReactNode } from 'react';
import type { SlotClassNames } from '../../types/shared';

/** 页码项 */
interface PageItem {
  /** 页码类型 */
  type: 'page';

  /** 页码值 */
  value: number;
}

/** 省略号项 */
interface PageEllipsis {
  /** 省略号类型 */
  type: 'ellipsis';
}

/** 分页页码项联合类型 */
type PaginationPageItem = PageEllipsis | PageItem;

/** 分页模式 */
type PaginationMode = 'multi' | 'simple';

/** 分页插槽名称 */
type PaginationSlots = 'content' | 'desc' | 'ellipsis' | 'item' | 'itemText' | 'navButton' | 'root';

/** Pagination 组件属性 */
interface PaginationProps {
  /** NativeWind className */
  className?: string;

  /** 各插槽自定义 className */
  classNames?: SlotClassNames<PaginationSlots>;

  /** 非受控默认页码 */
  defaultPage?: number;

  /** 是否禁用 */
  disabled?: boolean;

  /** 每页条数 */
  itemsPerPage?: number;

  /** 分页模式 */
  mode?: PaginationMode;

  /** 自定义下一页按钮内容 */
  nextText?: ReactNode;

  /** 页码变化回调 */
  onPageChange?: (page: number) => void;

  /** 受控当前页码 */
  page?: number;

  /** 自定义上一页按钮内容 */
  prevText?: ReactNode;

  /** 是否显示首尾页码 */
  showEdges?: boolean;

  /** 当前页码左右显示的兄弟页码数 */
  siblingCount?: number;

  /** 数据总条数 */
  totalItems?: number;
}

export type { PaginationMode, PaginationPageItem, PaginationProps, PaginationSlots };
