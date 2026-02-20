import { useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { cn, isNumber } from '@skyroc/utils';
import { floatingButtonVariants } from './floating-button-variants';
import type { FloatingButtonProps } from './types';

/** Movement threshold in pixels to distinguish tap from drag */
const TAP_THRESHOLD = 5;

const FloatingButton = (props: FloatingButtonProps) => {
  const {
    axis = 'y',
    children,
    className,
    gap = 24,
    magnetic,
    offset,
    onOffsetChange,
    onPress,
    size = 48,
    visible = true
  } = props;

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const gapX = isNumber(gap) ? gap : gap.x;
  const gapY = isNumber(gap) ? gap : gap.y;

  const minX = gapX;
  const maxX = windowWidth - size - gapX;
  const minY = gapY;
  const maxY = windowHeight - size - gapY;

  const defaultX = maxX;
  const defaultY = maxY - 100;

  const translateX = useSharedValue(offset?.x ?? defaultX);
  const translateY = useSharedValue(offset?.y ?? defaultY);
  const scale = useSharedValue(visible ? 1 : 0);
  const opacity = useSharedValue(1);

  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  const { root: rootCls } = floatingButtonVariants();

  useEffect(() => {
    scale.value = withSpring(visible ? 1 : 0, { damping: 15, stiffness: 200 });
  }, [visible, scale]);

  useEffect(() => {
    if (offset) {
      translateX.value = withSpring(clampValue(offset.x, minX, maxX));
      translateY.value = withSpring(clampValue(offset.y, minY, maxY));
    }
  }, [offset?.x, offset?.y, minX, maxX, minY, maxY, translateX, translateY]);

  function clampValue(value: number, min: number, max: number) {
    'worklet';
    return Math.min(Math.max(value, min), max);
  }

  function handlePress() {
    onPress?.();
  }

  function handleOffsetChange(x: number, y: number) {
    onOffsetChange?.({ x, y });
  }

  const panGesture = Gesture.Pan()
    .enabled(axis !== 'lock')
    .onBegin(() => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
      opacity.value = withTiming(0.8, { duration: 100 });
    })
    .onUpdate(event => {
      let nextX = contextX.value;
      let nextY = contextY.value;

      if (axis === 'x' || axis === 'xy') {
        nextX = contextX.value + event.translationX;
      }
      if (axis === 'y' || axis === 'xy') {
        nextY = contextY.value + event.translationY;
      }

      translateX.value = clampValue(nextX, minX, maxX);
      translateY.value = clampValue(nextY, minY, maxY);
    })
    .onEnd(event => {
      opacity.value = withTiming(1, { duration: 100 });

      const totalMovement = Math.abs(event.translationX) + Math.abs(event.translationY);

      if (totalMovement < TAP_THRESHOLD) {
        if (onPress) {
          handlePress();
        }
        return;
      }

      let finalX = translateX.value;
      let finalY = translateY.value;

      if (magnetic === 'x') {
        const midX = (minX + maxX) / 2;
        finalX = translateX.value < midX ? minX : maxX;
        translateX.value = withSpring(finalX, { damping: 15, stiffness: 200 });
      }

      if (magnetic === 'y') {
        const midY = (minY + maxY) / 2;
        finalY = translateY.value < midY ? minY : maxY;
        translateY.value = withSpring(finalY, { damping: 15, stiffness: 200 });
      }

      if (onOffsetChange) {
        handleOffsetChange(finalX, finalY);
      }
    })
    .onFinalize(() => {
      opacity.value = withTiming(1, { duration: 100 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    height: size,
    left: 0,
    opacity: opacity.value,
    position: 'absolute' as const,
    top: 0,
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
    width: size
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        pointerEvents={visible ? 'auto' : 'none'}
        style={animatedStyle}
      >
        <View className={cn(rootCls(), 'h-full w-full', className)}>{children}</View>
      </Animated.View>
    </GestureDetector>
  );
};

export { FloatingButton };
