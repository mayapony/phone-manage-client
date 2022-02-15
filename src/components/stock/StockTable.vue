<script lang="ts" setup>
import { QrCode as QrCodeIcon } from '@vicons/ionicons5';
import { DataTableColumn, NButton, NSpace } from 'naive-ui';
import { h, onMounted, reactive, ref } from 'vue';
import { PhoneService } from '../../api/PhoneService';
import { Phone } from '../../entity/phone';
import ImportModal from '../home/ImportModal.vue';
import { PageState } from '../../interface/page-state';

const columns: DataTableColumn[] = [
  { title: '品牌', key: 'brandName', align: 'center' },
  { title: '型号', key: 'model', align: 'center' },
  { title: '颜色', key: 'color', align: 'center' },
  { title: '价格', key: 'price', align: 'center' },
  {
    title: '数量',
    key: 'count',
    align: 'center',
    render(row: any) {
      return h('p', null, row.items.length);
    },
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    render(row, index) {
      return h(
        NButton,
        {
          onClick: () => {
            showDrawer.value = true;
            const s: string[] = [];
            console.log(tableData.value[index]);
            for (const i of tableData.value[index].items) {
              s.push(i.sn);
            }
            sns.value = s;
          },
        },
        { default: () => '查看串码' },
      );
    },
  },
];

let tableData = ref<Phone[]>([]);
let showDrawer = ref<boolean>(false);
let sns = ref<string[]>([]);
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20],
  onChange: (page: any) => {
    paginationReactive.page = page;
  },
  onUpdatePageSize: (pageSize: any) => {
    paginationReactive.pageSize = pageSize;
    paginationReactive.page = 1;
  },
});
const pageStateReactive = reactive<PageState>({
  skip: paginationReactive.page * paginationReactive.pageSize,
  take: paginationReactive.pageSize,
});

onMounted(() => {
  initData();
});

const initData = () => {
  PhoneService.findAll(pageStateReactive).then((res: any) => {
    tableData.value = res;
  });
};
</script>

<script lang="ts">
export default {
  name: 'stock-table',
};
</script>

<template>
  <n-layout>
    <n-space vertical>
      <n-layout-header>
        <div id="home-header">
          <n-space>
            <n-input placeholder="请输入串码" size="large">
              <template #prefix>
                <n-icon :component="QrCodeIcon" />
              </template>
            </n-input>
            <n-button size="large" type="tertiary">搜索</n-button>
            <import-modal @refreshData="loadAllData" />
          </n-space>
        </div>
      </n-layout-header>
      <n-layout-content>
        <n-data-table :columns="columns" :data="tableData" :pagination="paginationReactive" />
      </n-layout-content>
    </n-space>
  </n-layout>
  <n-drawer v-model:show="showDrawer" :width="200" placement="right">
    <n-drawer-content title="串码列表">
      <n-tag v-for="sn of sns" style="margin: 5px" type="success">{{ sn }}</n-tag>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
#home-header {
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
