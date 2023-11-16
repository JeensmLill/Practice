type InnerParam<T> = {
	value: T;
};
type Param<T> = {
	innerParam: InnerParam<T>;
  test: T;
};
interface Func {
	<T extends boolean = any>(param: Param<T>): any;
}