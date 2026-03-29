import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idToken: "",
  refreshToken: "",
  expiresIn: "",
  name: "",
  email: "",
  phoneNumber: "",
  photoUrl: "",
  postsCount: 0,
  createdAt: "",
}
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => { return { ...initialState } },
    updatePostsCount: (state, action) => { return { ...state, postsCount: action.payload } }
  }
})


export const { setUser, clearUser, updatePostsCount } = UserSlice.actions;
export default UserSlice.reducer;