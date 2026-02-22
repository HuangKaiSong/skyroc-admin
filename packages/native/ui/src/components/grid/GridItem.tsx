import { useContext } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { cn, isString } from '@skyroc/utils';
import { Text } from '../text/Typography';
import { GRID_BORDER_COLOR } from './constants';
import { GridContext } from './GridContext';
import { gridItemVariants } from './grid-variants';
import type { GridItemProps } from './types';

const GridItem = (props: GridItemProps) => {
  const { children, className, classNames, icon, onPress, text } = props;

  const ctx = useContext(GridContext);

  if (!ctx) {
    throw new Error('GridItem must be used within a Grid');
  }

  const { border, center, clickable, columnNum, direction, gutter, reverse, square } = ctx;

  const slots = gridItemVariants({ center, direction, reverse, square });

  const isClickable = clickable || Boolean(onPress);
  const Wrapper = isClickable ? Pressable : View;
  const wrapperProps = isClickable ? { onPress } : {};

  function renderIcon() {
    if (!icon) return null;
    return <View className={cn(slots.iconSlot(), classNames?.iconSlot)}>{icon}</View>;
  }

  function renderText() {
    if (!text) return null;
    if (isString(text)) {
      return <Text className={cn(slots.text(), classNames?.text)}>{text}</Text>;
    }
    return text;
  }

  return (
    <Wrapper
      style={[
        { width: `${100 / columnNum}%`, overflow: 'hidden' },
        gutter > 0 && { padding: gutter / 2 },
        square && { aspectRatio: 1 },
        border && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderRightWidth: StyleSheet.hairlineWidth,
          borderColor: GRID_BORDER_COLOR
        }
      ]}
      {...wrapperProps}
    >
      <View className={cn(slots.content(), className, classNames?.content)}>
        {children || (
          <>
            {renderIcon()}
            {renderText()}
          </>
        )}
      </View>
    </Wrapper>
  );
};

export { GridItem };
