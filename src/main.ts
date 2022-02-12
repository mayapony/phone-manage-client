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
  ],
});

const app = createApp(App);

app.use(router);
app.use(naive);

app.mount('#app');
