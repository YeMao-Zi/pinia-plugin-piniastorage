import { defineStore } from "pinia";

export default defineStore("main", {
  state: () => ({
    count: 0,
  }),
  storeOptions: {
    openStorage: true, // 必须为 true 才会运行插件
    storageWay: {
      setStorageWay: (key, data) => sessionStorage.setItem(key, data), // 如这里将存储方法替换为了 sessionStorage
      getStorageWay: (key) => sessionStorage.getItem(key),
    },
    paths:['count'] // 只持久化 token
  },
});
