<template>
  <div id="app">
    <router-view />

      <FormView />
      <NotificationComponent></NotificationComponent>
  </div>
</template>

<script>
import FormView from "@/components/FormView.vue";
import NotificationComponent from "@/components/NotificationComponent.vue";

export default {
  name: "App",
    components: {NotificationComponent, FormView}
}
</script>

<style scoped>

</style>