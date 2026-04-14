import AntDesign from '@expo/vector-icons/AntDesign';
import { CellGroup, Field, Text } from '@skyroc/native-ui';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const FieldDemo = () => {
  const [basic, setBasic] = useState('');
  const [customType, setCustomType] = useState('');
  const [phone, setPhone] = useState('');
  const [digit, setDigit] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [textarea, setTextarea] = useState('');
  const [autosize, setAutosize] = useState('');
  const [wordLimit, setWordLimit] = useState('');
  const [clearable, setClearable] = useState('Hello');
  const [formatter, setFormatter] = useState('');
  const [blurFormatter, setBlurFormatter] = useState('');
  const [errorField, setErrorField] = useState('');
  const [errorMsg, setErrorMsg] = useState('abc');
  const [disabled] = useState('不可编辑');
  const [readonly] = useState('只读内容');
  const [leftIcon, setLeftIcon] = useState('');
  const [rightIcon, setRightIcon] = useState('');
  const [topLabel, setTopLabel] = useState('');
  const [required, setRequired] = useState('');
  const [colon, setColon] = useState('');

  function formatNoDigit(val: string) {
    return val.replace(/\d/g, '');
  }

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic Usage */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">基础用法</Text>
      <CellGroup>
        <Field label="文本" placeholder="请输入文本" value={basic} onChangeText={setBasic} />
      </CellGroup>

      {/* Custom Type */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">自定义类型</Text>
      <CellGroup>
        <Field label="文本" placeholder="请输入文本" value={customType} onChangeText={setCustomType} />
        <Field label="手机号" placeholder="请输入手机号" type="tel" value={phone} onChangeText={setPhone} />
        <Field label="整数" placeholder="请输入整数" type="digit" value={digit} onChangeText={setDigit} />
        <Field label="数字" placeholder="请输入数字" type="number" value={number} onChangeText={setNumber} />
        <Field label="密码" placeholder="请输入密码" type="password" value={password} onChangeText={setPassword} />
      </CellGroup>

      {/* Clearable */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">可清除</Text>
      <CellGroup>
        <Field clearable label="文本" placeholder="请输入文本" value={clearable} onChangeText={setClearable} />
      </CellGroup>

      {/* Format Value */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">格式化输入内容</Text>
      <CellGroup>
        <Field
          formatter={formatNoDigit}
          label="文本"
          placeholder="输入时过滤数字"
          value={formatter}
          onChangeText={setFormatter}
        />
        <Field
          formatTrigger="onBlur"
          formatter={formatNoDigit}
          label="文本"
          placeholder="失焦时过滤数字"
          value={blurFormatter}
          onChangeText={setBlurFormatter}
        />
      </CellGroup>

      {/* Textarea */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">文本域</Text>
      <CellGroup>
        <Field
          label="留言"
          placeholder="请输入留言"
          rows={3}
          type="textarea"
          value={textarea}
          onChangeText={setTextarea}
        />
      </CellGroup>

      {/* Autosize Textarea */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">自适应高度</Text>
      <CellGroup>
        <Field
          autosize
          label="留言"
          placeholder="请输入留言"
          type="textarea"
          value={autosize}
          onChangeText={setAutosize}
        />
      </CellGroup>

      {/* Word Limit */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">显示字数统计</Text>
      <CellGroup>
        <Field
          autosize
          label="留言"
          maxLength={50}
          placeholder="请输入留言"
          showWordLimit
          type="textarea"
          value={wordLimit}
          onChangeText={setWordLimit}
        />
      </CellGroup>

      {/* Error */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">错误提示</Text>
      <CellGroup>
        <Field error label="用户名" placeholder="请输入用户名" value={errorField} onChangeText={setErrorField} />
        <Field
          errorMessage="手机号格式错误"
          label="手机号"
          placeholder="请输入手机号"
          value={errorMsg}
          onChangeText={setErrorMsg}
        />
      </CellGroup>

      {/* Show Icon */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">显示图标</Text>
      <CellGroup>
        <Field
          label="文本"
          leftIcon={<AntDesign color="#999" name="smile" size={16} />}
          placeholder="显示左侧图标"
          rightIcon={<AntDesign color="#999" name="exclamation-circle" size={16} />}
          value={leftIcon}
          onChangeText={setLeftIcon}
        />
        <Field
          clearable
          label="文本"
          leftIcon={<AntDesign color="#999" name="customer-service" size={16} />}
          placeholder="显示清除图标"
          value={rightIcon}
          onChangeText={setRightIcon}
        />
      </CellGroup>

      {/* Required & Colon */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">必填星号与冒号</Text>
      <CellGroup>
        <Field colon label="用户名" placeholder="请输入用户名" required value={required} onChangeText={setRequired} />
        <Field
          colon
          label="密码"
          placeholder="请输入密码"
          required
          type="password"
          value={colon}
          onChangeText={setColon}
        />
      </CellGroup>

      {/* Label Align */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">标签对齐 - 顶部</Text>
      <CellGroup>
        <Field label="文本" labelAlign="top" placeholder="顶部对齐" value={topLabel} onChangeText={setTopLabel} />
      </CellGroup>

      {/* Disabled & Readonly */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">禁用与只读</Text>
      <CellGroup>
        <Field disabled label="禁用" value={disabled} />
        <Field disabled={false} label="只读" value={readonly} />
      </CellGroup>

      {/* Input Align */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">输入框对齐</Text>
      <View className="bg-background">
        <Field inputAlign="left" label="文本" placeholder="左对齐" value="" />
        <Field inputAlign="center" label="文本" placeholder="居中对齐" value="" />
        <Field inputAlign="right" label="文本" placeholder="右对齐" value="" />
      </View>
    </ScrollView>
  );
};

export { FieldDemo };
