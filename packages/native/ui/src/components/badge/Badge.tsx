import { cn, isNil, isNumber } from '@skyroc/utils';
import { isValidElement, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { Text, View } from 'react-native';
import { badgeVariants } from './badge-variants';
import type { BadgePosition, BadgeProps } from './types';

const positionStyles: Record<BadgePosition, ViewStyle> = {
  'top-right': {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: [{ translateX: '50%' }, { translateY: '-50%' }]
  },
  'top-left': {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
  },
  'bottom-right': {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ translateX: '50%' }, { translateY: '50%' }]
  },
  'bottom-left': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: [{ translateX: '-50%' }, { translateY: '50%' }]
  }
};

const Badge = (props: BadgeProps) => {
  const {
    badgeClassName,
    children,
    className,
    content,
    contentClassName,
    dot = false,
    max = 99,
    offset,
    position = 'top-right',
    showZero = true,
    ...rest
  } = props;

  const isStandalone = isNil(children);

  const hasContent = useMemo(() => {
    if (dot) return true;
    if (isNil(content)) return false;
    if (isNumber(content) && content === 0) return showZero;
    if (content === '') return false;
    return true;
  }, [dot, content, showZero]);

  const slots = badgeVariants();

  function getDisplayContent() {
    if (dot) return null;
    if (isNumber(content) && isNumber(max) && content > max) {
      return `${max}+`;
    }
    return content;
  }

  function getPositionStyle(): ViewStyle | undefined {
    if (isStandalone) return undefined;

    if (offset) {
      const [x, y] = offset;
      const offsetStyle: ViewStyle = { position: 'absolute' };

      if (position.includes('top')) {
        offsetStyle.top = y;
      } else {
        offsetStyle.bottom = y;
      }

      if (position.includes('right')) {
        offsetStyle.right = x;
      } else {
        offsetStyle.left = x;
      }

      return offsetStyle;
    }

    return positionStyles[position];
  }

  function renderBadgeContent() {
    const displayContent = getDisplayContent();

    return isValidElement(displayContent) ? (
      displayContent
    ) : (
      <Text className={cn('min-h-4 min-w-4 px-[3px] text-xs', slots.content(), contentClassName)}>
        {displayContent}
      </Text>
    );
  }

  function renderBadge() {
    if (!hasContent) return null;

    const posStyle = getPositionStyle();

    if (dot) {
      return (
        <View style={posStyle}>
          <View className={cn(slots.dot(), badgeClassName)} />
        </View>
      );
    }

    return (
      <View style={posStyle}>
        <View className={cn(slots.badge(), badgeClassName)}>{renderBadgeContent()}</View>
      </View>
    );
  }

  if (isStandalone) {
    return renderBadge();
  }

  return (
    <View className={cn(slots.root(), className)} {...rest}>
      {children}
      {renderBadge()}
    </View>
  );
};

export { Badge };
