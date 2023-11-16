import { LoaderFunctionArgs, RouteObject } from "react-router-dom";
import publishingList from "./publishingList";
import publishedList from "./publishedList";
import sunsetList from "./sunsetList";
import { redirectToChild } from "~/routes/@utils/loader";

const loader = ({request}: LoaderFunctionArgs) => {
  return redirectToChild({request, localPath: "/publish", childPath: "./publishingList"});
};

const route: RouteObject = {
  path: "publish",
  loader,
  children: [publishingList, publishedList, sunsetList]
};
export default route;