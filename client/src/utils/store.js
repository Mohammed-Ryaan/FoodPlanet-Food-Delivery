import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import alertSlice from "./alertSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    alert: alertSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});

export default store;
