import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { APIRequest, APIResponse } from "~/api/type";

export const getURLSearchParams = ({
  request,
  names,
} : {
  request: LoaderFunctionArgs["request"];
  names: string[];
}) => {
  const url = new URL(request.url);
  const rsl: any = {};
  names.forEach((name) => {
    rsl[name] = url.searchParams.get(name);
  });
  return rsl;
};
export const redirectToChild = ({
  request,
  localPath,
  childPath,
} : {
  request: LoaderFunctionArgs["request"];
  localPath: string;
  childPath: string;
}) => {
  const url = new URL(request.url);
  const regexp = new RegExp(localPath + "$");
  if(regexp.test(url.pathname)) return redirect(childPath);
  return null;
};