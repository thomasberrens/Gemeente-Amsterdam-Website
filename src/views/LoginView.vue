<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">
        Log in to Security Amsterdam
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6 flex flex-col items-center" @submit.prevent="login">
          <div class="w-full">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-red-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 sm:text-sm">
            </div>
          </div>

          <div class="w-full">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-red-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 sm:text-sm">
            </div>
          </div>

          <div class="w-full mt-6">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ApiHandler from "@/api/ApiHandler";
import {useAuthStore} from "@/store/AuthStore";
import {useRouter} from "vue-router";
import {RouteTypes} from "@/router/RouteTypes";

const authStore = useAuthStore();

const router = useRouter();

const email = ref('');
const password = ref('');

const login = async () => {

  console.log("sending: " + email.value + ", pass: " + password.value);

  ApiHandler.postLogin(email.value, password.value).then((response) => {
    console.log("got: ", response)

    authStore.setTokenFromAuth(response);

    router.push({name: RouteTypes.DASHBOARD.name})
  });

};
</script>

<style scoped>

</style>