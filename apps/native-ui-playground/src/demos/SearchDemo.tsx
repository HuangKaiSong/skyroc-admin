import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Search, Text } from '@skyroc/native-ui';

const SearchDemo = () => {
  const [basic, setBasic] = useState('');
  const [round, setRound] = useState('');
  const [action, setAction] = useState('');
  const [actionFocused, setActionFocused] = useState(false);
  const [label, setLabel] = useState('');
  const [bg, setBg] = useState('');
  const [disabled] = useState('搜索内容');
  const [event, setEvent] = useState('');
  const [searchResult, setSearchResult] = useState('');

  function handleSearch(val: string) {
    setSearchResult(`搜索: ${val}`);
  }

  function handleCancel() {
    setAction('');
    setActionFocused(false);
    Alert.alert('取消搜索');
  }

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">基础用法</Text>
      <Search
        placeholder="请输入搜索关键词"
        value={basic}
        onChangeText={setBasic}
      />

      {/* Round Shape */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">圆角搜索框</Text>
      <Search
        placeholder="请输入搜索关键词"
        shape="round"
        value={round}
        onChangeText={setRound}
      />

      {/* Show Action */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">搜索框 + 取消按钮</Text>
      <Search
        placeholder="请输入搜索关键词"
        showAction={actionFocused || Boolean(action)}
        value={action}
        onCancel={handleCancel}
        onChangeText={setAction}
        onFocus={() => setActionFocused(true)}
      />

      {/* Custom Action Text */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">自定义操作按钮</Text>
      <Search
        actionText="搜索"
        placeholder="请输入搜索关键词"
        showAction
        value={event}
        onCancel={() => handleSearch(event)}
        onChangeText={setEvent}
        onSearch={handleSearch}
      />
      {searchResult ? (
        <View className="bg-background px-4 py-3">
          <Text className="text-sm text-muted-foreground">{searchResult}</Text>
        </View>
      ) : null}

      {/* With Label */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">显示标签</Text>
      <Search
        label="地址"
        placeholder="请输入搜索关键词"
        value={label}
        onChangeText={setLabel}
      />

      {/* Custom Background */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">自定义背景色</Text>
      <Search
        background="#4fc08d"
        placeholder="请输入搜索关键词"
        shape="round"
        value={bg}
        onChangeText={setBg}
      />

      {/* Disabled */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">禁用状态</Text>
      <Search
        disabled
        placeholder="请输入搜索关键词"
        value={disabled}
      />
    </ScrollView>
  );
};

export { SearchDemo };
