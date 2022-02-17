<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { zhCN } from 'naive-ui';
import Menu from './components/common/Menu.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
</script>

<template>
  <div id="app">
    <n-config-provider :locale="zhCN" style="height: 100%">
      <n-dialog-provider>
        <n-message-provider>
          <!--    <div id="main">-->
          <n-layout style="height: 100%">
            <n-layout has-sider style="height: 100%">
              <router-view />
            </n-layout>
          </n-layout>
          <!--    </div>-->
        </n-message-provider>
      </n-dialog-provider>
    </n-config-provider>
  </div>
</template>

<style scoped></style>

<style>
html,
body,
#app {
  height: 100%;
  background-color: rgba(38, 24, 49, 0.6);
}
</style>
