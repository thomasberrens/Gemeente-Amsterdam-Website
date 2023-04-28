<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">

      <div class="absolute inset-0 bg-black opacity-50 transition-opacity" @click="closeForm"></div>
      <div class="bg-white p-8 rounded shadow-lg relative transition-opacity">
        <h2 class="text-2xl font-bold mb-4">Create Player</h2>
        <form @submit.prevent="createPlayer">
          <div class="mb-4">
            <label class="block mb-2" for="username">Username:</label>
            <input class="border border-gray-300 p-2 w-full" type="text" id="username" v-model="username" required />
          </div>
          <!-- Add more form fields if needed -->
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors duration-300" type="submit">Submit</button>
          <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors duration-300 ml-4" @click="closeForm">Close</button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">

import {ref} from "vue";
import ApiHandler from "@/api/ApiHandler";

interface Props {
  visible: boolean;
}

const props = defineProps<Props>();

// define emit that has parameter


const emit = defineEmits(["close", "update"]);

const username = ref<string>("");

const createPlayer = async () => {

  await ApiHandler.createPlayerInfo(username.value).then((response) => {
    console.log(response);
    emit("update", response);
  }).catch((error) => {
    console.log(error);
  });


  username.value = "";
  emit("close");
}

const closeForm = () => {
  emit("close")
};

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>