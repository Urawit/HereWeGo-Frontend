
<template>
    <div class="relative h-80 w-full bg-gradient-to-t from-gray-400 via-gray-300 to-gray-200">
      <div class="absolute -bottom-20 ml-60 h-40 w-40 -translate-x-1/2 transform rounded-full border-4 border-white overflow-hidden">
          <img :src="`http://localhost/${image_path}`" alt="User's Profile Picture" class="w-full h-full object-cover rounded-full" />
      </div>
    </div>
    <div class="h-80 w-full bg-gray-50">
      <h1 class="ml-96 text-3xl font-semibold"> {{ username }}</h1>
      <!-- <p class="mt-3 my-2 ml-96 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing</p> -->
      <div v-for="activity in activities" :key="activity.id" class="mb-4 ml-96 gap-2 mt-8 w-auto flex flex-wrap">
        <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm">{{ activity.name }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '~/stores/useAuthStore';
  import { computed, ref, onMounted} from "vue";
  import useMyFetch from '~/composables/useMyFetch';
      export default{
          setup(){
              const activities = ref([]);  // to store the fetched activities
              const route = useRoute();
  
              async function fetchActivities() {
              const { data } = await useMyFetch<any>(
                  `selectActivities?user_id=${route.params.id}`,
                  {}
              );
              activities.value = data;
              }
  
              onMounted(fetchActivities);
              const authStore = useAuthStore();
              const image_path = computed(() => authStore.user.image_path);
              const username = computed(() => authStore.user.username);
              return {
                  image_path,
                  username,
                  activities
              }
              }
          };
  </script>