import { PayloadAction } from "@reduxjs/toolkit";
import { Data_AccountInfo, Data_Login } from "~/api/account/type";

export type State = 
  & Data_Login
  & Pick<Data_AccountInfo, "routeRights" | "buttonRights">
  & Pick<Data_AccountInfo["user"], "_id" | "username" | "avatar">
  & {
    roleName: Data_AccountInfo["user"]["_role"]["name"];
  };
export interface Action_SetToken extends PayloadAction {
  payload: NonNullable<State["token"]>
}
export interface Action_SetInfo extends PayloadAction {
  payload: Partial<Omit<State, "token">>
}