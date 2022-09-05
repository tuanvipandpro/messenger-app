<template>
  <div class="common-layout max-height">
    <el-container>
      <el-aside class="max-height userboard">
        <Userbox v-for="(userbox ,i) in userBoard" :key="i" 
                :name="userbox.name"
                :hidden-badge="!userbox.newChat"
                :avatar="userbox.avatar"
                :chatting="userbox.chatting"
                :last-message="userbox.email"
                @click="chooseMsgBox(userbox)"/>
      </el-aside>
      <el-main class="main">
        <el-card shadow="never">
          <template #header>
            <div style="display: flex; align-items: center;">
              <el-avatar :size="30" :src="toUser.avatar" />
              <strong style="margin-left: 6px;">{{toUser.name}}</strong>
            </div>
          </template>          
          <div style="height: 74vh; overflow-y: auto;">
            <template v-for="(msg, index) in msgBoard" :key="index">
              <div v-if="!msg.isYou" class="msgbox"> 
                {{msg.text}}
              </div>
              <div v-else class="msgbox isRight">
                {{msg.text}}
              </div>
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
</template>
<script>
import { onBeforeMount, reactive, ref } from "vue";
import { useChatterStore } from '../stores/chatters'
import { useRoomStore } from '../stores/room'
import { useRoute } from "vue-router";
import Userbox from "../components/Userbox.vue";
import { io } from 'socket.io-client'

export default {
  components: {
    Userbox: Userbox,
  },

  setup() {
    const route = useRoute();
    const chatterStore = useChatterStore()
    const roomStore = useRoomStore()
    const userBoard = ref([])
    const msgBoard = ref([])
    const chatData = ref('')
    const toUser = ref({})
    const currentUser = JSON.parse(sessionStorage.getItem('user'))
    
    let room = {}

    const sendMsg = async () => {
      try {
        const res = await chatterStore.createChatForUserInRoom(room._id, chatData.value)
        console.log(res)
        msgBoard.value.push({isYou: true, ...res})
      } catch(e) {
        console.error(e)
      } finally {
        chatData.value =''
      }
    }

    const handleEnter = (e) => {
      if (e.keyCode === 13) sendMsg()
    }

    const chooseMsgBox = (userbox) => {
      userBoard.value.map(userMsg => {
        userMsg.chatting = (userbox.email === userMsg.email)
        return userMsg
      })
    }

    const endpoint = "http://localhost:3001"
    const socket = io(endpoint)

    socket.on('online', id => {})
    socket.on('offline', id => {})
    socket.on('newMsg', data => {})

    onBeforeMount(async () => {
      const users = await chatterStore.getAvailableUser()
      if (users) {
        userBoard.value = users
        toUser.value = users[0]
        room = await roomStore.getOpenChat([currentUser.email, userBoard.value[0].email])
        const chatInRoom = await chatterStore.getChatByRoomId(room._id)
        msgBoard.value = chatInRoom.map(e => {
          return {
            isYou: e.user.email === currentUser.email,
            ...e
          }
        })
      }
    })

    return {
      chatData,
      msgBoard,
      userBoard,
      toUser,
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
