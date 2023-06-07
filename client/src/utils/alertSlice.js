import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: { type: "", message: "" },
  reducers: {
    showAlert: (state, action) => {
      //console.log(action.payload);
      state.type = action.payload.type;
      state.message = action.payload.message;
      //console.log(state.alert);
    },
  },
});

export const { showAlert } = alertSlice.actions;

export default alertSlice.reducer;
