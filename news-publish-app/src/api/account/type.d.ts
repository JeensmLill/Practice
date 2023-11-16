import {APIResponse, User, APIRequest, User_Super} from "../type";

export type Form_Login = Pick<User, "username"|"password">;
export type Data_Login = {token: string};
export type Response_Login = APIResponse<Data_Login>;
export type Request_Login = APIRequest<Response_Login, Form_Login>;

export type Form_Validate = {token: string};
export type Data_Validate = {validate: string};
export type Response_Validate = APIResponse<Data_Validate>;
export type Request_Validate = APIRequest<Response_Validate, Form_Validate>;

export type Data_AccountInfo = {
  user: User_Super;
  routeRights: string[];
  buttonRights: string[];
};
export type Response_AccountInfo = APIResponse<Data_AccountInfo>;
export type Request_AccountInfo = APIRequest<Response_AccountInfo>;

export type Request_Logout = APIRequest;