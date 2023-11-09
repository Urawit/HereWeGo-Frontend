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
        <!-- <div class="mb-4 mt-10 w-auto flex flex-wrap">
          <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 "></span>
        </div> -->
        <div class="py-10 bg-white">
        </div>

     

        <!-- <div class="mb-4 mt-10 w-auto flex flex-wrap">
          <span v-for="(activity, index) in activities" :key="index"
            class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4">
            {{ activity.name }}
          </span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/useAuthStore';
import { computed, onMounted } from "vue";

const route = useRoute()
const user = ref({});

onMounted(() => {
  getUser();
  checkFriendStatus();
});
const getUser = async () => {
  try {
    const response = await useMyFetch<any>(`find-user/${route.params.id}`, {});
    console.log("response: ", response.data.value);
    user.value = (response.data.value);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

const checkFriendStatus = async () => {
  try {
    const friendId =  user.value.id ;
    const response = await fetch('http://localhost/api/statusFriend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friend_id: friendId
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Friend Status:', data.result);
    } else {
      console.error('Failed to fetch friend status');
    }
  } catch (error) {
    
    //console.log("error")
    console.log('Error checking friend status:', error);
  }
};

</script>