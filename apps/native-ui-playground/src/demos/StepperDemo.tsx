import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Cell, CellGroup, Stepper, Text } from '@skyroc/native-ui';

const StepperDemo = () => {
  const [value, setValue] = useState(1);

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* 基础用法 */}
      <Text className="mb-3 mt-4 px-4 text-lg font-semibold">基础用法</Text>
      <CellGroup inset>
        <Cell title="默认" trailing={<Stepper defaultValue={1} />} />
      </CellGroup>

      {/* 步长设置 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">步长设置</Text>
      <CellGroup inset>
        <Cell title="步长为 2" trailing={<Stepper defaultValue={1} step={2} />} />
        <Cell title="步长 0.1 + 1 位小数" trailing={<Stepper decimalLength={1} defaultValue={1} step={0.1} />} />
      </CellGroup>

      {/* 范围限制 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">范围限制</Text>
      <CellGroup inset>
        <Cell title="min=5, max=10" trailing={<Stepper defaultValue={5} max={10} min={5} />} />
        <Cell title="只允许整数" trailing={<Stepper defaultValue={1} integer />} />
      </CellGroup>

      {/* 禁用状态 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">禁用状态</Text>
      <CellGroup inset>
        <Cell title="整体禁用" trailing={<Stepper defaultValue={1} disabled />} />
        <Cell title="禁用输入" trailing={<Stepper defaultValue={1} disableInput />} />
        <Cell title="禁用增加" trailing={<Stepper defaultValue={10} disablePlus />} />
        <Cell title="禁用减少" trailing={<Stepper defaultValue={1} disableMinus />} />
      </CellGroup>

      {/* 圆形主题 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">圆形主题</Text>
      <CellGroup inset>
        <Cell title="圆形" trailing={<Stepper defaultValue={1} theme="round" />} />
      </CellGroup>

      {/* 尺寸 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">尺寸</Text>
      <View className="gap-4 px-4">
        <View className="flex-row items-center gap-3">
          <Text className="w-6 text-sm text-muted-foreground">sm</Text>
          <Stepper defaultValue={1} size="sm" />
        </View>
        <View className="flex-row items-center gap-3">
          <Text className="w-6 text-sm text-muted-foreground">md</Text>
          <Stepper defaultValue={1} size="md" />
        </View>
        <View className="flex-row items-center gap-3">
          <Text className="w-6 text-sm text-muted-foreground">lg</Text>
          <Stepper defaultValue={1} size="lg" />
        </View>
      </View>

      {/* 受控模式 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">受控模式</Text>
      <CellGroup inset>
        <Cell title={`当前值: ${value}`} trailing={<Stepper onChange={setValue} value={value} />} />
      </CellGroup>

      {/* 异步变更 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">异步变更拦截</Text>
      <CellGroup inset>
        <Cell
          subtitle="值 > 5 时拦截"
          title="beforeChange"
          trailing={
            <Stepper
              beforeChange={async (val) => {
                return val <= 5;
              }}
              defaultValue={1}
            />
          }
        />
      </CellGroup>
    </ScrollView>
  );
};

export { StepperDemo };
