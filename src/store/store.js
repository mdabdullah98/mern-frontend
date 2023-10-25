import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/user";
import addExpenseSliceReducer from "./slices/addExpenseSlice";

import resetPasswordReducer from "./slices/resetPassword";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    addExpense: addExpenseSliceReducer,
    resetPassword: resetPasswordReducer,
  },
});
export default store;
