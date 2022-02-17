<script lang="ts">
export default {
  name: 'Record',
};
</script>
<script lang="ts" setup>
import RecordTable from '../components/record/RecordTable.vue';
</script>

<template>
  <n-tabs type="line" size="large" default-value="paid" style="margin-left: 10px">
    <n-tab-pane name="paid" tab="已付款">
      <record-table :paid="true" />
    </n-tab-pane>
    <n-tab-pane name="not" tab="未付款">
      <record-table :paid="false" />
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped></style>
