<template>
    <div class="bg-gray-50 min-h-screen flex items-center justify-center">
        <div class="max-w-7xl mx-auto px-20 py-20">
            <h1 class="text-3xl font-bold mb-10 text-center">Create Your Activity</h1>
            <div class="bg-white rounded-lg border-gray-300 shadow dark:border px-20 py-10 sm:max-w-5xl">
                <div>
                    <form>
                        <div class="grid grid-cols-2 gap-20">
                            <div>
                                <!-- Name -->
                                <div class="mb-4">
                                    <label for="name" class="block font-semibold">Name</label>
                                    <input type="text" id="name" v-model="activityData.name"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required>
                                    <p class="text-red-500">{{ errors.name }}</p>
                                </div>

                                <!-- Start Date (use a date-time picker library) -->
                                <div class="mb-4">
                                    <label for="start_date" class="block font-semibold">Activity starts</label>
                                    <input v-if="!activityData.end_date" type="datetime-local" id="start_date"
                                        v-model="activityData.start_date" :min="getCurrentDateTime()"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required />
                                    <input v-else type="datetime-local" id="start_date" v-model="activityData.start_date"
                                        :max="activityData.end_date" :min="getCurrentDateTime()"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required />
                                    <p class="text-red-500">{{ errors.start_date }}</p>
                                </div>

                                <!-- Maximum -->
                                <div class="mb-4">
                                    <label for="maximum" class="block font-semibold">Maximum Joinable</label>
                                    <input type="number" id="maximum" v-model="activityData.maximum"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required>
                                    <p class="text-red-500">{{ errors.maximum }}</p>
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

                                    <p class="text-red-500">{{ errors.image }}</p>
                                </div>
                            </div>
                            <div>
                                <!-- Category Dropdown (fetch data from backend) -->
                                <div class="mb-4">
                                    <label for="category" class="block font-semibold">Types of Activity</label>
                                    <select id="category" v-model="activityData.category"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required>
                                        <option disabled value="">Select activity type</option>
                                        <option v-for="(category, index) in categories" :key="index" :value="category.id">{{
                                            category.name }}</option>
                                    </select>
                                    <p class="text-red-500">{{ errors.category }}</p>
                                </div>

                                <div class="mb-4">
                                    <label for="end_date" class="block font-semibold">Activity Ends</label>
                                    <input v-if="activityData.start_date" type="datetime-local" id="end_date"
                                        v-model="activityData.end_date" :min="activityData.start_date"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required />
                                    <input v-else type="datetime-local" id="end_date" v-model="activityData.end_date"
                                        :min="getCurrentDateTime()" class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80"
                                        required />
                                    <p class="text-red-500">{{ errors.end_date }}</p>
                                </div>

                                <!-- Location -->
                                <div class="mb-4">
                                    <label for="location" class="block font-semibold">Location</label>
                                    <input type="text" id="location" v-model="activityData.location"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80" required>
                                    <p class="text-red-500">{{ errors.location }}</p>
                                </div>

                                <!-- Optional: Detail -->
                                <div class="mb-4">
                                    <label for="detail" class="block font-semibold">Description</label>
                                    <textarea id="detail" v-model="activityData.detail"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80"></textarea>
                                </div>

                                <!-- Optional: Goal -->
                                <div class="mb-4">
                                    <label for="goal" class="block font-semibold">Goal</label>
                                    <textarea id="goal" v-model="activityData.goal"
                                        class="rounded-lg border-gray-300 bg-gray-50 mt-2 w-80"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <!-- Centered button -->
                            <button type="button" @click="createActivity"
                                class="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 mt-4">Create
                                Activity</button>
                        </div>
                    </form>
                </div>
            </div>




            <div>
                <div ref="modal" id="popup-modal" tabindex="-1"
                    class="hidden bg-gray-500 bg-opacity-60 flex justify-center items-center fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button"
                                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="popup-modal" @click="closeModal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span @click="closeModal" class="sr-only">Close modal</span>
                            </button>

                            <div class="p-6 text-center">
                                <svg class="mx-auto mb-4" width="50px" height="50px" viewBox="0 0 117 117" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <title />

                                    <desc />

                                    <defs />

                                    <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">
                                        <g fill-rule="nonzero" id="correct">
                                            <path
                                                d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z"
                                                fill="#17AB13" id="Shape" />

                                            <path
                                                d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z"
                                                fill="#4A4A4A" id="Shape" />
                                        </g>
                                    </g>
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Activity created successfully
                                </h3>
                                <button type="button" @click="closeModal"
                                    class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "~/stores/useAuthStore";
