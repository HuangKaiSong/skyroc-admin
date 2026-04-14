import { cn } from '@skyroc/utils';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { Divider } from '../divider/Divider';
import { Sheet } from '../sheet/Sheet';
import { Text } from '../text/Typography';
import { actionSheetVariants } from './action-sheet-variants';
import type { ActionSheetAction, ActionSheetProps } from './types';

/** 操作面板组件 */
const ActionSheet = (props: ActionSheetProps) => {
  const {
    actions = [],
    cancelText,
    className,
    classNames,
    closeable = true,
    closeOnClickAction = false,
    description,
    onCancel,
    onSelect,
    onUpdateShow,
    show,
    title
  } = props;

  const slots = actionSheetVariants();

  function handleSelect(action: ActionSheetAction, index: number) {
    if (action.disabled || action.loading) return;

    action.callback?.();
    onSelect?.(action, index);

    if (closeOnClickAction) {
      onUpdateShow?.(false);
    }
  }

  function handleCancel() {
    onCancel?.();
    onUpdateShow?.(false);
  }

  function renderAction(action: ActionSheetAction, index: number) {
    const itemSlots = actionSheetVariants({
      disabled: action.disabled,
      loading: action.loading
    });

    return (
      <View key={index}>
        {index > 0 && <Divider className="my-0" />}
        <Pressable
          className={cn(itemSlots.action(), action.className, classNames?.action)}
          disabled={action.disabled || action.loading}
          onPress={() => handleSelect(action, index)}
        >
          {action.loading ? (
            <ActivityIndicator className="text-muted-foreground" size="small" />
          ) : (
            <>
              <Text className={cn(slots.actionName(), classNames?.actionName)}>
                <Text style={{ color: action.color }}>{action.name}</Text>
              </Text>
              {action.subname ? (
                <Text className={cn(slots.actionSubname(), classNames?.actionSubname)}>{action.subname}</Text>
              ) : null}
            </>
          )}
        </Pressable>
      </View>
    );
  }

  return (
    <Sheet closeable={closeable} description={description} show={show} title={title} onUpdateShow={onUpdateShow}>
      <View className={cn(slots.root(), className)}>
        {/* Actions */}
        {actions.map((action, index) => renderAction(action, index))}

        {/* Cancel */}
        {cancelText ? (
          <>
            <View className={cn(slots.cancelGap(), classNames?.cancelGap)} />
            <Pressable className={cn(slots.cancel(), classNames?.cancel)} onPress={handleCancel}>
              <Text className="text-base text-foreground">{cancelText}</Text>
            </Pressable>
          </>
        ) : null}
      </View>
    </Sheet>
  );
};

export { ActionSheet };
