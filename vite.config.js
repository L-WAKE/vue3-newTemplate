import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";

export default defineConfig((config) => {
  const viteEnv = loadEnv(config.mode, `.env.${config.mode}`);
  const srcPath = fileURLToPath(new URL("./src", import.meta.url));
  const rootPath = fileURLToPath(new URL("./", import.meta.url));
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
          target: "http://192.168.10.214:8801/", //214
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/ssa"),
        },
      },
    },
  };
});
