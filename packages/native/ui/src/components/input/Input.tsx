import { TextInput, View } from 'react-native';
import { cn } from '../../utils/cn';
import { inputVariants } from './input-variants';
import type { InputProps } from './types';

const Input = (props: InputProps) => {
  const {
    classNames,
    disabled = false,
    error,
    leading,
    size = 'md',
    trailing,
    variant = 'outline',
    ...rest
  } = props;

  const { input, root } = inputVariants({ disabled, error, size, variant });

  return (
    <View className={cn(root(), classNames?.root)}>
      {leading}
      <TextInput
        className={cn(input(), classNames?.input)}
        editable={!disabled}
        {...rest}
      />
      {trailing}
    </View>
  );
};

export { Input };
