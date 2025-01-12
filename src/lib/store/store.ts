import persistPlugin from "@rematch/persist";
import { init, Plugin, RematchDispatch, RematchRootState } from "@rematch/core";
import { models, RootModel } from "../../models";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

export const store = init({
  models,
  plugins: [persistPlugin(persistConfig) as Plugin<RootModel>],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
