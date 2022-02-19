<script lang="ts" setup>
import { CascaderOption, DataTableColumn, NButton, NSpace } from 'naive-ui';
import { h, onMounted, reactive, ref } from 'vue';
import { PhoneService } from '../../api/PhoneService';
import { Phone } from '../../entity/phone';
import ImportModal from '../home/ImportModal.vue';
import { StockInFormInterface } from '../../interface/stock-in-form.interface';
import { FindCondition } from '../../interface/phone/find-condition';

const columns: DataTableColumn[] = [
  { title: '品牌', key: 'brandName', align: 'center' },
  { title: '型号', key: 'model', align: 'center' },
  { title: '颜色', key: 'color', align: 'center' },
  { title: '运行内存', key: 'ram', align: 'center' },
  { title: '存储容量', key: 'rom', align: 'center' },
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

let tableLoadingRef = ref(false);
let filterConditionRef = ref<string[]>([]);
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
// const pageStateReactive = reactive<PageState>({
//   skip: paginationReactive.page * paginationReactive.pageSize,
//   take: paginationReactive.pageSize,
// });
let optionsRef = ref<any[]>([]);
let stockInForm: StockInFormInterface = {
  brandName: '',
  color: '',
  model: '',
  ram: 0,
  rom: 0,
  sn: [],
  price: 0,
};

onMounted(() => {
  loadAllData({ brandName: '', model: '', color: '' });
  loadBrandNameData();
});

const loadAllData = (findCondition: FindCondition) => {
  tableLoadingRef.value = true;
  PhoneService.findAll(findCondition).then((res: any) => {
    console.log(res);
    tableLoadingRef.value = false;
    tableData.value = res;
  });
};

const loadBrandNameData = () => {
  PhoneService.findBrandName().then((res) => {
    if (res.status) {
      let brandNames: CascaderOption[] = [];
      for (let d of res.data) {
        brandNames.push({
          label: d.phone_brandName,
          value: d.phone_brandName,
          isLeaf: false,
          depth: 1,
        });
      }
      optionsRef.value = brandNames;
      console.log(optionsRef.value);
    }
  });
};

const handleUpdateFilter = (value: any, option: any, arrayOption: any[]) => {
  let mapArray: string[] = ['brandName', 'model', 'color'];
  let findCondition: any = {};
  for (const idx in arrayOption) {
    findCondition[mapArray[idx]] = arrayOption[idx].label;
  }
  loadAllData(findCondition);
};

const handleLoad = (option: CascaderOption) => {
  return new Promise<void>((resolve) => {
    if (option.depth === 1) {
      stockInForm.brandName = option.label as string;
      PhoneService.findMedal(stockInForm).then((res) => {
        if (res.data) {
          let children: CascaderOption[] = [];
          for (const model of res.data) {
            children.push({
              label: model,
              value: model,
              depth: 2,
              isLeaf: false,
            });
          }
          option.children = children;
          resolve();
        }
      });
    } else if (option.depth === 2) {
      stockInForm.model = option.label as string;
      PhoneService.findColor(stockInForm).then((res) => {
        if (res.data) {
          let children: CascaderOption[] = [];
          for (const color of res.data) {
            children.push({
              label: color,
              value: color,
              depth: 3,
              isLeaf: true,
            });
          }
          option.children = children;
          resolve();
        }
      });
    }
  });
};

const handleStockInCB = () => {
  filterConditionRef.value = [];
  loadAllData({ brandName: '', model: '', color: '' });
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
          <n-cascader
            v-model:value="filterConditionRef"
            placeholder="品牌/型号/颜色"
            :options="optionsRef"
            check-strategy="all"
            @update:value="handleUpdateFilter"
            :remote="true"
            style="width: 300px; display: inline-block"
            size="large"
            clearable
            :on-load="handleLoad"
          />
          <import-modal @refreshData="handleStockInCB" />
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
  <n-drawer v-model:show="showDrawer" :width="200" placement="right">
    <n-drawer-content title="串码列表">
      <n-tag v-for="sn of sns" style="margin: 5px" type="success">{{ sn }}</n-tag>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
#home-header {
  margin: 20px 20px 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
