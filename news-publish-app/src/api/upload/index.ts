import request from "~/utils/request";
import { APIResponse } from "../type";
import { Request_RevokeUpload } from "./type";

enum API {
  REVOKE_UPLOAD = "/upload/revoke",
  UPLOAD_IMAGE_USER_AVATAR = "/upload/images/user/avatars",
}
export enum FileField_Upload {
  IMAGE = "image"
}

export const reqRevokeUpload: Request_RevokeUpload = (form) => {
  return request.delete<any, APIResponse>(API.REVOKE_UPLOAD, {data: form.paths});
};

export {
  API as API_Upload
};