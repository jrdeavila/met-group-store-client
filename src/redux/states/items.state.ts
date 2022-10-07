import { Item } from "@/pages/Dashboard/models";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [],
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    resetItems: () => initialState,

    addItems: (state, action: { payload: Item[]; type: string }) => ({
      ...state,
      items: action.payload,
    }),

    addItem: (state, action: { payload: Item }) => ({
      ...state,
      items: [action.payload, ...state.items],
    }),
    removeItem: (state, action: { payload: Item }) => {
      const stores = state.items.filter((e) => e.name !== action.payload.name);
      return { ...state, items: [...stores] };
    },
    updateItem: (
      state,
      action: { payload: { oldItem: Item; newitem: Item } }
    ) => {
      const items = state.items.filter(
        (e) => e.name !== action.payload.oldItem.name
      );
      return { ...state, items: [action.payload.newitem, ...items] };
    },
  },
});

export const { addItem, resetItems, removeItem, updateItem, addItems } =
  itemSlice.actions;

export const ItemSelector = (state: RootState) => state.items.items;

export default itemSlice.reducer;
