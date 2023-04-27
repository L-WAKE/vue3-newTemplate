import { defineStore } from "pinia";
// import { getPower } from "@/api/commonApi";

export const commonStore = defineStore("common-store", {
  state: () => ({
    token: null,
    menuTabs: [],
    levelMenu: [],
    tagList: [{ name: "首页", path: "home" }],
    buttonPower: [], //按钮权限
  }),
  getters: {},
  actions: {
    setButtonPower(list) {
      this.buttonPower = list;
    },
    setToken(token) {
      this.token = token;
    },
    setLevelMenu(tab) {
      this.levelMenu = tab;
    },
    setTagList(tab) {
      this.tagList = tab;
    },
    setMenuTabs(list) {
      this.menuTabs = list;
    },
    async getMenuTabs() {
      //获取菜单权限
      try {
        // const res = await getPower();
        if (res.status == 1) {
          return res.data.rolelimit || null;
        } else {
          window.$message.error("登录已过期，请重新登录");
          localStorage.clear();
          window.location.replace("/login");
          window.location.reload();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
