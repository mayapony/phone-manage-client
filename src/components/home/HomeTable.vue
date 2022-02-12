<script lang="ts" setup>
import { QrCode as QrCodeIcon } from '@vicons/ionicons5';
import { DataTableColumn } from 'naive-ui';
import ImportModal from './ImportModal.vue';

const columns: DataTableColumn[] = [
  { title: '品牌', key: 'name', align: 'center' },
  { title: '型号', key: 'name', align: 'center' },
  { title: '颜色', key: 'name', align: 'center' },
  { title: '价格', key: 'name', align: 'center' },
  { title: '串码', key: 'name', align: 'center' },
];
const data = [{ name: 'hhh' }];
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
            <import-modal />
          </n-space>
        </div>
      </n-layout-header>
      <n-layout-content>
        <n-data-table :columns="columns" :data="data" />
      </n-layout-content>
    </n-space>
  </n-layout>
</template>

<style scoped>
#home-header {
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
