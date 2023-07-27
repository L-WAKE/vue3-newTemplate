<template>
  <div>这是首页{{ $t("dataSetRep") }}</div>
  <el-row class="mb-4 layout-flex">
    <el-button @click="postRequest">{{ $t("test") }}发请求post</el-button>
    <el-button @click="getRequest" type="primary">发请求get</el-button>
    <el-button @click="testI18n" type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
</template>

<script setup>
import { login, getInfo } from "@/api/commonApi";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const $t = t;
const postRequest = async () => {
  const res = await login();
};
const getRequest = async () => {
  const res = await getInfo();
};
const testI18n = () => {
  let value = $t("test");
  console.log("value", value);
};
</script>
