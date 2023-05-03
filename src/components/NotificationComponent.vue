<template>
  <transition name="slide-fade">
    <div
        v-if="notificationStore.isNotificationVisible"
        :class="[
        'fixed top-4 right-4 p-4 rounded-lg shadow-md cursor-pointer text-white',
        notificationTypes.get(<NotificationType> notificationStore.getNotificationType),
      ]"
        @click="notificationStore.getCurrentNotification?.onClick"
    >
      <h1 class="text-lg font-bold mb-1">{{ notificationStore.getNotificationTitle }}</h1>
      <div v-for="label in notificationStore.getNotificationLabels" :key="label" class="text-sm text-gray-100">
        <p>{{ label }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import Notification from "@/store/notification/Notification";
import NotificationType from "@/store/notification/NotificationType";
import {useNotificationStore} from "@/store/notification/NotificationStore";

const notificationStore = useNotificationStore();


const emit = defineEmits(["onClick"]);

const notificationTypes = new Map<NotificationType, string>([
  [NotificationType.SUCCESS, "bg-green-500"],
  [NotificationType.DELETED, "bg-red-500"],
  [NotificationType.EDITED, "bg-yellow-500"],
]);


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