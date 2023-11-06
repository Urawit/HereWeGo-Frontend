<template>
    <section class="bg-gray-50">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div class="text-center">
                        <h1 class="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                        Register
                    </h1>
                    </div>
                    
                    <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit()">
                        <div>
                            <label for="email"
                                class="block mb-2 font-medium text-gray-900 dark:text-white">email</label>
                            <input v-model="formData.email" type="email" name="email" id="email"
                                class="bg-gray-50 px-4 py-3 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                placeholder="Enter email" required />
                            <p v-if="errorMessage.email" class="text-red-500">
                                {{ errorMessage.email }}
                            </p>
                        </div>
                        <div>
                            <label for="username"
                                class="block mb-2 font-medium text-gray-900 dark:text-white">username</label>
                            <input v-model="formData.username" type="text" name="username" id="username"
                                class="bg-gray-50 px-4 py-3 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                placeholder="Enter username" required />
                            <p v-if="errorMessage.username" class="text-red-500">
                                {{ errorMessage.username }}
                            </p>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 font-medium text-gray-900 dark:text-white">password</label>
                            <input v-model="formData.password" type="password" name="password" id="password"
                                placeholder="Enter password"
                                class="bg-gray-50 px-4 py-3 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                required />
                            <p v-if="errorMessage.password" class="text-red-500">
                                {{ errorMessage.password }}
                            </p>
                        </div>
                        <div>
                            <label for="password_confirmation"
                                class="block mb-2 font-medium text-gray-900 dark:text-white">Confirm
                                Password</label>
                            <input v-model="formData.password_confirmation" type="password" name="password_confirmation"
                                id="password_confirmation" placeholder="Enter password"
                                class="bg-gray-50 px-4 py-3 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                required />
                            <p v-if="errorMessage.password_confirmation" class="text-red-500">
                                {{ errorMessage.password_confirmation }}
                            </p>
                        </div>
                        <div>
                            <label for="firstname"
                                class="block mb-2 font-medium text-gray-900 dark:text-white">firstname</label>
                            <input v-model="formData.firstname" type="text" name="firstname" id="firstname"
                                class="bg-gray-50 px-4 py-3 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                placeholder="Enter firstname" required />
                            <p v-if="errorMessage.firstname" class="text-red-500">
                                {{ errorMessage.firstname }}
                            </p>
                        </div>
                        <div>
                            <label for="lastname"
                                class="block mb-2 font-medium text-gray-900 dark:text-white">lastname</label>

                            <input v-model="formData.lastname" type="text" name="lastname" id="lastname"
                                class="bg-gray-50 px-4 py-3 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full"
                                placeholder="Enter lastname" required />
                            <p v-if="errorMessage.lastname" class="text-red-500">
                                {{ errorMessage.lastname }}
                            </p>
                        </div>
                        <div>
                            <label for="phoneNumber"
                                class="block mb-2 font-medium text-gray-900 dark:text-white">phone</label>
                            <input v-model="formData.phone" type="text" name="phoneNumber" id="phoneNumber"
                                class="bg-gray-50 px-4 py-3 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full"
                                placeholder="Enter phone number" required />
                            <p v-if="errorMessage.phone" class="text-red-500">
                                {{ errorMessage.phone }}
                            </p>
                        </div>

                        <div class="container max-h-120 mx-auto items-center py-5">
                            <section v-if="previewUrl" class="mx-auto bg-white rounded-lg shadow-md items-center ">
                                <!-- Display the selected image -->
                                <div class="px-4 py-8">
                                    <div
                                        class="max-w-sm mb-3 py-2 bg-gray-100 border-dashed border-2 rounded-lg items-center mx-auto text-center cursor-pointer">
                                        <div v-if="previewUrl" class="flex items-center justify-center">
                                            <img :src="previewUrl" class="max-h-60 px-auto w-60 object-cover" />
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-center">
                                        <div class="w-full flex items-center">
                                            <label class="cursor-pointer">
                                                <span
                                                    class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-full">เลือกรูป</span>
                                                <input type="file" class="hidden" accept="image/*" @change="previewImage" />
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
                                        class="flex flex-col items-center justify-center w-full h-96 border-2 border-gold border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-bray-800 hover:bg-gray-100"
                                        @dragover.prevent="dragOver" @dragleave.prevent="dragLeave"
                                        @drop.prevent="dropImage" ref="dropzone">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-12 h-12 mb-4 text-gray-500" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500">
                                                <span class="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p class="text-xs text-gray-500">JPEG, PNG, JPG or GIF</p>
                                        </div>
                                        <label class="mb-4 cursor-pointer">
                                            <span
                                                class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-full">choose image</span>
                                            <input type="file" id="dropzone-file" class="hidden" accept="image/*"
                                                @change="previewImage" />
                                        </label>
                                    </label>
                                </div>
                            </section>
                        </div>

                        <button type="submit" @click="onSubmit"
                            class="w-full text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Create an account
                        </button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?
                            <a href="/login" class="font-medium text-blue-500 hover:underline dark:text-blue-500">
                                Login here
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script setup lang="ts">
import { reactive, ref } from "vue";
import axios from "axios";
import { useAuthStore } from "~/stores/useAuthStore";

