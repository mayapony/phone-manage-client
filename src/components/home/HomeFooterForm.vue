<template>
  <div class="tool-container">
    <n-statistic label="总计：" tabular-nums style="display: inline-block; margin: 10px 10px 10px 20px">
      <n-number-animation ref="numberAnimationInstRef" :from="from" :to="to" />
      <template #suffix>元</template>
    </n-statistic>
    <n-button type="info" id="sell-btn" @click="showModal = true" size="large"> 结 算 </n-button>
  </div>

  <n-modal
    v-model:show="showModal"
    content="你确认?"
    negative-text="取消"
    positive-text="确认"
    preset="dialog"
    title="出库"
    transform-origin="center"
    @negative-click="showModal = false"
    @positive-click="handleSubmitForm"
  >
    <n-form ref="formRef" label-placement="top">
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi :span="15" label="下单员工">
          <n-input v-model:value="form.employee" />
        </n-form-item-gi>
        <n-form-item-gi :span="15" label="用户手机">
          <n-input v-model:value="form.phoneNumber" />
        </n-form-item-gi>
        <n-form-item-gi :span="15" label="实收">
          <n-input-number v-model:value="form.earning">
            <template #prefix>￥</template>
          </n-input-number>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { CheckTableInterface } from '../../interface/check-table.interface';
import { CreateRecordsDto } from '../../dto/createRecordsDto';
import { RecordService } from '../../api/RecordService';
import { useDialog, useMessage } from 'naive-ui';

const dialog = useDialog();

const props = defineProps<{
  tableData: CheckTableInterface[];
}>();

const emit = defineEmits<{ (e: 'clearTable'): void }>();

let showModal = ref<boolean>(false);
let from = ref<number>(0);
let to = ref<number>(0);
const form = reactive<{
  employee: string;
  phoneNumber: string;
  earning: number;
}>({
  employee: '自己',
  phoneNumber: '',
  earning: 0,
});

const handleSubmitForm = () => {
  console.log(props.tableData);
  for (const t of props.tableData) {
    let createRecordsDto: CreateRecordsDto = {
      phoneInfo: `${t.brandName}${t.model}   ${t.color}   ${t.ram}+${t.rom}G   ${t.price}元`,
      earning: form.earning,
      phoneNumber: form.phoneNumber,
      employee: form.employee,
      sn: t.sn,
    };
    console.log(createRecordsDto);
    RecordService.createRecords(createRecordsDto).then((res) => {
      if (res.status) {
        dialog.success({
          title: '成功',
          content: '出库成功！',
          positiveText: '确定',
          onPositiveClick: () => {
            emit('clearTable');
          },
        });
      }
    });
  }
};

watch(
  () => props.tableData.length,
  () => {
    from.value = to.value;
    let amount = 0;
    for (let tD of props.tableData) {
      amount += tD.price;
    }
    to.value = amount;
  },
);
</script>

<script lang="ts">
export default {
  name: 'HomeFooterForm',
};
</script>

<style scoped>
#sell-btn {
  margin: 10px 20px 10px 30px;
}
.tool-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #eeeeee;
}
</style>
