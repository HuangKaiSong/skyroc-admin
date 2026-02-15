# Expo Snack 嵌入集成方案

## 1. 目标

在 `apps/docs`（fumadocs + Next.js）的 MDX 文档中支持 Expo Snack 嵌入，实现"左侧代码编辑器 + 右侧手机模拟器"的交互式组件预览体验。

### 最终效果

在 MDX 文件中写：

````mdx
```SnackPlayer name=Button%20Demo platform=web
import React from 'react';
import { View, Button, Alert } from 'react-native';

export default () => (
  <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
    <Button title="Press me" onPress={() => Alert.alert('Pressed!')} />
  </View>
);
```
````

渲染为一个完整的 Expo Snack 嵌入式播放器（含编辑器 + 模拟器预览），用户可在线编辑和运行。

---

## 2. 核心原理

整个管道分三层，数据从不上传到 Expo 服务器：

```
  ┌───────────────────────────────────────────┐
  │  Layer 1: Build Time (remark plugin)      │
  │                                           │
  │  SnackPlayer 代码块                        │
  │       ↓ 解析参数 + URL编码代码             │
  │  <div class="snack-player"                │
  │       data-snack-name="..."               │
  │       data-snack-files="...encoded..."    │
  │       data-snack-theme="light" />         │
  └───────────────────────────────────────────┘
                      ↓
  ┌───────────────────────────────────────────┐
  │  Layer 2: Browser Load                    │
  │                                           │
  │  <script src="snack.expo.dev/embed.js">   │
  │  SnackPlayerInit 组件调用                  │
  │  window.ExpoSnack.initialize()            │
  └───────────────────────────────────────────┘
                      ↓
  ┌───────────────────────────────────────────┐
  │  Layer 3: Runtime                         │
  │                                           │
  │  embed.js 扫描所有 .snack-player div      │
  │  读取 data-snack-* 属性                    │
  │  创建 iframe → snack.expo.dev             │
  │  iframe 内: 编辑器(左) + 模拟器(右)        │
  └───────────────────────────────────────────┘
```

代码直接编码在 HTML data 属性里，由 Expo 的 embed.js 在客户端读取并渲染为 iframe。

---

## 3. 关键限制：私有包不可用

**Expo Snack 是云端沙箱，只能访问已发布到 npm 的包。**

`@skyroc/native-ui` 是 workspace 私有包，**Snack 中无法 import**。

### 策略

| 场景 | 方案 | 示例 |
|------|------|------|
| 标准 RN 组件演示 | **SnackPlayer**（Expo Snack 嵌入） | Button, TextInput, FlatList 等 |
| @skyroc/native-ui 组件演示 | **ComponentPreview**（本地 Expo 预览） | `<ComponentPreview component="button" />` |
| @skyroc/native-ui 发布到 npm 后 | 两者均可 | SnackPlayer + dependencies 参数 |

**两种方案共存**，在同一个 MDX 文件中可以混用。

---

## 4. 技术选型

| 维度 | 决策 | 理由 |
|------|------|------|
| 转换方式 | remark 插件 | 与 RN 官网一致，Markdown 语法干净 |
| 插件注册 | `source.config.ts` 的 `mdxOptions.remarkPlugins` | fumadocs 标准方式 |
| embed.js 加载 | Next.js `<Script>` 组件 | 支持 defer/strategy 控制 |
| 初始化 | 客户端 React 组件 | 处理 Next.js 路由切换 + 主题同步 |
| 主题同步 | 监听 next-themes 的 class 变化 | fumadocs 用 `dark` class on `<html>` |

---

## 5. 文件结构

```
apps/docs/
├── lib/
│   └── remark-snackplayer.ts         # [新建] remark 插件
├── components/
│   ├── mdx/
│   │   ├── ComponentPreview.tsx      # [保留] 本地 Expo 预览
│   │   ├── SnackPlayerInit.tsx       # [新建] 客户端初始化
│   │   └── index.ts                  # [更新] 导出
│   └── phone-frame/                  # [保留]
├── app/
│   ├── layout.tsx                    # [更新] 加载 embed.js + 初始化组件
│   └── docs/[[...slug]]/page.tsx     # [无需改动]
├── source.config.ts                  # [更新] 注册 remark 插件
├── styles/
│   └── snack-player.css              # [新建] 样式
└── content/docs/native/components/
    └── button.mdx                    # [更新] 添加 SnackPlayer 示例
```

---

## 6. 各模块详细设计

### 6.1 remark-snackplayer 插件

**职责**：遍历 Markdown AST，将 `SnackPlayer` 代码块转为带 `data-snack-*` 属性的 div 节点。

**输入**（Markdown 代码块节点）：
```
{
  type: 'code',
  lang: 'SnackPlayer',
  meta: 'name=Button%20Demo&platform=web&dependencies=expo-constants',
  value: 'import React from ...'
}
```

**输出**（MDX JSX 节点）：
```
{
  type: 'mdxJsxFlowElement',
  name: 'div',
  attributes: [
    { name: 'className', value: 'snack-player' },
    { name: 'data-snack-name', value: 'Button Demo' },
    { name: 'data-snack-files', value: '<URL-encoded JSON>' },
    { name: 'data-snack-platform', value: 'web' },
    ...
  ],
  children: []
}
```

