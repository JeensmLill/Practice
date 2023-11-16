import {Param_GetList, APIResponse, User, APIRequest, Area, Role, User_Super, Right_Super, Right} from "../type";

// user
export type Form_AddUser =
  & Omit<User, "_id" | "enable" | "default" | "avatar">
  & Partial<Pick<User, "avatar">>
  & {_area: string, _role: string};
export type Response_AddUser = APIResponse;
export type Request_AddUser = APIRequest<Response_AddUser, Form_AddUser>;

export type Form_GetUserList = Param_GetList;
export type Data_GetUserList = {
  total: number;
  users: User_Super[];
  roles: Role[];
  areas: Area[];
};
export type Response_GetUserList = APIResponse<Data_GetUserList>;
export type Request_GetUserList = APIRequest<Response_GetUserList, Form_GetUserList>;

export type Form_UpdateUser = 
  & Pick<User, "_id">
  & Partial<Form_AddUser & Pick<User, "enable">>;
export type Response_UpdateUser = APIResponse;
export type Request_UpdateUser = APIRequest<Response_UpdateUser, Form_UpdateUser>;

export type Form_DeleteUser = Pick<User, "_id">;
export type Response_DeleteUser = APIResponse;
export type Request_DeleteUser = APIRequest<Response_DeleteUser, Form_DeleteUser>;

// role
export type Form_GetRoleList = Param_GetList;
export type Data_GetRoleList = {
  total: number;
  roles: Role[];
};
export type Response_GetRoleList = APIResponse<Data_GetRoleList>;
export type Request_GetRoleList = APIRequest<Response_GetRoleList, Form_GetRoleList>;

export type Form_AddRole = Omit<Role, "_id">;
export type Response_AddRole = APIResponse;
export type Request_AddRole = APIRequest<Response_AddRole, Form_AddRole>;

export type Form_UpdateRole =
  & Pick<Role, "_id">
  & Partial<Form_AddRole>;
export type Response_UpdateRole = APIResponse;
export type Request_UpdateRole = APIRequest<Response_UpdateRole, Form_UpdateRole>;

export type Form_DeleteRole = Pick<Role, "_id">;
export type Response_DeleteRole = APIResponse;
export type Request_DeleteRole = APIRequest<Response_DeleteRole, Form_DeleteRole>;

export type Data_GetRight = {
  right: Right_Super;
};
export type Response_GetRight = APIResponse<Data_GetRight>;
export type Request_GetRight = APIRequest<Response_GetRight>;

export type Form_UpdateRightEnable = Pick<Right, "_id" | "enable">;
export type Response_UpdateRightEnable = APIResponse;
export type Request_UpdateRightEnable = APIRequest<Response_UpdateRightEnable, Form_UpdateRightEnable>;

export type Form_GetRoleRights = Pick<Role, "_id">;
export type Data_GetRoleRights = {
  rights: Right["_id"][]
};
export type Response_GetRoleRights = APIResponse<Data_GetRoleRights>;
export type Request_GetRoleRights = APIRequest<Response_GetRoleRights, Form_GetRoleRights>;

export type Form_SetRoleRights =
  & Pick<Role, "_id">
  & {rightIds: string[]};
export type Response_SetRoleRights = APIResponse;
export type Request_SetRoleRights = APIRequest<Response_SetRoleRights, Form_SetRoleRights>;