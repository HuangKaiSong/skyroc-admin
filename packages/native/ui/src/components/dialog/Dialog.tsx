/* eslint-disable complexity */
import { useState } from 'react';
import { View } from 'react-native';
import { cn } from '@skyroc/utils';
import { Button } from '../button/Button';
import { Divider } from '../divider/Divider';
import { Text } from '../text/Typography';
import { Popup } from '../popup/Popup';
import type { DialogAction, DialogProps } from './types';
import { dialogVariants } from './dialog-variants';

/** 对话框组件 */
const Dialog = (props: DialogProps) => {
  const {
    beforeClose,
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
    theme = 'default',
    themeDirection = 'vertical',
    title
  } = props;

  const [loading, setLoading] = useState<{ cancel: boolean; confirm: boolean }>({
    cancel: false,
    confirm: false
  });

  const hasTitle = Boolean(title);
  const slots = dialogVariants({ messageAlign, hasTitle, theme });
  const hasFooter = showCancelButton || showConfirmButton;
  const isRoundButton = theme === 'round-button';

  const isHorizontal = themeDirection === 'horizontal';

  const roundHorizontal = isRoundButton && isHorizontal;

  function handleAction(action: DialogAction) {
    if (loading.cancel || loading.confirm) return;

    if (beforeClose) {
      setLoading(prev => ({ ...prev, [action]: true }));

      const result = beforeClose(action);

      if (result instanceof Promise) {
        result
          .then(shouldClose => {
            setLoading({ cancel: false, confirm: false });
            if (shouldClose) {
              close(action);
            }
          })
          .catch(() => {
            setLoading({ cancel: false, confirm: false });
          });
      } else {
        setLoading({ cancel: false, confirm: false });
        if (result) {
          close(action);
        }
      }
    } else {
      close(action);
    }
  }

  function close(action: DialogAction) {
    onUpdateShow?.(false);
    if (action === 'confirm') {
      onConfirm?.();
    } else {
      onCancel?.();
    }
  }

  function handleCancel() {
    handleAction('cancel');
  }

  function handleConfirm() {
    handleAction('confirm');
  }

  const defaultFooter = (
    <>
      <Divider className="my-0" />
      <View className={slots.footer()}>
        {showCancelButton && (
          <Button
            className={slots.cancelButton()}
            color="muted"
            disabled={loading.confirm}
            loading={loading.cancel}
            shape="rounded"
            variant="ghost"
            onPress={handleCancel}
          >
            {cancelButtonText}
          </Button>
        )}
        {showCancelButton && showConfirmButton && (
          <Divider
            className="mx-0"
            orientation="vertical"
          />
        )}
        {showConfirmButton && (
          <Button
            className={slots.confirmButton()}
            color="primary"
            disabled={loading.cancel}
            loading={loading.confirm}
            shape="rounded"
            variant="ghost"
            onPress={handleConfirm}
          >
            {confirmButtonText}
          </Button>
        )}
      </View>
    </>
  );

  const directionClass = isHorizontal ? 'flex-row' : 'flex-col';

  const roundButtonFooter = (
    <View className={cn(slots.footer(), directionClass)}>
      {showConfirmButton && (
        <Button
          loading={loading.confirm}
          disabled={loading.cancel}
          shape="pill"
          className={roundHorizontal ? 'flex-1' : 'w-full'}
          onPress={handleConfirm}
        >
          {confirmButtonText}
        </Button>
      )}
      {showCancelButton && (
        <Button
          color="secondary"
          loading={loading.cancel}
          disabled={loading.confirm}
          shape="pill"
          className={roundHorizontal ? 'flex-1' : 'w-full'}
          variant="outline"
          onPress={handleCancel}
        >
          {cancelButtonText}
        </Button>
      )}
    </View>
  );

  return (
    <Popup
      closeOnBackdropPress={false}
      position="center"
      className="w-[80%]"
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
        {hasFooter && (isRoundButton ? roundButtonFooter : defaultFooter)}
      </View>
    </Popup>
  );
};

export { Dialog };
