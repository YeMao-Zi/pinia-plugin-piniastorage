## 介绍

pinia 的持久化插件，所有的都是可扩展的包括持久存储的方法

默认存储方式为 localStorage.setItem ,如果为移动端不支持，可以替换掉该方法

## 下载
```
npm i pinia-plugin-piniastorage -D
```

## 注册
``` vue
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { piniaStorage } from "pinia-plugin-piniaStorage";

const store = createPinia();
store.use(piniaStorage());
createApp(App).use(router).use(store).mount('#app');
```

## 基本使用

后面添加对象 `storeOptions:{openStorage:true}`

```ts
import { defineStore } from "pinia";
const useInfoStore = defineStore({
  id: "useInfo",
  state: () => ({
    test: "",
    token: "",
  }),
  getters: {},
  actions: {
    setTest(value: any) {
      this.test = value;
      this.token = "xxx";
    },
  },
  storeOptions: {
    openStorage: true, // 必须为 true 才会运行插件
    storageWay: {
      setStorageWay: (key, data) => sessionStorage.setItem(key, data), // 如这里将存储方法替换为了 sessionStorage
      getStorageWay: (key) => sessionStorage.getItem(key),
    },
    paths:['token'] // 只持久化 token
  },
});
export default useInfoStore;
```

## 全部配置
``` ts
export interface Serializer {
  /**
   * 默认数据格式化的序列方法
   * @default JSON.stringify
   */
  serialize: (value: StateTree) => string;

  /**
   * 默认数据解析方法
   * @default JSON.parse
   */
  deserialize: (value: string) => StateTree;
}

export interface StorageWay {
  /**
   * 默认数据持久化的方法
   * @default localStorage.setItem
   */
  setStorageWay: (key: string, data: any) => void;

  /**
   * 默认数据持久化解析方法
   * @default localStorage.getItem
   */
  getStorageWay: (key: string) => any;
}

export interface YmStateOptions {
  /**
   * 是否开启本地存储
   * @default true
   */
  openStorage?: boolean;
  /**
   * 存储关键字
   * @default $store.id
   */
  key?: string;

  /**
   * 想要保存的部分路径
   * @default undefined
   */
  paths?: Array<string>;

  /**
   * 数据格式化的序列方法
   */
  serializer?: Serializer;
  /**
   * 持久化存储方法.
   */
  storageWay?: StorageWay;
  /**
   * 获取存储数据前触发钩子
   * @default undefined
   */
  beforeRestore?: (context: PiniaPluginContext) => void;

  /**
   * 获取存储数据后触发钩子
   * @default undefined
   */
  afterRestore?: (context: PiniaPluginContext) => void;
}
```
