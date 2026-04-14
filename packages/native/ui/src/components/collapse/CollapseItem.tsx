import AntDesign from '@expo/vector-icons/AntDesign';
import { cn } from '@skyroc/utils';
import { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Cell } from '../cell';
import { collapseItemVariants } from './collapse-variants';
import { CollapseContext } from './CollapseContext';
import type { CollapseItemProps } from './types';

/** 动画时长 */
const DURATION = 300;

/** 全局索引计数器 */
let globalIndex = 0;

/**
 * AnimatedHeight 约定： -1 = 测量阶段（不限高、opacity 0，等 onLayout 测量） 0 = 折叠态
 *
 * > 0 = 展开中 / 已展开
 */

const CollapseItem = (props: CollapseItemProps) => {
  const {
    children,
    className,
    disabled = false,
    icon,
    isLink = true,
    label,
    lazyRender = true,
    name,
    readonly = false,
    ref,
    size = 'md',
    title,
    value
  } = props;

  const context = useContext(CollapseContext);

  // 使用 name 或稳定的自增索引
  const indexRef = useRef<number | undefined>(undefined);
  if (indexRef.current === undefined) {
    indexRef.current = globalIndex;
    globalIndex += 1;
  }
  const itemName = name ?? indexRef.current;
  const expanded = context?.isExpanded(itemName) ?? false;

  // 是否曾经展开过（用于懒渲染）
  const [hasExpanded, setHasExpanded] = useState(expanded);

  // 动画共享值
  const contentHeight = useSharedValue(0);
  const animatedHeight = useSharedValue(expanded ? -1 : 0);
  const arrowRotation = useSharedValue(expanded ? 1 : 0);
  const measuredRef = useRef(false);

  useImperativeHandle(ref, () => ({
    toggle: (val?: boolean) => {
      const newExpanded = val ?? !expanded;
      context?.toggle(itemName, newExpanded);
    }
  }));

  useEffect(() => {
    if (expanded) {
      setHasExpanded(true);
    }
  }, [expanded]);

  // 注册到父组件（用于 toggleAll）
  useEffect(() => {
    if (!context) return undefined;
    const unregister = context.register({
      disabled,
      expanded,
      name: itemName
    });
    return unregister;
  }, [context, disabled, expanded, itemName]);

  // 展开/收起动画
  useEffect(() => {
    arrowRotation.value = withTiming(expanded ? 1 : 0, { duration: DURATION });

    if (expanded) {
      if (measuredRef.current) {
        // 已测量过，直接动画到目标高度
        animatedHeight.value = withTiming(contentHeight.value, { duration: DURATION });
      } else {
        // 未测量：进入测量阶段（-1），wrapperStyle 会取消高度约束 + opacity 0
        animatedHeight.value = -1;
      }
    } else if (measuredRef.current) {
      animatedHeight.value = withTiming(0, { duration: DURATION });
    }
  }, [expanded]);

  // 核心：overflow 由 animated style 控制，测量阶段不裁切
  const wrapperStyle = useAnimatedStyle(() => {
    if (animatedHeight.value === -1) {
      // 测量阶段：不设高度、不裁切，opacity 0 用户不可见
      return { opacity: 0 };
    }
    return {
      height: animatedHeight.value,
      overflow: 'hidden' as const
    };
  });

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${arrowRotation.value * 90}deg` }]
  }));

  if (!context) {
    return null;
  }

  function handlePress() {
    if (disabled || readonly) return;
    context!.toggle(itemName, !expanded);
  }

  function handleContentLayout(e: LayoutChangeEvent) {
    const { height } = e.nativeEvent.layout;
    if (height <= 0) return;

    contentHeight.value = height;

    if (!measuredRef.current) {
      measuredRef.current = true;
      if (expanded) {
        // 首次测量且展开态：结束测量阶段，从 0 → height 动画展开
        animatedHeight.value = 0;
        animatedHeight.value = withTiming(height, { duration: DURATION });
      }
    } else if (expanded) {
      // 已展开时内容高度变化，同步更新
      animatedHeight.value = withTiming(height, { duration: DURATION });
    }
  }

  const shouldRender = lazyRender ? hasExpanded : true;
  const showArrow = isLink && !readonly;
  const slots = collapseItemVariants({ disabled, size });

  function renderArrow() {
    if (!showArrow) return undefined;
    return (
      <Animated.View style={arrowStyle}>
        <AntDesign color="#6b7280" name="down" size={12} />
      </Animated.View>
    );
  }

  return (
    <View className={cn(slots.root(), className)}>
      <Cell
        arrow={renderArrow()}
        center
        disabled={disabled}
        leading={icon}
        showArrow={showArrow}
        size={size}
        subtitle={label}
        title={title}
        trailing={value}
        onPress={handlePress}
      />

      <Animated.View className={slots.wrapper()} style={wrapperStyle}>
        {shouldRender ? (
          <View onLayout={handleContentLayout}>
            <View className={slots.content()}>{children}</View>
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
};

export { CollapseItem };
