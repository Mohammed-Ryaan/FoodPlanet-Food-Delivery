import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userDetails: {} },
  reducers: {
    addUser: (state, action) => {
      //console.log(action.payload);
      state.userDetails = action.payload;
    },
    getUser: (state) => {
      return state.userDetails;
    },
    removeUser: (state) => {
      state.userDetails = {};
    },
  },
});

export const { addUser, getUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
