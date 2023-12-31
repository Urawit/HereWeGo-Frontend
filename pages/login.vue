<template>
    <div id="app" class="pt-8 pb-8 flex items-center justify-center">
        <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col p-6 sm:p-8">
                <h2 class=" text-2xl text-center font-bold text-gray-800 text-left">
                    Login
                </h2>
                <form @submit.prevent="submit">
                    <div id="input" class="flex flex-col w-full my-5">
                        <label for="email" class="text-gray-900 mb-2">email</label>
                        <input type="email" v-model="formData.email" required autocomplete="off" placeholder="Enter email"
                            class="appearance-none border-gray-300 bg-gray-50 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        <p v-if="errors" class="text-red-600 text-sm">{{ errors.email }}</p>
                    </div>
                    <div id="input" class="flex flex-col w-full my-5">
                        <label for="password" class="text-gray-900 mb-2">password</label>
                        <input type="password" v-model="formData.password" required placeholder="Enter password"
                            class="appearance-none border-gray-300 bg-gray-50 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        <p v-if="errors" class="text-red-600 text-sm">{{ errors.password }}</p>
                    </div>

                    <div id="button" class="flex flex-col w-full mt-8">
                        <button type="submit" @click="submit"
                            class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Login</button>
                        <div class="flex justify-evenly mt-2">
                            <a href="/register" class="w-full text-center underline font-medium text-gray-500">Create
                                Account</a>
                        </div>
                        
                    </div>
                </form>
                
            </div>
        </div>
    </div>
</template>
  
  
  
<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";
import { onMounted } from 'vue';

onMounted(() => {
  if (auth.isLogin) {
    navigateTo('/');
  }
});

const auth = useAuthStore()
const errorMessage = ref<string | undefined>("")
const formData = reactive({ email: "", password: "" })


const loginData = reactive({
    email: "",
    password: null,
});

const errors = reactive({
    email: "",
    password: "",
});

async function submit() {
    const { data: response, error } = await useMyFetch<any>('auth/login', {
        method: 'POST',
        body: formData
    });

    Object.keys(errors).forEach((key) => {
        errors[key] = "";
    });
    let isFormValid = true;
    Object.keys(formData).forEach((key) => {
        if (!formData[key] && key !== "image_path") {
            errors[key] = `${key} is required.`;
            isFormValid = false;
        }
    });

    if (response.value !== null) {
        // Assuming the response includes the associated email with the password
        const { email, access_token, token_type } = response.value;
        if (email !== formData.email) {
            // errors.email = "Email and password do not match.";
            isFormValid = false;
        }

        if (access_token !== "") {
            auth.setNewToken(access_token);
            const { data: user, error } = await useMyFetch<any>('auth/me', {
                method: 'POST'
            });

            if (user.value !== null) {
                auth.setUser(user.value.id, user.value.email, user.value.username, user.value.firstname, user.value.lastname, user.value.phone, user.value.image_path);
                await navigateTo('/');
            } else {
                auth.clear();
                errorMessage.value = "Please try again";
            }
        }
    } else {
        errorMessage.value = error.value?.data.message;
    }

    if (!isFormValid) {
        return; // Display errors and prevent login
    }
}

</script>

<style>
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    background-color: #f7fafc;
}

#app {
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
