<template>
  <div class="bg-gray-100">
    <header class="bg-white py-4">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold headerText">Gemeente Amsterdam</h1>
        <router-link v-if="!authStore.isAuthenticated" to="/login" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Log in</router-link>
        <router-link v-if="authStore.isAuthenticated" to="/dashboard" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Dashboard</router-link>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <h2 class="text-xl font-bold mb-4">Welcome to Security Amsterdam</h2>
      <p class="text-gray-700 leading-7">
        As employees of Gemeente Amsterdam, we all have a shared responsibility to protect our organization's sensitive data and digital assets from cyber threats. However, the ever-evolving nature of these threats makes it challenging to stay ahead of the game. That's why we've developed Security Amsterdam, a game designed to test your cyber security knowledge and make you more aware of the risks we face on a daily basis.

        In this game, you'll face a series of challenges and scenarios that will test your ability to identify and mitigate cyber security risks. From phishing attacks and malware infections to password vulnerabilities and social engineering tactics, you'll learn how to protect yourself and your organization from these threats.

        So get ready to put your cyber security skills to the test and join us on this important mission to safeguard our digital future!
      </p>
    </main>

    <footer class="bg-white py-4">
      <div class="container mx-auto px-4 text-center text-gray-600">
        &copy; 2023 Gemeente Amsterdam
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">

import {computed, onBeforeMount, ref} from "vue";
import ApiHandler from "@/api/ApiHandler";
import Choice from "@/api/records/Choice";
import Dashboard from "@/views/DashboardView.vue";
import router from "@/router";
import {RouteTypes} from "@/router/RouteTypes";
import {useAuthStore} from "@/store/AuthStore";

// ref
const authStore = useAuthStore();



</script>

<style scoped>

.headerText {
  color: #ec0000;
}

</style>