import { StateTree, PiniaPluginContext } from "pinia";

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

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    storeOptions?: YmStateOptions;
  }
}

