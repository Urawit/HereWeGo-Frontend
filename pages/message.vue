<template>
  <div class="container">
    <div class="friendsContainer">
      <div class="friendsList">
        <p class="message-content"> FRIEND LIST </p>
        <button
          v-for="friend in friends"
          :key="friend.friend_id"
          :value="friend.friend_id"
          @click="selectFriend(friend)"
          class="friendSelect"
        >
        <img
            class="icon"
            :src="`http://localhost/${friend.image_path}` ? `http://localhost/${friend.image_path}` : 'path-to-default-image'"
            alt="Friend Image"
          />
          <span>{{ friend.username }}</span>
        </button>
      </div>
    </div>

    <div class="activitiesContainer">
      <div class="activitiesList">
        <p class="message-content"> ACTIVITITY LIST </p>
        <button
          v-for="activity in activities"
          :key="activity.id"
          :value="activity.id"
          @click="selectGroup(activity)"
          class="activitySelect"
        >
        <img
            class="icon"
            :src="`http://localhost/${activity.post_image_path}` ? `http://localhost/${activity.post_image_path}` : 'path-to-default-image'"
            alt="Activity Image"
          />
          <span>{{ activity.name }}</span>
        </button>
      </div>
    </div>

    <div class="chatContainer">
      <div ref="hasScrolledToBottom" class="chatMessages">
        <div
          v-for="chat in chats"
          :key="chat.id"
          class="message"
          :class="{ 'my-message': chat.user_id === auth.user.id }"
        >
          <p class="message-user" :class="{ 'hidden': selection == 'friend' }">{{ chat.user_id === auth.user.id ? auth.user.username : getMemberName(chat.user_id) }}</p>
          <p class="message-user" :class="{ 'hidden': selection == 'activity' }">{{ chat.user_id === auth.user.id ? auth.user.username : friendName }}</p>
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
        <button class="btn-send" @click="storeMessage">Send</button>
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
  const friends = ref([]);
  const activities = ref([]);
  const members = ref([]);
  const memberName = ref(''); 
  const selection = ref('');
  const activityName = ref('');
  const chat_id = ref('');
  const friendName = ref(''); 
  const auth = useAuthStore();
  const newMessage = ref(''); 
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
      fetchMessages();
      // fetchGroupMessages();
      myFriends();
      myGroup();
    }
  });

  onUpdated(() => {
    scrollBottom();
  });

  const myFriends = async () => {
    try {
      const response = await axios.get('http://localhost/api/myFriends', options);
      console.log("friends:", response.data.friends);
      friends.value = response.data.friends;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const myGroup = async () => {
    try {
      const response = await axios.get('http://localhost/api/show-member-activity', options);
      console.log("activities:", response.data.activities);
      console.log("allMembers:", response.data.allMembers);
      console.log("done");
      activities.value = response.data.activities;
      members.value = response.data.allMembers;
    } catch (error) {
      console.error('Error cant get group activity:', error);
    }
  }

  const getMemberName = (userId: number) => {
    const member = allMembers.find((member) => member.id === userId);
  if (member) {
    return member.username;
  } else {
    return "User not found";
  }
  };

  const selectGroup = (activity: any) => {
    console.log(activity.id);
    chat_id.value = activity.id;
    selection.value = "activity";
    activityName.value = activity.name;
    fetchGroupMessages();
  }

  const selectFriend = (friend: any) => {
    chat_id.value = friend.friend_id;
    friendName.value = friend.username;
    selection.value = "friend";
    fetchMessages();
    console.log(chat_id.value);
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

  const storeMessage = async () => {
    if (selection.value == "friend") {
      const requestData = JSON.stringify({ friend_id: chat_id.value, message: newMessage.value });
      console.log("requestData:", requestData);
      try {
        await axios.post('http://localhost/api/messageStore', requestData, options);
        newMessage.value = '';
      } catch (error) {
        console.error('Error adding message:', error);
      }
    } else {
      storeGroupMessage();
    }
  };

  const fetchGroupMessages = async () => {
    const requestData = JSON.stringify({ activity_id: chat_id.value });
    try {
      const response = await axios.post('http://localhost/api/fetch-group-messages', requestData, options);
      console.log("chats", response.data.chats);
      chats.value = response.data.chats;
      scrollBottom();
    } catch (error) {
      console.error('Error fetching group messages:', error);
    }
  };

  const fetchMessages = async () => {
      const requestData = JSON.stringify({ friend_id: chat_id.value });
      try {
        const response = await axios.post('http://localhost/api/fetchMessages', requestData, options);
        console.log("chats:", response.data.chats);
        chats.value = response.data.chats;
        scrollBottom();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
  };

  const scrollBottom = () => {
    if (hasScrolledToBottom.value) {
      const el = hasScrolledToBottom.value;
      el.scrollTop = el.scrollHeight;
    }
  };

  const pusher = new Pusher('e63b96afbc7499aee175', {
    cluster: 'ap1'
  });

  const channel1 = pusher.subscribe('Private');
  channel1.bind('Message', () => {
    fetchMessages();
  });

  const channel2 = pusher.subscribe('Group');
  channel2.bind('Message', () => {
    fetchGroupMessages();
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
    padding: 20px;
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

  .hidden {
    display: none;
  }

</style>