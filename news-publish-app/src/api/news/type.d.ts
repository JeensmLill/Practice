import { APIRequest, APIResponse, News, NewsCategory, News_Super, Param_GetList, User } from "../type";

export type Form_GetNewsCategoryList = Param_GetList;
export type Data_GetNewsCategoryList = {
  total: number;
  newsCategories: NewsCategory[];
};
export type Response_GetNewsCategoryList = APIResponse<Data_GetNewsCategoryList>;
export type Request_GetNewsCategoryList = APIRequest<Response_GetNewsCategoryList, Form_GetNewsCategoryList>;

export type Form_AddNewsCategory = Omit<NewsCategory, "_id">;
export type Response_AddNewsCategory = APIResponse;
export type Request_AddNewsCategory = APIRequest<Response_AddNewsCategory, Form_AddNewsCategory>;

export type Form_UpdateNewsCategory =
  & Pick<NewsCategory, "_id">
  & Partial<Form_AddNewsCategory>;
export type Response_UpdateNewsCategory = APIResponse;
export type Request_UpdateNewsCategory = APIRequest<Response_UpdateNewsCategory, Form_UpdateNewsCategory>;

export type Form_DeleteNewsCategory = Pick<NewsCategory, "_id">;
export type Response_DeleteNewsCategory = APIResponse;
export type Request_DeleteNewsCategory = APIRequest<Response_DeleteNewsCategory, Form_DeleteNewsCategory>;

export type Data_GetNewsCategories = {
  newsCategories: NewsCategory[];
};
export type Response_GetNewsCategories = APIResponse<Data_GetNewsCategories>;
export type Request_GetNewsCategories = APIRequest<Response_GetNewsCategories,>;

export type Form_AddNews =
  & Pick<News, "title" | "content" | "auditState">
  & {
    _newsCategory: string;
    _user: string;
  };
export type Response_AddNews = APIResponse;
export type Request_AddNews = APIRequest<Response_AddNews, Form_AddNews>;

export type Form_UpdateNews =
  & Partial<News>
  & Pick<News, "_id">
  & {
    _newsCategory?: string;
    _user?: string;
  };
export type Response_UpdateNews = APIResponse;
export type Request_UpdateNews = APIRequest<Response_UpdateNews, Form_UpdateNews>;

export type Form_GetOneNews = Pick<News, "_id">;
export type Data_GetOneNews = {
  news: News_Super;
};
export type Response_GetOneNews = APIResponse<Data_GetOneNews>;
export type Request_GetOneNews = APIRequest<Response_GetOneNews, Form_GetOneNews>;

export type Form_GetNewsDraftList_User = Param_GetList & {userId: User["_id"]};
export type Data_GetNewsDraftList_User = {
  total: number;
  news: News_Super[];
};
export type Response_GetNewsDraftList_User = APIResponse<Data_GetNewsDraftList_User>;
export type Request_GetNewsDraftList_User = APIRequest<Response_GetNewsDraftList_User, Form_GetNewsDraftList_User>;

export type Form_DeleteNews = Pick<News, "_id">;
export type Response_DeleteNews = APIResponse;
export type Request_DeleteNews = APIRequest<Response_DeleteNews, Form_DeleteNews>;

export type Form_GetNewsAuditingList = Param_GetList;
export type Data_GetNewsAuditingList = {
  total: number;
  news: News_Super[];
};
export type Response_GetNewsAuditingList = APIResponse<Data_GetNewsAuditingList>;
export type Request_GetNewsAuditingList = APIRequest<Response_GetNewsAuditingList, Form_GetNewsAuditingList>;

export type Form_GetNewsAuditList_User = Param_GetList & {userId: User["_id"]};
export type Data_GetNewsAuditList_User = {
  total: number;
  news: News_Super[];
};
export type Response_GetNewsAuditList_User = APIResponse<Data_GetNewsAuditList_User>;
export type Request_GetNewsAuditList_User = APIRequest<Response_GetNewsAuditList_User, Form_GetNewsAuditList_User>;

export type Form_GetNewsPublishList_User =
 & Param_GetList
 & {userId: User["_id"], publishState: number};
export type Data_GetNewsPublishList_User = {
  total: number;
  news: News_Super[];
};
export type Response_GetNewsPublishList_User = APIResponse<Data_GetNewsPublishList_User>;
export type Request_GetNewsPublishList_User = APIRequest<Response_GetNewsPublishList_User, Form_GetNewsPublishList_User>;

export type Data_GetPublishedNews = {
  news: Omit<News_Super, "_user" | "createdAt">[];
};
export type Response_GetPublishedNews = APIResponse<Data_GetPublishedNews>;
export type Request_GetPublishedNews = APIRequest<Response_GetPublishedNews>;