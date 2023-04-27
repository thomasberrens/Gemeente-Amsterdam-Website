<template>
  <div class="bg-white min-h-screen p-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-4 dashboardTitle">Gemeente Amsterdam Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(value, key) in choices" :key="key" class="bg-gray-200 rounded-lg shadow-md overflow-hidden" :class="{ 'h-16': !isOpen(key), 'h-auto': isOpen(key) }">
          <div class="p-4">
            <button @click="toggleGraph(key)" class="block font-semibold text-lg mb-2 hover:text-purple-500 transition-colors duration-300">{{ value[0].toString() }}</button>
            <div class="overflow-hidden" :style="{ maxHeight: isOpen(key) ? 'none' : '0' }">
              <div class="p-4" v-if="isOpen(key)">
                <ChoiceGraph :choices="choices.get(value[0].toString())" />
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
import ApiHandler from "@/api/ApiHandler"; // Import the graph component



const choices = ref<Map<string,Choice[]>>(new Map<string, Choice[]>());

const openGraphs = ref<Set<string>>(new Set<string>());

const toggleGraph = (username: string) => {
  if (openGraphs.value.has(username)) {
    openGraphs.value.delete(username);
  } else {
    openGraphs.value.add(username);
  }
};

const isOpen = (username: string) => {
  return openGraphs.value.has(username);
};

onBeforeMount(async () => {
  console.log("getting all made choices");

  await ApiHandler.getAllUsersChoicesMade().then((response) => {
    console.log(response);
    choices.value = new Map<string, Choice[]>(Object.entries(response));

  });

});

</script>

<style scoped>
.dashboardTitle {
  color: #ec0000;
}
</style>
