import {DataIndex} from ".node_modules/.pnpm/registry.npmmirror.com+rc-table@7.26.0_react-dom@18.2.0_react@18.2.0/node_modules/rc-table/lib/interface";
import { EditableColumn_EditableTable } from "./type";

export const dataIndexToString = (dataIndex: DataIndex) => {
  switch(typeof dataIndex) {
    case "string":
      return dataIndex;
    case "number":
      return dataIndex.toString();
    case "object":
      return dataIndex.join("_");
  }
};
export const isEditableColumn_EditableTable__true__ = (target: EditableColumn_EditableTable<any>): target is EditableColumn_EditableTable<true> => {
  const {editable} = target;
  return editable === false ? false : true;
};
export type Type_DataIndex = DataIndex;
export const defaultValueCull = (target: any, source: any) => {
  if(typeof target !== "object" || typeof source !== "object") return false;
  const keys = Object.keys(target);

  keys.forEach((key) => {
    if(target[key] === source[key]) target[key] = undefined;
  });

  return true;
};