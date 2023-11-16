import { LoaderFunctionArgs, RouteObject } from "react-router-dom";

import list from "./list"
import ErrorPage from "~/components/ErrorPage";
import { redirectToChild } from "~/routes/@utils/loader";

const loader = ({request}: LoaderFunctionArgs) => {
  return redirectToChild({request, localPath: "/publish", childPath: "./publishingList"});
};

const route: RouteObject = {
  path: "user",
  loader,
  errorElement: <ErrorPage src="../../404.svg"/>,
  children: [
    list,
  ]
};
export default route;