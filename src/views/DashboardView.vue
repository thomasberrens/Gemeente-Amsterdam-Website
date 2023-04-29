<template>
  <div class="bg-white min-h-screen p-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-4 dashboardTitle">Gemeente Amsterdam Dashboard</h1>

      <div class="flex flex-wrap justify-between mb-4">
        <div class="mb-2 md:mb-0 flex-grow w-full md:w-auto">
          <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors duration-300 w-full md:w-auto" @click="setPlayerCreateForm">
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
        <div v-for="(value, key) in displayedPlayers" :key="key" class="bg-gray-200 rounded-lg shadow-md overflow-hidden h-16">
          <div class="p-4 flex justify-between items-center">
            <button @click="goToPlayerView(value.uuid)" class="font-semibold text-lg mb-2 hover:text-purple-500 transition-colors duration-300">{{ value.username }}</button>
            <div>
              <button class="bg-red-500 p-1 rounded inline-flex items-center mr-4" @click="createDeletePlayerForm(value)">
                <TrashIcon class="h-4 w-4" />
              </button>
              <button class="bg-orange-300 p-1 rounded inline-flex items-center" @click="createEditPlayerForm(value)">
                <PencilIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--  <CreatePlayerForm :visible="showCreatePlayerForm" @close="updatePlayers" @update="showNotification" ></CreatePlayerForm>-->
</template>

<script setup lang="ts">
import {onBeforeMount, reactive, ref} from 'vue';
import ApiHandler from "@/api/ApiHandler";
import PlayerInfo from "@/api/records/PlayerInfo";
import {RouteTypes} from "@/router/RouteTypes";
import {useRouter} from "vue-router";
import CreatePlayerForm from "@/store/form/CreatePlayerForm";
import NotificationComponent from "@/components/NotificationComponent.vue";
import Notification from "@/store/notification/Notification";
import CreatedPlayerNotification from "@/store/notification/CreatedPlayerNotification";
import FormView from "@/components/FormView.vue";
import TrashIcon from "@/assets/icons/TrashIcon.svg"
import PencilIcon from "@/assets/icons/PencilIcon.svg"
import Form from "@/store/form/Form";
import DeletePlayerForm from "@/store/form/DeletePlayerForm";
import playerInfo from "@/api/records/PlayerInfo";
import DeletedPlayerNotification from "@/store/notification/DeletedPlayerNotification";
import {useFormStore} from "@/store/form/FormStore";
import {useNotificationStore} from "@/store/notification/NotificationStore";
import EditPlayerForm from "@/store/form/EditPlayerForm";
import EditedPlayerNotification from "@/store/notification/EditedPlayerNotification";


const router = useRouter();

const formStore = useFormStore();

const notificationStore = useNotificationStore();

const allPlayers = ref<PlayerInfo[]>([]);
const displayedPlayers = ref<PlayerInfo[]>([]);
const searchInput = ref<string>('');

const filterPlayers = () => {
  if (searchInput.value.trim() === '') {
    displayedPlayers.value = [...allPlayers.value];
  } else {
    const regex = new RegExp(searchInput.value, 'i');
    displayedPlayers.value = allPlayers.value.filter(player => regex.test(player.username));
  }
};

const onPlayerCreated = (playerInfo: PlayerInfo) => {
    updatePlayers();
    showNotification(new CreatedPlayerNotification(playerInfo, router));
}

const setPlayerCreateForm = () => {
    const newCreatePlayerForm = new CreatePlayerForm();

    newCreatePlayerForm.onPlayerCreated = onPlayerCreated;

    formStore.setForm(newCreatePlayerForm);
}

const createEditPlayerForm = (playerInfo: PlayerInfo) => {
  const newEditPlayerForm = new EditPlayerForm(playerInfo);

  newEditPlayerForm.onPlayerEdited = onPlayerEdited;
  formStore.setForm(newEditPlayerForm);
};

const onPlayerEdited = (newPlayerInfo: PlayerInfo, oldPlayerInfo: PlayerInfo) => {
  updatePlayers();

  showNotification(new EditedPlayerNotification(newPlayerInfo, oldPlayerInfo, router));
}

const createDeletePlayerForm = (playerInfo: PlayerInfo) => {
  const newDeletePlayerForm = new DeletePlayerForm(playerInfo);

  newDeletePlayerForm.onDelete = onPlayerDelete;

  formStore.setForm(newDeletePlayerForm);

};

const onPlayerDelete = (playerInfo: PlayerInfo) => {
  updatePlayers();

  showNotification(new DeletedPlayerNotification(playerInfo));
}



const showNotification = (notification: Notification) => {
  notificationStore.setNotification(notification);
};

const goToPlayerView = (uuid: string) => {
  router.push(RouteTypes.PLAYER.path.replace(":uuid", uuid));
}

const updatePlayers = () => {
   ApiHandler.getAllPlayerInfos().then((response) => {
     console.log(response);
    allPlayers.value = response;
    filterPlayers();
   });
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
