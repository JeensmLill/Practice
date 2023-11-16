import axios from "axios";
import {message} from "antd";
import { stroeSelector_account } from "~/store";

export const produceAuthorization = () => {
    return `Bearer ${stroeSelector_account().token}`;
};
export const produceRequestUrl = (path: string) => {
    return import.meta.env.VITE_APP_BASE_API + path;
};
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 12000
});
request.interceptors.request.use((req) => {
    req.headers.setAuthorization(produceAuthorization());
    return req;
})
request.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        let msg = "";
        const code = err.code;
        switch(code) {
            case 401:
                msg = "TOKEN 过期";
                break;
            case 403:
                msg = "无权访问";
                break;
            case 404:
                msg = "请求地址错误";
                break;
            case 500:
                msg = "服务器出现问题";
                break;
            default:
                msg = "网络出现问题";
                break;
        }
        message.error(msg);
        return Promise.reject(err);
    }
)

export default request