<template>
  <nav class="text-black bg-white w-full border-b border-gray-300 sticky top-0 left-0 z-20 font-kanit">
    <div class="max-w-full flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="flex items-center">
        <MenuLink to="/">
          <span class="text-xl font-semibold whitespace-nowrap">
            HERE
            <span class="text-3xl">WE</span>
            GO
          </span>
        </MenuLink>
      </div>

      <!-- <div class="flex items-center justify-center w-full md:w-auto ">
        <input type="text" v-model="searchTerm" @input="search" placeholder=""
          class="block py-2.5 mr-3 text-m text-gray-900 rounded-lg w-80 h-9 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
        <button>
          <img src="@/assets/images/icon/search.png" class="w-6 h-6" />
        </button>
      </div> -->

      <div class="flex items-center space-x-6">
        <div v-if="!isLogin">
          <MenuLink to="/login">
            <button
              class="mr-4 inline-flex items-center px-6 py-1.5 text-sm font-medium text-center text-blue-500 bg-white rounded-lg border border-blue-500 hover:bg-gray-100">
              Log in
            </button>
          </MenuLink>
          <MenuLink to="/register">
            <button
              class="inline-flex items-center px-6 py-1.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg border border-blue-500 hover:bg-blue-700">
              Register
            </button>
          </MenuLink>
        </div>

        <div v-else class="button-container">
          <div class="button">
            <button @click="toggleDropdownAllOff()">
              <MenuLink to="/activity/create">
                <img src="@/assets/images/icon/create.png"/>
                <p class="frontheader">Create Activity</p>
              </MenuLink>
            </button>
          </div>
          <div class="button">
            <button @click="toggleDropdownChat()">
              <img src="@/assets/images/icon/chat.png"/>
              <p class="frontheader">Chat</p>
            </button>
            <div class="dropdown-chat" :class="{ open: isDropdownChat }">
              <ul>
                  <li
                    v-for="friend in friends"
                    :key="friend.id"
                    :value="friend.id"
                    @click="toggleDropdownAllOff()"
                  >
                    <MenuLink :to="`/message`">
                      <p class="frontheader">
                        {{friend.name}}
                      </p>
                      <p>
                        {{friend.message}}
                      </p>
                      <p class="frontdatetime">
                        {{datetime(friend.created_at)}}
                      </p>
                      <div class="underline"/>
                    </MenuLink>
                  </li>
              </ul>
            </div>
          </div>
          <div class="button">
            <button @click="toggleDropdownUser()">
              <img src="@/assets/images/icon/friend.png"/>
              <p class="frontheader">User</p>
            </button>
            <div class="dropdown-user" :class="{ open: isDropdownUser }">
              <ul>
                  <li
                    v-for="user in users"
                    :key="user.id"
                    :value="user.id"
                    @click="toggleDropdownAllOff()"
                  >
                    <MenuLink :to="`/friend`">
                      <p class="frontheader">
                        {{user.username}}
                      </p>
                    </MenuLink>
                    <div class="underline"/>
                  </li>
              </ul>
            </div>
          </div>
          <div class="button">
            <button @click="toggleDropdownNotification()">
              <img src="@/assets/images/icon/bell.png"/>
              <p class="frontheader">Notification</p>
            </button>
            <div class="notification-alert" :class="{ open: notifications_counter }"/>
            <div class="dropdown-notification" :class="{ open: isDropdownNotification }">
              <ul>
                  <li
                    v-for="notification in notifications"
                    :key="notification.id"
                    :value="notification.id"
                    @click="toggleDropdownAllOff()"
                  >
                    <MenuLink :to="getLinkNotification(notification)">
                      <p class="frontheader">
                        {{notification.header}}
                      </p>
                      <p>
                        {{notification.detail}}
                      </p>
                      <p class="frontdatetime">
                        {{datetime(notification.created_at)}}
                      </p>
                      <div class="underline"/>
                    </MenuLink>
                  </li>
              </ul>
            </div>
          </div>
          <div class="button-profile">
            <button @click="toggleDropdownProfile()" >
              <img v-if="!image_path" src="@/assets/images/user-default.jpg" class="profile-picture" />
              <img v-else :src="`http://localhost/${image_path}`" class="profile-picture" />
              <p class="frontheader">{{ auth.user.username }}</p>
            </button>
            <div class="dropdown-profile" :class="{ open: isDropdownProfile }">
              <ul>
                <MenuLink to="/profile">
                  <li @click="toggleDropdownAllOff()">
                    Profile
                  </li>
                </MenuLink>
                <li @click="logout">
                  Logout
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUpdated } from "vue";
  import { useAuthStore } from "~/stores/useAuthStore";
  import Pusher from 'pusher-js';
  import axios from 'axios';

  const auth = useAuthStore();
  const isLogin = computed(() => auth.isLogin);
  const image_path = computed(() => auth.user.image_path);
  const isDropdownProfile = ref(false); 
  const isDropdownNotification = ref(false); 
  const isDropdownUser = ref(false); 
  const isDropdownChat = ref(false); 
  const notifications = ref([])
  const friends = ref([]);
  const users = ref([]);
  const notifications_counter = ref(0)
  const options = {
    headers: {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": `Bearer ${auth.token}`, 
    }
  }

  onMounted(() => {
    allUser();
  });

  const getLinkNotification = (notification: any) => {
    if (notification.header.includes('Friend')) {
      return `/profile/${notification.id}`;
    } else if (notification.header.includes('Activity')) {
      return `/activity/${notification.id}`;
    }
  }

  const allUser = async () => {
    try {
      const response = await axios.get('http://localhost/api/users', options);
      console.log("users:", response.data.users);
      users.value = response.data.users;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const myFriends = async () => {
    const auth = useAuthStore();
    const options = {
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        "Authorization": `Bearer ${auth.token}`, 
      }
    }
    try {
      const response = await axios.get('http://localhost/api/myFriends', options);
      console.log("friends:", response.data.chats);
      friends.value = response.data.chats;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const myNotification = async () => {
    const auth = useAuthStore();
    const options = {
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        "Authorization": `Bearer ${auth.token}`, 
      }
    }
    try {
      const response = await axios.get('http://localhost/api/myNotification', options);
      console.log(response.data.notifications);
      notifications.value = response.data.notifications;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const datetime = (created_at: any) => {
    const date = new Date(created_at);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
  }

  const toggleDropdownAllOff = () => {
    isDropdownProfile.value = false;
    isDropdownNotification.value = false;
    isDropdownUser.value = false;
    isDropdownChat.value = false;
  }

  const toggleDropdownChat = () => {
    myFriends();
    isDropdownChat.value = !isDropdownChat.value;
    isDropdownNotification.value = false;
    isDropdownUser.value = false;
    isDropdownProfile.value = false;
  }

  const toggleDropdownProfile = () => {
    isDropdownProfile.value = !isDropdownProfile.value;
    isDropdownNotification.value = false;
    isDropdownUser.value = false;
    isDropdownChat.value = false;
  }

  const toggleDropdownNotification = () => {
    myNotification();
    notifications_counter.value = 0;
    isDropdownNotification.value = !isDropdownNotification.value;
    isDropdownProfile.value = false;
    isDropdownUser.value = false;
    isDropdownChat.value = false;
  }

  const toggleDropdownUser = () => {
    isDropdownUser.value = !isDropdownUser.value;
    isDropdownProfile.value = false;
    isDropdownNotification.value = false;
    isDropdownChat.value = false;
  }

  const logout = () => {
    auth.clear();
    window.location.href = '/login';
  };

  const pusher = new Pusher('e63b96afbc7499aee175', {
    cluster: 'ap1'
  });

  const channel = pusher.subscribe('Private');
  channel.bind('Notification', () => {
    notifications_counter.value += 1;
    myNotification();
  });
</script>

<style scoped>

.profile-picture {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-profile {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  display: none;
  z-index: 1;
  width: 100px;
  margin-top: 5px;
}

.button-container {
  display: flex;
}

.button-profile,
.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  margin-right: 10px;
}

.button-profile button p,
.button-profile button img {
  display: inline-block;
}

.button button p,
.button button img {
  display: inline-block;
  margin-left: 10px;
  height: 25px;
}

.dropdown-chat,
.dropdown-user,
.dropdown-notification {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  display: none;
  z-index: 1;
  width: 300px;
  min-height: 300px;
  max-height: 300px;
  overflow: hidden;
  overflow-y: scroll;
}

.dropdown-profile.open,
.dropdown-chat.open,
.dropdown-user.open,
.notification-alert.open,
.dropdown-notification.open {
  display: block;
}

.dropdown-profile ul,
.dropdown-chat ul,
.dropdown-user ul,
.dropdown-notification ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-profile li,
.dropdown-chat li,
.dropdown-user li,
.dropdown-notification li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-profile li:hover,
.dropdown-chat li:hover,
.dropdown-user li:hover,
.dropdown-notification li:hover {
  background-color: #cfcece;
}

.dropdown-chat::-webkit-scrollbar,
.dropdown-user::-webkit-scrollbar,
.dropdown-notification::-webkit-scrollbar {
  width: 6px;
}

.dropdown-chat::-webkit-scrollbar-thumb,
.dropdown-user::-webkit-scrollbar-thumb,
.dropdown-notification::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}

.dropdown-chat::-webkit-scrollbar-thumb:hover,
.dropdown-user::-webkit-scrollbar-thumb:hover,
.dropdown-notification::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.notification-chat,
.notification-alert {
  position: absolute;
  background-color: red;
  border-radius: 10px;
  width: 10px;
  height: 10px;
  top: 6px;
  left: 15px;
  display: none;
}

.underline {
  border-bottom: gainsboro 2px solid;
  margin: 10px 0px 0px 0px;
}

.frontheader {
  font-weight: bold;
}

.frontdatetime {
  font-weight: bold;
  text-align: end;
}
</style>