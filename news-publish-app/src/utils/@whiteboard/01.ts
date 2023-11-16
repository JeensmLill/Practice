// instance
// const param = {
// 	innerParam: {
// 		value: false
// 	}
// };
const func: Func = (param) => {
  if(param.test) {
    param.test
  }
  if(param.innerParam.value) {
    param.innerParam.value
  }
  return param.innerParam.value;
};
// func(param);

type InnerParam_01<K, T> = {
	value_01: K;
	value: T;
};
type Param_01<K, T> = {
  // T 分叉
	innerParam_01: InnerParam_01<K, T>;
  // T 原路
	innerParam: InnerParam<T>;
};
interface Func_01 {
	<K extends boolean = any, T extends boolean = any>(param: Param_01<K, T>): K;
}

const param_01 = {
	innerParam_01: {
		value_01: true,
    value: true
	},
	innerParam: {
		value: false
	}
};
const func_01: Func_01 = (param_01) => {
  if(param_01.innerParam_01.value) {
    param_01.innerParam_01.value
  }
  if(param_01.innerParam_01.value_01) {
    param_01.innerParam_01.value_01
  }
  
  return param_01.innerParam_01.value_01;
};
func_01(param_01);