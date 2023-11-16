import { News } from "~/api/type";

export interface Prop_NewsRewriteBtn {
  newsId: News["_id"];
  onRecordRemoved: Function;
  onRewrite: React.MouseEventHandler<HTMLElement>;
}
export interface NewsRewriteBtnType {
  (prop: Prop_NewsRewriteBtn): React.ReactNode;
}