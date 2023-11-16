import { createSlice } from "@reduxjs/toolkit";
import {GET_TOKEN, SET_TOKEN, REMOVAE_TOKEN} from "~/utils/localStorage";
import { Action_SetInfo, Action_SetToken, State } from "./type";

const initialState: State = {
  token: GET_TOKEN() || "",
  _id: "",
  username: "",
  avatar: "",
  roleName: "",
  routeRights: [],
  buttonRights: [],
};
const slice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setToken: (state, action: Action_SetToken) => {
      const token = action.payload;
      state.token = token;
      SET_TOKEN(token);
    },
    removeToken: (state) => {
      state.token = "";
      REMOVAE_TOKEN();
    },
    setInfo: (state, action: Action_SetInfo) => {
      const info = action.payload;
      if(info._id) state._id = info._id;
      if(info.username) state.username = info.username;
      if(info.avatar) state.avatar = info.avatar;
      if(info.roleName) state.roleName = info.roleName;
      if(info.routeRights) state.routeRights = info.routeRights;
      if(info.buttonRights) state.buttonRights = info.buttonRights;
    },
    removeInfo: (state) => {
      state._id = "";
      state.username = "";
      state.avatar = "";
      state.roleName = "";
      state.routeRights = [];
      state.buttonRights = [];
    }
  }
});

export default slice.reducer;
export const sliceActions_account = slice.actions;