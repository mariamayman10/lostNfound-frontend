import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './userSlice';
const persistedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const preloadedState = persistedUser ? { user: persistedUser } : {};

export const store = configureStore({
  reducer: { user: UserReducer },
  preloadedState
})
store.subscribe(() => {
    localStorage.setItem("user", JSON.stringify(store.getState().user));
});