import useMyFetch from '~/composables/useMyFetch';
import BoxIcon from 'box-icon';

const { data: response } = await useMyFetch<any>("allActivities", {})
const categories = response.value;

const authStore = useAuthStore();
const user_id = computed(() => authStore.user.id);

const previewUrl = ref(null);
const selectedFile = ref(null);
const dropzone = ref(null);
const uploadedFile = ref(null);
const imageFileType = ref(null);

const createdActivity = ref(null);

const activityData = reactive({
    name: "",
    maximum: null,
    start_date: "",
    end_date: "",
    category: "",
    detail: "",
    goal: "",
    location: "",
});

const errors = reactive({
    name: "",
    maximum: "",
    start_date: "",
    end_date: "",
    category: "",
    detail: "",
    location: "",
    image: "",
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

function isSaveValid() {
    let valid = true;

    if (!activityData.category) {
        valid = false;
        errors.category = "activity type is required"
    } else {
        errors.category = ""
    }
    if (!activityData.name) {
        valid = false;
        errors.name = "name is required"
    } else {
        errors.name = ""
    }
    if (!activityData.maximum) {
        valid = false;
        errors.maximum = "maximum joinable is required"
    } else {
        if (activityData.maximum <= 1) {
            errors.maximum = "maximum must be more than one"
            valid = false;
        } else {
            errors.maximum = ""
        }
    }
    if (!activityData.start_date) {
        valid = false;
        errors.start_date = "start date is required"
    } else {
        errors.category = ""
    }
    if (!activityData.end_date) {
        valid = false;
        errors.end_date = "end date is required"
    } else {
        errors.end_date = ""
    }
    if (!activityData.location) {
        valid = false;
        errors.location = "location is required"
    } else {
        errors.location = ""
    }
    if (!uploadedFile.value) {
        valid = false;
        errors.image = "image is required"
    } else {
        errors.image = ""
    }

    if (valid) { console.log("valid") }
    else { console.log("invalid") }

    return valid;
};

const closeModal = () => {
    const modal = document.getElementById("popup-modal");
    if (modal) {
        modal.classList.add("hidden");
    }
    window.location.href = `${createdActivity.value}`;
};

async function createActivity() {
    console.log("start")
    const modal = document.getElementById("popup-modal");
    if (isSaveValid()) {
        console.log("savevalid")

        const dataToSend = {
            name: activityData.name,
            maximum: activityData.maximum,
            start_date: activityData.start_date,
            end_date: activityData.end_date,
            master_activity_id: activityData.category,
            detail: activityData.detail,
            goal: activityData.goal,
            location: activityData.location,
            user_id: user_id.value,
        };

        const formData = new FormData();

        for (const key in dataToSend) {
            formData.append(key, dataToSend[key]);
        }

        formData.append('image', uploadedFile.value);

        try {
            const response = await fetch('http://localhost/api/createActivity', {
                method: "POST",
                body: formData,  // Send the form data
            });

            if (response.ok) {
                const responseData = await response.json();
                createdActivity.value = responseData.activity.id;

                if (responseData) {

                    // Clear form fields and error messages
                    activityData.name = '';
                    activityData.maximum = null;
                    activityData.start_date = '';
                    activityData.end_date = '';
                    activityData.category = '';
                    activityData.detail = '';
                    activityData.goal = '';
                    activityData.location = '';

                    for (const key in errors) {
                        errors[key] = '';
                    }

                    // Clear previewed image
                    previewUrl.value = null;
                    selectedFile.value = null;

                    modal.classList.remove("hidden");

                    console.log("Activity created successfully");
                } else {
                    console.log("Failed to create the activity");
                }
            } else {
                console.log("HTTP request failed");
            }
        } catch (error) {
            // Handle errors here
            console.error("error ", error);
        }
    }
    else {
        console.log("saveinvalid")
    }
};


const previewImage = (event) => {
    const file = event.target.files ? event.target.files[0] : null; // ตรวจสอบว่ามี files หรือไม่
    if (file) {
        console.log("Selected file:", file);
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
  