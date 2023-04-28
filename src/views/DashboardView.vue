<template>
  <div class="bg-white min-h-screen p-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-4 dashboardTitle">Gemeente Amsterdam Dashboard</h1>

      <div class="flex justify-start mb-4">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors duration-300" @click="showCreatePlayerForm = true">
          Create Player
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(value, key) in players" :key="key" class="bg-gray-200 rounded-lg shadow-md overflow-hidden" :class="{ 'h-16': !isOpen(key), 'h-auto': isOpen(key) }">
          <div class="p-4">
            <button @click="goToPlayerView(value.uuid)" class="block font-semibold text-lg mb-2 hover:text-purple-500 transition-colors duration-300">{{ value.username }}</button>
          </div>
        </div>
      </div>
    </div>

    <NotificationComponent :notification="notificationState.notification"/>
  </div>

  <CreatePlayerForm :visible="showCreatePlayerForm" @close="updatePlayers" @update="showNotification" ></CreatePlayerForm>
</template>

<script setup lang="ts">
import {onBeforeMount, reactive, ref} from 'vue';
import ApiHandler from "@/api/ApiHandler";
import PlayerInfo from "@/api/records/PlayerInfo";
import {RouteTypes} from "@/router/RouteTypes";
import {useRouter} from "vue-router";
import CreatePlayerForm from "@/components/CreatePlayerForm.vue";
import NotificationComponent from "@/components/NotificationComponent.vue";
import Notification from "@/store/notification/Notification";
import CreatedPlayerNotification from "@/store/notification/CreatedPlayerNotification";

const router = useRouter();

const notificationState = reactive({
  notification: null as Notification | null
});

const showCreatePlayerForm = ref<boolean>(false);

const players = ref<PlayerInfo[]>([]);

const openGraphs = ref<Set<string>>(new Set<string>());


const closeToast = () => {
  const notification = notificationState.notification;

  if (notification) {
    notification.visible = false;
  }

  notificationState.notification = null;
};

const showNotification = (newPlayer: PlayerInfo) => {

  notificationState.notification = new CreatedPlayerNotification(newPlayer, router);

  setTimeout(() => {
    closeToast();
  }, 4000);
};

const toggleGraph = (username: string) => {
  if (openGraphs.value.has(username)) {
    openGraphs.value.delete(username);
  } else {
    openGraphs.value.add(username);
  }
};

const goToPlayerView = (uuid: string) => {

  router.push(RouteTypes.PLAYER.path.replace(":uuid", uuid));
}

const isOpen = (username: string) => {
  return openGraphs.value.has(username);
};

const updatePlayers = () => {
   ApiHandler.getAllPlayerInfos().then((response) => {
     console.log(response);
    players.value = response;
   });

  showCreatePlayerForm.value = false;
  };


onBeforeMount(async () => {
  console.log("getting all made choices");

  await ApiHandler.getAllPlayerInfos().then((response) => {
    console.log(response);

    players.value = response;
  });

});

</script>

<style scoped>
.dashboardTitle {
  color: #ec0000;
}
</style>