const previewUrl = ref(null);
const selectedFile = ref(null);
const dropzone = ref(null);
const uploadedFile = ref(null);
const imageFileType = ref(null);

const auth = useAuthStore();
const formData = reactive({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    firstname: "",
    lastname: "",
    phone: "",
    // image_path: "",
});

const errorMessage = reactive({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    firstname: "",
    lastname: "",
    phone: "",
});

async function onSubmit() {
    Object.keys(errorMessage).forEach((key) => {
        errorMessage[key] = "";
    });
    let isFormValid = true;
    Object.keys(formData).forEach((key) => {
        if (!formData[key] && key != "image_path") {
            errorMessage[key] = `${key} is required.`;
            isFormValid = false;
            console.log(errorMessage[key]);
            console.log(errorMessage);
        }
    });

    // Validate Phone Number
    if (formData.phone.length !== 10) {
        errorMessage.phone = "Phone number must be 10 digits";
        isFormValid = false;
    }

    if (formData.password !== formData.password_confirmation) {
        errorMessage.password_confirmation = "Passwords do not match.";
        isFormValid = false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
        errorMessage.email = "Invalid email format. Please use a valid email address.";
        isFormValid = false;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.username) || formData.username.length > 20) {
        errorMessage.username = "Username must be English characters, digits, and underscores only, and length should be 20 characters or less.";
        isFormValid = false;
    }
    if (formData.password.length < 8) {
        errorMessage.password = "Password must be at least 8 characters long.";
        isFormValid = false;
    }
    if (formData.phone.length !== 10) {
        errorMessage.phone = "Phone number must be 10 digits.";
        isFormValid = false;
    }

   
    if (!isFormValid) return;
    let registrationData = new FormData();

    if (uploadedFile.value) {
        registrationData.append("image", uploadedFile.value);

        // formData.image_path = (Math.floor( new Date().getTime() / 1000)).toString() + "." + imageFileType.value;
    }

    Object.keys(formData).forEach((key) => {
        registrationData.append(key, formData[key]);
    });    

    console.error();
    try {
        const { data: response } = await axios.post(
            "http://localhost/api/auth/register",
            registrationData
        );
        console.log("Response register:", response);
        await navigateTo("/login");

        if (response.success && response.data) {
            // auth.setUser(formData.email, formData.username, formData.firstname, formData.lastname, formData.phone, formData.image_path);
            await navigateTo("/login");
        } else {
            console.log(response);
        }

        formData.email = ''
        formData.username = ''
        formData.password = ''
        formData.password_confirmation = ''
        formData.firstname = ''
        formData.lastname = ''
        formData.phone = ''
        // formData.image_path = ''

    } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.data) {
            console.log("Validation errors:", error.response.data);
            Object.keys(error.response.data.errors).forEach((key) => {
                if (errorMessage[key] !== undefined) {
                    errorMessage[key] = error.response.data.errors[key].join(", ");
                }
            });
        }
    }
}

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