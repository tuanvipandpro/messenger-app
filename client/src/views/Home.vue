<template>
  <div class="common-layout max-height">
    <el-container>
      <el-aside class="max-height userboard">
        <!-- https://placeimg.com/140/140/any -->
        <Userbox
          v-for="(userbox, i) in userBoard"
          :key="i"
          :name="userbox.name"
          :hidden-badge="!userbox.newChat"
          :avatar="userbox.avatar"
          :chatting="userbox.chatting"
          :last-message="userbox.email"
          @click="chooseMsgBox(userbox)"
        />
      </el-aside>
      <el-main class="main" v-loading="loading">
        <el-card shadow="never">
          <template #header>
            <div style="display: flex; align-items: center">
              <el-avatar :size="30" :src="toUser.avatar"/>
              <strong style="margin-left: 6px">{{ toUser.name }}</strong>
            </div>
          </template>
          <div style="height: 74vh; overflow-y: auto">
            <template v-for="(msg, index) in msgBoard">
              <div v-if="!msg.isYou" class="msgbox" :key="index">
                {{ msg.text }}
              </div>
              <div v-else class="msgbox isRight" :key="index + 1">
                {{ msg.text }}
              </div>
            </template>
          </div>
        </el-card>
        <div style="margin-top: 0.5vh">
          <el-input
            @keypress="handleEnter"
            v-model="chatData"
            size="large"
            placeholder="Please input ..."
          >
            <template #prepend>
              <el-button icon="Position" @click="sendMsg" />
            </template>
          </el-input>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { onBeforeMount, ref } from "vue";
import { useChatterStore } from "../stores/chatters";
import { useRoomStore } from "../stores/room";
import { useRoute } from "vue-router";
import Userbox from "../components/Userbox.vue";
import { io } from "socket.io-client";

export default {
  components: {
    Userbox: Userbox,
  },

  setup() {
    const route = useRoute();
    const chatterStore = useChatterStore();
    const roomStore = useRoomStore();
    const userBoard = ref([]);
    const msgBoard = ref([]);
    const chatData = ref("");
    const toUser = ref({});
    const loading = ref(false);
    const currentUser = JSON.parse(sessionStorage.getItem("user"));

    let room = {};

    const sendMsg = async () => {
      try {
        const res = await chatterStore.createChatForUserInRoom(
          room._id,
          chatData.value
        );
        msgBoard.value.push({ isYou: true, ...res });
        socket.emit('sendMsg', {chat: res, to: toUser.value.email, room: room._id})
      } catch (e) {
        console.error(e);
      } finally {
        chatData.value = "";
      }
    };

    const handleEnter = (e) => {
      if (e.keyCode === 13) sendMsg();
    };

    const endpoint = "http://localhost:3001";
    const socket = io(endpoint);

    socket.on("online", (id) => {
      
    });
    socket.on("offline", (id) => {

    });
    socket.on("newMsg", (data) => {
      if (data.room === room._id && currentUser.email !== data.chat.user.email) {
        msgBoard.value.push(data.chat);
      }
    });

    const getChatData = async () => {
      loading.value = true
      room = await roomStore.getOpenChat([currentUser.email, toUser.value.email]);
      const chatInRoom = await chatterStore.getChatByRoomId(room._id);
      msgBoard.value = chatInRoom.map((e) => {
        return {
          isYou: e.user.email === currentUser.email,
          ...e,
        };
      });
      loading.value = false
    };

    const chooseMsgBox = async (userbox) => {
      toUser.value = userbox;
      userBoard.value.map((userMsg, index) => {
        userMsg.chatting = userbox.email === userMsg.email;
        return userMsg;
      });
      await getChatData();
    };

    onBeforeMount(async () => {
      const users = await chatterStore.getAvailableUser();
      if (users) {
        userBoard.value = users;
        toUser.value = users[0];
        await getChatData()
      }
    });

    return {
      chatData,
      msgBoard,
      userBoard,
      toUser,
      loading,
      sendMsg,
      handleEnter,
      chooseMsgBox,
    };
  },
};
</script>

<style scoped>
.main {
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
