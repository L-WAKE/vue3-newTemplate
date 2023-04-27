import router from "./index";
import { dynamicRotuer, notfind, childManagelevel } from "./router-all-dynamic";
import { commonStore } from "@/store/common";
import { sortList } from "@/utils/baseUtil";

let isAddRouter = false; //标志是否已生成菜单

router.beforeEach(async (to, from, next) => {
  const counterStore = commonStore();
  const token = localStorage.getItem("token");
  if (
    to.path == "/login" ||
    to.path == "/login-cas" ||
    to.path == "/login-local" ||
    to.path == "/redirect-cas"
  ) {
    return next();
  }
  if (!token) {
    return next("/login");
  }
  if (!isAddRouter) {
    const routeDyn = (await counterStore.getMenuTabs()) || null;
    if (!routeDyn || JSON.stringify(routeDyn) == "{}") {
      return next("/login");
    }
    const allList = handleLimit(routeDyn);
    if (allList.length == 0) {
      window.$message.error("该用户没有菜单权限");
      localStorage.clear();
      return next("/login");
    }
    setMentList(allList);
    setButtonPower(allList);
    isAddRouter = true;
    next({ ...to, replace: true });
  } else {
    next();
  }
});

//设置按钮权限数组
function setButtonPower(list) {
  let arr = [];
  const counterStore = commonStore();
  list.forEach(
    (item) => item.limit_type == "WEB_MENU_FUNCTION" && arr.push(item)
  );
  counterStore.setButtonPower(arr);
}

// 动态生成菜单
function setMentList(list) {
  const counterStore = commonStore();
  let menuList = [];
  list.map((item) => {
    if (!item.up_menu_func_id) {
      item.name = item.menu_func_name;
      item.path = item.url_info;
      item.icon = item.icon_url;
      item.children = [];
    }
    list.forEach((key, idx) => {
      if (
        key.up_menu_func_id &&
        key.up_menu_func_id == item.menu_func_id &&
        item.children
      ) {
        item.children.push({
          name: key.menu_func_name,
          path: key.url_info,
          icon: key.icon_url,
          ...key,
        });
      }
    });
  });
  list.map((item) => {
    if (item.children) menuList.push(item);
  });
  let sortArr = handleSortList(menuList);
  counterStore.setMenuTabs(sortArr);
  console.log("menuList", sortArr);
  setRouter(sortArr);
}

//对菜单按order_id进行排序
function handleSortList(list) {
  let sortArr = sortList(list, "order_id");
  sortArr.forEach((item) => {
    if (item.children && item.children.length > 0) {
      item.children = sortList(item.children, "order_id");
    }
  });
  return sortArr;
}

// 动态生成路由
function setRouter(menuList) {
  const haveList = dynamicRotuer[0].children;
  let newRoute = [];
  let menuListChild = [];
  menuList.forEach((item) => {
    if (item.children && item.children.length)
      menuListChild = menuListChild.concat(item.children);
  });
  for (let key in haveList) {
    if (key == "0") newRoute.push(haveList[key]);
    let find = menuListChild.find(
      (item) => item.url_info == haveList[key].name
    );
    find &&
      (haveList[key]["meta"] = find || {}) &&
      newRoute.push(haveList[key]);
  }
  for (let key in newRoute) {
    //判断是否有一级菜单权限添加该菜单的二级页面
    let childPages = childManagelevel.filter(
      (el) => el.pName == newRoute[key].name
    );
    if (childPages && childPages.length) {
      newRoute = newRoute.concat(childPages);
    }
  }
  dynamicRotuer[0].children = newRoute;
  router.addRoute(dynamicRotuer[0]);
  router.addRoute(notfind); //最后添加404页面 防止页面刷新重定向到404
}

//合并去重用户角色权限
function handleLimit(obj) {
  if (!obj) return [];
  let allList = [];
  for (let key in obj) {
    allList = allList.concat(obj[key]);
  }
  if (allList.length < 1) return [];
  let map = new Map();
  for (let item of allList) {
    map.set(item.menu_func_id, item);
  }
  allList = [...map.values()];
  return allList || [];
}
