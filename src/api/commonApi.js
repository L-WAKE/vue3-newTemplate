import { Post, Get, Put, Delete } from "@/utils/request";
export const login = (data) => Post("/sso/login.action", data, 1); //登录
export const loginOut = () => Post("/sso/loginout.action", {});
export const getListClassify = () => Post("/gdl/classify/list"); //获取指标分类
export const downloadExcel = () => Get("/gdl/import/template", {}, "down"); //下载模板
export const uploadGdLExcel = (data) =>
  Post("/gdl/import/parse", data, "upload"); //上传
export const getPower = () =>
  Post("/sysUtilController/getUserInfoByTicket.action"); //获取权限信息
