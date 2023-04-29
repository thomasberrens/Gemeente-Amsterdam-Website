<template>
  <transition name="fade">
    <div v-if="!!form && form.visible" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50 transition-opacity" @click="closeForm"></div>
      <div class="bg-white p-8 rounded shadow-lg relative transition-opacity">
        <h2 class="text-2xl font-bold mb-4">{{form.title}}</h2>
        <label>{{form.description}}</label>
        <form>
          <div class="mb-4" v-for="inputField in form.inputFields" :key="inputField">
            <label class="block mb-2" :for="inputField.name">{{inputField.name}}</label>
            <input class="border border-gray-300 p-2 w-full" type="text" :placeholder="inputField.placeholder" :id="inputField.name" v-model="inputField.model" required />
          </div>
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors duration-300" type="submit" @click="onSubmit">
            {{form.submitButtonText}}</button>
          <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors duration-300 ml-4" type="reset" @click="closeForm">Close</button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Form from "@/store/form/Form";

interface Props {
  form: Form;
}

const {form} = defineProps<Props>();

const emit = defineEmits(["close", "update"]);

const closeForm = () => {
 // emit("close")

  console.log("form ", form)
  //form.visible = false;
  form.onClose();
};

const onSubmit = () => {
  form.onSubmit();
}

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