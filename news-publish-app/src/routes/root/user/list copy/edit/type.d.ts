import { Response_GetUserList } from "~/api/user/type";

export type LoaderData = Response_GetUserList["data"];
export type ColumnRecord = LoaderData["users"][number];
export type Form_Edit = Partial<Pick<ColumnRecord, "username"|"avatar"|"enable"> & {_role: string, _area: string}>;