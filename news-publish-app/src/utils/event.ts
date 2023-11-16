export const debounce_latter = (waitTime: number, executor: Function) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args_inner: any[]) => {
    if(timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      executor(...args_inner);
    }, waitTime);
  };
}
export const debounce_immediate = (waitTime: number, executor: Function) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args_inner: any[]) => {
    if(timeout) {
      clearTimeout(timeout);
    } else {
      executor(...args_inner);
    }
    timeout = setTimeout(() => {
      timeout = null;
    }, waitTime);
  };
}
export const throttle = (waitTime: number, executor: Function) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args_inner: any[]) => {
    if(!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        executor(...args_inner);
      }, waitTime);
    }
  }
}