<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "../stores/main";
import { INotification } from "../interfaces/Store";
import { ComputedRef } from "vue";

const storeMain = useMainStore();
const router = useRouter();
const props = defineProps<{
  id: string;
}>();

const filteredNotifications: ComputedRef<INotification[] | undefined> =
  computed(() => {
    return storeMain.authors.reduce((acc: INotification[], author) => {
      if (author.id === storeMain.post?.author.id) {
        Object.keys(author.notifications).forEach((key) => {
          acc.push({
            id: author.notifications[key].id,
            content: author.notifications[key].content,
            title: author.notifications[key].title,
          });
        });
      }
      return acc;
    }, []);
  });

storeMain.fetchPost(props.id);
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

  <v-list :items="filteredNotifications" item-props lines="two">
    <v-list-subheader>TODAY</v-list-subheader>
    <v-list-item
      v-for="item in filteredNotifications"
      :key="item?.id"
      :value="item?.title"
    >
      <template v-slot:prepend>
        <v-icon icon="fa-solid fa-bell"></v-icon>
      </template>
      <p class="text-left font-weight-bold">{{ item?.title }}</p>
      <p class="text-left">{{ item?.content }}</p>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss">
.back-button {
  position: absolute;
}
</style>
