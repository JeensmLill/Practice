import { FormItemProps, message } from "antd";
import { UploadProps } from "antd/es/upload";
import { RcFile} from "antd/lib/upload";

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
export const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  const isImage = file.type.includes("image");
  if(!isImage) message.error("请上传图片格式的文件");
  const isLessThen2M = file.size / 1024 / 1024 < 2;
  if(!isLessThen2M) message.error("请上传文件大小小于 2M 的文件");

  return isImage && isLessThen2M;
};
export const getValueProps_formItem_upload: FormItemProps["getValueProps"] = (value) => {
  return {
    uploadValue: value,
  };
};
export const getValueFromEvent_formItem_upload: FormItemProps["getValueFromEvent"] = (...args) => {
  return args[0];
};