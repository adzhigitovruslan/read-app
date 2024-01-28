<script setup lang="ts">
import { ITokens } from "./interfaces/Store";
import { useAuthStore } from "./stores/auth";

const storeAuth = useAuthStore();

async function checkUser() {
  try {
    const tokens = localStorage.getItem("tokens");
    const localId = localStorage.getItem("localId");

    if (!(tokens && localId)) {
      return;
    }

    storeAuth.tokens = JSON.parse(tokens) as ITokens;
    storeAuth.userInfo.localId = JSON.parse(localId) as string;
    await storeAuth.fetchUser();
  } catch (error) {
    console.log(error);
  }
}

checkUser();
</script>

<template>
  <router-view v-slot="{ Component }">
    <!-- <transition mode="out-in"> -->
    <component :is="Component" />
    <!-- </transition> -->
  </router-view>
</template>

<style scoped lang="scss">
#app {
  min-height: 100vh;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
