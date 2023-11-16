import style from "./index.module.scss";

import React, {createContext, useRef, useState,} from "react";
import {redirect, Outlet, useSubmit, useLocation } from "react-router-dom";
import type {LoaderFunctionArgs, RouteObject} from "react-router-dom";
import {Layout, Avatar, Dropdown, Menu, message, Card,} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type {
  MenuProps
} from "antd";

import { map_keyToRoute_menu, map_routeToKey_menu, produceItems_menu } from "./data";
import { storeDispatch, stroeSelector_account } from "~/store";
import { reqLogout, reqAccountInfo, reqValidate } from "~/api/account";
import { sliceActions_account } from "~/store/reducers/account";
import home from "./home";
import user from "./user";
import right from "./right";
import news from "./news";
import audit from "./audit";
import publish from "./publish";
import { imageUrl } from "~/utils/url";

const { Header, Sider, Content } = Layout;

const loader = async ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const storeState_account = stroeSelector_account();

  if(!storeState_account.token) {
    // is not logined
    return redirect("/login");
  } else if(!storeState_account.username) {
    // dont have user info
    // validate token
    const rsl = await reqValidate({token: storeState_account.token});
    if(rsl.code === 200) {
      if(rsl.data.validate) {
        // get user info
        const rsl_info = await reqAccountInfo();
        if(rsl_info.code === 200) {
          storeDispatch(sliceActions_account.setInfo({
            ...rsl_info.data.user,
            roleName: rsl_info.data.user._role.name,
            routeRights: rsl_info.data.routeRights,
            buttonRights: rsl_info.data.buttonRights,
          }));
          // redirect
          if(pathname !== "/") {
            return redirect(pathname);
          } else {
            return redirect("/home");
          }
        } else {
          message.error(rsl_info.msg);
        }
      }
    } else {
      // need to relogin
      message.error("token 过期，请重新登录");
      storeDispatch(sliceActions_account.removeToken());
      storeDispatch(sliceActions_account.removeInfo());
      return redirect("/login");
    }
  }

  return null;
};
const Context = createContext<null | {
  ref_card: React.MutableRefObject<any>;
  setState_selectedKey_menu: React.Dispatch<React.SetStateAction<string>>;
}>(null);
const Component = () => {
  const [state_collapsed, setState_collapsed] = useState(false);
  const location = useLocation();
  const [state_selectedKey_menu, setState_selectedKey_menu] = useState(map_routeToKey_menu.get(location.pathname) || "");
  const submit = useSubmit();
  const element_menuFold = (() => {
    return React.createElement(state_collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: style.trigger,
      onClick: () => { setState_collapsed(!state_collapsed) }
    })
  })();
  const option_dropdownMenu: MenuProps = {
    items: [
      { label: stroeSelector_account().roleName, key: "role" },
      { label: "退出登录", key: "logout", danger: true },
    ],
    onClick: async ({key}) => {
      switch(key) {
        case "logout":
          await reqLogout();
          storeDispatch(sliceActions_account.removeToken());
          storeDispatch(sliceActions_account.removeInfo());
          submit(null, {action: "/login"});
          break;
      }
    }
  };
  const handleClick_menu: MenuProps["onClick"] = ({ key }) => {
    const route = map_keyToRoute_menu.get(key);
    setState_selectedKey_menu(key);
    if (route) submit(null, {method: "GET", action: route});
  };
  const ref_card = useRef<any>(null);

  return (
    <Layout className={style["layout"]}>
      <Sider trigger={null} collapsible collapsed={state_collapsed}>
        <div className={style["sider-content"]}>
          <div className={style["sider-content-logo"]}></div>
          <div className={style["sider-content-menu"]}>
            <Menu
              items={produceItems_menu()}
              theme="dark"
              mode="inline"
              selectedKeys={[state_selectedKey_menu]}
              onClick={handleClick_menu}
            ></Menu>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header className={style["header"]} style={{ backgroundColor: "#fff", padding: "0px" }}>
          <div className={style["header-left"]}>
            {element_menuFold}
          </div>
          <div className={style["header-right"]}>
            <Dropdown menu={option_dropdownMenu}>
              <Avatar size="large" src={imageUrl(stroeSelector_account().avatar)} />
            </Dropdown>
          </div>
        </Header>
        <Content className={style["content"]}>
          <Card ref={ref_card} style={{
            width: "100%",
            height: "100%",
            overflow: "scroll",
          }}>
            <Context.Provider value={{ref_card, setState_selectedKey_menu}}>
              <Outlet></Outlet>
            </Context.Provider>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

const route: RouteObject = {
  path: "/",
  loader,
  Component,
  children: [
    home,
    user,
    right,
    news,
    audit,
    publish,
  ]
};
export default route;
export {
  Context as Context_Root
};