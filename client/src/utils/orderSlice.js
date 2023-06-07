import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [] },
  reducers: {
    setOrder: (state, action) => {
      state.orders = action.payload;
    },

    getOrder: (state) => {
      return state.orders;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
