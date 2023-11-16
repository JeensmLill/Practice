import { configureStore } from "@reduxjs/toolkit";
import account from "./reducers/account";

const store = configureStore({
  reducer: {
    account,
  }
});

export default store;
export const storeGetState = store.getState;
export const storeDispatch = store.dispatch;
export const stroeSelector_account = () => storeGetState().account;