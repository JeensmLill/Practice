import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { SubmitFunction } from "react-router-dom";
import { Data_GetAreas } from "~/api/areas/type";
import { Data_GetRoles } from "~/api/roles/type"
import { Response_UploadImage_UserAvatar } from "~/api/upload/type";

export interface FormData_Add {
  username: string;
  password: string;
  _area: string;
  _role: string;
  avatar?: UploadChangeParam<UploadFile<Response_UploadImage_UserAvatar>>;
}
export interface FormData_Edit {
  username?: string;
  password?: string;
  _area_name?: string;
  _role_name?: string;
  avatar?: FormData_Add["avatar"];
  enable?: boolean;
}