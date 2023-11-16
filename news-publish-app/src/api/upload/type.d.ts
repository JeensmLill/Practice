import { APIRequest, APIResponse } from "../type";

export type Form_RevokeUpload = {
  paths: string[];
};
export type Response_RevokeUpload = APIResponse;
export type Request_RevokeUpload = APIRequest<Response_RevokeUpload, Form_RevokeUpload>;

export type Data_UploadImage_UserAvatar = {
  imgUrl: string;
};
export type Response_UploadImage_UserAvatar = APIResponse<Data_UploadImage_UserAvatar>;