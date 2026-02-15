import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { cn } from '../../utils/cn';
import { buttonVariants } from './button-variants';
import type { ButtonProps } from './types';

const Button = (props: ButtonProps) => {
  const {
    children,
    classNames,
    color = 'primary',
    disabled: disabledProp,
    loading = false,
    size = 'md',
    variant = 'solid',
    ...rest
  } = props;

  const isDisabled = disabledProp || loading;
  const { label, root } = buttonVariants({ color, disabled: isDisabled, size, variant });

  function renderChildren(): ReactNode {
    if (loading) {
      return <ActivityIndicator color="currentColor" size="small" />;
    }

    if (typeof children === 'string') {
      return <Text className={cn(label(), classNames?.label)}>{children}</Text>;
    }

    return children;
  }

  return (
    <Pressable
      className={cn(root(), classNames?.root)}
      disabled={isDisabled}
      {...rest}
    >
      {renderChildren()}
    </Pressable>
  );
};

export { Button };
