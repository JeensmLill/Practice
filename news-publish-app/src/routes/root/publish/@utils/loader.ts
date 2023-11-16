import { LoaderFunctionArgs } from "react-router-dom";
import { reqGetNewsPublishList_user } from "~/api/news";
import { getURLSearchParams } from "~/routes/@utils/loader";
import { stroeSelector_account } from "~/store";

export const requestPublishListData = async ({
  request,
  publishState,
} : {
  request: LoaderFunctionArgs["request"];
  publishState: 0 | 1 | 2 | 3
}) => {
  const urlSearchParams = getURLSearchParams({ request, names: ["page", "pagesize"] });
  const rsl = await reqGetNewsPublishList_user({
    userId: stroeSelector_account()._id,
    publishState: publishState,
    page: urlSearchParams["page"] || 1,
    limit: urlSearchParams["pageSize"] || 5,
  })
  if (rsl.code !== 200) {
    console.log(rsl);
    throw new Response("Not Found", { status: 404 });
  }
  return rsl.data;
};