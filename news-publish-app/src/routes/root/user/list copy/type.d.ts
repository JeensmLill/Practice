import { SubmitFunction } from "react-router-dom";
import { Data_GetAreas } from "~/api/areas/type";
import { Data_GetRoles } from "~/api/roles/type"

export interface Data_Loader {
  pathname: string,
  roles?: Data_GetRoles,
  areas?: Data_GetAreas,
}
export type State = Omit<Data_Loader, "pathname">;
