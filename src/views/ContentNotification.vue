<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const notifications = ref([
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam accusamus distinctio quaerat necessitatibus non ipsam, similique architecto saepe laudantium nesciunt nobis ad et aperiam quas itaque ea porro minus.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam accusamus distinctio quaerat necessitatibus non ipsam, similique architecto saepe laudantium nesciunt nobis ad et aperiam quas itaque ea porro minus.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam accusamus distinctio quaerat necessitatibus non ipsam, similique architecto saepe laudantium nesciunt nobis ad et aperiam quas itaque ea porro minus.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam accusamus distinctio quaerat necessitatibus non ipsam, similique architecto saepe laudantium nesciunt nobis ad et aperiam quas itaque ea porro minus.",
  },
]);
</script>

<template>
  <v-toolbar color="#f5f2f2">
    <v-btn
      class="back-button"
      icon="fa-solid fa-left-long"
      @click="router.back()"
    ></v-btn>
    <v-toolbar-title>Уведомления</v-toolbar-title>
  </v-toolbar>

  <v-list :items="notifications" item-props lines="two">
    <v-list-subheader>TODAY</v-list-subheader>
    <v-list-item v-for="(item, i) in notifications" :key="i" :value="item">
      <template v-slot:prepend>
        <v-icon icon="fa-solid fa-bell"></v-icon>
      </template>

      <p class="text-left">{{item.text}}</p>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss">
.back-button {
  position: absolute;
}
</style>
