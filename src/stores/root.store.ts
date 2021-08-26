import { Instance, types } from "mobx-state-tree";

import { userStore, UserStore } from "./user.store";

export const RootSore = types.model("RootStore", {
  user: UserStore, 
});

export type RootStoreType = Instance<typeof RootSore>;

export const createStore = () => RootSore.create({user: userStore});

export const rootStore = createStore();


