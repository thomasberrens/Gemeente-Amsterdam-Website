<template>
  <div class="bg-white min-h-screen p-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-4 dashboardTitle">Gemeente Amsterdam Dashboard</h1>

      <div class="flex flex-wrap justify-between mb-4">
        <div class="mb-2 md:mb-0 flex-grow w-full md:w-auto">
          <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors duration-300 w-full md:w-auto" @click="showCreatePlayerForm = true">
            Create Player
          </button>
        </div>
        <div class="flex items-center w-full md:max-w-sm xs:mt-2 xs:p-2 bg-white rounded-full bg-yellow-100 shadow-md pl-2">
          <div class="flex items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-4 w-4" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <div class="h-5 w-px bg-gray-300 mx-1"></div>
          <input class="appearance-none bg-transparent border-none pl-1 pr-3 py-1 text-gray-700 leading-tight focusless w-full rounded-full h-8 md:h-auto" type="text" placeholder="Search" v-model="searchInput" @input="filterPlayers">
        </div>
        </div>


      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(value, key) in displayedPlayers" :key="key" class="bg-gray-200 rounded-lg shadow-md overflow-hidden" :class="{ 'h-16': !isOpen(key), 'h-auto': isOpen(key) }">
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

const allPlayers = ref<PlayerInfo[]>([]);
const displayedPlayers = ref<PlayerInfo[]>([]);
const searchInput = ref<string>('');

const openGraphs = ref<Set<string>>(new Set<string>());

const filterPlayers = () => {
  if (searchInput.value.trim() === '') {
    displayedPlayers.value = [...allPlayers.value];
  } else {
    const regex = new RegExp(searchInput.value, 'i');
    displayedPlayers.value = allPlayers.value.filter(player => regex.test(player.username));
  }
};

const closeNotification = () => {
  const notification = notificationState.notification;

  if (notification) {
    notification.visible = false;
  }

 // notificationState.notification = null;
};

const showNotification = (newPlayer: PlayerInfo) => {

  notificationState.notification = new CreatedPlayerNotification(newPlayer, router);

  setTimeout(() => {
    closeNotification();
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
    allPlayers.value = response;
    filterPlayers();
   });

  showCreatePlayerForm.value = false;
  };


onBeforeMount(async () => {
  console.log("getting all made choices");

  await ApiHandler.getAllPlayerInfos().then((response) => {
    console.log(response);

    allPlayers.value = response;
    filterPlayers();
  });

});

</script>

<style scoped>
.dashboardTitle {
  color: #ec0000;
}

.focusless:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
