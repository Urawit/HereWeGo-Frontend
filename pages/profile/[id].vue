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
            :class="{ hidden: status != 'F' }" @click="deleteFriend()">UnFriend </span>
          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 hover:bg-gray-500"
            :class="{ hidden: status != 'F' }" @click="navigateTo('/message/friend' + frined_id);">Message</span>

          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 hover:bg-gray-500"
            :class="{ hidden: status != 'FW' }" @click="deleteFriend()">Eject Request</span>
          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 hover:bg-gray-500"
            :class="{ hidden: status != 'FW' }" @click="addFriend()">Accept Request</span>

          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 hover:bg-gray-500"
            :class="{ hidden: status != 'UW' }" @click="deleteFriend()">Cancel Request</span>

          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 hover:bg-gray-500"
            :class="{ hidden: status != 'NF' }" @click="addFriend()">Add Friend</span>
        </div>
        <div class="py-10 bg-white">
        </div>

      </div>
    </div>
  </div>
  <div v-if="status === 'F'">
    <div v-for="activity in joinedActivities" :key="activity.activity_id"
        class="border-2 mx-auto my-12 w-4/6 h-40 border-black">
        <div class="grid grid-cols-4 gap-1">
            <div class="my-5">
                <img v-if="activity.post_image_path" :src="`http://localhost/${activity.post_image_path}`"
                    class="mx-5 w-28 h-28">
            </div>
            <div id="NameActivity" class="">
                <div class="my-5">
                    <div class="text-black">
                        {{ activity.name }}
                    </div>
                    <div class="my-5 text-black">
                        {{ activity.location }}
                    </div>
                </div>
            </div>
            <div id="dateActivity" class="">
                <div class="my-5">

                    {{
                        new Date(activity.start_date).getDate().toString().padStart(2, '0') + ' ' +
                        new Date(activity.start_date).toLocaleString('en-US', { month: 'short' }) + ' ' +
                        new Date(activity.start_date).toLocaleString('en-US', {
                            hour: '2-digit', minute:
                                '2-digit', hour12: true
                        })
                    }}

                </div>
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
import ActivityJoined from '~/components/ActivityJoined.vue';

const route = useRoute()
const auth = useAuthStore();
const frined_id = route.params.id;
const user = ref({});
const userActivities = ref({});
const status = ref({});
const joinedActivities = ref([]);
const user_id = ref({});

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
    getJoinedActivityUser();
  }
});

const getUser = async () => {
  const requestData = JSON.stringify({ user_id: route.params.id });
  try {
    const response = await axios.post('http://localhost/api/findUserByID', requestData, options);
    console.log("Find User:", response.data);
    user.value = response.data.user;
    user_id.value = response.data.user.id;
    console.log("user_id1",user_id.value)
  } catch (error) {
    console.error('Error checking friend status:', error);
  }
}

const getJoinedActivityUser = async () => {
  try {
    const response = await axios.get('http://localhost/api/userJoinActivities', {
      params: {
        user_id: route.params.id,
      }, headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        "Authorization": `Bearer ${auth.token}`,
      }
    });
    console.log("users activity:", response.data);
    joinedActivities.value = response.data;
  } catch (error) {
    console.error('Error get users activity:', error);
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