<script setup lang="ts">
import { ref } from "vue";

const overlay = ref(false);

// setTimeout(() => {
//   overlay.value = false;
// }, 2000);
</script>

<template>
  <v-overlay scroll-strategy="block" class="overlay" v-model="overlay">
    <div class="text-h4">Essey</div>
  </v-overlay>
  <v-layout class="wrapper">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<style scoped lang="scss">
#app {
  min-height: 100vh;
}

.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #999999;
}
</style>
