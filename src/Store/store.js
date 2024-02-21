import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../Features/productSlice";
import locationReducer from "../Features/Location";
import cartSlice from "../Features/CartSlice";
import favSlice from "../Features/FavSlice";
import singleProductReducer from "../Features/SingleProuctSlice";
import categoryProductReducers from "../Features/CategoryProductSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    location: locationReducer,
    cart: cartSlice,
    fav: favSlice,
    product: singleProductReducer,
    categoryProduct: categoryProductReducers,
  },
});

export default store;
