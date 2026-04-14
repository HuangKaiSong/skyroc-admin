import { cn } from '@skyroc/utils';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Text } from '../text/Typography';
import { toastVariants } from './toast-variants';
import type { ToastProps } from './types';

/** 内置成功图标（勾号，View + border 绘制） */
const SuccessIcon = () => {
  return (
    <View className="size-9 items-center justify-center">
      <View className="h-5 w-3 translate-x-px -translate-y-0.5 rotate-45 border-b-[2.5px] border-r-[2.5px] border-white" />
    </View>
  );
};

/** 内置失败图标（叉号，两条旋转线） */
const FailIcon = () => {
  return (
    <View className="size-9 items-center justify-center">
      <View className="absolute h-[2.5px] w-6 rotate-45 bg-white" />
      <View className="absolute h-[2.5px] w-6 -rotate-45 bg-white" />
    </View>
  );
};

const Toast = (props: ToastProps) => {
  const {
    closeOnClick = false,
    duration = 2000,
    icon,
    message,
    onClose,
    onUpdateShow,
    show = false,
    type = 'text'
  } = props;

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const hasIcon = type !== 'text' || Boolean(icon);
  const { icon: iconCls, message: messageCls, root: rootCls } = toastVariants({ hasIcon });

  const animatedStyle = useAnimatedStyle(() => ({
    alignItems: 'center' as const,
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
    width: '100%' as const
  }));

  useEffect(() => {
    if (show) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });

      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          handleClose();
        }, duration);
      }
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.8, { duration: 150 });
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [show, duration, type, message]);

  function handleClose() {
    onUpdateShow?.(false);
    onClose?.();
  }

  function handlePress() {
    if (closeOnClick) {
      handleClose();
    }
  }

  function renderIcon() {
    if (icon) {
      return <View className={iconCls()}>{icon}</View>;
    }

    switch (type) {
      case 'success': {
        return (
          <View className={iconCls()}>
            <SuccessIcon />
          </View>
        );
      }
      case 'fail': {
        return (
          <View className={iconCls()}>
            <FailIcon />
          </View>
        );
      }
      case 'loading': {
        return (
          <View className={cn(iconCls(), 'p-1')}>
            <ActivityIndicator color="#fff" size="large" />
          </View>
        );
      }
      default: {
        return null;
      }
    }
  }

  if (!show) return null;

  return (
    <Animated.View style={animatedStyle}>
      <View className={rootCls()} onTouchEnd={handlePress}>
        {renderIcon()}
        {message ? <Text className={messageCls()}>{message}</Text> : null}
      </View>
    </Animated.View>
  );
};

export { Toast };
