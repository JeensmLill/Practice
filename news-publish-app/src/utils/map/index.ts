import {
  Function_mapFieldInData,
  Function_mapTree,
} from "./type";

export const mapFieldInData: Function_mapFieldInData = ({
  field_a,
  field_b,
  value_a,
  data
}) => {
  return data.find((item) => item[field_a] === value_a)[field_b];
};
export const mapTree: Function_mapTree = ({source, target}) => {
  let sourceDatas: any[] = [];
  sourceDatas.push(source.root);
  let store_sourceDatas: any[] = [];
  const targetRoot: any = {};
  let targetDatas: any[] = [];
  targetDatas.push(targetRoot);
  let store_targetDatas: any[] = [];
  const targetChildrenField = target.childrenField;
  const sourceChildrenField = source.childrenField;

  while(sourceDatas.length > 0) {
    sourceDatas.forEach((sourceData, index_data) => {
      const targetData = targetDatas[index_data];
      source.fields.forEach((field, index) => {
        targetData[target.fields[index]] = sourceData[field];
      });
      targetData[targetChildrenField] = [];
      sourceData[sourceChildrenField].forEach(() => {
        targetData[targetChildrenField].push({});
      });

      store_sourceDatas.push(...sourceData[sourceChildrenField]);
      store_targetDatas.push(...targetData[targetChildrenField]);
    });

    sourceDatas = store_sourceDatas;
    store_sourceDatas = [];
    targetDatas = store_targetDatas;
    store_targetDatas = [];
  }

  return targetRoot;
};