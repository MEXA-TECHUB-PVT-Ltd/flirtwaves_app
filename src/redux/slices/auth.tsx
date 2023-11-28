import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  userData: object;
  userProfile: object;
  fromSignIn: boolean;
}

const initialState: CounterState = {
  userData: {},
  userProfile: {},
  fromSignIn: false,
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
  },
});

// Action creators are generated for each case reducer function
export const {setUserData, setUserProfile, setFromSignIn} = authSlice.actions;

export default authSlice.reducer;
