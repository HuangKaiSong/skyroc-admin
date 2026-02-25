import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { Text } from '../text/Typography';
import type { RollingTextItemProps } from './types';

/** 单列滚动项 */
const RollingTextItem = (props: RollingTextItemProps) => {
  const {
    delay,
    direction,
    duration,
    figureArr,
    height,
    isStart,
  } = props;

  const animValue = useRef(new Animated.Value(0)).current;

  // 计算滚动的总距离
  const totalItems = figureArr.length;
  const totalHeight = (totalItems - 1) * height;

  useEffect(() => {
    if (isStart) {
      // 根据方向设置起始和结束位置
      const fromValue = direction === 'down' ? -totalHeight : 0;
      const toValue = direction === 'down' ? 0 : -totalHeight;

      animValue.setValue(fromValue);

      Animated.timing(animValue, {
        delay,
        duration,
        toValue,
        useNativeDriver: true,
      }).start();
    } else {
      // 重置到初始位置
      const fromValue = direction === 'down' ? -totalHeight : 0;
      animValue.setValue(fromValue);
    }
  }, [isStart, direction, totalHeight, delay, duration]);

  // direction 为 down 时反转数组，使最终值在底部
  const displayArr = direction === 'down' ? [...figureArr].reverse() : figureArr;

  return (
    <View style={{ height, overflow: 'hidden' }}>
      <Animated.View style={{ transform: [{ translateY: animValue }] }}>
        {displayArr.map((figure, index) => (
          <View
            key={`${figure}-${index}`}
            style={{ alignItems: 'center', height, justifyContent: 'center' }}
          >
            <Text className="text-lg font-medium text-foreground">{figure}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export { RollingTextItem };
