<template>
<<<<<<< HEAD
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
=======
    <div class=" px-6 py-32 relative text-center text-neutral-200 bg-blue-800">
    </div>
    <div class="bg-white relative shadow rounded-lg w-5/6 mx-auto">
        <div class="flex justify-left">
            <img v-if="!image_path" src="`http://localhost/${user.image_path}`" class="rounded-full mx-auto absolute -top-16 w-40 h-40 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
            <img v-else :src="`http://localhost/${user.image_path}`" class="rounded-full mx-auto absolute -top-16 w-40 h-40 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
        </div>
    </div>
    <div class="container mb-4">
        <div id="content" class="bg-white w-screen h-screen ">
            <div class="mx-80 text-2xl pt-3 text-black">
                <div id="username text-2xl text-black">
                    Username, 18
                </div>
                <div id="name" class="my-2 text-gray-400">
                    Firstname Lastname
                </div>
                <div class="py-10 bg-white">
                    
                </div>
                <div class="flex w-full">
                    <div class="group grid h-16 flex-grow card rounded-box place-items-center bg-white">
                        <button>
                            Activity Joined
                        </button>
                        <div class="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-10 border-blue-500 w-full transition-all duration-400 ease-in-out "></div>
                    </div>
                    <div class="divider divider-horizontal"></div>
                    <div class="group grid h-16 flex-grow card rounded-box place-items-center bg-white">
                        <button>
                            Your Activity
                        </button>
                        <div class="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-10 border-blue-500 w-full transition-all duration-400 ease-in-out "></div>
                    </div>
                </div>
            </div>
            <div class="border-2 mx-auto my-12 w-4/6 h-40 border-black">
                <div class="grid grid-cols-4 gap-1">
                    <div class="my-5">
                        <img src="https://i.imgur.com/SADzkAv.jpg" class="mx-5 w-28 h-28">
                    </div>
                    <div id="NameActivity" class="">
                        <div class="my-5">
                            <div class="text-black">
                                Name of the Activity
                            </div>
                            <div class="my-5 text-black"> 
                                Address
                            </div>
                            <div class="my-5 text-black"> 
                                Sport
                            </div>
                        </div>
                    </div>
                    <div id="NameActivity" class="">
                        <div class="my-5">
                            <div class="text-black">
                                Date & Time
                            </div>
                            <div class="my-5">
                                13 Tuesday, March 2022, 8.00 AM
                            </div>
                        </div>
                    </div>
                    <div id="NameActivity" class="">
                        <div class="my-4">
                            <div class="">
                                <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mx-16 my-10 w-32 border border-gray-700 rounded">
                                    Leave
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
>>>>>>> 18e93a9f440bf14cdfbed907d7af41970d9870ee
</script>