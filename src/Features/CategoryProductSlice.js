import { createSlice } from "@reduxjs/toolkit";
import { allProduct } from "../Utilities/Dummy";

const categoryProductSlice = createSlice({
  name: "categoryProduct",
  initialState: {
    products: allProduct,
    selectedCatProduct: null,
  },
  reducers: {
    selectedCatProduct: (state, action) => {
      state.selectedCatProduct = action.payload;
    },
  },
});

export const { selectedCatProduct } = categoryProductSlice.actions;
export default categoryProductSlice.reducer;
