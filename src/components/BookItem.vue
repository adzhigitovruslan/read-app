<script setup lang="ts">
import { ref } from "vue";
import router from "../router/router";

const props = defineProps<{
  id: number;
  title: string;
  author: string;
  content: string;
  imageUrl: string;
}>();

const isFavourite = ref(false);

function goToUrl() {
  router.push("/book/" + props.id);
}
</script>

<template>
  <v-col class="v-col-auto" lg="2" md="3" sm="4" cols="12" @click="goToUrl">
    <v-card class="card">
      <v-img rounded="rounded" height="150" cover :src="imageUrl"></v-img>
      <v-sheet
        class="card__icon-wrapper"
        rounded="rounded"
        color="hsla(0,0%,100%,.8)"
        @click.stop="isFavourite = !isFavourite"
      >
        <v-icon
          class="card__icon"
          icon="fa-regular fa-heart"
          v-if="!isFavourite"
        />
        <v-icon
          class="card__icon"
          icon="fa-solid fa-heart"
          style="color: #f49d06"
          v-else
        />
      </v-sheet>
      <v-card-title class="text-left"> {{ author }} </v-card-title>
      <v-card-text class="text-left"> {{ title }} </v-card-text>
    </v-card>
  </v-col>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  max-width: 350px;
  margin: 0 auto;
  cursor: pointer;
  &__icon-wrapper {
    position: absolute;
    top: 5%;
    right: 5%;
    padding: 5px;
  }
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
