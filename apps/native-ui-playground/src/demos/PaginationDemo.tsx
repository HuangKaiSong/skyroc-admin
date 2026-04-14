import { Pagination, Text } from '@skyroc/native-ui';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const PaginationDemo = () => {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="p-6 pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic */}
      <Text className="mb-4 text-lg font-semibold">Basic</Text>
      <View className="mb-8 rounded-2xl bg-background p-4">
        <Pagination page={page1} totalItems={50} onPageChange={setPage1} />
        <Text className="mt-3 text-center text-sm text-muted-foreground">Page: {page1}</Text>
      </View>

      {/* Show Edges */}
      <Text className="mb-4 text-lg font-semibold">Show Edges</Text>
      <View className="mb-8 rounded-2xl bg-background p-4">
        <Pagination page={page2} showEdges totalItems={100} onPageChange={setPage2} />
      </View>

      {/* Simple Mode */}
      <Text className="mb-4 text-lg font-semibold">Simple Mode</Text>
      <View className="mb-8 rounded-2xl bg-background p-4">
        <Pagination mode="simple" page={page3} totalItems={80} onPageChange={setPage3} />
      </View>

      {/* Custom Text */}
      <Text className="mb-4 text-lg font-semibold">Custom Text</Text>
      <View className="mb-8 rounded-2xl bg-background p-4">
        <Pagination defaultPage={3} nextText="下一页" prevText="上一页" totalItems={60} />
      </View>

      {/* Disabled */}
      <Text className="mb-4 text-lg font-semibold">Disabled</Text>
      <View className="mb-8 rounded-2xl bg-background p-4">
        <Pagination defaultPage={3} disabled totalItems={50} />
      </View>

      {/* Many Pages */}
      <Text className="mb-4 text-lg font-semibold">Many Pages (siblingCount=2)</Text>
      <View className="mb-8 rounded-2xl bg-background p-4">
        <Pagination defaultPage={10} showEdges siblingCount={2} totalItems={500} />
      </View>
    </ScrollView>
  );
};

export { PaginationDemo };
