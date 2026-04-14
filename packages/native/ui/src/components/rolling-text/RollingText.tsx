import { cn } from '@skyroc/utils';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import { RollingTextItem } from './RollingTextItem';
import type { RollingTextProps, RollingTextRef } from './types';

/** 循环圈数 */
const CIRCLE_NUM = 2;

/** 将数字转为固定长度字符数组 */
function padStart(num: number, len: number): string[] {
  return String(num).padStart(len, '0').split('');
}

/** 生成数字模式下每列的字符序列 */
function getFigureArr(startDigit: number, targetDigit: number): string[] {
  const arr: string[] = [];

  // 从 startDigit 到 9
  for (let i = startDigit; i <= 9; i++) {
    arr.push(String(i));
  }

  // 循环 CIRCLE_NUM 圈
  for (let c = 0; c < CIRCLE_NUM; c++) {
    for (let i = 0; i <= 9; i++) {
      arr.push(String(i));
    }
  }

  // 从 0 到 targetDigit
  for (let i = 0; i <= targetDigit; i++) {
    arr.push(String(i));
  }

  return arr;
}

/** 文本模式下提取每列的字符序列 */
function getTextArrByIdx(textList: string[], idx: number): string[] {
  return textList.map(str => str[idx] || '');
}

const RollingText = forwardRef<RollingTextRef, RollingTextProps>((props, ref) => {
  const {
    autoStart = true,
    className,
    direction = 'down',
    duration = 2000,
    height = 40,
    startNum = 0,
    stopOrder = 'ltr',
    targetNum = 0,
    textList = []
  } = props;

  const [rolling, setRolling] = useState(false);
  const isTextMode = Array.isArray(textList) && textList.length > 0;

  useImperativeHandle(ref, () => ({
    reset: () => {
      setRolling(false);
      if (autoStart) {
        // 下一帧重新启动
        requestAnimationFrame(() => {
          setRolling(true);
        });
      }
    },
    start: () => {
      setRolling(true);
    }
  }));

  useEffect(() => {
    if (autoStart) {
      setRolling(true);
    }
  }, [autoStart]);

  // 计算列数和每列的数据
  let columns: { delay: number; figureArr: string[] }[];

  if (isTextMode) {
    const len = textList[0]?.length || 0;
    columns = Array.from({ length: len }, (_, i) => ({
      delay: getDelay(i, len),
      figureArr: getTextArrByIdx(textList, i)
    }));
  } else {
    const targetStr = String(targetNum);
    const startStr = String(startNum);
    const len = Math.max(targetStr.length, startStr.length);
    const startDigits = padStart(startNum, len);
    const targetDigits = padStart(targetNum, len);

    columns = Array.from({ length: len }, (_, i) => ({
      delay: getDelay(i, len),
      figureArr: getFigureArr(Number(startDigits[i]), Number(targetDigits[i]))
    }));
  }

  function getDelay(i: number, len: number): number {
    if (stopOrder === 'ltr') {
      return 200 * i;
    }
    return 200 * (len - 1 - i);
  }

  return (
    <View className={cn('flex-row items-center', className)}>
      {columns.map((col, i) => (
        <RollingTextItem
          key={i}
          delay={col.delay}
          direction={direction}
          duration={duration}
          figureArr={col.figureArr}
          height={height}
          isStart={rolling}
        />
      ))}
    </View>
  );
});

RollingText.displayName = 'RollingText';

export { RollingText };
