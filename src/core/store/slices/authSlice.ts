import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { userLogin } from './../../api/axiosCalls';

export interface IAuth {
  token: string | null;
  isAuth: boolean;
  name: string;
  role: string | null;
}

//initial state for auth info
const initialState: IAuth = {
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('token'),
  name: '',
  role: 'admin',
};

export const fetchLogin = createAsyncThunk('users/fetchByIdStatus', async (userData: any) => {
  const response = await userLogin(userData);
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {      
      localStorage.setItem('token', JSON.stringify(action.payload.access_token));
      state.isAuth = true;
      state.name=action.payload.user.name
      state.token = action.payload.access_token;
    },
    signOut: (state) => {
      localStorage.clear();
      state.isAuth = false;
      state.name='';
      sessionStorage.clear();
    },
  },
});

// export my actions to dispatch hook
export const { signIn, signOut } = authSlice.actions;

// get my auth object from my selector hook
export const selectAuth = (state: RootState) => state.auth;

// export reducer to my state
export default authSlice.reducer;
