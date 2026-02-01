import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

// 扩展 dayjs 插件
dayjs.extend(duration);
dayjs.extend(relativeTime);

// 导出 dayjs 实例，方便外部使用
export { dayjs };

// ==================== 常用日期格式 ====================
export const DATE_FORMAT = {
  /** 年-月-日 */
  DATE: 'YYYY-MM-DD',
  /** 年-月-日 时:分 */
  DATE_TIME_MINUTE: 'YYYY-MM-DD HH:mm',
  /** 年-月-日 时:分:秒 */
  DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
  /** 时:分:秒 */
  TIME: 'HH:mm:ss',
  /** 时:分 */
  TIME_MINUTE: 'HH:mm',
  /** 年月 */
  MONTH: 'YYYY-MM',
  /** 年 */
  YEAR: 'YYYY',
  /** 中文日期 */
  DATE_CN: 'YYYY年MM月DD日',
  /** 中文日期时间 */
  DATE_TIME_CN: 'YYYY年MM月DD日 HH:mm:ss'
} as const;

// ==================== 日期类型 ====================
export type DateInput = string | number | Date | dayjs.Dayjs | null | undefined;

// ==================== 基础格式化函数 ====================

/**
 * 格式化日期
 * @param date 日期输入
 * @param format 格式化模板，默认 YYYY-MM-DD
 */
export function formatDate(date: DateInput, format: string = DATE_FORMAT.DATE): string {
  if (!date) return '';
  return dayjs(date).format(format);
}

/**
 * 格式化日期时间
 * @param date 日期输入
 * @param format 格式化模板，默认 YYYY-MM-DD HH:mm:ss
 */
export function formatDateTime(date: DateInput, format: string = DATE_FORMAT.DATE_TIME): string {
  if (!date) return '';
  return dayjs(date).format(format);
}

/**
 * 格式化时间
 * @param date 日期输入
 * @param format 格式化模板，默认 HH:mm:ss
 */
export function formatTime(date: DateInput, format: string = DATE_FORMAT.TIME): string {
  if (!date) return '';
  return dayjs(date).format(format);
}

// ==================== 时间戳转换 ====================

/**
 * 日期转时间戳（毫秒）
 * @param date 日期输入
 */
export function toTimestamp(date: DateInput): number {
  if (!date) return 0;
  return dayjs(date).valueOf();
}

/**
 * 日期转时间戳（秒）
 * @param date 日期输入
 */
export function toUnixTimestamp(date: DateInput): number {
  if (!date) return 0;
  return dayjs(date).unix();
}

/**
 * 时间戳转日期字符串
 * @param timestamp 时间戳（毫秒或秒）
 * @param format 格式化模板
 */
export function fromTimestamp(timestamp: number, format: string = DATE_FORMAT.DATE_TIME): string {
  if (!timestamp) return '';
  // 自动判断是秒还是毫秒
  const ts = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
  return dayjs(ts).format(format);
}

// ==================== 相对时间 ====================

/**
 * 获取相对时间描述（如：3天前、2小时后）
 * @param date 日期输入
 * @param baseDate 基准日期，默认当前时间
 */
export function fromNow(date: DateInput, baseDate?: DateInput): string {
  if (!date) return '';
  const d = dayjs(date);
  if (baseDate) {
    return d.from(dayjs(baseDate));
  }
  return d.fromNow();
}

/**
 * 获取到某个时间的相对描述（如：3天后）
 * @param date 日期输入
 * @param baseDate 基准日期，默认当前时间
 */
export function toNow(date: DateInput, baseDate?: DateInput): string {
  if (!date) return '';
  const d = dayjs(date);
  if (baseDate) {
    return d.to(dayjs(baseDate));
  }
  return d.toNow();
}

// ==================== 日期计算 ====================

/**
 * 日期加法
 * @param date 日期输入
 * @param value 增加的值
 * @param unit 单位：day/month/year/hour/minute/second
 */
export function addDate(date: DateInput, value: number, unit: dayjs.ManipulateType = 'day'): dayjs.Dayjs {
  return dayjs(date).add(value, unit);
}

/**
 * 日期减法
 * @param date 日期输入
 * @param value 减少的值
 * @param unit 单位：day/month/year/hour/minute/second
 */
export function subtractDate(date: DateInput, value: number, unit: dayjs.ManipulateType = 'day'): dayjs.Dayjs {
  return dayjs(date).subtract(value, unit);
}

/**
 * 计算两个日期之间的差值
 * @param date1 日期1
 * @param date2 日期2
 * @param unit 单位：day/month/year/hour/minute/second
 */
export function diffDate(date1: DateInput, date2: DateInput, unit: dayjs.ManipulateType = 'day'): number {
  return dayjs(date1).diff(dayjs(date2), unit);
}

// ==================== 日期边界 ====================

/**
 * 获取一天的开始时间 00:00:00
 * @param date 日期输入
 */
