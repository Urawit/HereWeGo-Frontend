<template>
    <div id="app" class="pt-8 pb-8 flex items-center justify-center">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col p-6 sm:p-8">
                <h2 class=" text-2xl text-center font-bold text-gray-800 text-left">
                    Login
                </h2>
                <form @submit.prevent="submit">
                    <div id="input" class="flex flex-col w-full my-5">
                        <label for="email" class="text-gray-900 mb-2">email</label>
                        <input type="email" v-model="formData.email" required autocomplete="off"
                            placeholder="Enter email"
                            class="appearance-none border-gray-300 bg-gray-50 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>
                    </div>
                    <div id="input" class="flex flex-col w-full my-5">
                        <label for="password" class="text-gray-900 mb-2">password</label>
                        <input type="password" v-model="formData.password" required placeholder="Enter password"
                            class="appearance-none border-gray-300 bg-gray-50 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>
                    </div>

                    <div id="button" class="flex flex-col w-full mt-8">
                        <button type="submit"
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

const auth = await useAuthStore()
const errorMessage = ref<string | undefined>("")
const formData = reactive({ email: "", password: "" })

async function submit() {
    const { data: response, error } = await useMyFetch<any>('auth/login', {
        method: 'POST',
        body: formData
    })
    if (response.value !== null) {
        const { access_token, token_type } = response.value
        if (access_token !== "") {
            auth.setNewToken(access_token)
            const { data: user, error } = await useMyFetch<any>('auth/me', {
                method: 'POST'
            })
            if (user.value !== null) {
                auth.setUser(user.value.email, user.value.username, user.value.firstname, user.value.lastname, user.value.phone, user.value.image_path);
                await navigateTo('/')
            } else {
                auth.clear()
                errorMessage.value = "please try again"
            }
        }
    } else {
        errorMessage.value = error.value?.data.message
    }
}
</script>

<style>
html, body {
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