**参数说明**：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `name` | 显示名称（URL 编码） | `"Example"` |
| `description` | 描述 | `"Example usage"` |
| `dependencies` | 额外 npm 依赖（逗号分隔） | `""` |
| `ext` | 文件扩展名 | `"tsx"` |
| `platform` | 默认预览平台 | `"web"` |
| `supportedPlatforms` | 支持的平台 | `"ios,android,web"` |
| `theme` | 主题 | `"light"` |
| `preview` | 是否显示预览 | `"true"` |
| `loading` | iframe 加载策略 | `"lazy"` |

**files JSON 编码格式**：
```json
{
  "App.tsx": {
    "type": "CODE",
    "contents": "import React from 'react';\n..."
  }
}
```
整个 JSON 经 `encodeURIComponent()` 后放入 `data-snack-files`。

---

### 6.2 SnackPlayerInit 客户端组件

**职责**：
1. 页面加载后调用 `window.ExpoSnack.initialize()`
2. Next.js 客户端路由切换时重新初始化
3. 主题变化时同步 `data-snack-theme` 并重建 iframe

**关键逻辑**：

```
mount / route change
  → 等待 embed.js 加载完成
  → 同步当前主题到所有 .snack-player 元素
  → 调用 ExpoSnack.initialize()

主题变化（dark ↔ light）
  → 更新所有 .snack-player 的 data-snack-theme
  → 对每个 player: remove() → append()（重建 iframe）
```

**主题检测方式**：
fumadocs 使用 next-themes，在 `<html>` 元素上添加 `dark` class。
监听 `<html>` 的 `class` 属性变化即可。

---

### 6.3 样式

固定高度 + 响应式宽度 + 圆角边框：

```css
.snack-player {
  height: 635px;
  width: 100%;
  overflow: hidden;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
}
```

---

### 6.4 source.config.ts 改动

```typescript
import remarkSnackPlayer from './lib/remark-snackplayer';

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkSnackPlayer]
  }
});
```

fumadocs 会将自定义插件与内置插件合并。

---

### 6.5 layout.tsx 改动

```tsx
import Script from 'next/script';
import { SnackPlayerInit } from '@/components/mdx/SnackPlayerInit';

// 在 <body> 中添加：
<Script src="https://snack.expo.dev/embed.js" strategy="lazyOnload" />
<SnackPlayerInit />
```

---

## 7. MDX 使用示例

### 纯 RN 组件（用 SnackPlayer）

````mdx
## 基本用法

```SnackPlayer name=Button%20Basic&platform=web
import React from 'react';
import { View, Button, Alert } from 'react-native';

export default () => (
  <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
    <Button title="Press me" onPress={() => Alert.alert('Hello!')} />
  </View>
);
```
````

### 带额外依赖

````mdx
```SnackPlayer name=SafeArea%20Demo&dependencies=react-native-safe-area-context
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default () => (
  <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Safe Area Content</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);
```
````

### @skyroc/native-ui 组件（保留 ComponentPreview）

```mdx
## 我们的 Button 组件

<ComponentPreview component="button" />
```

### 混合使用

```mdx
## Button

### 我们的实现
<ComponentPreview component="button" />

### 对比 React Native 原生 Button
```SnackPlayer name=RN%20Button
import React from 'react';
import { View, Button, Alert } from 'react-native';

export default () => (
  <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
    <Button title="Native Button" onPress={() => Alert.alert('Pressed')} />
  </View>
);
```

---

## 8. 与 ComponentPreview 的关系

| | SnackPlayer (Expo Snack) | ComponentPreview (本地预览) |
|---|---|---|
| 代码位置 | MDX 文件中内联 | `expo-ui-playground/src/demos/` |
| 运行环境 | Expo Snack 云端沙箱 | 本地 Expo dev server / 静态导出 |
| 可用依赖 | 仅 npm 公开包 | workspace 私有包可用 |
| 用户可编辑 | 是（在线编辑器） | 否（只读预览） |
| 离线可用 | 否（需联网） | 是 |
| 部署依赖 | 无（embed.js CDN） | 需部署 Expo web 或代理 |
| 适用场景 | 教学/文档/标准组件 | 组件库私有组件展示 |

**结论：两者互补，不是替代关系。**

---

## 9. 实现步骤（按顺序）

| 步骤 | 内容 | 预计改动 |
|------|------|----------|
| 1 | 创建 `lib/remark-snackplayer.ts` | 新建 1 个文件 |
| 2 | 创建 `components/mdx/SnackPlayerInit.tsx` | 新建 1 个文件 |
| 3 | 创建 `styles/snack-player.css` | 新建 1 个文件 |
| 4 | 更新 `source.config.ts` 注册插件 | 改 1 行 |
| 5 | 更新 `app/layout.tsx` 加载脚本和初始化组件 | 改 ~5 行 |
| 6 | 更新 `components/mdx/index.ts` 导出 | 改 1 行 |
| 7 | 在 `button.mdx` 中添加 SnackPlayer 示例验证 | 改 ~15 行 |
| 8 | 安装依赖 `unist-util-visit` | pnpm add |

**总计：新建 3 个文件，修改 4 个文件，安装 1 个依赖。**
