import { createApp } from "vue";
import App from "@/App.vue";
// import "@/router/permission";
import myPlugins from "@/utils/plugins";
//引入element-plus相关样式
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(myPlugins);
app.mount("#app");
