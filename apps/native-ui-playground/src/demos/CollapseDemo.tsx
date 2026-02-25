import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Collapse, CollapseItem, Text } from '@skyroc/native-ui';
import type { CollapseRef } from '@skyroc/native-ui';

const CollapseDemo = () => {
  const [basicValue, setBasicValue] = useState<(number | string)[]>([]);
  const [accordionValue, setAccordionValue] = useState<number | string>('');
  const collapseRef = useRef<CollapseRef>(null);

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Basic</Text>
      <Collapse value={basicValue} onChange={val => setBasicValue(val as (number | string)[])}>
        <CollapseItem name="1" title="Title 1">
          <Text>Content of panel 1. This is the body content that will be revealed when the panel is expanded.</Text>
        </CollapseItem>
        <CollapseItem name="2" title="Title 2">
          <Text>Content of panel 2. You can put any content here including other components.</Text>
        </CollapseItem>
        <CollapseItem name="3" title="Title 3">
          <Text>Content of panel 3. Multiple panels can be open at the same time in normal mode.</Text>
        </CollapseItem>
      </Collapse>

      {/* Accordion */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Accordion</Text>
      <Collapse accordion value={accordionValue} onChange={val => setAccordionValue(val as number | string)}>
        <CollapseItem name="1" title="Title 1">
          <Text>In accordion mode, only one panel can be expanded at a time.</Text>
        </CollapseItem>
        <CollapseItem name="2" title="Title 2">
          <Text>Opening a new panel will automatically close the previous one.</Text>
        </CollapseItem>
        <CollapseItem name="3" title="Title 3">
          <Text>Click the same panel header again to close it.</Text>
        </CollapseItem>
      </Collapse>

      {/* Disabled */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Disabled</Text>
      <Collapse defaultValue={['1']}>
        <CollapseItem name="1" title="Title 1">
          <Text>This panel is expanded by default.</Text>
        </CollapseItem>
        <CollapseItem disabled name="2" title="Title 2 (Disabled)">
          <Text>This panel is disabled and cannot be toggled.</Text>
        </CollapseItem>
        <CollapseItem name="3" title="Title 3">
          <Text>This panel works normally.</Text>
        </CollapseItem>
      </Collapse>

      {/* With Value & Label */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">With Value & Label</Text>
      <Collapse>
        <CollapseItem label="Description text" name="1" title="Title" value="Value">
          <Text>Panel content with value and label displayed in the header.</Text>
        </CollapseItem>
        <CollapseItem name="2" title="Title" value="Value">
          <Text>Another panel with a value in the header.</Text>
        </CollapseItem>
      </Collapse>

      {/* Toggle All */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Toggle All</Text>
      <View className="flex-row gap-2 px-4 pb-3">
        <Button size="sm" onPress={() => collapseRef.current?.toggleAll(true)}>Expand All</Button>
        <Button size="sm" variant="outline" onPress={() => collapseRef.current?.toggleAll(false)}>Collapse All</Button>
        <Button size="sm" variant="outline" onPress={() => collapseRef.current?.toggleAll()}>Toggle All</Button>
      </View>
      <Collapse ref={collapseRef}>
        <CollapseItem name="1" title="Title 1">
          <Text>Content 1</Text>
        </CollapseItem>
        <CollapseItem name="2" title="Title 2">
          <Text>Content 2</Text>
        </CollapseItem>
        <CollapseItem name="3" title="Title 3">
          <Text>Content 3</Text>
        </CollapseItem>
      </Collapse>
    </ScrollView>
  );
};

export { CollapseDemo };
