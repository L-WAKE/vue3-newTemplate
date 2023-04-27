//对数组对象按某个属性值大小进行排序
export const sortList = (list, keys = "id") => {
  const compare = (keys) => {
    return function (a, b) {
      return a[keys] - b[keys];
    };
  };
  let newList = list.sort(compare(keys));
  return newList;
};
