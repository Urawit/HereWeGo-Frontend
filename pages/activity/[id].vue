
<template>
    <!DOCTYPE html>
    <html lang="en">


    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tailwind Blog Template</title>
        <meta name="author" content="David Grzyb">
        <meta name="description" content="">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@5.15.3/css/all.min.css">


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

                    <div class="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p class="pb-2"> <i class="far fa-calendar-alt "></i> {{
                            formatDateTime(activity.activity.start_date) }}</p>
                        <p class="pb-2"> <i class="fa-regular fa-clock"></i> {{ formatTime(activity.activity.start_date) }}
                            - {{ formatTime(activity.activity.end_date) }}</p>
                        <p class="pb-2"> <i class="fa-solid fa-map-pin"></i> รอ </p>

                    </div>

                    <div class="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p class="text-xl font-semibold pb-5"></p>
                        <div class="grid grid-cols-3 gap-3">
                            <img class="hover:opacity-75"
                                src="https://source.unsplash.com/collection/1346951/150x150?sig=1">

                        </div>

                    </div>

                </aside>

                <!-- detail activity -->
                <section class="w-full md:w-2/3 flex flex-col items-center px-3">

                    <article class="flex flex-col shadow my-4">
                        <!-- Activity Image -->
                        <a>
                            <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=1">
                        </a>
                        <div class="bg-white flex flex-col justify-start p-6">
                            <a class="text-blue-700 text-sm font-bold uppercase pb-4"> Master Aactivity </a>
                            <a class="text-3xl font-bold  pb-4">{{ activity.activity.detail }}</a>


                        </div>
                    </article>

                    <form @submit.prevent="onSubmit(activity.activity.id)">
                            <button type="submit">
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

const { data: activityMember } = await useMyFetch<any>(
    `getActivity/${route.params.id}`,
    {}
)




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
  
  if (response.value !== null) {
    console.log("success");
  } else {
    console.log(error.value);
    const { statusMessage, data } = error.value!;
  }
}

</script>