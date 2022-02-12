<script lang="ts">
import { defineComponent, h, ref } from 'vue';
import { NIcon } from 'naive-ui';
import { Home as HomeIcon } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: '首页',
    key: '/home',
    icon: renderIcon(HomeIcon),
  },
];

export default defineComponent({
  setup() {
    const router = useRouter();

    const handleUpdateValue = (key: string) => {
      router.push({ path: key });
    };

    return {
      activeKey: ref(null),
      menuOptions,
      handleUpdateValue,
    };
  },
});
</script>

<template>
  <n-menu :options="menuOptions" @update:value="handleUpdateValue" :collapsed-width="64" :collapsed-icon-size="22" />
</template>

<style scoped></style>
