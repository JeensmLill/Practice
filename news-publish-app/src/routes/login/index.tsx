import style from "./index.module.scss";

import {useSubmit,redirect} from "react-router-dom";
import type {ActionFunction, RouteObject} from "react-router-dom";
import {Row, Col, Form, Input, Button, message} from "antd";
import type {FormProps} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { reqLogin } from "~/api/account";
import type {Form_Login,Response_Login} from "~/api/account/type";
import { storeDispatch } from "~/store";
import { sliceActions_account } from "~/store/reducers/account";

const action: ActionFunction = async ({request}) => {
  const form: Form_Login = await request.json();
  const rsl: Response_Login = await reqLogin(form);
  if(rsl.code === 200) {
    storeDispatch(sliceActions_account.setToken(rsl.data.token));
    return redirect("/home");
  } else {
    message.error(rsl.msg);
    return null;
  } 
};
const Component = () => {
  const router_submit = useSubmit();
  const handleFinish_form: FormProps["onFinish"] = (values) => {
    router_submit(values, {method: "POST", encType: "application/json"});
  }
  return (
    <div className={style["layout"]}>
      <Row>
        <Col span={12}></Col>
        <Col span={12}>
          <Form className={style["form"]} onFinish={handleFinish_form}>
            <h1>Hello</h1>
            <h2>欢迎来到 新闻发布管理系统</h2>
            <Form.Item name="username"
              rules={[{required: true, message: "请输入用户名"}]}
            >
              <Input prefix={<UserOutlined/>} placeholder="请输入用户名"/>
            </Form.Item>
            <Form.Item name="password"
              rules={[{required: true, message: "请输入密码"}]}
            >
              <Input prefix={<LockOutlined/>} type="password" placeholder="请输入密码"/>
            </Form.Item>
            <Form.Item>
              <Button className={style["btn"]} type="primary" htmlType="submit">登录</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

const route: RouteObject = {
  path: "/login",
  action,
  Component,
};
export default route;