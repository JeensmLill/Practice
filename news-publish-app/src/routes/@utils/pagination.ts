import { LoaderFunctionArgs, SubmitFunction } from "react-router-dom";
import { APIRequest, APIResponse } from "~/api/type";

export const submitAfterRecordRemoved = ({
  submit,
  recordsLength,
  state_currentPage,
  state_pageSize,
  setState_currentPage,
} : {
  submit: SubmitFunction;
  recordsLength: number;
  state_currentPage: number;
  state_pageSize: number;
  setState_currentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if(recordsLength > 1) {
    submit([
      ["page", state_currentPage],
      ["pageSize", state_pageSize]
    ]);
  } else {
    const currentPage = state_currentPage > 1 ? state_currentPage - 1 : state_currentPage;
    setState_currentPage(currentPage);
    submit([
      ["page", currentPage],
      ["pageSize", state_pageSize]
    ]);
  }
};
export const requestListData = async <T extends APIResponse>({
  request,
  api
}: {
  request: LoaderFunctionArgs["request"];
  api: APIRequest<T, any>;
}): Promise<T["data"]> => {
  const url = new URL(request.url);
  const query_page = url.searchParams.get("page");
  const query_pageSize = url.searchParams.get("pageSize");
  const page = query_page || 1;
  const limit = query_pageSize || 5;
  
  const rsl = await api({page, limit});
  if(rsl.code !== 200) {
    console.log(rsl);
    throw new Response("Not Found", { status: 404});
  }
  return rsl.data;
};