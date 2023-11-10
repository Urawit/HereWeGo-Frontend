<template>
  <nav class="text-black bg-white w-full border-b border-gray-300 sticky top-0 left-0 z-20 font-kanit">
    <div class="max-w-full flex flex-wrap items-center justify-between mx-auto">
      <div class="flex items-center">
        <MenuLink to="/">
          <div class="max-w-full px-4 w-60 mx-10">
          <div class="ml-4 group">
            <button class="flex justify-center w-full py-5 align-center ">
              <p class="mt-1.5 mr-1.5 font-bold transition ease-in-out duration-500 group-hover:text-blue-600 group-hover:scale-110 motion-reduce:transition-none motion-reduce:hover:transform-none ">HERE</p>
              <p class="text-2xl font-bold transition duration-500 ease-in-out group-hover:text-blue-600 group-hover:scale-110 motion-reduce:transition-none motion-reduce:hover:transform-none ">WE</p>
              <p class="mt-1.5 ml-1.5 font-bold transition ease-in-out duration-500 group-hover:text-blue-600 group-hover:scale-110 motion-reduce:transition-none motion-reduce:hover:transform-none ">GO</p>
              <div class="flex invisible ml-2 font-bold transition-all duration-500 ease-out opacity-0 group-hover:visible group-hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none group-hover:opacity-100">
                <p class="mt-1 text-xl text-blue-800">/</p>
                <p class="mt-1 text-xl text-blue-700">/</p>
                <p class="ml-3 mt-1.5">Home</p>
              </div>
            </button>
          </div>
        </div>
        </MenuLink>
      </div>

      <!-- <div class="flex items-center justify-center w-full md:w-auto ">
        <input type="text" v-model="searchTerm" @input="search" placeholder=""
          class="block py-2.5 mr-3 text-m text-gray-900 rounded-lg w-80 h-9 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
        <button>
          <img src="@/assets/images/icon/search.png" class="w-6 h-6" />
        </button>
      </div> -->

      <div class="flex items-center space-x-6 mx-10">
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
          <div class="relative mt-2.5 h-7 group">
            <button @click="toggleDropdownAllOff()">
              <MenuLink to="/activity/create">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-8 transition duration-500 ease-in-out w-7 h-7 group-hover:scale-125">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="invisible group-hover:scale-105 group-hover:visible group-hover:animate-[move_35s_linear_infinite] group-hover:stroke-blue-600" stroke-dasharray="50" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <p class="frontheader"></p>
                <div class="hidden group-hover:block group-hover:translate-y-1 -mx-12 mt-7 absolute bg-gray-400 text-white rounded px-2 py-1 text-sm whitespace-nowrap">
                  <span>
                    Create a Activity
                  </span>
                </div>
              </MenuLink>
            </button>
          </div>
          <div class="relative mt-2.5 h-7 group">
            <button @click="toggleDropdownChat()">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-8 transition duration-500 ease-in-out w-7 h-7 group-hover:scale-125">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="invisible group-hover:scale-105 group-hover:visible group-hover:animate-[move_35s_linear_infinite] group-hover:stroke-blue-600" stroke-dasharray="50" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              <p class="frontheader"></p>
              <div class="hidden group-hover:block group-hover:translate-y-1 -mx-5 mt-7 absolute bg-gray-400 text-white rounded px-2 py-1 text-sm whitespace-nowrap">
                  <span>
                    Message
                  </span>
              </div>
            </button>
            <div class="chat-alert" :class="{ open: chats_counter }"/>
            <div class="dropdown-chat my-8 p-4" :class="{ open: isDropdownChat }">
              <span class="text-black text-2xl font-bold">Messages</span>
              <ul class="divide-y-2">
                  <li
                    v-for="chat in chats"
                    :key="chat.id"
                    :value="chat.id"
                    @click="toggleDropdownAllOff()"
                  >
                    <MenuLink :to="getLinkChat(chat)">
                      <p class="frontheader">
                        {{chat.name}}
                      </p>
                      <p>
                        {{chat.message}}
                      </p>
                      <p class="frontdatetime">
                        {{datetime(chat.created_at)}}
                      </p>
                    </MenuLink>
                  </li>
              </ul>
            </div>
          </div>
          <div class="relative mt-2.5 h-7 group">
            <button @click="toggleDropdownUser()">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-8 transition duration-500 ease-in-out w-7 h-7 group-hover:scale-125">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="invisible group-hover:scale-105 group-hover:visible group-hover:animate-[move_35s_linear_infinite] group-hover:stroke-blue-600" stroke-dasharray="50" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <div class="hidden group-hover:block group-hover:translate-y-1 -mx-3 mt-7 absolute bg-gray-400 text-white rounded px-2 py-1 text-sm whitespace-nowrap">
                  <span>
                    Friend
                  </span>
              </div>
            </button>
            <div class="dropdown-user my-8 p-4" :class="{ open: isDropdownUser }">
              <span class="text-black text-2xl font-bold">Friends</span>
              <input type="text" v-model="searchTerm" @input="search" placeholder="Search User"
                class="block py-2 pr-2 pl-4 text-m text-gray-900 rounded-lg w-64 p-2 my-2 h-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                style="padding-top: 0px; padding-bottom: 2px; padding-left: 6px; padding-right: 20px;" />
              <ul class="divide-y-2">
                  <li
                    v-for="user in users"
                    :key="user.id"
                    :value="user.id"
                    @click="toggleDropdownAllOff()"
                  >
                    <nuxt-link  :to="`/profile/${user.id}`">
                      <p class="frontheader">
                        {{user.username}}
                      </p>
                    </nuxt-link >
                  </li>
              </ul>
            </div>
          </div>
         <div class="relative mt-2.5 h-7 group">
            <button @click="toggleDropdownNotification()">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-8 transition duration-500 ease-in-out w-7 h-7 group-hover:scale-125">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="invisible group-hover:scale-105 group-hover:visible group-hover:animate-[move_35s_linear_infinite] group-hover:stroke-blue-600" stroke-dasharray="50" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <p class="frontheader"></p>
              <div class="hidden group-hover:block group-hover:translate-y-1 -mx-7 mt-7 absolute bg-gray-400 text-white rounded px-2 py-1 text-sm whitespace-nowrap">
                  <span>
                    Notification
                  </span>
              </div>
            </button>
            <div class="notification-alert" :class="{ open: notifications_counter }"/>
            <div class="dropdown-notification my-8 p-4" :class="{ open: isDropdownNotification }">
              <span class="text-black text-2xl font-bold">Notification</span>
              <ul class="divide-y-2">
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
                    </MenuLink>
                  </li>
              </ul>
            </div>
          </div>
          <div class="button-profile">
            <button @click="toggleDropdownProfile()" class="group" >
              <img v-if="!image_path" src="@/assets/images/user-default.jpg" class="object-none object-scale-down w-12 h-12  transition-all duration-500 ease-in-out rounded-full group-hover:ring-2 group-hover:ring-blue-600 group-hover:ring-offset-base-100 group-hover:ring-offset-2 peer-focus:scale-125" />
              <img v-else :src="`http://localhost/${image_path}`" class="object-none object-scale-down w-12 h-12  transition-all duration-500 ease-in-out rounded-full group-hover:ring-2 group-hover:ring-blue-600 group-hover:ring-offset-base-100 group-hover:ring-offset-2 peer-focus:scale-125" />
              <p class="frontheader"></p>
              <div class="hidden group-hover:block group-hover:translate-y-1 mt-5 absolute bg-gray-400 text-white rounded px-2 py-1 text-sm whitespace-nowrap">
                  <span>
                    Profile
                  </span>
              </div>
            </button>
            <div class="dropdown-profile p-2 rounded shadow overflow-hidden truncate ..." :class="{ open: isDropdownProfile }">
              <ul>
                <MenuLink to="/profile">
                  <li @click="toggleDropdownAllOff()">
                    <div>
                      <img v-if="!image_path" src="@/assets/images/user-default.jpg" class="inline-block object-none object-scale-down w-12 h-12 rounded-full" />
                      <img v-else :src="`http://localhost/${image_path}`" class="inline-block object-none object-scale-down w-12 h-12 rounded-full" />
                      <span class="absolute text-black ml-3 mt-1">{{ auth.user.firstname }}  {{ auth.user.lastname }}</span>
                      <span class="absolute text-gray-400 ml-3 mt-6">Your Profile</span>
                    </div>
                  </li>
                </MenuLink>
                <li @click="logout">
                  <div>
                  <span class="flex items-center gap-2 w-full first-of-type:rounded-t-md last-of-type:rounded-b-md px-4 py-2.5 text-left">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <span class="text-red-500">Logout</span>
                  </span>
                </div>
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
  import { computed, onMounted } from "vue";
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
  const notifications = ref([]);
  const chats = ref([]);
  const users = ref([]);
  const notifications_counter = ref(0)
  const chats_counter = ref(0)
  const options = {
    headers: {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": `Bearer ${auth.token}`, 
    }
  }

  const pusher = new Pusher('301d0ac46c750e11bff0', {
    cluster: 'ap1'
  });

  const channel = pusher.subscribe('Notifications');
  channel.bind('Notification' + auth.user.id, () => {
    console.log("Pusher Notification");
    notifications_counter.value += 1;
    myNotification();
  });
  channel.bind('Message' + auth.user.id, () => {
    console.log("Pusher Message", chats_counter.value);
    chats_counter.value += 1;
    myChats();
  });

  onMounted(() => {
    allUser();
  });

  const getLinkNotification = (notification: any) => {
    if (notification.header.includes('Friend')) {
      return `/profile/${notification.link_id}`;
    } else if (notification.header.includes('Activity')) {
      return `/activity/${notification.link_id}`;
    }
  }

  const getLinkChat= (chat: any) => {
    if (chat.friend_id) {
      return `/message/friend${chat.friend_id}`;
    } else {
      return `/message/activity${chat.id}`;
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

  const myChats = async () => {
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
      console.log("chats:", response.data.chats);
      chats.value = response.data.chats;
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
    myChats();
    chats_counter.value = 0;
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
    pusher.unbind_all();
    auth.clear();
    window.location.href = '/login';
  };
</script>

<style scoped>

.dropdown-profile {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  display: none;
  z-index: 1;
  width: 256px;
  margin-top: 24px;
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

.chat-alert,
.notification-alert {
  position: absolute;
  background-color: red;
  border-radius: 10px;
  width: 10px;
  height: 10px;
  top: 5px;
  left: 25px;
  display: none;
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

.chat-alert.open,
.notification-alert.open,
.dropdown-profile.open,
.dropdown-chat.open,
.dropdown-user.open,
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
  background-color: #ebebeb;
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