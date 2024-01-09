import {createSlice} from '@reduxjs/toolkit';

export interface CounterState {
  userData: object;
  userProfile: object;
  fromSignIn: boolean;
  password: string;
  language: string;
  user_id: string;
}

const initialState: CounterState = {
  userData: {},
  userProfile: {},
  fromSignIn: false,
  password: '',
  language: '',
  user_id: '',
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
    setUser_id: (state, action) => {
      state.user_id = action.payload;
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
  setUser_id,
} = authSlice.actions;

export default authSlice.reducer;
