export interface Param_mapFieldInData {
  field_a: string,
  field_b: string,
  value_a: any,
  data: any[]
}
export type Return_mapFieldInData = any;
export interface Function_mapFieldInData {
  (param: Param_mapFieldInData): Return_mapFieldInData;
}

export interface Field_mapTree {
  fields: string[];
  childrenField: string;
}
export interface Param_mapTree {
  source: Field_mapTree & {root: any};
  target: Field_mapTree;
}
export type Return_mapTree = any;
export interface Function_mapTree {
  (param: Param_mapTree): Return_mapTree;
}