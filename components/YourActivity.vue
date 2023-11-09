<template>

    <div v-for="activity in myActivities" 
        class="border-2 mx-auto my-12 w-4/6 h-40 border-black">
        <div class="grid grid-cols-4 gap-1">
            <div class="my-5">
                <img src="https://i.imgur.com/SADzkAv.jpg" class="mx-5 w-28 h-28">
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
            <div id="NameActivity" class="">
                <div class="my-5">
                    <div class="text-black ">
                        {{ activity.start_date }}
                    </div>
    
                </div>
            </div>
            <div id="NameActivity" class="">
                <div class="my-4">
                    <div class="">
                        <button
                            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mx-16 my-10 w-32 border border-gray-700 rounded">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

const { data: myActivities } = await useMyFetch<any>(
    "myActivities",
    {}
)
console.log(myActivities)



</script>

