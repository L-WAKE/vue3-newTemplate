<template>
  <div id="nav">
    <router-view />
  </div>
</template>
<script setup>
import { onMounted } from "vue";
onMounted(() => {
  hiddenLoading();
});
const hiddenLoading = () => {
  let loading = document.querySelector(".init-loading");
  loading && (loading.style.display = "none");
};
</script>

<style>
#nav {
  height: 100%;
}
</style>
