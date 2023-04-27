import axios from "axios";
import qs from "qs";

const http = axios.create({
  baseURL:
    "https://www.fastmock.site/mock/74eef8436a20e6434087827975b8d780/myTest/",
  // baseURL: import.meta.env.VITE_BASE_URL,
  // timeout: 15000,
  headers: { "Content-Type": "application/json;charset=UTF-8" },
  withCredentials: true,
});

// 请求对象
http.interceptors.request.use(
  (config) => {
    let ticket = localStorage.getItem("token") || "";
    if (config.other == "down") {
      //下载
      config.data = true;
      config.responseType = "blob";
      config.headers["Content-Type"] = "application/octet-stream";
      return config;
    }
    if (config.other == "upload") {
      //上传
      config.headers["Content-Type"] =
        "multipart/form-data;boundary=" + new Date().getTime();
      return config;
    }
    if (config.other == 1) {
      config.data && (config.data = qs.stringify(config.data)); // 转为formdata数据格式
      config.headers["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
    } else {
      config.data && (config.data = qs.parse(config.data));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应对象
http.interceptors.response.use(
  (response) => {
    if (response.status != 200) {
      window.$message.error(response.data.msg || "请求异常");
      return Promise.reject(new Error(response.data.msg || "请求异常"));
    }
    return response.data || response;
  },
  (error) => {
    window.$message.error(error.message || "请求异常");
    return Promise.reject(error);
  }
);

export const Post = (url, data = {}, config = null) => {
  return http.post(url, data, { other: config });
};
export const Get = (url, params = {}, config = null) => {
  return http.get(url, { params, other: config });
};
export const Delete = (url, data = {}, config = null) => {
  return http.delete(url, { data, other: config });
};
export const Put = (url, data = {}, config = null) => {
  return http.put(url, data, { other: config });
};
