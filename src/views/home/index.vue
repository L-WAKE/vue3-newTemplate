<template>
  <div>这是首页</div>
  <el-row class="mb-4 layout-flex">
    <el-button @click="postRequest">发请求post</el-button>
    <el-button @click="getRequest" type="primary">发请求get</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
</template>

<script setup>
import { login, getInfo } from "@/api/commonApi";

const postRequest = async () => {
  const res = await login();
};
const getRequest = async () => {
  const res = await getInfo();
};
</script>
