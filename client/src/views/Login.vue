<template>
  <div class="login_view">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header" style="text-align: center;">
          <span style="font-weight: bolder; font-size: larger;">Your Name ?</span>
          <!-- <el-button class="button" text>Operation button</el-button> -->
        </div>
      </template>
      <div class="flex">
        <el-input v-model="username" size="large" placeholder="Input your name" style="margin-bottom: 10px;"/>
        <el-button @click="handleClick" color="#626aef" class="button" size="large" plain>Go to chat</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('')
const router = useRouter()

const handleClick = () => {
  if (username.value) {
    router.push({name: 'Home', params: {name: username.value}})
  } else {
    ElMessage.error('You must input your name !!!')
  }
}

</script>
<style scoped>

.login_view {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-card {
  width: 25vw;
}

.button {
  width: 100%;
}
</style>
