import {createSlice} from '@reduxjs/toolkit';

export interface CounterState {
  userData: object;
  userProfile: object;
  fromSignIn: boolean;
  password: string;
  language: string;
}

const initialState: CounterState = {
  userData: {},
  userProfile: {},
  fromSignIn: false,
  password: '',
  language: '',
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
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserData,
  setUserProfile,
  setFromSignIn,
  setPassword,
  setLanguage,
} = authSlice.actions;

export default authSlice.reducer;
