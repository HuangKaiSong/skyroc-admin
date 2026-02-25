import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import { Pressable, View } from 'react-native';
import { Text } from '../text/Typography';
import type { TextEllipsisProps, TextEllipsisRef } from './types';

const TextEllipsis = forwardRef<TextEllipsisRef, TextEllipsisProps>((props, ref) => {
  const {
    collapseText = '',
    content,
    dots = '...',
    expandText = '',
    rows = 1,
    ...rest
  } = props;

  const [expanded, setExpanded] = useState(false);
  const [hasAction, setHasAction] = useState(false);
  const truncatedRef = useRef(false);

  useImperativeHandle(ref, () => ({
    toggle: (value?: boolean) => {
      setExpanded(prev => value ?? !prev);
    },
  }));

  // 当 content 或 rows 变化时重置
  useEffect(() => {
    setExpanded(false);
    truncatedRef.current = false;
  }, [content, rows]);

  function handleTextLayout(e: NativeSyntheticEvent<TextLayoutEventData>) {
    // onTextLayout 返回所有行的信息，判断是否被截断
    const { lines } = e.nativeEvent;

    if (!expanded && lines.length >= rows) {
      // 检查文本是否实际被截断（行数达到限制）
      // 通过比较实际行数和限制行数来判断
      truncatedRef.current = true;
      setHasAction(true);
    }
  }

  function handleAction() {
    setExpanded(prev => !prev);
  }

  const showExpand = hasAction && !expanded && expandText;
  const showCollapse = hasAction && expanded && collapseText;

  return (
    <View>
      <Text
        numberOfLines={expanded ? undefined : rows}
        onTextLayout={handleTextLayout}
        {...rest}
      >
        {content}
        {!expanded && hasAction ? dots : ''}
      </Text>
      {showExpand ? (
        <Pressable onPress={handleAction}>
          <Text className="text-primary">{expandText}</Text>
        </Pressable>
      ) : null}
      {showCollapse ? (
        <Pressable onPress={handleAction}>
          <Text className="text-primary">{collapseText}</Text>
        </Pressable>
      ) : null}
    </View>
  );
});

TextEllipsis.displayName = 'TextEllipsis';

export { TextEllipsis };
