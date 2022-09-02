<template>
  <div class="common-layout max-height">
    <el-container>
      <el-aside class="max-height userboard">
        <Userbox v-for="(userbox ,i) in userBoard" :key="i" 
                :username="userbox.username"
                :last-message="userbox.lastMessage"
                :chatting="userbox.isChatting" 
                @click="chooseMsgBox(userbox)"/>
      </el-aside>
      <el-main class="main">
        <el-card shadow="never">
          <template #header>
            <div style="display: flex; align-items: center;">
              <el-avatar :size="28" icon="Avatar" />
              <strong style="margin-left: 6px;">David</strong>
            </div>
          </template>          
          <div style="height: 74vh; overflow-y: auto;">
            <template v-for="(msg, index) in msgBoard" :key="index">
              <div v-if="!msg.isYou" class="msgbox"> {{msg.message}}</div>
              <div v-else class="msgbox isRight">{{msg.message}}</div>
            </template>
          </div>
        </el-card>
        <div style="margin-top: 0.5vh;">
          <el-input @keypress="handleEnter" v-model="chatData" size="large" placeholder="Please input ...">
            <template #prepend>
              <el-button icon="Position" @click="sendMsg"/>
            </template>
          </el-input>
        </div>
      </el-main>
    </el-container>
  </div>
  <!-- <h1>{{ `Hello ${username}` }}</h1> -->
</template>
<script>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import Userbox from "../components/Userbox.vue";
import { io } from 'socket.io-client'

export default {
  components: {
    Userbox: Userbox,
  },

  setup() {
    const route = useRoute();
    const username = reactive(route.params.name);

    const userBoard = ref([
      {userId: 1, username: 'David', lastMessage:'What is your name ?', isChatting: true},
      {userId: 2, username: 'Ronaldo', lastMessage:'How old are you ?'}
    ])

    const msgBoard = ref([
      {username: 'David', message:'How old are you ?', isYou: false},
      {username: 'Tuan', message:'Fine, thanks !', isYou: true},
    ])

    const chatData = ref('')

    const sendMsg = () => {
      msgBoard.value.push({username: 'Tuan', message: chatData.value, isYou: true})
      chatData.value = ''
    }

    const handleEnter = (e) => {
      if (e.keyCode === 13) sendMsg()
    }

    const chooseMsgBox = (userbox) => {
      userBoard.value.map(userMsg => {
        userMsg.isChatting = (userbox.userId === userMsg.userId)
        return userMsg
      })
    }

    const socket = io()

    socket.on('newMsg', data => {})
    socket.emit('sendMsg', {})

    return {
      username,
      chatData,
      msgBoard,
      userBoard,
      sendMsg,
      handleEnter,
      chooseMsgBox
    };
  },
};
</script>

<style scoped>
.main{
  padding: 5px;
}
.flex-board {
  display: flex;
  flex-direction: column;
}

.userboard {
  padding: 5px;
}

.msgbox {
  width: fit-content;
  max-width: 40vw;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  padding: 12px;
}

.isRight {
  margin-left: auto;
  margin-right: 0;
}

.max-height {
  height: 100vh;
}

.border {
  border: 1px solid rgb(94, 94, 94);
}
</style>
