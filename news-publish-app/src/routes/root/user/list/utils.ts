import { reqRevokeUpload } from "~/api/upload";
import { FormData_Add } from "./type";

export const revokeUploadAvatar = (avatar: FormData_Add["avatar"]) => {
  if(avatar?.fileList) {
    const imgUrls: string[] = [];
    avatar.fileList.forEach((file) => {
      const imgUrl = file.response?.data.imgUrl;
      if(imgUrl) imgUrls.push(imgUrl);
    });
    reqRevokeUpload({paths: imgUrls});
  }
};