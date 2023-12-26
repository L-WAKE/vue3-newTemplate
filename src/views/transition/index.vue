<template>
  <div>
    <p>登录页</p>
    <br />
    <span>测试 </span>
    <br />
    <button @click="testFun">点击</button>
  </div>
  <div>我是第二个根节点</div>
</template>

<script setup>
import { reactive } from "vue";
const templateDatas = reactive({
  testOne: "这是一个测试数据",
  testTwo: "001",
});
const testFun = function () {
  console.log("测试输出一个数据", templateDatas.testTwo);
};
</script>
