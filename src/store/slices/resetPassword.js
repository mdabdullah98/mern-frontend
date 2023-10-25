import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/utils";
import axios from "axios";

export const resetPasswordThunk = createAsyncThunk(
  "/user/resetPassword",
  async (inputs, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        BASE_URL + "/user/password/update_password",
        {
          inputs,
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  message: null,
  status: null,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resetPasswordThunk.pending, (state) => {
      state.message = "sending..";
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.success;
    });
    builder.addCase(resetPasswordThunk.rejected, (state, action) => {
      state.message = action.payload.error.message;
      state.status = action.payload.error.success;
      console.log(action);
    });
  },
});

// export const { makestau } = resetPassword.actions;
export default resetPasswordSlice.reducer;
