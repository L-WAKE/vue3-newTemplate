import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";

export default defineConfig((config) => {
  const viteEnv = loadEnv(config.mode, `.env.${config.mode}`);
  const srcPath = fileURLToPath(new URL("./src", import.meta.url));
  const rootPath = fileURLToPath(new URL("./", import.meta.url));
  console.log("2222222222", viteEnv);
  console.log("3333333333", config);
  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        "@": srcPath,
        "~": rootPath,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/common.scss";',
        },
      },
    },
    plugins: [vue()],
    server: {
      fs: {
        strict: false,
      },
      host: "0.0.0.0",
      port: 8080,
      open: false, //启动完自动打开浏览器
      proxy: {
        "/api": {
          // target: 'http://zbkservice.bigdata.192.168.10.216.nip.io:30080/',	//测试环境
          // target: "https://www.fastmock.site/mock/74eef8436a20e6434087827975b8d780/myTest/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/ssa"),
        },
      },
    },
  };
});
