import { News } from "~/api/type";

export interface Prop_NewsPreviewLink {
  newsId: News["_id"];
  newsTitle: News["title"];
}
export interface NewsPreviewLinkType {
  (prop: Prop_NewsPreviewLink): React.ReactNode;
}