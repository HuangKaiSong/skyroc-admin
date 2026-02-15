import { Text as RNText } from 'react-native';
import { cn } from '../../utils/cn';
import { textVariants } from './text-variants';
import type { TextProps } from './types';

const Typography = (props: TextProps) => {
  const { children, className, color, size, weight, ...rest } = props;

  return (
    <RNText className={cn(textVariants({ color, size, weight }), className)} {...rest}>
      {children}
    </RNText>
  );
};

export { Typography };
