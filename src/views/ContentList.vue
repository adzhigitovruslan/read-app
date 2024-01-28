<script setup lang="ts">
import BookItem from "../components/BookItem.vue";
import { useMainStore } from "../stores/main";
import { useAuthStore } from "../stores/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import TheLoader from "../components/UI/TheLoader.vue";

const router = useRouter();
const storeMain = useMainStore();
const storeAuth = useAuthStore();

const getAllPosts = async () => {
  try {
    await storeMain.fetchAllPosts();
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getAllPosts();

  if (storeMain.isOverlayActive) {
    setTimeout(() => {
      storeMain.isOverlayActive = false;
    }, 2000);
  }
});
</script>
<template>
  <v-app>
    <v-overlay class="overlay" v-model="storeMain.isOverlayActive">
      <div class="text-h4">Essey</div>
    </v-overlay>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-btn
        append-icon="fa-solid fa-right-to-bracket"
        @click="router.push({ name: 'login' })"
        v-if="!storeAuth.tokens.idToken"
      >
        login
      </v-btn>
      <v-btn
        append-icon="fa-solid fa-right-to-bracket"
        @click="storeAuth.onLogout"
        v-else
      >
        logout
      </v-btn>
    </v-toolbar>
    <v-container class="pa-2" v-if="!storeMain.loading">
      <v-row>
        <BookItem
          v-for="obj in storeMain.getPosts"
          :key="obj.id"
          :id="obj.id"
          :title="obj['content-title']"
          :name="obj.author.name"
          :surname="obj.author.surname"
          :content="obj.content"
          :image-url="obj['image-url']"
        />
      </v-row>
    </v-container>
    <v-container class="pa-2 d-flex h-100 justify-center align-center" v-else>
      <TheLoader></TheLoader>
    </v-container>
  </v-app>
</template>

<style scoped lang="scss">
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #999999;
}
</style>
