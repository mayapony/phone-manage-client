<script lang="ts">
export default {
  name: 'RecordTable',
};
</script>
<script lang="ts" setup>
import { DataTableColumn, NButton, NSpace } from 'naive-ui';
import { h, onMounted, reactive, ref, UnwrapRef } from 'vue';
import { RecordService } from '../../api/RecordService';
import { Record } from '../../entity/record';
import { formatTime } from '../../utils';

const props = defineProps<{
  paid: boolean;
}>();

const columns: DataTableColumn[] = reactive([
  { title: '手机信息', key: 'phoneInfo', align: 'center' },
  {
    title: '实收',
    key: 'earning',
    align: 'center',
    render(row) {
      return h('p', {}, `${row.earning} 元`);
    },
  },
  { title: '出售人', key: 'employee', align: 'center' },
  {
    title: '客户号码',
    key: 'phoneNumber',
    align: 'center',
    render(row) {
      return h(
        'p',
        {},
        {
          default: () => {
            return row.phoneNumber === '' ? '无' : row.phoneNumber;
          },
        },
      );
    },
  },
  {
    title: '出售日期',
    key: 'phoneNumber',
    align: 'center',
    render(row, index: number) {
      return h(
        'p',
        {},
        {
          default: () => {
            return formatTime(row.created_at);
          },
        },
      );
    },
  },
  { title: '串码', key: 'sn', align: 'center' },
]);

let tableLoadingRef = ref(true);
let tableData = ref<Record[]>([]);
let rangeRef = ref<[number, number]>([Date.now() - 24 * 7 * 60 * 60 * 1000, Date.now()]);

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

const handleUpdateRange = () => {
  loadAllData();
};

onMounted(() => {
  console.log(props.paid);
  if (!props.paid) {
    columns.push({
      title: '操作',
      key: 'action',
      align: 'center',
      render(row) {
        return h(
          NButton,
          {
            type: 'primary',
            onClick: () => {},
          },
          { default: () => '付款' },
        );
      },
    });
  }
  loadAllData();
});

const loadAllData = () => {
  tableLoadingRef.value = true;
  RecordService.findRecords({
    dateRange: rangeRef.value,
    paid: props.paid,
  }).then((res) => {
    if (res.status) {
      tableData.value = res.data;
      tableLoadingRef.value = false;
      console.log(tableData.value);
    }
  });
};
</script>

<template>
  <n-layout>
    <n-space vertical>
      <n-layout-header>
        <div id="home-header">
          <n-space>
            <n-date-picker
              v-model:value="rangeRef"
              type="datetimerange"
              style="display: inline-block"
              size="large"
              :default-time="['07:00:00', '23:00:00']"
              @update:value="handleUpdateRange"
            />
            <n-input placeholder="请输入用户手机号码/手机信息" size="large" />
            <n-button size="large" type="tertiary">搜索</n-button>
          </n-space>
        </div>
      </n-layout-header>
      <n-layout-content>
        <n-data-table
          :columns="columns"
          :data="tableData"
          :pagination="paginationReactive"
          striped
          :loading="tableLoadingRef"
        />
      </n-layout-content>
    </n-space>
  </n-layout>
</template>

<style scoped>
#home-header {
  float: right;
  /*margin-top: 20px;*/
  margin-right: 20px;
}
</style>
