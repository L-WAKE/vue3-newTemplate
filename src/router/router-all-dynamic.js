export const dynamicRotuer = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home", //首页
        component: () => import("@/views/home/home.vue"),
        name: "home",
      },
      {
        path: "/moreAnnouncement", // 更多公告
        component: () => import("@/views/home/moreAnnouncement.vue"),
        name: "moreAnnouncement",
      },
      {
        path: "/indexMenu", //指标体系
        component: () => import("@/views/index/indexMenu.vue"),
        name: "indexMenu",
      },
    ],
  },
];

//404页面
export const notfind = {
  path: "/:catchAll(.*)", // 不识别的path自动匹配404
  name: "NotFind",
  component: () => import("@/views/404.vue"),
};

//列表二级页面
export const childManagelevel = [
  {
    path: "/idxRegister", //注册原子指标
    component: () => import("@/views/index/level-page/idxRegister.vue"),
    name: "idxRegister",
    pName: "indexList",
    meta: { fastMenu: true },
  },
  {
    path: "/expressRegister", //注册计算指标
    component: () => import("@/views/index/level-page/expressRegister.vue"),
    name: "expressRegister",
    pName: "indexList",
  },
];
