import { FormItemProps } from "antd";
import { UploadProps } from "antd/es/upload";
import { DefaultOptionType } from "antd/lib/select";

/*
 * [1] Narrowing advance 
 * Generic Object + Assertion Function.
 * 
 * [2] decide if require programer to provide more data base on programer provided data
 * Generic Function + Conditional Type
 */
// [1] the base Generic Object for designing the type which can narrow via assertion function
interface BaseProp<EditableType, T extends string = any, D = any> {
  type: T;
  value: D;
  rowEidting: boolean;
  // [2] the final type definition decides where 'EditableType' be extracted from
  // the field better not be optional
  // if it is optinal, you may be enable to narrow the type of 'editable' to narrow 'EditableType'
  // because 'editable' type is 'EditableType | undefined' not 'EditableType', when 'editable' is optional
  // if 'editable' type must be optional, recommand use Type Predicate to narrow 'EditableType'
  editable: EditableType;
}
// [2] Conditional Type base on 'EditableType'
type CommonProp<EditableType, T, D> = EditableType extends false
  ? BaseProp<EditableType, T, D>
  : BaseProp<EditableType, T, D>
  & {
    formItemProp: FormItemProps & Required<Pick<FormItemProps, "name">>;
  }
type StringProp<EditableType> = EditableType extends false
  ? CommonProp<EditableType, "string", string>
  : CommonProp<EditableType, "string", string>
  & {
    columnTitle: string;
  };
type NumberProp<EditableType> = CommonProp<EditableType, "number", number>;
// type NumberProp<EditableType> = EditableType extends false
//   ? CommonProp<EditableType, "number", number>
//   : CommonProp<EditableType, "number", number>;
type ImageProp<EditableType> = (
  EditableType extends false
  ? CommonProp<EditableType, "image", string>
  : CommonProp<EditableType, "image", string>
  & {
    uploadProp: UploadProps & Required<Pick<UploadProps, "action" | "name">>;
    authorization?: string;
  }
) & {
  imgStyle?: React.HTMLAttributes<HTMLImageElement>["style"];
};
type SwitchProp<EditableType> = CommonProp<EditableType, "switch", boolean>
// type SwitchProp<EditableType> = EditableType extends false
//   ? CommonProp<EditableType, "switch", boolean>
//   : CommonProp<EditableType, "switch", boolean>
//   & {
// };
type SelectProp<EditableType> = EditableType extends false
  ? CommonProp<EditableType, "select", string>
  : CommonProp<EditableType, "select", string>
  & {
    selectOptions: DefaultOptionType[];
  };
// [1] 'Prop' which can narrow via assertion function
type Prop<EditableType = boolean> = 
  | StringProp<EditableType>
  | NumberProp<EditableType>
  | ImageProp<EditableType>
  | SwitchProp<EditableType>
  | SelectProp<EditableType>;
export interface ComponentType {
  // [2] Generic Function, to extract 'EditableType' from 'prop' param
  <EditableType extends boolean = any>(prop: Prop<EditableType>): React.ReactNode;
}
// [1] produce Union Type from 'Prop["type"]'
type CellType = Prop<any>["type"];

export {
  Prop as Prop_EditableCell,
  BaseProp as BaseProp_EditableCell,
  ImageProp as ImageProp_EditableCell,
  SelectProp as SelectProp_EditableCell,
  CellType as CellType_EditableCell,
};