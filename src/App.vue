<script setup lang="ts">
import { ITokens } from "./interfaces/Store";
import { useAuthStore } from "./stores/auth";
import TheHeader from "./components/TheHeader.vue";
import { onMounted } from "vue";
import { useMainStore } from "./stores/main";

const storeMain = useMainStore();
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

const getAllData = async () => {
  try {
    storeMain.fetchAllPosts();
    storeMain.fetchAllTags();
    storeMain.fetchAllAuthors();
  } catch (error) {
    console.log(error);
  }
};

if (!storeMain.posts.length && !storeMain.tags.length) {
  getAllData();
  console.log("run");
}

checkUser();

onMounted(() => {
  if (storeMain.isOverlayActive) {
    setTimeout(() => {
      storeMain.isOverlayActive = false;
    }, 2000);
  }
});
</script>

<template>
  <v-overlay class="overlay" v-model="storeMain.isOverlayActive">
    <div class="d-flex ga-5 justify-center align-center flex-column">
      <div class="overlay__text title">Essey</div>
      <v-divider class="overlay__text w-25 border-opacity-100"></v-divider>
      <div class="overlay__text subtitle">read significance</div>
    </div>
  </v-overlay>
  <TheHeader />
  <router-view v-slot="{ Component }">
    <!-- <transition mode="out-in"> -->
    <component :is="Component" />
    <!-- </transition> -->
  </router-view>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
}
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6e2d5;
  &__text {
    &.title {
      font-size: 60px;
    }
    &.subtitle {
      font-size: 40px;
      @media (max-width: 390px) {
        font-size: 35px;
      }
    }
  }
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
