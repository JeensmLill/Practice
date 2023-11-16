import request from "~utils/request";
import type {
  Request_Login,
  Request_Logout,
  Request_AccountInfo,
  Request_Validate,
  Response_Login,
  Response_AccountInfo,
  Response_Validate
} from "./type";

enum API {
  LOGIN = "/account/login",
  VALIDATE = "/account/validate",
  ACCOUNT_INFO = "/account/info",
  LOGOUT = "/account/logout"
};

export const reqLogin: Request_Login = (form) => {
  return request.post<any, Response_Login>(API.LOGIN, form);
};
export const reqValidate: Request_Validate = (form) => {
  return request.post<any, Response_Validate>(API.VALIDATE, form);
};
export const reqAccountInfo: Request_AccountInfo = () => {
  return request.get<any, Response_AccountInfo>(API.ACCOUNT_INFO);
};
export const reqLogout: Request_Logout = () => {
  return request.post<any, any>(API.LOGOUT);
};