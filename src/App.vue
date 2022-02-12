<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { zhCN } from 'naive-ui';
import Menu from './components/common/Menu.vue';
</script>

<template>
  <n-config-provider>
    <n-message-provider :locale="zhCN">
      <!--    <div id="main">-->
      <n-layout>
        <n-layout has-sider>
          <n-layout-sider
            bordered
            show-trigger
            collapse-mode="width"
            :collapsed-width="64"
            :width="200"
            :native-scrollbar="false"
            style="height: 100vh"
          >
            <Menu id="menu" />
          </n-layout-sider>
          <n-layout>
            <router-view />
          </n-layout>
        </n-layout>
      </n-layout>
      <!--    </div>-->
    </n-message-provider>
  </n-config-provider>
  <!--  <img alt="Vue logo" src="./assets/logo.png" />-->
  <!--  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
</template>

<style scoped></style>

<style>
html,
body {
  height: 100%;
}
</style>
