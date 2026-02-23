import type { PaginationPageItem } from './types';

const ELLIPSIS = 'ellipsis' as const;

/** 创建 [start, end] 的连续数字数组 */
function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}

/** 将数字和省略号标记转为 PaginationPageItem[] */
function transform(items: (number | string)[]): PaginationPageItem[] {
  return items.map((value): PaginationPageItem => {
    if (typeof value === 'number') {
      return { type: 'page', value };
    }
    return { type: ELLIPSIS };
  });
}

/** 计算总页数 */
function getPageCount(total: number, itemsPerPage: number): number {
  return Math.max(1, Math.ceil(total / (itemsPerPage || 1)));
}

/**
 * 根据当前页计算要显示的页码范围
 *
 * @param currentPage - 当前页码
 * @param pageCount - 总页数
 * @param siblingCount - 当前页左右兄弟数
 * @param showEdges - 是否始终显示首尾页码
 */
function getRange(currentPage: number, pageCount: number, siblingCount: number, showEdges: boolean): (number | string)[] {
  const firstPageIndex = 1;
  const lastPageIndex = pageCount;

  const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPageIndex);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPageIndex);

  if (showEdges) {
    const totalPageNumbers = Math.min(2 * siblingCount + 5, pageCount);
    const itemCount = totalPageNumbers - 2;

    const showLeftEllipsis =
      leftSiblingIndex > firstPageIndex + 2 &&
      Math.abs(lastPageIndex - itemCount - firstPageIndex + 1) > 2 &&
      Math.abs(leftSiblingIndex - firstPageIndex) > 2;

    const showRightEllipsis =
      rightSiblingIndex < lastPageIndex - 2 &&
      Math.abs(lastPageIndex - itemCount) > 2 &&
      Math.abs(lastPageIndex - rightSiblingIndex) > 2;

    if (!showLeftEllipsis && showRightEllipsis) {
      return [...range(1, itemCount), ELLIPSIS, lastPageIndex];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      return [firstPageIndex, ELLIPSIS, ...range(lastPageIndex - itemCount + 1, lastPageIndex)];
    }

    if (showLeftEllipsis && showRightEllipsis) {
      return [firstPageIndex, ELLIPSIS, ...range(leftSiblingIndex, rightSiblingIndex), ELLIPSIS, lastPageIndex];
    }

    return range(firstPageIndex, lastPageIndex);
  }

  const itemCount = siblingCount * 2 + 1;

  if (pageCount < itemCount) {
    return range(1, lastPageIndex);
  } else if (currentPage <= siblingCount + 1) {
    return range(firstPageIndex, itemCount);
  } else if (pageCount - currentPage <= siblingCount) {
    return range(pageCount - itemCount + 1, lastPageIndex);
  }

  return range(leftSiblingIndex, rightSiblingIndex);
}

export { getPageCount, getRange, transform };
