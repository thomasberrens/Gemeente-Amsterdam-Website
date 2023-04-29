<template>
  <div id="app">
    <router-view />

      <FormView />
  </div>
</template>

<script>
import FormView from "@/components/FormView.vue";

export default {
  name: "App",
    components: {FormView}
}
</script>

<style scoped>

</style>