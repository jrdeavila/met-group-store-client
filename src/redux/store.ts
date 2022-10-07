import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { StoresReducer, StoreState, ItemState, ItemsReducer } from ".";

export interface AppStore {
  stores: StoreState;
  items: ItemState;
}

const store = configureStore<AppStore>({
  reducer: {
    stores: StoresReducer,
    items: ItemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
