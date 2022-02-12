<template>
  <n-button size="large" type="primary" @click="showModal = true">入库</n-button>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="入库手机信息"
    content="你确认?"
    @negative-click="showModal = false"
    @positive-click="handleSubmitForm"
    positive-text="确认"
    negative-text="取消"
    transform-origin="center"
  >
    <n-form ref="formRef" label-placement="top">
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi :span="15" label="品牌">
          <n-select
            v-model:value="form.brandName"
            filterable
            tag
            :options="options.brandName"
            placeholder="请选择品牌"
          ></n-select>
        </n-form-item-gi>
        <n-form-item-gi :span="15" label="型号">
          <n-select
            v-model:value="form.model"
            filterable
            tag
            :options="options.model"
            placeholder="请选择品牌"
          ></n-select>
        </n-form-item-gi>
        <n-form-item-gi :span="15" label="颜色">
          <n-select
            v-model:value="form.color"
            filterable
            tag
            :options="options.color"
            placeholder="请选择品牌"
          ></n-select>
        </n-form-item-gi>
        <n-form-item-gi :span="10" label="运行内存">
          <n-select v-model:value="form.ram" filterable :options="options.ram" />
        </n-form-item-gi>
        <n-form-item-gi :span="10" label="存储容量">
          <n-select v-model:value="form.rom" filterable :options="options.rom" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="串码（可同时录入多个）">
          <n-select
            v-model:value="form.sn"
            filterable
            multiple
            tag
            placeholder="请扫码或输入后回车"
            :show-arrow="false"
            :show="false"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="单价">
          <n-input-number v-model:value="form.price" placeholder="售价">
            <template #prefix>￥</template>
          </n-input-number>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

let showModal = ref(false);
const options = reactive({
  brandName: [
    { label: 'vivo', value: 'vivo' },
    { label: 'oppo', value: 'oppo' },
  ],
  model: [],
  color: [],
  ram: [
    { label: 4, value: 4 },
    { label: 6, value: 6 },
    { label: 8, value: 8 },
    { label: 12, value: 12 },
  ],
  rom: [
    { label: 64, value: 64 },
    { label: 128, value: 128 },
    { label: 256, value: 256 },
  ],
});
const form = reactive({
  brandName: '',
  model: '',
  ram: 6,
  rom: 128,
  color: '',
  sn: [],
  price: 0,
});

const handleSubmitForm = () => {
  console.log(form);
};
</script>

<style scoped></style>
