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
        <el-input v-model="email" size="large" placeholder="Gmail ..." style="margin-bottom: 10px;"/>
        <el-input v-model="password" size="large" placeholder="Password ..." style="margin-bottom: 10px;" show-password/>
        <el-button :icon="UserFilled" @click="handleClick" color="#626aef" class="button" size="large" plain>Go to chat</el-button>
        <el-divider content-position="center">Or</el-divider>
        <el-button :icon="Message" @click="googleLoginPopup" color="#626aef" class="button" size="large" plain>
          With Google
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../stores/user'
import { Message, UserFilled } from '@element-plus/icons-vue';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, getAuth } from 'firebase/auth'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleClick = async () => {
  console.log(email.value, password.value)
  if (email.value && password.value) {
    const res = signInWithEmailAndPassword(getAuth(), email.value, password.value)
    console.log(res.user)
    ElMessage.success('Login OK')
  } else {
    ElMessage.error('You must input your name !!!')
  }
}

const googleLoginPopup = async () => {
  signInWithPopup(getAuth(), new GoogleAuthProvider()).then(async res => {
    const idToken =  await res.user.getIdToken(true)
    try {
      await useUserStore().login(idToken)
      router.push({name: 'Home'})
      ElMessage.success('OK')
    } catch (e) {
      ElMessage.error('The user is invalid !!!')
      console.error(e)
    }
  }).catch(err => {
    console.log(err)
  })
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
