import { Store } from "@/pages/Dashboard/models";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [],
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStores: (state, action: { payload: Store[]; type: string }) => ({
      ...state,
      stores: action.payload,
    }),

    addStoreItem: (state, action: { payload: Store }) => ({
      ...state,
      stores: [action.payload, ...state.stores],
    }),
    removeStoreItem: (state, action: { payload: Store }) => {
      const stores = state.stores.filter((e) => e.name !== action.payload.name);
      return { ...state, stores: [...stores] };
    },
    updateStoreItem: (
      state,
      action: { payload: { oldStore: Store; newStore: Store } }
    ) => {
      const stores = state.stores.filter(
        (e) => e.name !== action.payload.oldStore.name
      );
      return { ...state, stores: [action.payload.newStore, ...stores] };
    },
    resetStores: () => initialState,
  },
});

export const {
  addStoreItem,
  addStores,
  removeStoreItem,
  resetStores,
  updateStoreItem,
} = storesSlice.actions;

export const StoreSelector = (state: RootState) => state.stores.stores;

export default storesSlice.reducer;
