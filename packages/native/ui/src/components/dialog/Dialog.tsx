import { Pressable, View } from 'react-native';
import { cn } from '@skyroc/utils';
import { Text } from '../text/Typography';
import { Popup } from '../popup/Popup';
import type { DialogProps } from './types';
import { dialogVariants } from './dialog-variants';

/** 对话框组件 */
const Dialog = (props: DialogProps) => {
  const {
    cancelButtonText = 'Cancel',
    children,
    className,
    confirmButtonText = 'Confirm',
    message,
    messageAlign = 'center',
    onCancel,
    onConfirm,
    onUpdateShow,
    show,
    showCancelButton = false,
    showConfirmButton = true,
    title
  } = props;

  const hasTitle = Boolean(title);
  const slots = dialogVariants({ messageAlign, hasTitle });
  const hasFooter = showCancelButton || showConfirmButton;

  function handleCancel() {
    onUpdateShow?.(false);
    onCancel?.();
  }

  function handleConfirm() {
    onUpdateShow?.(false);
    onConfirm?.();
  }

  return (
    <Popup
      closeOnBackdropPress={false}
      position="center"
      show={show}
      onUpdateShow={onUpdateShow}
    >
      <View className={cn(slots.root(), className)}>
        {/* Header */}
        {hasTitle && (
          <View className={slots.header()}>
            <Text className={slots.title()}>{title}</Text>
          </View>
        )}

        {/* Body */}
        <View className={slots.body()}>
          {message ? <Text className={slots.message()}>{message}</Text> : null}
          {children}
        </View>

        {/* Footer */}
        {hasFooter && (
          <>
            <View className={slots.divider()} />
            <View className={slots.footer()}>
              {showCancelButton && (
                <Pressable
                  className={slots.cancelButton()}
                  onPress={handleCancel}
                >
                  <Text className={slots.cancelButtonText()}>{cancelButtonText}</Text>
                </Pressable>
              )}
              {showCancelButton && showConfirmButton && <View className={slots.dividerVertical()} />}
              {showConfirmButton && (
                <Pressable
                  className={slots.confirmButton()}
                  onPress={handleConfirm}
                >
                  <Text className={slots.confirmButtonText()}>{confirmButtonText}</Text>
                </Pressable>
              )}
            </View>
          </>
        )}
      </View>
    </Popup>
  );
};

export { Dialog };
