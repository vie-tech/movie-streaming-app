import { createSlice } from "@reduxjs/toolkit";

const globadLoadingSlice = createSlice({
  name: "AuthModal",
  initialState: {
    globadLoading: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.appState = action.payload;
    },
  },
});

export const { setGlobalLoading } = globadLoadingSlice.actions;

export default globadLoadingSlice.reducer;
