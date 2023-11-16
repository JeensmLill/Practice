import { News_Super } from "~/api/type";

export interface Prop_NewsPreview {
  news?: News_Super;
  title?: string;
  category?: string;
  author?: string;
  content?: string;
}
export interface NewsPreviewType {
  (prop: Prop_NewsPreview): React.ReactNode;
}