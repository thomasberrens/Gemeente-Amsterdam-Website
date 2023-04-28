<template>
  <transition name="slide-fade">
    <div
        v-if="!!notification && notification.visible"
        :class="[
        'fixed top-4 right-4 p-4 rounded-lg shadow-md cursor-pointer',
        notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
      ]"
        @click="notification.onClick()"
    >
      <h1 class="text-lg font-bold mb-1">{{ notification.title }}</h1>
      <div v-for="label in notification.labels" :key="label" class="text-sm text-gray-100">
        <p>{{ label }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import Notification from "@/store/notification/Notification";

interface Props {
  notification: Notification;
}

const {notification} = defineProps<Props>();

const emit = defineEmits(["onClick"]);


const onClick = () => {
  emit('onClick');
};

onMounted(() => {
  console.log("mounted notification")
});

</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>