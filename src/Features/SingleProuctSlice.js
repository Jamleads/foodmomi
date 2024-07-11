import { createSlice } from "@reduxjs/toolkit";
import { allProduct } from "../utilities/Dummy";

const singleProductSlice = createSlice({
  name: "product",
  initialState: {
    products: allProduct,
    selectedProduct: null,
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { selectProduct } = singleProductSlice.actions;

export default singleProductSlice.reducer;

// sliderCard,
// bigPack,
// smallPack,
// readyMade
