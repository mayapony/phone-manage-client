<template>
  <n-button size="large" type="primary" @click="showModal = true">入库</n-button>
  <n-modal
    v-model:show="showModal"
    content="你确认?"
    negative-text="取消"
    positive-text="确认"
    preset="dialog"
    title="入库手机信息"
    transform-origin="center"
    @negative-click="showModal = false"
    @positive-click="handleSubmitForm"
  >
    <n-form ref="formRef" label-placement="top">
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi :span="15" label="品牌">
          <n-select
            v-model:value="form.brandName"
            :options="options.brandName"
            filterable
            placeholder="请选择品牌"
            @update:value="handleUpdateBrandName"
            tag
          ></n-select>
        </n-form-item-gi>
        <n-form-item-gi :span="15" label="型号">
          <n-select
            v-model:value="form.model"
            :options="options.model"
            filterable
            placeholder="请选择型号"
            :loading="modelLoading"
            @update:value="handleUpdateModel"
            tag
          ></n-select>
        </n-form-item-gi>
        <n-form-item-gi :span="15" label="颜色">
          <n-select
            v-model:value="form.color"
            :options="options.color"
            filterable
            placeholder="请选择颜色"
            :loading="colorLoadingRef"
            tag
          ></n-select>
        </n-form-item-gi>
        <n-form-item-gi :span="10" label="运行内存">
          <n-select v-model:value="form.ram" :options="options.ram" filterable />
        </n-form-item-gi>
        <n-form-item-gi :span="10" label="存储容量">
          <n-select v-model:value="form.rom" :options="options.rom" filterable />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="串码（可同时录入多个）">
          <n-select
            v-model:value="form.sn"
            :show="false"
            :show-arrow="false"
            filterable
            multiple
            placeholder="请扫码或输入后回车"
            tag
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

<script lang="ts" setup>
import { onMounted, reactive, ref, UnwrapNestedRefs } from 'vue';
import { StockInFormInterface } from '../../interface/stock-in-form.interface';
import { ItemService } from '../../api/ItemService';
import { IResponse } from '../../interface/IResponse';
import { useMessage } from 'naive-ui';
import { PhoneService } from '../../api/PhoneService';
import { Option } from '../../interface/option';

let showModal = ref(false);
let modelLoading = ref(false);
let colorLoadingRef = ref(false);
const options = reactive<{ brandName: Option[]; model: Option[]; color: Option[]; ram: Option[]; rom: Option[] }>({
  brandName: [],
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
const message = useMessage();
const emit = defineEmits<{ (e: 'refreshData'): void }>();

const form: UnwrapNestedRefs<StockInFormInterface> = reactive({
  brandName: '',
  model: '',
  ram: 6,
  rom: 128,
  color: '',
  sn: [],
  price: 0,
});

const handleSubmitForm = () => {
  ItemService.stockIn(form)
    .then((res: IResponse) => {
      if (res.status) {
        message.success('入库成功!');
        emit('refreshData');
      } else {
        message.error(`${res.message}`);
      }
    })
    .catch((err) => {
      message.error('请求失败！');
    });
};

const handleUpdateBrandName = () => {
  form.model = '';
  form.color = '';
  form.price = 0;
  modelLoading.value = true;
  PhoneService.findMedal(form).then((res) => {
    if (res.status) {
      let models: Option[] = [];
      for (const d of res.data) {
        models.push({ label: d, value: d });
      }
      options.model = models;
      modelLoading.value = false;
    }
  });
};

const handleUpdateModel = () => {
  form.color = '';
  form.price = 0;
  colorLoadingRef.value = true;
  PhoneService.findColor(form).then((res) => {
    if (res.status) {
      let colors: Option[] = [];
      console.log(res.data);
      for (const d of res.data) {
        colors.push({ label: d, value: d });
      }
      options.color = colors;
      colorLoadingRef.value = false;
    }
  });
};

onMounted(() => {
  loadBrandNameData();
});

const loadBrandNameData = () => {
  PhoneService.findBrandName().then((res) => {
    if (res.status) {
      let brandNames: { label: string; value: string }[] = [];
      for (let d of res.data) {
        brandNames.push({
          label: d.phone_brandName,
          value: d.phone_brandName,
        });
      }
      options.brandName = brandNames;
    }
  });
};
</script>
<script lang="ts">
export default {
  name: 'import-modal',
};
</script>

<style scoped></style>
