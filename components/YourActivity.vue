<template>
    <div v-for="activity in activities" class="border-2 mx-auto my-12 w-4/6 h-40 border-black">
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
            <div id="edit" class="">
                <div class="my-4">
                    <div class="">
                        <nuxt-link :to="`/activity/edit/${activity.id}`">
                            <button 
                            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mx-16 my-10 w-32 border border-gray-700 rounded">
                            Edit
                        </button>
                        </nuxt-link>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore';
import { computed, onMounted } from "vue";
import axios from 'axios';

const auth = useAuthStore();
const activities = ref([]);

const options = {
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        "Authorization": `Bearer ${auth.token}`,
    }
}

onMounted(() => {
    if (auth.isLogin) {
        myActivities();
    }
});

const myActivities = async () => {
    try {
        const response = await axios.get('http://localhost/api/myActivities', options);
        console.log("my activity", response.data);
        activities.value = response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};


</script>

