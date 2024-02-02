<script setup lang="ts">
import { ref, Ref } from "vue";
import { useMainStore } from "../stores/main";
import { IPost, INotification } from "../interfaces/Store";
import TheLoader from "../components/UI/TheLoader.vue";

const storeMain = useMainStore();

const props = defineProps<{
  id: string;
}>();

const publishes: Ref<IPost[] | undefined> = ref([]);
const authorNotifications: Ref<INotification[] | undefined> = ref([]);

const getAuthorData = async () => {
  try {
    const author = await storeMain.fetchAuthor(props.id);
    const { notifications } = author;
    authorNotifications.value = notifications;
    publishes.value = storeMain.posts.filter(
      (post) => post.author.id === author.id,
    );
  } catch (error) {
    console.log(error);
  }
};

getAuthorData();
</script>

<template>
  <v-app>
    <v-container v-if="!storeMain.loading">
      <v-card class="card__wrapper" variant="flat">
        <v-card-title
          >{{ storeMain.getAuthor?.name }}
          {{ storeMain.getAuthor?.surname }}</v-card-title
        ><v-img
          rounded="lg"
          class="img__wrapper"
          :src="storeMain.getAuthor?.imgUrl"
          cover
        ></v-img>
        <v-card-text class="text-left">
          {{ storeMain.getAuthor?.description }}
        </v-card-text>
      </v-card>
      <v-list class="text-left">
        <v-list-subheader class="publish-title"
          >События автора</v-list-subheader
        >
        <v-list-item
          class="my-2"
          v-for="notification in authorNotifications"
          :key="notification.id"
        >
          <div class="list-header">{{ notification.title }}</div>
          <p class="list-subtitle">{{ notification.content }}</p>
        </v-list-item>
      </v-list>
      <v-list class="text-left">
        <v-list-subheader class="publish-title">Публикации</v-list-subheader>
        <v-list-item v-for="publich in publishes" :key="publich.id">
          <div class="list-header">{{ publich["content-title"] }}</div>
        </v-list-item>
      </v-list>
    </v-container>
    <v-container class="pa-5 d-flex h-100 justify-center align-center" v-else>
      <TheLoader />
    </v-container>
  </v-app>
</template>

<style scoped lang="scss">
.img {
  &__wrapper {
    max-width: 400px;
    height: 500px;
    margin: auto;
    @media (max-width: 1200px) {
      height: calc(300px + (500 - 300) * ((100vw - 320px) / (1200 - 320)));
    }
  }
}
.publish-title {
  font-size: 25px;
  color: inherit;
  line-height: 1.5;
}
.list-subtitle {
  font-size: 16px;
  margin-top: 5px;
  font-weight: 400;
}
.list-header {
  font-size: 16px;
  font-weight: 500;
}
</style>
