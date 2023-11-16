import request from "~/utils/request";
import {
  Request_AddNews,
  Request_AddNewsCategory,
  Request_DeleteNews,
  Request_DeleteNewsCategory,
  Request_GetNewsAuditList_User,
  Request_GetNewsAuditingList,
  Request_GetNewsCategories,
  Request_GetNewsCategoryList,
  Request_GetNewsDraftList_User,
  Request_GetNewsPublishList_User,
  Request_GetOneNews,
  Request_GetPublishedNews,
  Request_UpdateNews,
  Request_UpdateNewsCategory,
  Response_AddNews,
  Response_AddNewsCategory,
  Response_DeleteNews,
  Response_DeleteNewsCategory,
  Response_GetNewsAuditList_User,
  Response_GetNewsAuditingList,
  Response_GetNewsCategories,
  Response_GetNewsCategoryList,
  Response_GetNewsDraftList_User,
  Response_GetNewsPublishList_User,
  Response_GetOneNews,
  Response_GetPublishedNews,
  Response_UpdateNews,
  Response_UpdateNewsCategory
} from "./type";

enum API {
  GET_NEWS = "/news/get",
  ADD_NEWS = "/news/add",
  GET_NEWS_LIST = "/news/list",
  UPDATE_NEWS = "/news/update",
  DELETE_NEWS = "/news/delete",
  ADD_NEWS_CATEGORY = "/news/categories/add",
  GET_NEWS_CATEGORY_LIST = "/news/categories/list",
  UPDATE_NEWS_CATEGORY = "/news/categories/update",
  DELETE_NEWS_CATEGORY = "/news/categories/delete",
  GET_NEWS_CATEGORIES = "/news/categories",
  GET_NEWS_DRAFT_LIST = "/news/drafts/list",
  GET_NEWS_AUDITING_LIST = "/news/auditing/list",
  GET_NEWS_AUDIT_LIST = "/news/audit/list",
  GET_NEWS_PUBLISH_LIST = "/news/publish/list",
  GET_PUBLISHED_NEWS = "/news/published",
};

export const reqAddNews: Request_AddNews = (form) => {
  return request.post<any, Response_AddNews>(API.ADD_NEWS, form);
};

export const reqAddNewsCategory: Request_AddNewsCategory = (form) => {
  return request.post<any, Response_AddNewsCategory>(API.ADD_NEWS_CATEGORY, form);
};
export const reqGetNewsCategoryList: Request_GetNewsCategoryList = (form) => {
  return request.get<any, Response_GetNewsCategoryList>(`${API.GET_NEWS_CATEGORY_LIST}/${form.page}/${form.limit}`);
};
export const reqUpdateNewsCategory: Request_UpdateNewsCategory = (form) => {
  return request.patch<any, Response_UpdateNewsCategory>(`${API.UPDATE_NEWS_CATEGORY}/${form._id}`, form);
};
export const reqDeleteNewsCategory: Request_DeleteNewsCategory = (form) => {
  return request.delete<any, Response_DeleteNewsCategory>(`${API.DELETE_NEWS_CATEGORY}/${form._id}`);
};
export const reqGetNewsCategories: Request_GetNewsCategories = () => {
  return request.get<any, Response_GetNewsCategories>(API.GET_NEWS_CATEGORIES);
};

export const reqGetNewsDraftList_user: Request_GetNewsDraftList_User = (form) => {
  return request.get<any, Response_GetNewsDraftList_User>(`${API.GET_NEWS_DRAFT_LIST}/${form.userId}/${form.page}/${form.limit}`);
};
export const reqGetOneNews: Request_GetOneNews = (form) => {
  return request.get<any, Response_GetOneNews>(`${API.GET_NEWS}/${form._id}`);
};
export const reqUpdateNews: Request_UpdateNews = (form) => {
  return request.patch<any, Response_UpdateNews>(`${API.UPDATE_NEWS}/${form._id}`, form);
};
export const reqDeleteNews: Request_DeleteNews = (form) => {
  return request.delete<any, Response_DeleteNews>(`${API.DELETE_NEWS}/${form._id}`);
};
export const reqGetNewsAuditingList: Request_GetNewsAuditingList = (form) => {
  return request.get<any, Response_GetNewsAuditingList>(`${API.GET_NEWS_AUDITING_LIST}/${form.page}/${form.limit}`);
};
export const reqGetNewsAuditList_user: Request_GetNewsAuditList_User = (form) => {
  return request.get<any, Response_GetNewsAuditList_User>(`${API.GET_NEWS_AUDIT_LIST}/${form.userId}/${form.page}/${form.limit}`);
};
export const reqGetNewsPublishList_user: Request_GetNewsPublishList_User = (form) => {
  return request.get<any, Response_GetNewsPublishList_User>(`${API.GET_NEWS_PUBLISH_LIST}/${form.userId}/${form.publishState}/${form.page}/${form.limit}`);
};
export const reqGetPublishedNews: Request_GetPublishedNews = () => {
  return request.get<any, Response_GetPublishedNews>(API.GET_PUBLISHED_NEWS);
};