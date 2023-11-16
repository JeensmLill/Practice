/*
 * [1] call signatures overload with generic = 
 * call signatures + generic + conditional type + undefined
 */
export interface APIResponse<Data = any> {
  ok: boolean;
  code: number;
  msg: string;
  data: Data;
}
interface GetRequest_API<Return> {
  (): Promise<Return>;
}
interface PostRequest_API<Return, Form> {
  (form: Form): Promise<Return>;
}
// [1]
export type APIRequest<Return extends APIResponse = APIResponse, Form = undefined> = 
  Form extends undefined
  ? GetRequest_API<Return>
  : PostRequest_API<Return, Form>;
export type APIDataId = string;

export interface Area {
  _id: APIDataId;
  name: string;
}
export interface Role {
  _id: APIDataId;
  name: string;
}
export interface Right {
  _id: APIDataId;
  name: string;
  code: string;
  level: number;
  type: number;
  enable: boolean;
}
export type Right_Super =
  & Right
  & {_children: Right_Super[]};
export type RightCode =
  | "Home"
  | "User"
  | "User-list"
  | "Right"
  | "Right-roleList"
  | "Right-list"
  | "News"
  | "News-write"
  | "News-draftList"
  | "News-category"
  | "News-preview"
  | "News-alter"
  | "Audit"
  | "Audit-auditingList"
  | "Audit-list"
  | "Publish"
  | "Publish-publishingList"
  | "Publish-publishedList"
  | "Publish-sunsetList";
export interface User {
  _id: APIDataId;
  username: string;
  password: string;
  avatar: string;
  enable: boolean;
  default: boolean;
}
export type User_Super =
  & Omit<User, "password">
  & {_area: Area, _role: Role};
export interface News {
  _id: APIDataId;
  title: string;
  content: string;
  auditState: number;
  publishState: number;
  publishTime: number | null;
  star: number;
  view: number;
}
export type News_Super =
  & News
  & {
    _user: Omit<User, "password">,
    _newsCategory: NewsCategory,
    createdAt: string,
  };
export interface NewsCategory {
  _id: APIDataId;
  name: string;
}
export interface Param_GetList {
  page: string | number;
  limit: string | number;
}