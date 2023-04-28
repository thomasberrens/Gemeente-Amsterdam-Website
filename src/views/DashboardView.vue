<template>
  <div class="bg-white min-h-screen p-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-4 dashboardTitle">Gemeente Amsterdam Dashboard</h1>

      {{players}}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(value, key) in players" :key="key" class="bg-gray-200 rounded-lg shadow-md overflow-hidden" :class="{ 'h-16': !isOpen(key), 'h-auto': isOpen(key) }">
          <div class="p-4">
            <button @click="goToPlayerView(value.uuid)" class="block font-semibold text-lg mb-2 hover:text-purple-500 transition-colors duration-300">{{ value.username }}</button>
            <div class="overflow-hidden" :style="{ maxHeight: isOpen(key) ? 'none' : '0' }">
              <div class="p-4" v-if="isOpen(key)">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeMount} from 'vue';
import Choice from "@/api/records/Choice";
import ChoiceGraph from "@/components/ChoiceGraph.vue";
import ApiHandler from "@/api/ApiHandler";
import PlayerInfo from "@/api/records/PlayerInfo";
import {RouteTypes} from "@/router/RouteTypes";
import {useRouter} from "vue-router";

const router = useRouter();

const choices = ref<Map<string,Choice[]>>(new Map<string, Choice[]>());

const players = ref<PlayerInfo[]>([]);

const openGraphs = ref<Set<string>>(new Set<string>());

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
