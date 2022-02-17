<template>
  <div class="input-password-container">
    <n-input
      size="large"
      round
      placeholder="请输入密码"
      id="input-password"
      type="password"
      @keyup.enter="handleLogin"
      v-model:value="passwordRef"
    >
      <template #suffix>
        <n-button strong secondary circle type="primary" @click="handleLogin">
          <template #icon>
            <n-icon :component="ArrowForward" />
          </template>
        </n-button>
      </template>
    </n-input>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Login',
};
</script>
<script lang="ts" setup>
import { ArrowForward } from '@vicons/ionicons5';
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';

let passwordRef = ref('');
const message = useMessage();
const router = useRouter();

const handleLogin = () => {
  console.log('login...');
  if (passwordRef.value === '666888') {
    window.localStorage.setItem('isLogin', 'true');
    router.push({ path: '/home' });
  } else {
    message.error('密码错误请重试！');
  }
};
</script>

<style scoped>
.input-password-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#input-password {
  width: 350px;
}
</style>
