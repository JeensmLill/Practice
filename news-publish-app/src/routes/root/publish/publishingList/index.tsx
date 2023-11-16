import { LoaderFunctionArgs, RouteObject } from "react-router-dom";
import CommonPage from "../@components/CommonPage";
import { requestPublishListData } from "../@utils/loader";

const loader = async ({ request }: LoaderFunctionArgs) => {
  return requestPublishListData({request, publishState: 1});
};

const route: RouteObject = {
  path: "publishingList",
  loader,
  Component: CommonPage
};
export default route;