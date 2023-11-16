import { LoaderFunctionArgs, RouteObject } from "react-router-dom";
import category from "./catagory";
import write from "./write";
import draft from "./draftList";
import preview from "./preview";
import alter from "./alter";
import { redirectToChild } from "~/routes/@utils/loader";

const loader = ({request}: LoaderFunctionArgs) => {
  return redirectToChild({request, localPath: "/news", childPath: "./write"});
}

const route: RouteObject = {
  path: "news",
  loader,
  children: [category, write, draft, preview, alter]
};
export default route;