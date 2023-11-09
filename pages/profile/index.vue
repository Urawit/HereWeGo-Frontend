<template>
    <div class=" px-6 py-32 relative text-center text-neutral-200 bg-blue-800">
    </div>
    <div class="bg-white relative shadow rounded-lg w-5/6 mx-auto">
        <div class="flex justify-left">
            <img :src="`http://localhost/${image_path}`"
                class="rounded-full mx-auto absolute -top-16 w-40 h-40 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
        </div>
    </div>
    <div class="container mb-4">
        <div id="content" class="bg-white w-screen ">
            <div class="mx-80 text-2xl pt-3 text-black">
                <div id="username text-2xl text-black">
                    {{ user_name }}
                </div>
                <div class="mb-4 mt-10 w-auto flex flex-wrap">
                    <span class="cursor-pointer rounded-full bg-gray-300 px-4 py-2 text-sm mr-4 ">swimming</span>
                </div>
                <div class="py-10 bg-white">
                </div>

                <div class="flex w-full">
                    <div class="group grid h-16 flex-grow card rounded-box place-items-center bg-white">
                        <button @click="changeTab('ActivityJoined')">
                            Activity Joined
                        </button>
                        <div
                            class="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-10 border-blue-500 w-full transition-all duration-400 ease-in-out ">
                        </div>
                    </div>
                    <div class="divider divider-horizontal"></div>
                    <div class="group grid h-16 flex-grow card rounded-box place-items-center bg-white">
                        <button @click="changeTab('YourActivity')">
                            Your Activity
                        </button>
                        <div
                            class="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-10 border-blue-500 w-full transition-all duration-400 ease-in-out ">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ActivityJoined v-if="activeTab === 'ActivityJoined'" />
    <YourActivity v-if="activeTab === 'YourActivity'" />
</template>

<script setup lang="ts">
import YourActivity from '~/components/YourActivity.vue';
import ActivityJoined from '~/components/ActivityJoined.vue';
import { useAuthStore } from '~/stores/useAuthStore';
import { computed, onMounted } from "vue";
import axios from 'axios';

const components = {
    YourActivity,
    ActivityJoined
};
const activeTab = ref("ActivityJoined")

const changeTab = (c: string) => {
    activeTab.value = c
    console.log(activeTab)


};

</script>



