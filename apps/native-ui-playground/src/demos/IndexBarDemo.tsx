import { IndexBar, Tabs } from '@skyroc/native-ui';
import type { IndexBarItem, TabItem } from '@skyroc/native-ui';
import { View } from 'react-native';

/** 中国城市数据（真实 A-Z 分组） */
const CITY_DATA: Record<string, string[]> = {
  A: ['安庆', '安阳', '鞍山', '安康'],
  B: ['北京', '保定', '包头', '蚌埠', '宝鸡'],
  C: ['成都', '重庆', '长沙', '长春', '常州', '常德'],
  D: ['大连', '东莞', '大庆', '德阳', '德州'],
  E: ['鄂州', '恩施', '鄂尔多斯'],
  F: ['福州', '佛山', '阜阳', '抚州'],
  G: ['广州', '贵阳', '桂林', '赣州', '广元'],
  H: ['杭州', '合肥', '哈尔滨', '海口', '呼和浩特', '惠州'],
  I: ['伊春', '伊犁'],
  J: ['济南', '嘉兴', '金华', '荆州', '吉林', '九江'],
  K: ['昆明', '开封', '克拉玛依'],
  L: ['兰州', '拉萨', '洛阳', '柳州', '连云港', '临沂'],
  M: ['绵阳', '牡丹江', '马鞍山', '梅州'],
  N: ['南京', '南昌', '南宁', '宁波', '南通', '南阳'],
  O: ['鸥海'],
  P: ['攀枝花', '莆田', '平顶山', '濮阳'],
  Q: ['青岛', '泉州', '秦皇岛', '曲靖', '衢州'],
  R: ['日照', '瑞安', '汝州'],
  S: ['上海', '深圳', '苏州', '沈阳', '石家庄', '绍兴'],
  T: ['天津', '太原', '唐山', '台州', '泰州'],
  U: ['乌鲁木齐', '乌兰察布'],
  V: ['万宁', '万州'],
  W: ['武汉', '无锡', '温州', '潍坊', '芜湖', '威海'],
  X: ['西安', '厦门', '徐州', '襄阳', '新乡', '咸阳'],
  Y: ['烟台', '扬州', '宜昌', '银川', '岳阳', '玉林'],
  Z: ['郑州', '珠海', '中山', '湛江', '漳州', '镇江']
};
function buildCityItems(): IndexBarItem[] {
  return Object.entries(CITY_DATA).map(([letter, cities]) => ({
    title: letter,
    data: cities.map(city => ({ key: city, text: city }))
  }));
}

/** 生成 A-Z 数字条目 */
function buildAlphabetItems(): IndexBarItem[] {
  return Array.from({ length: 26 }, (_, i) => {
    const letter = String.fromCodePoint(65 + i);

    return {
      title: letter,
      data: Array.from({ length: 3 }, (__, j) => ({
        key: `${letter}-${j}`,
        text: `${letter} - Item ${j + 1}`
      }))
    };
  });
}

const CITY_ITEMS = buildCityItems();
const ALPHABET_ITEMS = buildAlphabetItems();

const TAB_ITEMS: TabItem[] = [
  {
    key: 'city',
    title: '城市列表',
    children: (
      <View className="flex-1">
        <IndexBar items={CITY_ITEMS} />
      </View>
    )
  },
  {
    key: 'alphabet',
    title: 'A-Z 索引',
    children: (
      <View className="flex-1">
        <IndexBar items={ALPHABET_ITEMS} />
      </View>
    )
  },
  {
    key: 'no-sticky',
    title: '无吸顶',
    children: (
      <View className="flex-1">
        <IndexBar items={ALPHABET_ITEMS} sticky={false} />
      </View>
    )
  }
];

const IndexBarDemo = () => {
  return (
    <View className="flex-1 bg-background">
      <Tabs lazy items={TAB_ITEMS} />
    </View>
  );
};

export { IndexBarDemo };
