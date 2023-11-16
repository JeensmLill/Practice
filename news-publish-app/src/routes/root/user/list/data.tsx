import { API_Upload } from "~/api/upload";
import { produceRequestUrl } from "~/utils/request";

export const action_uploadAvatar = produceRequestUrl(API_Upload.UPLOAD_IMAGE_USER_AVATAR);