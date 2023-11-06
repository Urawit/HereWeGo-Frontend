<template>
    <div class="bg-gray-50 min-h-screen flex items-center justify-center">
        <div class="max-w-7xl mx-auto px-20 py-20">
            <h1 class="text-3xl font-bold mb-10 text-center">Create Your Activity</h1>
            <div class="bg-white rounded-lg border-gray-300 shadow dark:border px-20 py-10 sm:max-w-5xl">
                <div>
                    <form @submit.prevent="createActivity()">
                        <div class="grid grid-cols-2 gap-20">
                            <div>
                                <!-- Name -->
                                <div class="mb-4">
                                    <label for="name" class="block font-semibold">Name</label>
                                    <input type="text" id="name" v-model="activityData.name"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required>
                                    <span class="text-red-500" v-if="errors.name">Name is required</span>
                                </div>

                                <!-- Start Date (use a date-time picker library) -->
                                <div class="mb-4">
                                    <label for="start_date" class="block font-semibold">Event starts</label>
                                    <input v-if="!activityData.end_date" type="datetime-local" id="start_date"
                                        v-model="activityData.start_date" :min="getCurrentDateTime()"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required />
                                    <input v-else type="datetime-local" id="start_date" v-model="activityData.start_date"
                                        :max="activityData.end_date" :min="getCurrentDateTime()"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required />
                                    <span class="text-red-500" v-if="errors.start_date">Start Date is required</span>
                                </div>

                                <!-- Maximum -->
                                <div class="mb-4">
                                    <label for="maximum" class="block font-semibold">Maximum Joinable</label>
                                    <input type="number" id="maximum" v-model="activityData.maximum"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required>
                                    <span class="text-red-500" v-if="errors.maximum">Maximum is required</span>
                                </div>

                                <div class="container max-h-55 mx-auto items-center py-5">
                                    <label class="block font-semibold mb-2">Activity Image</label>
                                    <section v-if="previewUrl" class="mx-auto bg-white rounded-lg shadow-md items-center">
                                        <!-- Display the selected image -->
                                        <div class="px-4 py-8">
                                            <div
                                                class="max-w-sm mb-3 py-2 bg-gray-100 border-dashed border-2 rounded-lg items-center mx-auto text-center cursor-pointer">
                                                <div v-if="previewUrl" class="flex items-center justify-center">
                                                    <img :src="previewUrl" class="max-h-55 px-auto w-60 object-cover" />
                                                </div>
                                            </div>

                                            <div class="flex items-center justify-center">
                                                <div class="w-full flex items-center">
                                                    <label class="cursor-pointer">
                                                        <span
                                                            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-full">change</span>
                                                        <input type="file" class="hidden" accept="image/*"
                                                            @change="previewImage" />
                                                    </label>
                                                    <div v-if="selectedFile" class="ml-3 text-sm text-gray-700">
                                                        {{ selectedFile.name }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section v-else class="mx-auto bg-white rounded-lg shadow-md items-center ">
                                        <div class="flex items-center justify-center w-full">
                                            <label for="dropzone-file"
                                                class="flex flex-col items-center justify-center w-full h-60 border-2 border-gold border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-bray-800 hover:bg-gray-100"
                                                @dragover.prevent="dragOver" @dragleave.prevent="dragLeave"
                                                @drop.prevent="dropImage" ref="dropzone">
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg class="w-12 h-12 mb-4 text-gray-500" aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                            stroke-linejoin="round" stroke-width="2"
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p class="mb-2 text-sm text-gray-500">
                                                        <span class="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p class="text-xs text-gray-500">JPEG, PNG, JPG or GIF</p>
                                                </div>
                                                <label class="mb-4 cursor-pointer">
                                                    <span
                                                        class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-full">choose
                                                        image</span>
                                                    <input type="file" id="dropzone-file" class="hidden" accept="image/*"
                                                        @change="previewImage" />
                                                </label>
                                            </label>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div>
                                <!-- Category Dropdown (fetch data from backend) -->
                                <div class="mb-4">
                                    <label for="category" class="block font-semibold">Types of Event</label>
                                    <select id="category" v-model="activityData.category"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required>
                                        <option disabled value="">Select event type</option>
                                        <option v-for="(category, index) in categories" :key="index">{{ category.name }}
                                        </option>
                                        <!-- <option v-for="category in categories" :value="category.id">{{ category.name }}
                                        </option> -->
                                    </select>
                                    <span class="text-red-500">{{ errors.category }}</span>
                                </div>

                                <div class="mb-4">
                                    <label for="end_date" class="block font-semibold">Event Ends</label>
                                    <input v-if="activityData.start_date" type="datetime-local" id="end_date"
                                        v-model="activityData.end_date" :min="activityData.start_date"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required />
                                    <input v-else type="datetime-local" id="end_date" v-model="activityData.end_date"
                                        :min="getCurrentDateTime()" class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80"
                                        required />
                                    <span class="text-red-500" v-if="errors.end_date">End Date is required</span>
                                </div>

                                <!-- Optional: Detail -->
                                <div class="mb-4">
                                    <label for="detail" class="block font-semibold">Description</label>
                                    <textarea id="detail" v-model="activityData.detail"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <!-- Centered button -->
                            <button type="submit"
                                class="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 mt-4">Create
                                Activity</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  

<script setup lang="ts">
import { reactive, ref } from "vue";
import useMyFetch from '~/composables/useMyFetch';

const { data: response } = await useMyFetch<any>("allActivities", {})
const categories = response.value;

const previewUrl = ref(null);
const selectedFile = ref(null);
const dropzone = ref(null);
const uploadedFile = ref(null);
const imageFileType = ref(null);

const activityData = reactive({
    name: "",
    maximum: "",
    start_date: "",
    end_date: "",
    category: "",
    detail: "",
});

const errors = reactive({
    name: "",
    maximum: "",
    start_date: "",
    end_date: "",
    category: "",
    detail: "",
});

const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedDate;
};

const isSaveValid = () => {
    let valid = true;

    if(!activityData.category){
        valid = false;
        errors.category = "category is required"
    } else {
        errors.category = ""
    }

    return valid;
}

const createActivity = async () => {
    // const modal = document.getElementById("popup-modal");
    console.log("create")

    if (isSaveValid()) {
        await useMyFetch("pawn", {
          method: "POST",
          body: activityData,
        }
        )
        // modal.classList.remove("hidden");

        activityData.name = '';

        errors.name = '';
    }
};


const previewImage = (event) => {
    const file = event.target.files ? event.target.files[0] : null; // ตรวจสอบว่ามี files หรือไม่
    if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            previewUrl.value = reader.result;
            selectedFile.value = file; // Store the selected file
        };

        reader.readAsDataURL(file);
    }

    uploadedFile.value = file;
    imageFileType.value = file.name.split('.').pop();
};

const dragOver = (event) => {
    event.preventDefault();
    dropzone.value.classList.add("border-blue-500");
};

const dragLeave = () => {
    dropzone.value.classList.remove("border-blue-500");
};

const dropImage = (event) => {
    event.preventDefault();
    dropzone.value.classList.remove("border-blue-500");

    const file = event.dataTransfer.files[0];
    previewUrl.value = null; // Clear the old image
    selectedFile.value = null; // Clear the selected file
    if (file) {
        previewFile(file);
    }
};

const previewFile = (file) => {
    if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            previewUrl.value = reader.result;
            selectedFile.value = file; // Store the selected file
        };

        reader.readAsDataURL(file);
    }
};
</script>
  