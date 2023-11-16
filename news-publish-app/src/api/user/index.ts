import request from "~utils/request";
import {
  Response_SetRoleRights,
  type Request_AddRole,
  type Request_AddUser,
  type Request_DeleteRole,
  type Request_DeleteUser,
  type Request_GetRight,
  type Request_GetRoleList,
  type Request_GetRoleRights,
  type Request_GetUserList,
  type Request_SetRoleRights,
  type Request_UpdateRightEnable,
  type Request_UpdateRole,
  type Request_UpdateUser,
  type Response_AddRole,
  type Response_AddUser,
  type Response_DeleteRole,
  type Response_DeleteUser,
  type Response_GetRight,
  type Response_GetRoleList,
  type Response_GetRoleRights,
  type Response_GetUserList,
  type Response_UpdateRightEnable,
  type Response_UpdateRole,
  type Response_UpdateUser
} from "./type";

enum API {
  ADD_USER = "/users/add",
  GET_USER_LIST = "/users/list",
  UPDATE_USER = "/users/update",
  DELETE_USER = "/users/delete",
  ADD_ROLE = "/users/roles/add",
  GET_ROLE_LIST = "/users/roles/list",
  GET_ROLE = "/users/roles/get",
  SET_ROLE = "/users/roles/set",
  UPDATE_ROLE = "/users/roles/update",
  DELETE_ROLE = "/users/roles/delete",
  GET_RIGHT = "/users/right",
  UPDATE_RIGHT_ENABLE = "/users/rights/updateEnable",
};

// user
export const reqAddUser: Request_AddUser = (form) => {
  return request.post<any, Response_AddUser>(API.ADD_USER, form);
};
export const reqGetUserList: Request_GetUserList = (form) => {
  return request.get<any, Response_GetUserList>(`${API.GET_USER_LIST}/${form.page}/${form.limit}`);
};
export const reqUpdateUser: Request_UpdateUser = (form) => {
  return request.patch<any, Response_UpdateUser>(`${API.UPDATE_USER}/${form._id}`, form);
};
export const reqDeleteUser: Request_DeleteUser = (form) => {
  return request.delete<any, Response_DeleteUser>(`${API.DELETE_USER}/${form._id}`);
};

// role
export const reqAddRole: Request_AddRole = (form) => {
  return request.post<any, Response_AddRole>(API.ADD_ROLE, form);
};
export const reqGetRoleList: Request_GetRoleList = (form) => {
  return request.get<any, Response_GetRoleList>(`${API.GET_ROLE_LIST}/${form.page}/${form.limit}`);
};
export const reqUpdateRole: Request_UpdateRole = (form) => {
  return request.patch<any, Response_UpdateRole>(`${API.UPDATE_ROLE}/${form._id}`, form);
};
export const reqDeleteRole: Request_DeleteRole = (form) => {
  return request.delete<any, Response_DeleteRole>(`${API.DELETE_ROLE}/${form._id}`);
};
export const reqGetRoleRights: Request_GetRoleRights = (form) => {
  return request.get<any, Response_GetRoleRights>(`${API.GET_ROLE}/${form._id}/rights`);
};
export const reqSetRoleRights: Request_SetRoleRights = (form) => {
  return request.post<any, Response_SetRoleRights>(`${API.SET_ROLE}/${form._id}/rights`, form);
};

export const reqGetRight: Request_GetRight = () => {
  return request.get<any, Response_GetRight>(API.GET_RIGHT);
};
export const reqUpdateRightEnable: Request_UpdateRightEnable = (form) => {
  return request.patch<any, Response_UpdateRightEnable>(`${API.UPDATE_RIGHT_ENABLE}/${form._id}`, form);
};