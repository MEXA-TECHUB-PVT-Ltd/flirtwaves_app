import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  userData: object;
  userProfile: object;
  fromSignIn: boolean;
  password: string;
}

const initialState: CounterState = {
  userData: {},
  userProfile: {},
  fromSignIn: false,
  password: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setFromSignIn: (state, action) => {
      state.fromSignIn = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUserData, setUserProfile, setFromSignIn, setPassword} =
  authSlice.actions;

export default authSlice.reducer;
