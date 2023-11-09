<template>
  <div class=" px-6 py-32 relative text-center text-neutral-200 bg-blue-800">
  </div>
  <div class="bg-white relative shadow rounded-lg w-5/6 mx-auto">
    <div class="flex justify-left">
      <img :src="`http://localhost/${user.image_path}`"
        class="rounded-full mx-auto absolute -top-16 w-40 h-40 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
    </div>
  </div>
  <div class="container mb-4">
    <div id="content" class="bg-white w-screen ">
      <div class="mx-80 text-2xl pt-3 text-black">
        <div id="username text-2xl text-black">
          {{ user.username }}
        </div>
        <div class="mb-4 mt-10 w-auto flex flex-wrap">
          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 hover:bg-gray-500" 
          :class="{ hidden : status != 'F'}" @click="deleteFriend()">UnFriend</span>
          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 hover:bg-gray-500" 
          :class="{ hidden : status != 'F'}" @click="navigateTo({ name: '/message', params: { id: frined_id }});">Message</span>

          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 hover:bg-gray-500" 
          :class="{ hidden : status != 'FW'}" @click="deleteFriend()">Eject Request</span>
          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 hover:bg-gray-500" 
          :class="{ hidden : status != 'FW'}" @click="addFriend()">Accept Request</span>

          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 hover:bg-gray-500" 
          :class="{ hidden : status != 'UW'}" @click="deleteFriend()">Cancel Request</span>

          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 hover:bg-gray-500" 
          :class="{ hidden : status != 'NF'}" @click="addFriend()">Add Friend</span>
        </div>
        <div class="py-10 bg-white">
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/useAuthStore';
import { computed, onMounted } from "vue";
import axios from 'axios';

const route = useRoute()
const auth = useAuthStore();
const frined_id = route.params.id;
const user = ref({});
const status = ref({});
const options = {
  headers: {
    'Content-Type': 'application/json',
    "Accept": "application/json",
    "Authorization": `Bearer ${auth.token}`, 
  }
}

onMounted(() => {
  console.log(auth.user.id, route.params.id);
  
  if (auth.user.id == route.params.id) {
    navigateTo('/profile')
  } else {
    getUser();
    checkFriendStatus();
  }
});

const getUser = async () => {
  const requestData = JSON.stringify({ user_id: route.params.id });
  try {
    const response = await axios.post('http://localhost/api/findUserByID', requestData, options);
    console.log("Find User:", response.data);
    user.value = response.data.user;
  } catch (error) {
    console.error('Error checking friend status:', error);
  }
}

const checkFriendStatus = async () => {
  const requestData = JSON.stringify({ friend_id: frined_id });
  try {
    const response = await axios.post('http://localhost/api/statusFriend', requestData, options);
    console.log("statusFriend:", response.data);
    status.value = response.data.result;
  } catch (error) {
    console.log('Error checking friend status:', error);
  }
};

const addFriend = async () => {
  const requestData = JSON.stringify({ friend_id: frined_id });
  try {
    const response = await axios.post('http://localhost/api/addFriend', requestData, options);
    console.log("statusFriend:", response.data);
    status.value = response.data.result;
  } catch (error) {
    console.log('Error checking friend status:', error);
  }
  checkFriendStatus();
};

const deleteFriend = async () => {
  const requestData = JSON.stringify({ friend_id: frined_id });
  try {
    const response = await axios.post('http://localhost/api/deleteFriend', requestData, options);
    console.log("statusFriend:", response.data);
    status.value = response.data.result;
  } catch (error) {
    console.log('Error checking friend status:', error);
  }
  checkFriendStatus();
};

</script>

<style>

.hidden {
  display: none;
}

</style>