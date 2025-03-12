import { RootStateType } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Auth } from "./types";

const initialState: Auth = {
  token: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => (state = initialState),
    setAuthUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      if (action.payload.token) {
        state.token = action.payload;
      }
    },
  },
});

export const { setAuthUser } = authSlice.actions;
export const resetAuth = authSlice.actions.reset;

export const authSliceReducer = authSlice.reducer;

export const selectUser = (state: RootStateType) => state.auth.user;
