import { createApp } from "vue";
import App from "@/App.vue";
// import "@/router/permission";
import myPlugins from "@/utils/plugins";
//引入element-plus相关样式
import "element-plus/dist/index.css";
import i18n from "@/assets/i18nInternational/index";

const app = createApp(App);
app.use(myPlugins);
app.use(i18n);
app.mount("#app");
