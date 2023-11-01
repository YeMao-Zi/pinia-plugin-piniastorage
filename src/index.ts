import type { StateTree, PiniaPlugin } from "pinia";

function get(state: StateTree, path: Array<string>) {
  return path.reduce((obj, p) => {
    return obj?.[p];
  }, state);
}

function set(state: StateTree, path: Array<string>, val: unknown): StateTree {
  return (
    (path.slice(0, -1).reduce((obj, p) => {
      if (!/^(__proto__)$/.test(p)) return (obj[p] = obj[p] || {});
      else return {};
    }, state)[path[path.length - 1]] = val),
    state
  );
}

export function pick(baseState: StateTree, paths: string[]): StateTree {
  return paths.reduce((substate, path) => {
    const pathArray = path.split(".");
    return set(substate, pathArray, get(baseState, pathArray));
  }, {});
}

export function piniaStorage() {
  return function (ctx) {
    {
      const { store, options } = ctx;
      const {
        openStorage = false,
        paths = null,
        afterRestore,
        beforeRestore,
        storageWay = {
          setStorageWay: (key: string, data: any) => localStorage.setItem(key, data),
          getStorageWay: (key: string) => localStorage.getItem(key),
        },
        serializer = {
          serialize: JSON.stringify,
          deserialize: JSON.parse,
        },
        key = store.$id,
      } = options.storeOptions || {};
      if (!openStorage) return;

      beforeRestore?.(ctx);

      try {
        const fromStorage = storageWay.getStorageWay(key);
        if (fromStorage) {
          store.$patch(serializer.deserialize(fromStorage));
        } else {
          // 初始化
          const toStore = Array.isArray(paths) ? pick(store.$state, paths) : store.$state;
          storageWay.setStorageWay(key, serializer.serialize(toStore));
        }
      } catch (_error) {}

      afterRestore?.(ctx);

      store.$subscribe(
        (_, state) => {
          try {
            const toStore = Array.isArray(paths) ? pick(state, paths) : state;
            storageWay.setStorageWay(key, serializer.serialize(toStore));
          } catch (_error) {}
        },
        { detached: true }
      );
    }
  } as PiniaPlugin;
}

export default piniaStorage();
