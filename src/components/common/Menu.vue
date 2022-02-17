<script lang="ts">
import { defineComponent, h, onMounted, ref } from 'vue';
import { NIcon, useMessage } from 'naive-ui';
import {
  Home as HomeIcon,
  Storefront as StockIcon,
  FolderOpen as RecordIcon,
  LogOut,
  PieChart,
} from '@vicons/ionicons5';
import { useRouter } from 'vue-router';

let collapsed = ref<boolean>(true);

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: '首页',
    key: '/home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: '库存',
    key: '/stock',
    icon: renderIcon(StockIcon),
  },
  {
    label: '记录',
    key: '/record',
    icon: renderIcon(RecordIcon),
  },
  {
    label: '统计',
    key: '/statistics',
    icon: renderIcon(PieChart),
  },
  {
    label: '退出',
    key: '/logout',
    icon: renderIcon(LogOut),
  },
];

export default defineComponent({
  setup() {
    let activeKey = ref<string>('/home');
    const router = useRouter();

    const handleUpdateValue = (key: string) => {
      if (key === '/logout') {
        window.localStorage.removeItem('isLogin');
        router.push({ path: 'login' });
      } else {
        router.push({ path: key });
      }
    };

    router.beforeEach((to, from, next) => {
      activeKey.value = to.path;
      next();
    });

    onMounted(() => {
      activeKey.value = router.currentRoute.value.path;
      window.localStorage.setItem('deviceType', fIsMobile() ? 'phone' : 'pc');
    });

    const fIsMobile = () => {
      // useMessage().info(navigator.userAgent);
      return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini|MiuiBrowser/i.test(
        navigator.userAgent,
      );
    };

    return {
      activeKey,
      menuOptions,
      handleUpdateValue,
      collapsed,
    };
  },
});
</script>

<template>
  <n-layout-sider
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :width="180"
    :native-scrollbar="false"
    style="height: 100%"
    :collapsed="collapsed"
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      :value="activeKey"
      :options="menuOptions"
      @update:value="handleUpdateValue"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :collapsed="collapsed"
    />
  </n-layout-sider>
</template>

<style scoped></style>
