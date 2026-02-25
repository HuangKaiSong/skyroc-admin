import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, CountDown, Text } from '@skyroc/native-ui';
import type { CountDownRef, CurrentTime } from '@skyroc/native-ui';

const CountDownDemo = () => {
  const countDownRef = useRef<CountDownRef>(null);
  const [manualStatus, setManualStatus] = useState<'paused' | 'running'>('paused');

  function handleStart() {
    countDownRef.current?.start();
    setManualStatus('running');
  }

  function handlePause() {
    countDownRef.current?.pause();
    setManualStatus('paused');
  }

  function handleReset() {
    countDownRef.current?.reset();
    setManualStatus('paused');
  }

  function renderCustom(current: CurrentTime) {
    return (
      <View className="flex-row items-center gap-1">
        <View className="rounded bg-primary px-1.5 py-0.5">
          <Text className="text-sm font-bold text-primary-foreground">
            {String(current.hours).padStart(2, '0')}
          </Text>
        </View>
        <Text className="text-sm font-bold text-foreground">:</Text>
        <View className="rounded bg-primary px-1.5 py-0.5">
          <Text className="text-sm font-bold text-primary-foreground">
            {String(current.minutes).padStart(2, '0')}
          </Text>
        </View>
        <Text className="text-sm font-bold text-foreground">:</Text>
        <View className="rounded bg-primary px-1.5 py-0.5">
          <Text className="text-sm font-bold text-primary-foreground">
            {String(current.seconds).padStart(2, '0')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Basic</Text>
      <View className="bg-background px-4 py-4">
        <CountDown time={30 * 60 * 60 * 1000} />
      </View>

      {/* Custom Format */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Custom Format</Text>
      <View className="bg-background px-4 py-4">
        <CountDown format="DD 天 HH 时 mm 分 ss 秒" time={30 * 60 * 60 * 1000} />
      </View>

      {/* Millisecond */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Millisecond</Text>
      <View className="bg-background px-4 py-4">
        <CountDown format="HH:mm:ss:SSS" millisecond time={30 * 60 * 60 * 1000} />
      </View>

      {/* Custom Render */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Custom Render</Text>
      <View className="bg-background px-4 py-4">
        <CountDown time={30 * 60 * 60 * 1000}>
          {renderCustom}
        </CountDown>
      </View>

      {/* Manual Control */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Manual Control</Text>
      <View className="bg-background px-4 py-4">
        <CountDown
          ref={countDownRef}
          autoStart={false}
          format="ss:SSS"
          millisecond
          time={3 * 1000}
        />
        <View className="mt-3 flex-row gap-2">
          {manualStatus === 'paused' ? (
            <Button size="sm" onPress={handleStart}>Start</Button>
          ) : (
            <Button size="sm" onPress={handlePause}>Pause</Button>
          )}
          <Button size="sm" variant="outline" onPress={handleReset}>Reset</Button>
        </View>
      </View>
    </ScrollView>
  );
};

export { CountDownDemo };
