import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Image, Signature, Text } from '@skyroc/native-ui';

const SignatureDemo = () => {
  const [previewUri, setPreviewUri] = useState('');

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* 基础用法 */}
      <Text className="mb-3 mt-4 px-4 text-lg font-semibold">基础用法</Text>
      <View className="px-4">
        <Signature
          onSubmit={(data) => {
            if (data.isEmpty) {
              Alert.alert('提示', '签名为空');
            } else {
              setPreviewUri(data.image);
            }
          }}
        />
        {previewUri ? (
          <View className="mt-3 items-center">
            <Text className="mb-2 text-sm text-muted-foreground">签名预览:</Text>
            <View className="h-[200px] w-full overflow-hidden rounded-lg border border-border bg-background">
              <Image
                className="h-full w-full"
                contentFit="contain"
                src={previewUri}
              />
            </View>
            <Text className="mt-1 text-xs text-muted-foreground">
              {`${Math.round(previewUri.length / 1024)}KB`}
            </Text>
          </View>
        ) : null}
      </View>

      {/* 自定义画笔 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">自定义画笔</Text>
      <View className="px-4">
        <Signature
          lineWidth={5}
          penColor="#1677ff"
          tips="蓝色粗笔签名"
        />
      </View>

      {/* 自定义背景 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">自定义背景</Text>
      <View className="px-4">
        <Signature
          backgroundColor="#f5f5f5"
          tips="灰色背景签名"
        />
      </View>

      {/* 自定义按钮文字 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">自定义按钮文字</Text>
      <View className="px-4">
        <Signature
          clearButtonText="Reset"
          confirmButtonText="Save"
          type="jpeg"
          onSubmit={(data) => {
            if (!data.isEmpty) {
              Alert.alert('Saved', 'Signature saved as JPEG');
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export { SignatureDemo };
