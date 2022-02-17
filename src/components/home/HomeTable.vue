<script lang="ts" setup>
import { QrCode as QrCodeIcon } from '@vicons/ionicons5';
import { DataTableColumn, DropdownOption, NButton, NSpace, useMessage } from 'naive-ui';
import ImportModal from './ImportModal.vue';
import { h, nextTick, onMounted, ref } from 'vue';
import { ItemService } from '../../api/ItemService';
import { CheckTableInterface } from '../../interface/check-table.interface';
import HomeFooterForm from './HomeFooterForm.vue';

const isPhone = window.localStorage.getItem('deviceType') === 'phone' ? true : false;
const columns: DataTableColumn[] = !isPhone
  ? [
      { title: '品牌', key: 'brandName', align: 'center' },
      { title: '型号', key: 'model', align: 'center' },
      { title: '颜色', key: 'color', align: 'center' },
      { title: '价格', key: 'price', align: 'center' },
      { title: '运行内存', key: 'ram', align: 'center' },
      { title: '存储容量', key: 'rom', align: 'center' },
      { title: '串码', key: 'sn', align: 'center' },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render(row) {
          checkRowIndex.value = Number(row.index);
          return h(
            NButton,
            {
              onClick: handleDelete,
            },
            { default: () => '删除' },
          );
        },
      },
    ]
  : [
      {
        title: '手机信息',
        key: 'phoneInfo',
        align: 'center',
        render(row) {
          return h('div', {}, `${row.brandName}${row.model} ${row.color} ${row.ram}+${row.rom}G`);
        },
      },
      { title: '串码', key: 'sn', align: 'center' },
    ];

let tableData = ref<CheckTableInterface[]>([]);
let inputSn = ref('');
const message = useMessage();
const optionsRef: DropdownOption[] = [
  {
    label: () => h('span', { style: { color: 'red' } }, '删除'),
    key: 'delete',
  },
];
const showDropdownRef = ref(false);
const xRef = ref(0);
const yRef = ref(0);
let checkRowIndex = ref(-1);

const handleSelect = (key: string) => {
  showDropdownRef.value = false;
  if (key === 'delete') {
    handleDelete();
  }
};
const onClickOutside = () => {
  showDropdownRef.value = false;
};

const handleInputEnter = () => {
  console.log(inputSn.value);
  ItemService.findBySn(inputSn.value)
    .then((res) => {
      console.log(res);
      if (res.status) {
        const data = res.data;
        for (const tD of tableData.value) {
          if (tD.id === data.id) return;
        }
        tableData.value.push({
          id: data.id,
          brandName: data.phone.brandName,
          color: data.phone.color,
          created_at: data.created_at,
          model: data.phone.model,
          price: data.phone.price,
          ram: data.phone.ram,
          rom: data.phone.rom,
          sn: data.sn,
        });
        console.log(tableData.value);
        inputSn.value = '';
      } else {
        if (res.message) {
          message.error(res.message);
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const clearTable = () => {
  tableData.value = [];
};

const rowProps = (row: any) => {
  if (isPhone) {
    checkRowIndex.value = row.index;
    return {
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        showDropdownRef.value = false;
        nextTick().then(() => {
          showDropdownRef.value = true;
          xRef.value = e.clientX;
          yRef.value = e.clientY;
        });
      },
    };
  }
};

const handleDelete = () => {
  if (checkRowIndex.value !== -1) {
    tableData.value.splice(checkRowIndex.value, 1);
    checkRowIndex.value = -1;
    message.success('删除成功');
  }
};
onMounted(() => {
  useMessage().success(window.localStorage.getItem('deviceType') || '');
});
</script>

<template>
  <n-layout-header>
    <div id="home-header">
      <n-button size="large" type="tertiary" @click="handleInputEnter" v-if="!isPhone" style="margin-right: 20px"
        >搜索</n-button
      >
      <n-input
        v-model:value="inputSn"
        autofocus
        placeholder="请输入串码"
        size="large"
        @keyup.enter="handleInputEnter"
        :style="isPhone ? 'width: 90%; margin: 15px auto' : 'width: 300px; margin: 15px;'"
      >
        <template #prefix>
          <n-icon :component="QrCodeIcon" />
        </template>
      </n-input>
    </div>
  </n-layout-header>
  <n-layout-content>
    <n-data-table :columns="columns" :data="tableData" :row-props="rowProps" />
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="xRef"
      :y="yRef"
      :options="options"
      :show="showDropdownRef"
      :on-clickoutside="onClickOutside"
      @select="handleSelect"
    />
  </n-layout-content>
  <n-layout-footer position="absolute">
    <home-footer-form :tableData="tableData" @clearTable="clearTable" />
  </n-layout-footer>
</template>

<style scoped>
#home-header {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  align-items: center;
}
</style>
