import Feather from '@expo/vector-icons/Feather';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { cn } from '@skyroc/utils';
import { Pressable, ScrollView, View } from 'react-native';
import { Sidebar } from '../sidebar/Sidebar';
import { Text } from '../text/Typography';
import { treeSelectVariants } from './tree-select-variants';
import type { TreeSelectActiveId, TreeSelectChild, TreeSelectItem, TreeSelectProps } from './types';

/** 将 items 转为 Sidebar 所需的数据格式 */
function toSidebarItems(items: TreeSelectItem[]) {
  return items.map((item, index) => ({
    badge: item.badge,
    disabled: item.disabled,
    dot: item.dot,
    key: String(index),
    title: item.text
  }));
}

/** 检查某个 id 是否被选中 */
function isActive(activeId: TreeSelectActiveId, id: number | string) {
  if (Array.isArray(activeId)) return activeId.includes(id);
  return activeId === id;
}

const TreeSelect = <T extends TreeSelectActiveId = TreeSelectActiveId>(props: TreeSelectProps<T>) => {
  const {
    activeId: activeIdProp,
    classNames,
    defaultActiveId = 0,
    defaultMainActiveIndex = 0,
    height = 300,
    items = [],
    mainActiveIndex: mainActiveIndexProp,
    max = Infinity,
    onActiveIdChange,
    onClickItem,
    onClickNav,
    onMainActiveIndexChange,
    renderContent
  } = props;

  const [mainActiveIndex, setMainActiveIndex] = useControllableState({
    caller: 'tree-select',
    defaultProp: defaultMainActiveIndex,
    onChange: onMainActiveIndexChange,
    prop: mainActiveIndexProp
  });

  const [activeId, setActiveId] = useControllableState<TreeSelectActiveId>({
    caller: 'tree-select',
    defaultProp: defaultActiveId as TreeSelectActiveId,
    onChange: onActiveIdChange as ((value: TreeSelectActiveId) => void) | undefined,
    prop: activeIdProp as TreeSelectActiveId | undefined
  });

  const slots = treeSelectVariants();
  const currentGroup = items[mainActiveIndex];
  const children = currentGroup?.children ?? [];
  const sidebarItems = toSidebarItems(items);

  function handleNavChange(index: number) {
    setMainActiveIndex(index);
    onClickNav?.(index);
  }

  function handleItemPress(item: TreeSelectChild) {
    if (item.disabled) return;

    onClickItem?.(item);

    if (Array.isArray(activeId)) {
      const exists = activeId.includes(item.id);

      if (exists) {
        setActiveId(activeId.filter(id => id !== item.id));
      } else if (activeId.length < max) {
        setActiveId([...activeId, item.id]);
      }
    } else {
      setActiveId(item.id);
    }
  }

  function renderChildItem(item: TreeSelectChild) {
    const selected = isActive(activeId, item.id);
    const itemSlots = treeSelectVariants({ active: selected, disabled: Boolean(item.disabled) });

    return (
      <Pressable
        key={item.id}
        className={cn(itemSlots.contentItem(), classNames?.contentItem)}
        disabled={item.disabled}
        onPress={() => handleItemPress(item)}
      >
        <Text className={cn(itemSlots.contentItemText(), classNames?.contentItemText)}>{item.text}</Text>

        {selected && <Feather className={cn(slots.selectedIcon(), classNames?.selectedIcon)} name="check" size={16} />}
      </Pressable>
    );
  }

  return (
    <View style={{ height, flexDirection: 'row', overflow: 'hidden' }}>
      <Sidebar activeIndex={mainActiveIndex} items={sidebarItems} onIndexChange={handleNavChange} />

      <ScrollView className={cn(slots.content(), classNames?.content)} showsVerticalScrollIndicator={false}>
        {renderContent ? renderContent() : children.map(renderChildItem)}
      </ScrollView>
    </View>
  );
};

export { TreeSelect };
