export const isPlainObject = (val: any): val is object => {
  return Object.prototype.toString.call(val) === "[object Object]";
};

export const isValidValue = (val: any): boolean => {
  return val !== undefined && val !== null;
};
