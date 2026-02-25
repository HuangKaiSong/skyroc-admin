import { useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { cn } from '@skyroc/utils';
import { Cell } from '../cell/Cell';
import { Text } from '../text/Typography';
import { fieldVariants } from './field-variants';
import type { FieldAutosizeConfig, FieldProps } from './types';

const Field = (props: FieldProps) => {
  const {
    autosize,
    classNames,
    clearable = false,
    colon = false,
    disabled = false,
    error = false,
    errorMessage,
    formatter,
    formatTrigger = 'onChange',
    inputAlign = 'left',
    label,
    labelAlign = 'left',
    labelWidth,
    leftIcon,
    maxLength,
    onBlur,
    onChangeText,
    onClear,
    onFocus,
    onLeftIconPress,
    onRightIconPress,
    required = false,
    rightIcon,
    rows,
    showWordLimit = false,
    size = 'md',
    trailing,
    type = 'text',
    value = '',
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState<number | undefined>(undefined);
  const inputRef = useRef<TextInput>(null);

  const isTextarea = type === 'textarea';
  const isTopLabel = labelAlign === 'top';
  const hasBottomContent = Boolean(errorMessage) || (showWordLimit && maxLength);

  const slots = fieldVariants({ disabled, error, labelAlign, size });

  function getKeyboardType() {
    switch (type) {
      case 'number': {
        return 'decimal-pad' as const;
      }
      case 'digit': {
        return 'number-pad' as const;
      }
      case 'tel': {
        return 'phone-pad' as const;
      }
      default: {
        return 'default' as const;
      }
    }
  }

  function formatValue(val: string, trigger: 'onBlur' | 'onChange') {
    if (formatter && formatTrigger === trigger) {
      return formatter(val);
    }
    return val;
  }

  function handleChangeText(text: string) {
    const formatted = formatValue(text, 'onChange');
    onChangeText?.(formatted);
  }

  function handleFocus(e: Parameters<NonNullable<FieldProps['onFocus']>>[0]) {
    setIsFocused(true);
    onFocus?.(e);
  }

  function handleBlur(e: Parameters<NonNullable<FieldProps['onBlur']>>[0]) {
    setIsFocused(false);
    if (formatter && formatTrigger === 'onBlur') {
      const formatted = formatValue(value, 'onBlur');
      onChangeText?.(formatted);
    }
    onBlur?.(e);
  }

  function handleClear() {
    onChangeText?.('');
    onClear?.();
  }

  function handleContentSizeChange(e: { nativeEvent: { contentSize: { height: number; width: number } } }) {
    if (!isTextarea || !autosize) return;

    const { height } = e.nativeEvent.contentSize;
    const config: FieldAutosizeConfig = typeof autosize === 'object' ? autosize : {};
    let newHeight = height;

    if (config.minHeight && newHeight < config.minHeight) {
      newHeight = config.minHeight;
    }
    if (config.maxHeight && newHeight > config.maxHeight) {
      newHeight = config.maxHeight;
    }

    setTextareaHeight(newHeight);
  }

  function renderLabelContent() {
    if (!label && !leftIcon) return null;

    return (
      <View
        style={[isTopLabel ? undefined : { width: labelWidth ?? 88 }, { flexDirection: 'row', alignItems: 'center' }]}
      >
        {required ? <Text className="mr-0.5 text-destructive">*</Text> : null}
        {leftIcon ? (
          <Pressable
            className={cn(slots.leftIcon(), classNames?.leftIcon)}
            disabled={!onLeftIconPress}
            onPress={onLeftIconPress}
          >
            {leftIcon}
          </Pressable>
        ) : null}
        {label ? (
          <Text
            className={cn(slots.label(), classNames?.label)}
            numberOfLines={1}
          >
            {label}
            {colon ? '：' : ''}
          </Text>
        ) : null}
      </View>
    );
  }

  function renderClearButton() {
    if (!clearable || !value || disabled || !isFocused) return null;

    return (
      <Pressable
        className={cn(slots.clear(), classNames?.clear)}
        onPress={handleClear}
      >
        <Text className="text-xs text-muted-foreground">✕</Text>
      </Pressable>
    );
  }

  function renderRightIcon() {
    if (!rightIcon) return null;

    return (
      <Pressable
        className={cn(slots.rightIcon(), classNames?.rightIcon)}
        disabled={!onRightIconPress}
        onPress={onRightIconPress}
      >
        {rightIcon}
      </Pressable>
    );
  }

  function renderWordLimit() {
    if (!showWordLimit || !maxLength) return null;

    return (
      <Text className={cn(slots.wordLimit(), classNames?.wordLimit, 'text-right')}>
        {value.length}/{maxLength}
      </Text>
    );
  }

  function renderErrorMessage() {
    if (!errorMessage) return null;

    return <Text className={cn(slots.errorMessage(), classNames?.errorMessage)}>{errorMessage}</Text>;
  }

  function renderInput() {
    const inputStyle: Record<string, unknown> = {
      textAlign: inputAlign,
      textAlignVertical: isTextarea ? ('top' as const) : ('center' as const)
    };

    if (isTextarea && textareaHeight) {
      inputStyle.height = textareaHeight;
    }

    if (isTextarea && rows && !autosize) {
      inputStyle.height = rows * 20;
    }

    return (
      <TextInput
        ref={inputRef}
        allowFontScaling={false}
        className={cn(slots.control(), classNames?.control)}
        editable={!disabled}
        keyboardType={getKeyboardType()}
        maxLength={maxLength}
        multiline={isTextarea}
        numberOfLines={isTextarea ? rows : undefined}
        secureTextEntry={type === 'password'}
        style={inputStyle}
        value={value}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        onContentSizeChange={isTextarea && autosize ? handleContentSizeChange : undefined}
        onFocus={handleFocus}
        {...rest}
      />
    );
  }

  /** 输入区域：TextInput + 清除按钮 + 右侧图标 + 字数统计 + 错误信息 */
  function renderInputBody() {
    return (
      <>
        <View className="flex-1 flex-row items-center">
          {renderInput()}
          {renderClearButton()}
          {renderRightIcon()}
        </View>
        {renderWordLimit()}
        {renderErrorMessage()}
      </>
    );
  }

  // 顶部标签：label 和 input 都放在 Cell 的 content 区域，垂直堆叠
  if (isTopLabel) {
    const labelContent = renderLabelContent();

    return (
      <Cell
        center={false}
        classNames={{ root: classNames?.root }}
        disabled={disabled}
        size={size}
        title={
          <>
            {labelContent ? <View className="mb-2">{labelContent}</View> : null}
            {renderInputBody()}
          </>
        }
        trailing={trailing}
      />
    );
  }

  // 默认布局：label 在 Cell leading，input body 在 Cell content（flex-1）
  return (
    <Cell
      center={!isTextarea && !hasBottomContent}
      classNames={{ root: classNames?.root }}
      disabled={disabled}
      leading={renderLabelContent()}
      size={size}
      title={renderInputBody()}
      trailing={trailing}
    />
  );
};

export { Field };
