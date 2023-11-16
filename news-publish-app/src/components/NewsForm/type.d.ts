import { FormInstance, FormProps, SelectProps } from "antd";

export interface FormData_News {
  title: string;
  newsCategory: string;
}
export interface Prop_NewsForm {
  formInstance: FormInstance<FormData_News>;
  selectOptions_newsCategory: SelectProps["options"];
  formProp?: Omit<FormProps, "form">;
}
export interface NewsFormType {
  (prop: Prop_NewsForm): React.ReactNode;
}