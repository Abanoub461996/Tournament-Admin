import { configureStore } from "@reduxjs/toolkit";
import dialogueReducer from "./slices/dialogueSlice";
import loaderReducer from "./slices/loaderSlice";
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    dialogue: dialogueReducer,
    loader: loaderReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
