import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {
  create,
  NButton,
  NDataTable,
  NLayout,
  NLayoutSider,
  NMenu,
  NMessageProvider,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NSpace,
  NInput,
  NIcon,
  NModal,
  NForm,
  NGrid,
  NFormItemGi,
  NSelect,
  NInputNumber,
  NConfigProvider,
  NStatistic,
  NNumberAnimation,
  NDialogProvider,
  NDropdown,
  NDrawer,
  NDrawerContent,
  NTag,
} from 'naive-ui';

const naive = create({
  components: [
    NButton,
    NDataTable,
    NMessageProvider,
    NMenu,
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NSpace,
    NInput,
    NIcon,
    NModal,
    NForm,
    NGrid,
    NFormItemGi,
    NSelect,
    NInputNumber,
    NConfigProvider,
    NStatistic,
    NNumberAnimation,
    NDialogProvider,
    NDrawer,
    NDrawerContent,
    NDropdown,
    NTag,
  ],
});

const app = createApp(App);

app.use(router);
app.use(naive);

app.mount('#app');
