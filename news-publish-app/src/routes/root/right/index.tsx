import { RouteObject } from "react-router-dom";
import roleList from "./roleList";
import list from "./list";

const route: RouteObject = {
  path: "right",
  children: [roleList, list],
};
export default route;