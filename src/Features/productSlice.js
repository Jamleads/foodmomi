import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const productSlice = createSlice({
  name: "Producs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { fetchProduct } = productSlice.actions;
export default productSlice.reducer;

export const getProducts = createAsyncThunk("product/get", async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const result = await data.json();
  return result;
});
