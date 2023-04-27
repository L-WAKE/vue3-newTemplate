<template>
  <div>总的框架</div>
  <div>
    <router-view></router-view>
    <!-- <router-view v-slot="{ Component }">
      <keep-alive :max="12" :include="layoutReactive.keepAlive">
        <component :is="Component" />
      </keep-alive>
    </router-view> -->
  </div>
</template>

<script setup></script>
