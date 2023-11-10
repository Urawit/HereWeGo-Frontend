<template>
  <div class="container">
    <div class="friendsContainer">
      <div class="friendsList">
        <button
          v-for="chat in allChats"
          :key="chat.id"
          :value="chat.id"
          @click="selectChat(chat)"
          class="friendSelect"
        >
          <img
            class="icon"
            :src="`http://localhost/${chat.image_path}` ? `http://localhost/${chat.image_path}` : 'path-to-default-image'"
            alt="Friend Image"
          />
          <span>{{ chat.name }}</span>
          <span>{{ chat.message }}</span>
        </button>
      </div>
    </div>

    <div class="chatContainer">
      <button @click="">
        <p class="chatTitle">{{ selection === 'friend' ? chatName : 'Group Activity' }}</p>
      </button>
      <div ref="hasScrolledToBottom" class="chatMessages">
        <div
          v-for="chat in chats"
          :key="chat.id"
          class="message"
          :class="{ 'my-message': chat.user_id === auth.user.id }"
        >
          <p class="message-user" :class="{ 'hidden': selection == 'friend' }">{{ chat.user_id === auth.user.id ? auth.user.username : chat.username }}</p>
          <p class="message-user" :class="{ 'hidden': selection == 'activity' }">{{ chat.user_id === auth.user.id ? auth.user.username : chatName }}</p>
          <p class="message-content">{{ chat.message }}</p>
        </div>
      </div>

      <div class="inputContainer">
        <input
          id="btn-input"
          type="text"
          name="message"
          class="form-control input-sm message-input"
          placeholder="Type your message here..."
          v-model="newMessage"
          @keyup.enter="storeMessage"
        />
        <!-- <button class="btn-send" @click="storeMessage">Send</button> -->
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
  import { ref, onMounted, onUpdated } from 'vue';
  import { useAuthStore } from "~/stores/useAuthStore";
  import Pusher from 'pusher-js';
  import axios from 'axios';

  const chats = ref([]);
  const allChats = ref([]);
  const selection = ref('');
  const chat_id = ref('');
  const friend_id = ref(''); 
  const chatName = ref(''); 
  const newMessage = ref(''); 
  const auth = useAuthStore();
  const route = useRoute();
  const params = route.params.id
  const hasScrolledToBottom = ref(null);
  const options = {
    headers: {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": `Bearer ${auth.token}`, 
    }
  }

  onMounted(() => {
    if (auth.isLogin) {
      myChats();
      getChat();
    } else {
      pusher.disconnect();
      navigateTo('/login');
    }
  });

  onUpdated(() => {
    scrollBottom();
  });


  const getChat = () => {
    const paramValue = Array.isArray(params) ? params[0] : params;
    const match = paramValue.match(/\d+/);
    const id = match ? match[0] : null;
    console.log("ID:", id);
    
    if (params.includes('friend')) {
      selection.value = "friend";
      friend_id.value = id!;
  
      fetchPrivateMessages();
    } else if (params.includes('activity')) {
      selection.value = "activity";
      chat_id.value = id!;
      fetchGroupMessages();
    }
  }

  const myChats = async () => {
    try {
      const response = await axios.get('http://localhost/api/myFriends', options);
      console.log("all chats:", response.data.chats);
      allChats.value = response.data.chats;
      if (response.data.chats.length > 0) {
        selectChat(response.data.chats[0]); // Select the first chat automatically
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const selectChat = (chat: any) => {
    console.log("chat:", chat);
    chat_id.value = chat.id;
    chatName.value = chat.name;
    if (chat.friend_id) {
      selection.value = "friend";
      console.log("friend");
      friend_id.value = chat.friend_id
      fetchPrivateMessages();
    } else {
      selection.value = "activity";
      console.log("activity");
      chatName.value = 'Group Activity';
      fetchGroupMessages();
    }
  }

  const storeMessage = async () => {
    if (selection.value == "friend") {
      storePrivateMessage();
      fetchPrivateMessages();
    } else {
      storeGroupMessage();
      fetchGroupMessages();
    }
  };

  const fetchGroupMessages = async () => {
    const requestData = JSON.stringify({ activity_id: chat_id.value });
    try {
      const response = await axios.post('http://localhost/api/fetch-group-messages', requestData, options);
      console.log("group chats", response.data.chats);
      chats.value = response.data.chats;
      scrollBottom();
    } catch (error) {
      console.error('Error fetching group messages:', error);
    }
  };

  const fetchPrivateMessages = async () => {
    const requestData = JSON.stringify({ friend_id: friend_id.value });
    try {
      const response = await axios.post('http://localhost/api/fetchMessages', requestData, options);
      console.log("private chats:", response.data.chats);
      chats.value = response.data.chats;
      scrollBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const storeGroupMessage = async () => {
    const requestData = JSON.stringify({ activity_id: chat_id.value, message: newMessage.value });
    try {
      await axios.post('http://localhost/api/group-message-store', requestData, options);
      newMessage.value = '';
    } catch (error) {
      console.error('Error adding group message:', error);
    }
  };

  const storePrivateMessage = async () => {
    const requestData = JSON.stringify({ friend_id: friend_id.value, message: newMessage.value });
    console.log("requestData:", requestData);
    try {
      await axios.post('http://localhost/api/messageStore', requestData, options);
      newMessage.value = '';
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  const scrollBottom = () => {
    if (hasScrolledToBottom.value) {
      const el = hasScrolledToBottom.value;
      el.scrollTop = el.scrollHeight;
    }
  };

  const pusher = new Pusher('301d0ac46c750e11bff0', {
    cluster: 'ap1'
  });
  const channel1 = pusher.subscribe('Private');
  channel1.bind('Message' + auth.user.id, () => {
    if (selection.value == "friend") {
      fetchPrivateMessages();
    }
    myChats();
  });

  const channel2 = pusher.subscribe('Group');
  channel2.bind('Message' + auth.user.id, () => {
    if (selection.value == "activity") {
      fetchGroupMessages();
    }
    myChats();
  });
</script>

<style>
  .container {
    display: flex;
    min-height: 100%;
    min-width: 100%;
  }

  .icon {
    width: 30px; 
    height: 30px; 
    margin-right: 10px; 
    border-radius: 50%; 
  }

  .friendsContainer {
    width: 25%;
    background-color: #394049;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .friendsList {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* .friendSelect {
    background-color: #57606e;
    border-radius: 8px;
    padding: 10px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  } */

  .friendSelect,
  .activitySelect {
    display: flex;
    align-items: center;
    background-color: #57606e;
    border-radius: 8px;
    padding: 5px 10px; 
    color: #fff;
    text-align: center;
    cursor: pointer;
    font-size: 14px; 
    margin-bottom: 10px; /* Adjust the margin as needed */
  }

  .activitiesContainer {
    width: 25%;
    background-color: #394049;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .activitiesList {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* .activitySelect {
    background-color: #57606e;
    border-radius: 8px;
    padding: 10px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  } */

  .chatContainer {
    flex-grow: 1;
    background-color: #394049;
    display: flex;
    flex-direction: column;
    padding: 50px;
    overflow: hidden;
    position: relative; 
  }

  .chatMessages {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: scroll;
    padding-right: 20px;
    background-color: gainsboro;
    padding: 10px;
    border-radius: 10px;
    max-height: 730px;
    min-height: 730px;
    padding-right: 20px;
    margin-right: -20px; 
  }

  .chatMessages::-webkit-scrollbar {
    width: 12px;
  }

  .chatMessages::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  .chatMessages::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  .message {
    background-color: #57606e;
    border-radius: 8px;
    padding: 10px;
    color: #fff;
    align-self: flex-start;
  }

  .my-message {
    align-self: flex-end;
    background-color: #007bff;
  }

  .message-user {
    font-weight: bold;
  }

  .message-content {
    margin-top: 5px;
  }

  .inputContainer {
    display: flex;
    gap: 10px;
    padding: 20px 20px;
    background-color: #394049;
  }

  .message-input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #57606e;
    color: #fff;
  }

  .btn-send {
    padding: 0px 20px 0px 20px;
    border: 1px solid #ccc;
    background-color: #4CAF50;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }

  .chatTitle {
    color: white;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .hidden {
    display: none;
  }

</style>