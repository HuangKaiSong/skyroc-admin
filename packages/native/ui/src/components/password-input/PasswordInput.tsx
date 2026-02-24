import { useImperativeHandle } from 'react';
import { Text, View } from 'react-native';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { cn } from '@skyroc/utils';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { passwordInputVariants } from './password-input-variants';
import type { PasswordInputProps } from './types';

const PasswordInput = (props: PasswordInputProps) => {
  const {
    className,
    classNames,
    defaultValue = '',
    errorInfo,
    gutter = 0,
    info,
    length = 6,
    mask = true,
    onChange,
    onComplete,
    ref,
    size,
    value: valueProp,
    ...rest
  } = props;

  const [value = '', setValue] = useControllableState({
    caller: 'password-input',
    defaultProp: defaultValue,
    onChange,
    prop: valueProp
  });

  const blurOnFulfillRef = useBlurOnFulfill({ cellCount: length, value });
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({ setValue, value });

  const slots = passwordInputVariants({ size });

  function handleChangeText(text: string) {
    setValue(text);
    if (text.length === length) {
      onComplete?.(text);
    }
  }

  useImperativeHandle(ref, () => ({
    blur() {
      blurOnFulfillRef.current?.blur();
    },
    focus() {
      blurOnFulfillRef.current?.focus();
    }
  }));

  return (
    <View className={cn(slots.root(), className, classNames?.root)}>
      <View
        className={cn(
          slots.security(),
          !gutter && 'border border-border',
          classNames?.security
        )}
      >
        <CodeField
          ref={blurOnFulfillRef}
          {...codeFieldProps}
          {...rest}
          cellCount={length}
          rootStyle={gutter > 0 ? { gap: gutter } : undefined}
          value={value}
          onChangeText={handleChangeText}
          renderCell={({ index, isFocused, symbol }: { index: number; isFocused: boolean; symbol: string }) => {
            const hasGutter = gutter > 0;
            const isFirst = index === 0;
            const hasBorder = !isFirst && !hasGutter;

            return (
              <View
                key={index}
                className={cn(
                  slots.cell(),
                  hasGutter && 'rounded-xl border border-border',
                  hasBorder && 'border-l border-border',
                  classNames?.cell
                )}
                onLayout={getCellOnLayoutHandler(index)}
              >
                <Text
                  className='text-center text-xl text-foreground'
              >
                {symbol && mask ? '●' : null}
                {symbol && !mask ? symbol : null}
                {!symbol && isFocused ? <Cursor /> : null}
              </Text>
          </View>
            );
          }}
        />
      </View>

      {info && !errorInfo ? (
        <Text className={cn(slots.info(), classNames?.info)}>{info}</Text>
      ) : null}
      {errorInfo ? (
        <Text className={cn(slots.errorInfo(), classNames?.errorInfo)}>{errorInfo}</Text>
      ) : null}
    </View>
  );
};

export { PasswordInput };
