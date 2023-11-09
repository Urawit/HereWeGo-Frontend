<template>
    <!DOCTYPE html>
    <html lang="en">


    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="David Grzyb">
        <meta name="description" content="">



    </head>

    <body class="bg-white font-family-karla">

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
                        <p class="pb-2"> <i class="fa-solid fa-map-pin"></i> is a member {{ isMemberBoolean }} </p>

                    </div>

                    <div class="w-full bg-white shadow flex flex-col my-4 p-6 rounded-lg">
                        <p class="text-xl font-semibold pb-5"></p>
                        <div class="grid grid-cols-3 gap-3">

                            <div v-for="user of users" :keys="user.id" class="mb-4">
                                <nuxt-link :to="`/user/${user.id}`">
                                    <img v-if="user.image_path" class="profile-picture"
                                        :src="`http://localhost/${user.image_path}`">
                                    <img v-else src="@/assets/images/user-default.jpg" class="profile-picture">
                                </nuxt-link>
                            </div>


                            <!-- {{ activity.activity.post_image_path }} -->
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
                                activity.activity.master_activity_id }} </a>
                            <a class="text-3xl font-bold  pb-4"> {{ activity.activity.detail }}</a>
                            <a class="text-2xl  pb-4">GOAL : {{ activity.activity.goal }}</a>
                        </div>
                    </div>


                    <form @submit.prevent="onSubmit(activity.activity.id)">
                        <button v-if="!isMemberBoolean" type="submit" id="submit" @click="refreshPage">
                            Join
                        </button>

                    </form>


                </section>

            </div>
        </div>



    </body>

    </html>
</template>
  
  

<script setup lang="ts" >

import { useAuthStore } from '~/stores/useAuthStore'
const auth = useAuthStore()


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
  navigateTo('/');
};


const users = [];

for (const member of members._rawValue) {
    console.log("userid", member)
    const { data: user } = await useMyFetch<any>(`find-user/${member.user_id}`, {});

    // Push the user data to the users array
    users.push(user.value);
}

// members._rawValue.forEach((member) => {
//     const { data: user } = await useMyFetch<any>(
//         `find-user/${member.user_id}`,
//         {}
//     )
//     users.push(user);
// });




// const { data: member } = await useMyFetch<any>(
//     `find-user/${members.id}`
// )

// const { data: master_activity } = await useMyFetch<any>(
//     `get-master-activity-name/${activity.activity.master_activity_id}`,
//     {}
// )
console.log("member", activity.value.activity.master_activity_id)


const { data: isMember } = await useMyFetch<any>(`isMember/${route.params.id}`, {});
console.log(isMember.value.success);
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
        alert("you alredy joined")

    } else {
        console.log("not-member");
        alert("success join")

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
</style>