export function startOfDay(date: DateInput): dayjs.Dayjs {
  return dayjs(date).startOf('day');
}

/**
 * 获取一天的结束时间 23:59:59
 * @param date 日期输入
 */
export function endOfDay(date: DateInput): dayjs.Dayjs {
  return dayjs(date).endOf('day');
}

/**
 * 获取一周的开始
 * @param date 日期输入
 */
export function startOfWeek(date: DateInput): dayjs.Dayjs {
  return dayjs(date).startOf('week');
}

/**
 * 获取一周的结束
 * @param date 日期输入
 */
export function endOfWeek(date: DateInput): dayjs.Dayjs {
  return dayjs(date).endOf('week');
}

/**
 * 获取一月的开始
 * @param date 日期输入
 */
export function startOfMonth(date: DateInput): dayjs.Dayjs {
  return dayjs(date).startOf('month');
}

/**
 * 获取一月的结束
 * @param date 日期输入
 */
export function endOfMonth(date: DateInput): dayjs.Dayjs {
  return dayjs(date).endOf('month');
}

/**
 * 获取一年的开始
 * @param date 日期输入
 */
export function startOfYear(date: DateInput): dayjs.Dayjs {
  return dayjs(date).startOf('year');
}

/**
 * 获取一年的结束
 * @param date 日期输入
 */
export function endOfYear(date: DateInput): dayjs.Dayjs {
  return dayjs(date).endOf('year');
}

// ==================== 日期判断 ====================

/**
 * 判断是否为有效日期
 * @param date 日期输入
 */
export function isValidDate(date: DateInput): boolean {
  return dayjs(date).isValid();
}

/**
 * 判断日期是否在某个日期之前
 * @param date 日期输入
 * @param compareDate 比较日期
 */
export function isBefore(date: DateInput, compareDate: DateInput): boolean {
  return dayjs(date).isBefore(dayjs(compareDate));
}

/**
 * 判断日期是否在某个日期之后
 * @param date 日期输入
 * @param compareDate 比较日期
 */
export function isAfter(date: DateInput, compareDate: DateInput): boolean {
  return dayjs(date).isAfter(dayjs(compareDate));
}

/**
 * 判断两个日期是否相同
 * @param date1 日期1
 * @param date2 日期2
 * @param unit 比较精度
 */
export function isSame(date1: DateInput, date2: DateInput, unit?: dayjs.OpUnitType): boolean {
  return dayjs(date1).isSame(dayjs(date2), unit);
}

/**
 * 判断是否是今天
 * @param date 日期输入
 */
export function isToday(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), 'day');
}

/**
 * 判断是否是昨天
 * @param date 日期输入
 */
export function isYesterday(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
}

/**
 * 判断是否是明天
 * @param date 日期输入
 */
export function isTomorrow(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day');
}

// ==================== 日期范围 ====================

/**
 * 获取今天的日期范围
 */
export function getTodayRange(): [dayjs.Dayjs, dayjs.Dayjs] {
  const today = dayjs();
  return [today.startOf('day'), today.endOf('day')];
}

/**
 * 获取昨天的日期范围
 */
export function getYesterdayRange(): [dayjs.Dayjs, dayjs.Dayjs] {
  const yesterday = dayjs().subtract(1, 'day');
  return [yesterday.startOf('day'), yesterday.endOf('day')];
}

/**
 * 获取本周的日期范围
 */
export function getThisWeekRange(): [dayjs.Dayjs, dayjs.Dayjs] {
  const today = dayjs();
  return [today.startOf('week'), today.endOf('week')];
}

/**
 * 获取本月的日期范围
 */
export function getThisMonthRange(): [dayjs.Dayjs, dayjs.Dayjs] {
  const today = dayjs();
  return [today.startOf('month'), today.endOf('month')];
}

/**
 * 获取本年的日期范围
 */
export function getThisYearRange(): [dayjs.Dayjs, dayjs.Dayjs] {
  const today = dayjs();
  return [today.startOf('year'), today.endOf('year')];
}

/**
 * 获取最近 N 天的日期范围
 * @param days 天数
 */
export function getLastDaysRange(days: number): [dayjs.Dayjs, dayjs.Dayjs] {
  const today = dayjs();
  return [today.subtract(days - 1, 'day').startOf('day'), today.endOf('day')];
}

// ==================== 格式化持续时间 ====================

/**
 * 格式化持续时间（毫秒转为可读格式）
 * @param milliseconds 毫秒数
 * @param format 格式化模板
 */
export function formatDuration(milliseconds: number, format: string = 'HH:mm:ss'): string {
  return dayjs.duration(milliseconds).format(format);
}

/**
 * 获取持续时间的人性化描述
 * @param milliseconds 毫秒数
 */
export function humanizeDuration(milliseconds: number): string {
  return dayjs.duration(milliseconds).humanize();
}
