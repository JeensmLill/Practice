import ReactQuill from 'react-quill';

export interface Prop_NewsEditor {
  defaultValue?: string;
  getContent?: (content: string) => void;
}
export interface NewsEditorType {
  (prop: Prop_NewsEditor): React.ReactNode;
}