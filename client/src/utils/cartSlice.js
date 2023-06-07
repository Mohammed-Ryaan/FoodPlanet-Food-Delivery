import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], quantity: 0, total: 0, restaurantId: "" },
  reducers: {
    clearCart: (state) => {
      state.quantity = 0;
      state.cartItems = [];
      state.total = 0;
      state.restaurantId = "";
    },
    setCart: (state, action) => {
      if (action.payload?.quantity) {
        state.cartItems = action.payload?.cartItems;
        state.quantity = action.payload?.quantity;
        state.restaurantId = action.payload?.restaurantId;
        state.total = action.payload?.total;
      } else {
        state.quantity = 0;
        state.cartItems = [];
        state.total = 0;
        state.restaurantId = "";
      }
    },
  },
});

export const { addItem, removeItem, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
