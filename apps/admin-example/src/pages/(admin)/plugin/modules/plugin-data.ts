import type { Options as BarcodeOptions } from 'jsbarcode';

export interface BarcodeExample {
  /** 渲染 SVG 条形码时使用的唯一标识。 */
  id: string;

  /** 传递给 JsBarcode 的渲染配置。 */
  options: BarcodeOptions;

  /** 需要转换为条形码的原始文本。 */
  text: string;

  /** 条形码下方展示的示例名称。 */
  title: string;
}

export interface DemoUserRow {
  /** 用户唯一标识。 */
  id: number;

  /** 用户昵称。 */
  nickName: string;

  /** 用户角色名称。 */
  role: string;

  /** 用户状态。 */
  status: string;

  /** 用户邮箱。 */
  userEmail: string;

  /** 用户账号名称。 */
  userName: string;

  /** 用户手机号。 */
  userPhone: string;
}

export const pluginIcons = [
  'mdi:emoticon',
  'mdi:ab-testing',
  'ph:alarm',
  'ph:android-logo',
  'ph:align-bottom',
  'ph:archive-box-light',
  'uil:basketball',
  'uil:brightness-plus',
  'uil:capture',
  'mdi:apps-box',
  'mdi:alert',
  'mdi:airballoon',
  'mdi:airplane-edit',
  'mdi:alpha-f-box-outline',
  'mdi:arm-flex-outline',
  'ic:baseline-10mp',
  'ic:baseline-access-time',
  'ic:baseline-brightness-4',
  'ic:baseline-brightness-5',
  'ic:baseline-credit-card',
  'ic:baseline-filter-1',
  'ic:baseline-filter-2',
  'ic:baseline-filter-3',
  'ic:baseline-filter-4',
  'ic:baseline-filter-5',
  'ic:baseline-filter-6',
  'ic:baseline-filter-7',
  'ic:baseline-filter-8',
  'ic:baseline-filter-9',
  'ic:baseline-filter-9-plus'
];

export const localIcons = ['custom-icon', 'activity', 'at-sign', 'cast', 'chrome', 'copy', 'heart'];

export const barcodeExamples: BarcodeExample[] = [
  {
    id: 'code39',
    title: 'CODE 39',
    text: 'Hello',
    options: { format: 'code39' }
  },
  {
    id: 'code128',
    title: 'CODE 128',
    text: 'Soybean',
    options: {}
  },
  {
    id: 'ean13',
    title: 'EAN-13',
    text: '1234567890128',
    options: { format: 'ean13' }
  },
  {
    id: 'upc',
    title: 'UPC-A',
    text: '123456789012',
    options: { format: 'upc' }
  },
  {
    id: 'short-gray',
    title: '低高度灰色',
    text: 'Hello',
    options: {
      height: 32,
      lineColor: '#64748b'
    }
  },
  {
    id: 'reverse',
    title: '反色背景',
    text: 'Skyroc',
    options: {
      background: '#334155',
      lineColor: '#ffffff'
    }
  },
  {
    id: 'large-text',
    title: '大字号',
    text: 'React',
    options: {
      fontSize: 32
    }
  },
  {
    id: 'wide',
    title: '粗条码',
    text: 'Hi',
    options: {
      textMargin: 24,
      width: 4
    }
  }
];

export const demoUsers: DemoUserRow[] = [
  {
    id: 1,
    userName: 'soybean',
    nickName: 'Soybean',
    userPhone: '18800000001',
    userEmail: 'soybean@example.com',
    role: 'Super Admin',
    status: 'Enable'
  },
  {
    id: 2,
    userName: 'skyroc',
    nickName: 'Skyroc',
    userPhone: '18800000002',
    userEmail: 'skyroc@example.com',
    role: 'Admin',
    status: 'Enable'
  },
  {
    id: 3,
    userName: 'viewer',
    nickName: 'Viewer',
    userPhone: '18800000003',
    userEmail: 'viewer@example.com',
    role: 'User',
    status: 'Disable'
  }
];

export const vtableRecords = [
  {
    orderId: 'CA-2015-103800',
    customer: 'Darren Powers',
    category: 'Office Supplies',
    region: 'Central',
    city: 'Houston',
    quantity: 2,
    sales: 16.448,
    profit: 5.5512
  },
  {
    orderId: 'CA-2015-112326',
    customer: 'Phillina Ober',
    category: 'Office Supplies',
    region: 'Central',
    city: 'Naperville',
    quantity: 3,
    sales: 272.736,
    profit: -64.7748
  },
  {
    orderId: 'CA-2015-141817',
    customer: 'Mick Brown',
    category: 'Office Supplies',
    region: 'East',
    city: 'Philadelphia',
    quantity: 3,
    sales: 19.536,
    profit: 4.884
  },
  {
    orderId: 'CA-2015-167199',
    customer: 'Maria Etezadi',
    category: 'Furniture',
    region: 'South',
    city: 'Henderson',
    quantity: 9,
    sales: 2573.82,
    profit: 746.4078
  },
  {
    orderId: 'CA-2015-130813',
    customer: 'Lycoris Saunders',
    category: 'Office Supplies',
    region: 'West',
    city: 'Los Angeles',
    quantity: 3,
    sales: 19.44,
    profit: 9.3312
  }
];

export const ganttData = {
  data: [
    { id: 1, text: '需求确认', start_date: '2026-05-01', duration: 4, progress: 1 },
    { id: 2, text: 'React 插件替换', start_date: '2026-05-05', duration: 7, progress: 0.72, parent: 0 },
    { id: 3, text: '页面联调', start_date: '2026-05-12', duration: 4, progress: 0.45, parent: 0 },
    { id: 4, text: '验收发布', start_date: '2026-05-18', duration: 3, progress: 0.18, parent: 0 }
  ],
  links: [
    { id: 1, source: 1, target: 2, type: '0' },
    { id: 2, source: 2, target: 3, type: '0' },
    { id: 3, source: 3, target: 4, type: '0' }
  ]
};
