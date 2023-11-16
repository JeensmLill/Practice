import type {
  MenuProps,
} from "antd";
import {
  AppstoreAddOutlined,
  AuditOutlined,
  EditOutlined,
  HomeOutlined,
  LaptopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { hasRight } from "../@utils/route";

export const items_menu: MenuProps["items"] = [
  { label: "首页", key: "Home", icon: <HomeOutlined /> },
  {
    label: "用户管理", key: "User", icon: <UserOutlined />, children: [
      { label: "用户列表", key: "User-list", icon: <UserOutlined /> },
    ]
  },
  {
    label: "权限管理", key: "Right", icon: <AppstoreAddOutlined />, children: [
      { label: "角色列表", key: "Right-roleList", icon: <AppstoreAddOutlined /> },
      { label: "权限列表", key: "Right-list", icon: <AppstoreAddOutlined /> },
    ]
  },
  {
    label: "新闻管理", key: "News", icon: <EditOutlined />, children: [
      { label: "撰写新闻", key: "News-write", icon: <EditOutlined /> },
      { label: "草稿箱", key: "News-draftList", icon: <EditOutlined /> },
      { label: "新闻分类", key: "News-category", icon: <EditOutlined /> },
    ]
  },
  {
    label: "审核管理", key: "Audit", icon: <AuditOutlined />, children: [
      { label: "审核新闻", key: "Audit-auditingList", icon: <AuditOutlined /> },
      { label: "审核列表", key: "Audit-list", icon: <AuditOutlined /> },
    ]
  },
  {
    label: "发布管理", key: "Publish", icon: <LaptopOutlined />, children: [
      { label: "待发布", key: "Publish-publishingList", icon: <LaptopOutlined /> },
      { label: "已发布", key: "Publish-publishedList", icon: <LaptopOutlined /> },
      { label: "已下线", key: "Publish-sunsetList", icon: <LaptopOutlined /> },
    ]
  },
];
export const produceItems_menu = (): MenuProps["items"] => {
  return [
    hasRight("route", "Home") ? { label: "首页", key: "Home", icon: <HomeOutlined /> } : null,
    hasRight("route", "User") ? {
      label: "用户管理", key: "User", icon: <UserOutlined />, children: [
        hasRight("route", "User-list") ? { label: "用户列表", key: "User-list", icon: <UserOutlined /> } : null,
      ]
    } : null,
    hasRight("route", "Right") ? {
      label: "权限管理", key: "Right", icon: <AppstoreAddOutlined />, children: [
        hasRight("route", "Right-roleList") ? { label: "角色列表", key: "Right-roleList", icon: <AppstoreAddOutlined /> } : null,
        hasRight("route", "Right-list") ? { label: "权限列表", key: "Right-list", icon: <AppstoreAddOutlined /> } : null,
      ]
    } : null,
    hasRight("route", "News") ? {
      label: "新闻管理", key: "News", icon: <EditOutlined />, children: [
        hasRight("route", "News-write") ? { label: "撰写新闻", key: "News-write", icon: <EditOutlined /> } : null,
        hasRight("route", "News-draftList") ? { label: "草稿箱", key: "News-draftList", icon: <EditOutlined /> } : null,
        hasRight("route", "News-category") ? { label: "新闻分类", key: "News-category", icon: <EditOutlined /> } : null,
      ]
    } : null,
    hasRight("route", "Audit") ? {
      label: "审核管理", key: "Audit", icon: <AuditOutlined />, children: [
        hasRight("route", "Audit-auditingList") ? { label: "审核新闻", key: "Audit-auditingList", icon: <AuditOutlined /> } : null,
        hasRight("route", "Audit-list") ? { label: "审核列表", key: "Audit-list", icon: <AuditOutlined /> } : null,
      ]
    } : null,
    hasRight("route", "Publish") ? {
      label: "发布管理", key: "Publish", icon: <LaptopOutlined />, children: [
        hasRight("route", "Publish-publishingList") ? { label: "待发布", key: "Publish-publishingList", icon: <LaptopOutlined /> } : null,
        hasRight("route", "Publish-publishedList") ? { label: "已发布", key: "Publish-publishedList", icon: <LaptopOutlined /> } : null,
        hasRight("route", "Publish-sunsetList") ? { label: "已下线", key: "Publish-sunsetList", icon: <LaptopOutlined /> } : null,
      ]
    } : null,
  ];
};
const pairs_keyAndRoute_menu = [
  { key: "Home", route: "/home" },
  { key: "User", route: "/user" },
  { key: "User-list", route: "/user/list" },
  { key: "Right", route: "/right" },
  { key: "Right-roleList", route: "/right/roleList" },
  { key: "Right-list", route: "/right/list" },
  { key: "News", route: "/news" },
  { key: "News-write", route: "/news/write" },
  { key: "News-draftList", route: "/news/draftList" },
  { key: "News-category", route: "/news/category" },
  { key: "Audit", route: "/audit" },
  { key: "Audit-auditingList", route: "/audit/auditingList" },
  { key: "Audit-list", route: "/audit/list" },
  { key: "Publish", route: "/publish" },
  { key: "Publish-publishingList", route: "/publish/publishingList" },
  { key: "Publish-publishedList", route: "/publish/publishedList" },
  { key: "Publish-sunsetList", route: "/publish/sunsetList" },
];
export const map_keyToRoute_menu = (() => {
  const map = new Map<string, string>()
  pairs_keyAndRoute_menu.forEach((keyRoutePair_menu) => {
    map.set(keyRoutePair_menu.key, keyRoutePair_menu.route)
  })
  return map
})();
export const map_routeToKey_menu = (() => {
  const map = new Map<string, string>()
  pairs_keyAndRoute_menu.forEach((keyRoutePair_menu) => {
    map.set(keyRoutePair_menu.route, keyRoutePair_menu.key)
  })
  return map
})();