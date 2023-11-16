import { LoaderFunctionArgs, Outlet, RouteObject, redirect, useLoaderData, useSubmit} from "react-router-dom";
import edit from "./edit";
import add from "./add";
import { createContext, useEffect, useState } from "react";
import { Data_Loader, State } from "./type";
import { reqGetRoles } from "~/api/roles";
import { storeDispatch, stroeSelector_trigger } from "~/store";
import { sliceActions_trigger, triggerSelector_IfRequestNewData_uerList } from "~/store/reducers/trigger";
import { message } from "antd";
import { reqGetAreas } from "~/api/areas";

const loader = async ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const ifRequestNewData = triggerSelector_IfRequestNewData_uerList(stroeSelector_trigger());
  const data: Data_Loader = {pathname: pathname};
  if(ifRequestNewData) {
    // need to request new data
    const rsl_roles = await reqGetRoles();
    if(rsl_roles.code === 200) {
      data.roles = rsl_roles.data;
    } else {
      message.error("获取数据失败");
    }
    const rsl_areas = await reqGetAreas();
    if(rsl_areas.code === 200) {
      data.areas = rsl_areas.data;
    } else {
      message.error("获取数据失败");
    }
  } else {
    // redirect
    console.log("pathname",pathname);
    return pathname.match(/\/list$/)
      ? redirect("./edit")
      : data;
  }

  return data;
};
type Return_Loader = Awaited<ReturnType<typeof loader>>;
const Context = createContext<State | null>(null);
const Component = () => {
  // to store common data in React state for children Components
  const loaderData = useLoaderData() as Return_Loader;
  const submit = useSubmit();
  const initialState: State = {};
  if("pathname" in loaderData) {
    initialState.roles = loaderData.roles;
    initialState.areas = loaderData.areas;
  }
  const [state] = useState<State>(initialState);

  useEffect(() => {
    if(state.roles) {
      // data stored
      const ifRequestNewData = triggerSelector_IfRequestNewData_uerList(stroeSelector_trigger());
      if(ifRequestNewData) {
        // new data requested
        if("pathname" in loaderData) {
          // close request operation
          storeDispatch(sliceActions_trigger.ifRequestNewData_uerList(false));
          // redirect
          submit(null, {action: loaderData.pathname});
        }
      }
    }

    return () => {
      // component unmounted, stored data lost
      // open request operation
      storeDispatch(sliceActions_trigger.ifRequestNewData_uerList(true));
    };
  }, [state.roles]);

  return (
    <Context.Provider value={state}>
      <Outlet/>
    </Context.Provider>
  );
};

const route: RouteObject = {
  path: "list",
  loader,
  Component,
  children: [edit, add]
};
export default route;
export {
  Context as Context_UserList
};