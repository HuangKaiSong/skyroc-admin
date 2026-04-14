import type { ComponentType } from 'react';
import { Image as RNImage } from 'react-native';

/** 图片组件类型约束 */
type ImageComponentType = ComponentType<any>;

/** 已注册的图片组件 */
let registered: ImageComponentType | null = null;

/**
 * 注册图片组件实现
 *
 * 应用层在入口调用，注入具体的图片组件（如 expo-image）。 未注册时，组件库回退到 React Native 原生 Image。
 */
function registerImageComponent(component: ImageComponentType) {
  registered = component;
}

/** 获取已注册的图片组件，未注册时回退到 RN 原生 Image */
function getImageComponent(): ImageComponentType {
  return registered ?? RNImage;
}

export { getImageComponent, registerImageComponent };
export type { ImageComponentType };
