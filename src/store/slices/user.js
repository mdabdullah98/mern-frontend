import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/utils";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (SignupInput) => {
    try {
      const res = await axios.post(BASE_URL + "/user/signup", SignupInput);
      return res.data;
    } catch (err) {
      if (err) throw Error(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: false,
    message: "",
    token: null,
  },

  reducers: {
    tokenLoader: (state, payload) => {
      state.token = payload;
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.status = true;
    },
    [signupUser.fulfilled]: (state, { payload }) => {
      state.status = payload.success;
      state.message = payload.message;

      console.log(payload);
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.status = false;
      state.message = payload.error.message;
      console.log(payload);
    },
  },
});

export const { tokenLoader } = userSlice.actions;
export default userSlice.reducer;
