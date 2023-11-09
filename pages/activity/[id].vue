<template>
    <div v-if="pending">
        Pending...
    </div>

    <div>


        <!-- Text Header -->
        <header class="w-full container mx-auto">
            <div class="flex flex-col items-center py-12">
                <a class="font-bold text-gray-800 uppercase hover:text-gray-700 text-4xl">
                    {{ activity.activity.name }}
                </a>
            </div>
        </header>


        <div class="container mx-auto flex flex-wrap py-6">
            <!-- side content -->
            <aside class="w-full md:w-1/4 flex flex-col items-center px-3">

                <div class="w-full bg-white shadow flex flex-col my-4 p-6 rounded-lg">
                    <p class="pb-2"> <i class="far fa-calendar-alt "></i> {{
                        formatDateTime(activity.activity.start_date) }}</p>
                    <p class="pb-2"> <i class="fa-regular fa-clock"></i> {{ formatTime(activity.activity.start_date) }}
                        - {{ formatTime(activity.activity.end_date) }}</p>
                    <p class="pb-2"> <i class="fa-solid fa-map-pin"></i> {{ activity.activity.location }} </p>



                </div>

                <div v-if="isMemberBoolean" class="w-full bg-white shadow flex flex-col my-4 p-6 rounded-lg">
                    <p class="text-xl font-semibold pb-5"></p>
                    <div class="grid grid-cols-3 gap-3">

                        <div v-for="user of users" :key="user.id" class="mb-4">
                            <nuxt-link :to="`/user/${user.id}`">
                                <img v-if="user.image_path" class="profile-picture"
                                    :src="`http://localhost/${user.image_path}`">
                                <img v-else src="@/assets/images/user-default.jpg" class="profile-picture">
                            </nuxt-link>
                        </div>

                        <div class="flex items-center justify-center">
                            <nuxt-link :to="`/message`">
                                <button class="button-9">
                                    Chats
                                </button>
                            </nuxt-link>
                        </div>

                        <!-- Leave the third column as is or add content as needed -->
                        <div>
                            <!-- {{ activity.activity.post_image_path }} -->
                        </div>
                    </div>
                </div>


            </aside>

            <!-- detail activity -->
            <section class="w-full md:w-2/3 flex flex-col items-center px-3 ml-20">

                <div class="flex flex-col shadow my-4 rounded-lg">
                    <!-- Activity Image -->
                    <a>
                        <img :src="`http://localhost/${activity.activity.post_image_path}`">
                    </a>
                    <div class="bg-white flex flex-col justify-start p-6">
                        <a class="text-blue-700 text-sm font-bold uppercase pb-4"> {{
                            MasterActivityName }} </a>
                        <a class="text-3xl font-bold  pb-4"> {{ activity.activity.detail }}</a>
                        <a class="text-2xl  pb-4">GOAL : {{ activity.activity.goal }}</a>
                    </div>
                </div>


                <form @submit.prevent="onSubmit(activity.activity.id)">
                    <button v-if="!isMemberBoolean" type="submit" id="submit" @click="refreshPage" class="button-9">
                        Join
                    </button>

                </form>


            </section>

        </div>
    </div>
</template>
  
  

<script setup lang="ts" >

import { useAuthStore } from '~/stores/useAuthStore'
import swal from 'sweetalert';
const route = useRoute()
const { data: activity, pending } = await useMyFetch<any>(
    `getActivity/${route.params.id}`,
    {}
)
const { data: members } = await useMyFetch<any>(
    `get-all-member/${route.params.id}`,
    {}
)
const refreshPage = () => {
    location.reload();
};
const { data: MasterActivityName } = await useMyFetch<any>(
    `get-master-activity-name/${activity.value.activity.master_activity_id}`,
    {}
)
console.log(activity.value.activity.master_activity_id, MasterActivityName)

const users = [];
for (const member of members._rawValue) {
    console.log("userid", member)
    const { data: user } = await useMyFetch<any>(`find-user/${member.id}`, {});
    users.push(user.value);
}

console.log("Users Array:", users);
users.forEach((user, index) => {
    console.log(`User ${index + 1} Data:`, user.id);
});

console.log("member", activity.value.activity.master_activity_id)

const { data: isMember } = await useMyFetch<any>(`isMember/${route.params.id}`, {});
const isMemberBoolean = isMember.value.success;
const formatDateTime = (dateTime: string | number | Date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateTime).toLocaleString(undefined, options);
};
const formatTime = (dateTime: string | number | Date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleString(undefined, options);
};
async function onSubmit(activityId: any) {
    const { data: response, error } = await useMyFetch<any>(`joinActivity/${activityId}`, {
        method: "POST",
    });

    if (isMember.value.success) {
        console.log("member");
        swal("you alredy joined")

    } else {
        console.log("not-member");
        swal({
            title: "Good job!",
            text: "success joined",
            icon: "success"
        });

    }
}
</script>

<style>
.profile-picture {
    width: 67px;
    height: 67px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #a19898;
}

.button-9 {
    appearance: button;
    backface-visibility: hidden;
    background-color: #405cf5;
    border-radius: 6px;
    border-width: 0;
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif;
    font-size: 100%;
    height: 44px;
    line-height: 1.15;
    margin: 12px 0 0;
    outline: none;
    overflow: hidden;
    padding: 0 25px;
    position: relative;
    text-align: center;
    text-transform: none;
    transform: translateZ(0);
    transition: all .2s, box-shadow .08s ease-in;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
}
</style>