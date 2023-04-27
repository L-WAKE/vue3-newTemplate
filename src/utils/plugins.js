import { commonStore } from "@/store/common";
import router from "@/router";
import pinia from "@/store";
//引入element-plus
import ElementPlus from "element-plus";

export default {
  install(app, options) {
    app.directive("power", {
      //权限指令
      created(el, binding) {
        const counterStore = commonStore();
        const list = counterStore.buttonPower;
        if (Array.isArray(binding.value)) {
          let find = -1;
          binding.value.forEach((item) => {
            let _tmp = list.findIndex((itm) => item == itm.url_info);
            if (_tmp > -1) {
              find = _tmp;
            }
          });
          find == -1 && (el.style.display = "none");
        } else {
          const findPower = list.findIndex(
            (item) => item.url_info == binding.value
          );
          findPower == -1 && (el.style.display = "none");
        }
      },
    });
    app.use(router);
    app.use(pinia);
    app.use(ElementPlus);
  },
};
