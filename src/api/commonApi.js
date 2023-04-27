import { Post, Get, Put, Delete } from "@/utils/request";
export const login = (data) => Post("testPost/flow"); //登录
export const getInfo = () => Get("getTest/info");
