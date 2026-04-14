import { cn } from '@skyroc/utils';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { popupAnimationMap, popupVariants } from './popup-variants';
import type { PopupPosition, PopupProps } from './types';

/** 根据弹出位置生成 Modal 容器样式 */
function getContainerStyle(position: PopupPosition): ViewStyle {
  const base: ViewStyle = { margin: 0 };

  switch (position) {
    case 'bottom': {
      return { ...base, justifyContent: 'flex-end' };
    }
    case 'top': {
      return { ...base, justifyContent: 'flex-start' };
    }
    case 'left': {
      return { ...base, alignItems: 'flex-start' };
    }
    case 'right': {
      return { ...base, alignItems: 'flex-end' };
    }
    case 'center':
    default: {
      return { ...base, justifyContent: 'center', alignItems: 'center' };
    }
  }
}

/** 弹出层组件，封装 react-native-modal */
const Popup = (props: PopupProps) => {
  const {
    children,
    className,
    closeOnBackdropPress = true,
    duration = 300,
    animation: exAnimation,
    backdropOpacity = 0.4,
    onClosed,
    backdropColor = '#000',
    onOpened,
    onUpdateShow,
    position = 'center',
    round = false,
    show,
    ...rest
  } = props;

  const animation = popupAnimationMap[position] || exAnimation;

  function handleBackdropPress() {
    if (closeOnBackdropPress) {
      onUpdateShow?.(false);
    }
  }

  return (
    <Modal
      animationIn={animation.in}
      animationInTiming={duration}
      animationOut={animation.out}
      animationOutTiming={duration}
      backdropOpacity={backdropOpacity}
      isVisible={show}
      onBackdropPress={handleBackdropPress}
      onBackButtonPress={handleBackdropPress}
      onModalHide={onClosed}
      backdropColor={backdropColor}
      onModalShow={onOpened}
      style={getContainerStyle(position)}
      useNativeDriver
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      {...rest}
    >
      <View className={cn(popupVariants({ position, round }), className)}>{children}</View>
    </Modal>
  );
};

export { Popup };
