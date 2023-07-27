import { createI18n } from "vue-i18n";
// 从语言包文件中导入语言包对象
import zh from "./language-zh";
import en from "./language-en";
const messages = {
  zh: zh,
  en: en,
};
const i18n = createI18n({
  messages,
  legacy: false, //在vue3中一定要置为false，不然无法运行
  globalInjection: true, //是否全局注入，开启，方便后续使用
  locale: "zh",
});
export default i18n;
