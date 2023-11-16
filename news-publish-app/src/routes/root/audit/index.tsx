import { LoaderFunctionArgs, RouteObject } from "react-router-dom";
import auditingList from "./auditingList";
import list from "./list";
import { redirectToChild } from "~/routes/@utils/loader";

const loader = ({request}: LoaderFunctionArgs) => {
  return redirectToChild({request, localPath: "/audit", childPath: "./list"});
}

const route: RouteObject = {
  path: "audit",
  loader,
  children: [auditingList, list]
};
export default route;