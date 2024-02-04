<script setup lang="ts">
import BookItem from "../components/ContentList/BookItem.vue";
import { computed } from "vue";
import TheLoader from "../components/UI/TheLoader.vue";
import { useMainStore } from "../stores/main";

const storeMain = useMainStore();
const getFilteredPosts = computed(() => (selectedCollection: string) => {
  return storeMain.posts.filter(
    (post) =>
      post.collection &&
      post.collection.toLowerCase().includes(selectedCollection.toLowerCase()),
  );
});
</script>
<template>
  <v-app>
    <v-container class="pa-4" v-if="!storeMain.loading">
      <v-row class="posts__row">
        <template
          v-for="collection in storeMain.getCollections"
          :key="collection"
        >
          <div
            class="posts__wrapper"
            v-if="getFilteredPosts(collection).length !== 0"
          >
            <h1 class="posts__title">{{ collection }}</h1>
            <div class="posts__item-wrapper">
              <BookItem
                v-for="obj in getFilteredPosts(collection)"
                :key="obj.id"
                :id="obj.id"
                :title="obj['content-title']"
                :name="obj.author.name"
                :surname="obj.author.surname"
                :content="obj.content"
                :image-url="obj['image-url']"
              />
            </div>
          </div>
        </template>
      </v-row>
    </v-container>
    <v-container class="pa-5 d-flex h-100 justify-center align-center" v-else>
      <TheLoader></TheLoader>
    </v-container>
  </v-app>
</template>

<style scoped lang="scss">
.posts {
  &__wrapper {
    @media (max-width: 599px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  &__title {
    max-width: 220px;
    width: 100%;
    padding-left: 12px;
    text-align: left;
    @media (max-width: 599px) {
      max-width: 280px;
    }
  }
  &__row {
    flex-direction: column;
    @media (max-width: 599px) {
      justify-content: center;
    }
  }
  &__item-wrapper {
    display: flex;
    flex-wrap: wrap;
    min-height: 300px;
    @media (max-width: 599px) {
      flex-direction: column;
    }
  }
}
</style>
