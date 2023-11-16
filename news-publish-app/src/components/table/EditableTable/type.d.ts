import { ButtonProps, TableProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { CellType_EditableCell, ImageProp_EditableCell, SelectProp_EditableCell } from "./EditableCell/type";

interface BaseExtraColumnType<EditableType extends boolean | undefined = any> {
  editable?: EditableType;
}
type OthersExtraColumnType<EditableType> = EditableType extends false
  ? BaseExtraColumnType<EditableType>
  & {cellType: Exclude<CellType_EditableCell, "image" | "select">;}
  : BaseExtraColumnType<EditableType>
  & {cellType: Exclude<CellType_EditableCell, "image" | "select">;};
type ImageExtraColumnType<EditableType> = EditableType extends false
  ? BaseExtraColumnType<EditableType>
  & {cellType: "image";}
  : BaseExtraColumnType<EditableType>
  & {
    cellType: "image";
    uploadPropName: ImageProp_EditableCell<true>["uploadProp"]["name"];
    uploadPropAction: ImageProp_EditableCell<true>["uploadProp"]["action"];
    authorization?: ImageProp_EditableCell<true>["authorization"];
  };
type SelectExtraColumnType<EditableType> = EditableType extends false
  ? BaseExtraColumnType<EditableType>
  & {cellType: "select";}
  : BaseExtraColumnType<EditableType>
  & {
    cellType: "select";
    selectOptions: SelectProp_EditableCell<true>["selectOptions"];
  };
// [1] property types for expanding antd columns on Table component
type ExtraColumnType<EditableType> =
  | OthersExtraColumnType<EditableType>
  | ImageExtraColumnType<EditableType>
  | SelectExtraColumnType<EditableType>;
// [1] expand antd columns on Table component
type EditableColumn<EditableType> =
  & ColumnsType<RecordType>[number]
  & Required<Pick<ColumnsType<RecordType>[number], "dataIndex">>
  & ExtraColumnType<EditableType>;
type EditableColumns = EditableColumn<boolean>[];
interface Prop<RecordType> {
  editableColumns: EditableColumns;
  rowKey: string;
  // [1] customize antd TableProps type
  // Generic Function generic type parameter, 'RecordType', linking to 'TableProps' inside
  tableProp:
    & TableProps<RecordType>
    & Required<Pick<TableProps<RecordType>, "dataSource">>;
  editable?: boolean;
  deletable?: boolean;
  editButtonProp?: Omit<ButtonProps, "onClick" | "disable">;
  deleteButtonProp?: Omit<ButtonProps, "onClick" | "disable">;
  operationColumn?: Omit<ColumnsType<any>[number], "render">;
  cbIsRoWEditable?: (record: RecordType) => boolean;
  onCancelEdit?: (formData: any, record: RecordType) => void | Promise<any>;
  onSaveEdit?: (formData: any, record: RecordType) => void | Promise<any>;
  onDelete?: (record: RecordType) => void | Promise<any>;
  addOperation?: (operationDisable: boolean, record: RecordType) => React.ReactNode;
}
export interface ComponentType {
  // [1] Generic Function, 'RecordType' emulating antd Table component for customizing antd TableProps type
  <RecordType extends object = any>(prop: Prop<RecordType>): React.JSX.Element;
}

export {
  Prop as Prop_EditableTable,
  EditableColumns as EditableColumns_EditableTable,
  EditableColumn as EditableColumn_EditableTable,
};