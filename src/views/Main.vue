<template>
  <Menu id="menu" v-if="path !== '/login' && path !== '/'" />
  <n-layout>
    <router-view />
  </n-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Menu from '../components/common/Menu.vue';

let path = ref('');
onMounted(() => {
  const router = useRouter();
  path.value = router.currentRoute.value.path;
  console.log(path.value);
});
</script>
<script lang="ts">
export default {
  name: 'Main',
};
</script>

<style scoped></style>
