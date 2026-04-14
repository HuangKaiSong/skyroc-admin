import { Slider, Text } from '@skyroc/native-ui';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const SliderDemo = () => {
  const [basicValue, setBasicValue] = useState(50);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 60]);
  const [stepValue, setStepValue] = useState(30);
  const [customValue, setCustomValue] = useState(40);
  const [verticalValue, setVerticalValue] = useState(50);
  const [dragText, setDragText] = useState('');

  function handleDragEnd(val: number | [number, number]) {
    setDragText(`Drag ended: ${Array.isArray(val) ? val.join(' - ') : val}`);
  }

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Basic</Text>
      <View className="bg-background px-4 py-4">
        <Slider value={basicValue} onChange={setBasicValue} />
        <Text className="mt-2 text-sm text-muted-foreground">Value: {basicValue}</Text>
      </View>

      {/* Range */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Range</Text>
      <View className="bg-background px-4 py-4">
        <Slider range value={rangeValue} onChange={val => setRangeValue(val as [number, number])} />
        <Text className="mt-2 text-sm text-muted-foreground">
          Value: {rangeValue[0]} - {rangeValue[1]}
        </Text>
      </View>

      {/* Step */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Step (step=10)</Text>
      <View className="bg-background px-4 py-4">
        <Slider step={10} value={stepValue} onChange={val => setStepValue(val as number)} />
        <Text className="mt-2 text-sm text-muted-foreground">Value: {stepValue}</Text>
      </View>

      {/* Custom Style */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Custom Style</Text>
      <View className="bg-background px-4 py-4">
        <Slider
          activeColor="#ee0a24"
          barHeight={4}
          buttonSize={28}
          value={customValue}
          onChange={val => setCustomValue(val as number)}
        />
        <Text className="mt-2 text-sm text-muted-foreground">Value: {customValue}</Text>
      </View>

      {/* Vertical */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Vertical</Text>
      <View className="bg-background px-4 py-4" style={{ height: 200 }}>
        <Slider vertical value={verticalValue} onChange={val => setVerticalValue(val as number)} />
        <Text className="mt-2 text-sm text-muted-foreground">Value: {verticalValue}</Text>
      </View>

      {/* Disabled */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Disabled</Text>
      <View className="bg-background px-4 py-4">
        <Slider disabled value={50} />
      </View>

      {/* Drag End Event */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Drag End Event</Text>
      <View className="bg-background px-4 py-4">
        <Slider defaultValue={50} onChangeAfterDrag={handleDragEnd} />
        {dragText ? <Text className="mt-2 text-sm text-muted-foreground">{dragText}</Text> : null}
      </View>
    </ScrollView>
  );
};

export { SliderDemo };
