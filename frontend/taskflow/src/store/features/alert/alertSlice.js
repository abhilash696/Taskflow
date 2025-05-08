import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    message: null,
    type: null,
    show: false,
    duration: 5000,
  },
  reducers: {
    showAlert: (state, action) => {
      state.show = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideAlert: (state) => {
      state.show = false;
      state.message = null;
      state.type = null;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
