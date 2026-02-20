import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Switch, Text } from '@skyroc/native-ui';
import { ThemeColor } from '@skyroc/ui-types';

const COLORS = ['primary', 'destructive', 'success', 'warning', 'info', 'accent', 'carbon', 'secondary'];
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

const SwitchDemo = () => {
  const [basic, setBasic] = useState(false);
  const [controlled, setControlled] = useState(true);
  const [loading, setLoading] = useState(true);

  return (
    <ScrollView
      className="flex-1 bg-muted"
      contentContainerClassName="p-6 pb-20"
      showsVerticalScrollIndicator={false}
    >
      {/* Basic */}
      <Text className="mb-4 text-lg font-semibold">Basic</Text>
      <View className="mb-8 flex-row items-center gap-4">
        <Switch checked={basic} onCheckedChange={setBasic} />
        <Text className="text-sm text-muted-foreground">{basic ? 'ON' : 'OFF'}</Text>
      </View>

      {/* Color */}
      <Text className="mb-4 text-lg font-semibold">Color</Text>
      <View className="mb-8 gap-3">
        {COLORS.map(c => (
          <View key={c} className="flex-row items-center gap-3">
            <Switch color={c as ThemeColor} defaultChecked />
            <Text className="text-sm">{c}</Text>
          </View>
        ))}
      </View>

      {/* Size */}
      <Text className="mb-4 text-lg font-semibold">Size</Text>
      <View className="mb-8 gap-3">
        {SIZES.map(s => (
          <View key={s} className="flex-row items-center gap-3">
            <Switch defaultChecked size={s} />
            <Text className="text-sm">{s}</Text>
          </View>
        ))}
      </View>

      {/* Disabled */}
      <Text className="mb-4 text-lg font-semibold">Disabled</Text>
      <View className="mb-8 gap-3">
        <View className="flex-row items-center gap-3">
          <Switch disabled />
          <Text className="text-sm text-muted-foreground">Disabled OFF</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <Switch defaultChecked disabled />
          <Text className="text-sm text-muted-foreground">Disabled ON</Text>
        </View>
      </View>

      {/* Loading */}
      <Text className="mb-4 text-lg font-semibold">Loading</Text>
      <View className="mb-8 gap-3">
        <View className="flex-row items-center gap-3">
          <Switch checked={loading} loading onCheckedChange={setLoading} />
          <Text className="text-sm text-muted-foreground">Loading ON</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <Switch loading />
          <Text className="text-sm text-muted-foreground">Loading OFF</Text>
        </View>
      </View>

      {/* Controlled */}
      <Text className="mb-4 text-lg font-semibold">Controlled</Text>
      <View className="mb-8 gap-3">
        <View className="flex-row items-center gap-3">
          <Switch checked={controlled} onCheckedChange={setControlled} />
          <Text className="text-sm">{controlled ? 'ON' : 'OFF'}</Text>
        </View>
        <Button size="sm" onPress={() => setControlled(v => !v)}>Toggle</Button>
      </View>
    </ScrollView>
  );
};

export { SwitchDemo };
