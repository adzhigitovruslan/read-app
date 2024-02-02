<script setup lang="ts">
import AuthorItem from "../components/ContentAuthors/AuthorItem.vue";
import { useMainStore } from "../stores/main";

const storeMain = useMainStore();
</script>

<template>
  <v-container>
    <v-list lines="two">
      <AuthorItem
        v-for="author in storeMain.getAuthors"
        :key="author.id"
        :id="author.id"
        :name="author.name"
        :surname="author.surname"
        :img-url="author.imgUrl"
      />
    </v-list>
  </v-container>
</template>
