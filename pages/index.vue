<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-20 py-20">
      <div class="grid grid-cols-4 gap-8">
        <!-- Repeat this card block for each item in your list -->
        <div v-for="activity in activities" :key="activity.id"
          class="rounded-lg overflow-hidden bg-white shadow-md border-2 hover:border-blue-500 border-gray-300 transition-transform transform hover:scale-105">
          <nuxt-link :to="`/activity/${activity.id}`">
            <div>
              <img v-if="activity.post_image_path" :src="`http://localhost/${activity.post_image_path}`" alt="Card Image"
                class="w-full h-60 object-cover">
              <img v-else src="@/assets/images/default-image.png" alt="Card Image" class="w-full h-60 object-cover p-12">
              <div class="p-4">
                <h2 class="text-xl font-bold text-blue-500 line-clamp-1">{{ activity.name }}</h2>
                <p class="text-sm mt-1.5 font-bold line-clamp-1">{{ activity.master_activity_name }}</p>
                <p class="text-sm mt-1.5">{{ activity.maximum }} PEOPLE</p>
                <p class="text-sm mt-1.5">
                  {{
                    new Date(activity.start_date).getDate().toString().padStart(2, '0') + ' ' +
                    new Date(activity.start_date).toLocaleString('en-US', { month: 'short' }) + ' ' +
                    new Date(activity.start_date).toLocaleString('en-US', {
                      hour: '2-digit', minute:
                        '2-digit', hour12: true
                    })
                  }}
                </p>
                <p class="text-sm text-gray-400 mt-1.5 line-clamp-2">{{ activity.detail }}</p>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import axios from 'axios';
import { useAuthStore } from "~/stores/useAuthStore";
import { ref, onMounted, onUpdated } from 'vue';

const activities = ref([]);
const auth = useAuthStore();
const options = {
  headers: {
    'Content-Type': 'application/json',
    "Accept": "application/json",
    "Authorization": `Bearer ${auth.token}`,
  }
}

onMounted(() => {
  if (auth.isLogin) {
    getAllActivities();
  } else {
    navigateTo('/login');
  }
});

const getMasterActivityName = async (masterActivityId) => {
  try {
    const response = await axios.get(`http://localhost/api/get-master-activity-name/${masterActivityId}`, options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching master activity name for ID ${masterActivityId}:`, error);
  }
};

const getAllActivities = async () => {
  try {
    const response = await axios.get('http://localhost/api/getActiveActivities', options);
    console.log("activities:", response.data.activities);
    activities.value = response.data.activities;

    for (const activity of activities.value) {
      activity.master_activity_name = await getMasterActivityName(activity.master_activity_id);
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};
</script>
