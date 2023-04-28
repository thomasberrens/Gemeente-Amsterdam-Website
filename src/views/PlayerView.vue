<template>
  <div class="flexbox flex-col md:flex-row">
    <div class="md:w-1/4 p-4">
      <div class="bg-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div class="p-4">
          <h2 class="font-bold text-lg mb-2 text-red-600">{{ playerInfo.username }}</h2>
          <p class="text-gray-700 text-sm mb-2">Player ID: {{ playerInfo.uuid }}</p>
          <p class="text-gray-700 text-sm mb-2">{{ playerInfo.gamesPlayed.length }} games played</p>
        </div>
      </div>
    </div>
    <div class="md:w-3/4 p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(gameInfo, index) in playerInfo.gamesPlayed" :key="index" class="bg-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div class="p-4">
            <h2 class="font-bold text-lg mb-2">Game ID: {{ gameInfo.gameID }}</h2>
            <ChoiceGraph :choices="gameInfo.choices" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import ApiHandler from "@/api/ApiHandler";
import {useRoute} from "vue-router";
import PlayerInfo from "@/api/records/PlayerInfo";
import ChoiceGraph from "@/components/ChoiceGraph.vue";

const route = useRoute();

const playerInfo = ref<PlayerInfo>();

onBeforeMount(async () => {
  console.log("getting all made choices");

  // get parameter uuid
  const uuid = route.params.uuid;

  await ApiHandler.getPlayerInfo(uuid.toString()).then((response) => {
    console.log(response);
    playerInfo.value = response;
  });
});

</script>

<style scoped>

</style>