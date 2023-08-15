export { piniaStorage } from "./lib/plugin";

import type { YmStateOptions } from "./lib/types";

declare module "pinia" {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    storeOptions?: YmStateOptions;
  }
}
