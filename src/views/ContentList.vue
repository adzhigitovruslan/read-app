<script setup lang="ts">
import BookItem from "../components/ContentList/BookItem.vue";
import { computed } from "vue";
import TheLoader from "../components/UI/TheLoader.vue";
import { useMainStore } from "../stores/main";

const storeMain = useMainStore();
const getFilteredPosts = computed(() => (tag: string) => {
  return storeMain.posts.filter((post) => post.tags && post.tags.includes(tag));
});
</script>
<template>
  <v-app>
    <v-container class="pa-4" v-if="!storeMain.loading">
      <v-row class="posts__row">
        <template v-for="tag in storeMain.getTags" :key="tag">
          <div class="posts__wrapper" v-if="getFilteredPosts(tag).length !== 0">
            <h1 class="posts__title">{{ tag }}</h1>
            <div class="posts__item-wrapper">
              <BookItem
                v-for="obj in getFilteredPosts(tag)"
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
