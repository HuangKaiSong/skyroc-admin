import { useMemo, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { scrollTo, useAnimatedReaction, useScrollOffset } from 'react-native-reanimated';
import { FloatingButton } from '../floating-button/FloatingButton';
import { backTopVariants } from './back-top-variants';
import type { BackTopProps } from './types';

/** Default up-arrow icon drawn with border + rotation */
const ArrowUpIcon = () => {
  const { icon: iconCls } = backTopVariants();

  return <View className={iconCls()} />;
};

const BackTop = (props: BackTopProps) => {
  const {
    bottom = 128,
    children,
    className,
    immediate = false,
    offset = 200,
    onPress,
    right = 30,
    size = 40,
    target
  } = props;

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const [visible, setVisible] = useState(false);

  const scrollOffset = useScrollOffset(target);

  useAnimatedReaction(
    () => scrollOffset.value >= offset,
    (shouldShow, prev) => {
      if (shouldShow !== prev) {
        setVisible(shouldShow);
      }
    },
    [offset]
  );

  const buttonOffset = useMemo(
    () => ({
      x: windowWidth - size - right,
      y: windowHeight - size - bottom
    }),
    [windowWidth, windowHeight, size, right, bottom]
  );

  function handlePress() {
    onPress?.();
    scrollTo(target, 0, 0, !immediate);
  }

  return (
    <FloatingButton
      axis="lock"
      className={className}
      offset={buttonOffset}
      onPress={handlePress}
      size={size}
      visible={visible}
    >
      {children || <ArrowUpIcon />}
    </FloatingButton>
  );
};

export { BackTop };
