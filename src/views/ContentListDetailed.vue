<script setup lang="ts">
import { computed, ref, Ref, ComputedRef } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

interface IContent {
  id: number;
  author: string;
  contentTitle: string;
  content: string;
  imageUrl: string;
}

const inputSum: Ref<null | number> = ref(250);
const loading = ref(false);
const isSupported = ref(false);
const acceptIconVisible = ref(false);
const isFavourite = ref(false);
const events: Ref<{ [key: string]: string }[]> = ref([]);
const isDialogOpen = ref(false);
const contentList = ref([
  {
    id: 1,
    author: "Алексей Ситников",
    contentTitle: "Капкан",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?",
    imageUrl:
      "https://hookagency.com/wp-content/uploads/2018/05/gradient-background.jpeg",
  },
  {
    id: 2,
    author: "Татьяна Иванова",
    contentTitle: "Бруклин",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?",
    imageUrl:
      "https://hookagency.com/wp-content/uploads/2018/05/gradient-background.jpeg",
  },
  {
    id: 3,
    author: "Игорь Романов",
    contentTitle: "Выходные",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo asperiores deserunt illum tempora, molestias voluptate, nam, minus nemo repellendus porro est. Quo sapiente facilis numquam mollitia magni quas voluptas neque?",
    imageUrl:
      "https://hookagency.com/wp-content/uploads/2018/05/gradient-background.jpeg",
  },
]);

const content: ComputedRef<IContent | void> = computed(() => {
  return contentList.value.find((obj) => +obj.id === +route.params.id);
});

function makeSupportPayment() {
  isDialogOpen.value = false;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    isSupported.value = true;
    acceptIconVisible.value = true;
    showAlerts();
  }, 2000);
  setTimeout(() => {
    acceptIconVisible.value = false;
  }, 4000);
}
function showAlerts() {
  setInterval(() => {
    notify();
  }, 4000);
}
function notify() {
  events.value.push({
    event: "Название события",
    content: "Содержание события",
  });
}
</script>
<template>
  <v-container>
    <v-dialog
      transition="dialog-top-transition"
      width="300"
      v-model="isDialogOpen"
    >
      <v-card>
        <v-card-title class="text-center">Введите сумму</v-card-title>
        <v-sheet class="pa-5 d-flex justify-center">
          <v-text-field
            class="input"
            prepend-icon="fa-solid fa-credit-card"
            variant="underlined"
            type="number"
            v-model="inputSum"
          >
            <span class="input__currency">руб</span>
          </v-text-field>
        </v-sheet>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="makeSupportPayment">Поддержать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card
      flat
      class="wrapper d-flex flex-column flex-sm-row flex-md-row flex-lg-row flex-xl-row pb-2"
    >
      <v-img
        rounded="rounded"
        :src="content?.imageUrl"
        height="250"
        width="250"
        class="flex-0-1"
        cover
      ></v-img>
      <v-sheet class="card__content">
        <div class="text-h4 text-left font-weight-medium">
          {{ content?.contentTitle }}
        </div>
        <div class="text-subtitle-1 text-left">{{ content?.author }}</div>
      </v-sheet>
    </v-card>
    <v-sheet class="text-body-1 text-left pt-10 pb-10">{{
      content?.content
    }}</v-sheet>
    <v-footer class="bottom-sheet">
      <v-btn
        :class="['card__button']"
        :ripple="false"
        :loading="loading"
        @click="isDialogOpen = true"
      >
        <span class="card__button-text">поддержать</span>
        <div class="card__icon-wrapper">
          <v-icon
            class="w-100"
            icon="fa-solid fa-credit-card"
            v-if="!acceptIconVisible"
          ></v-icon>
          <v-icon
            class="w-100"
            icon="fa-solid fa-circle-check"
            color="success"
            v-if="acceptIconVisible"
          ></v-icon></div
      ></v-btn>
      <v-btn
        class="card__button"
        :ripple="false"
        @click="isFavourite = !isFavourite"
      >
        <span class="card__button-text">в избранное</span>
        <div class="card__icon-wrapper" v-if="!isFavourite">
          <v-icon class="w-100" icon="fa-regular fa-heart"></v-icon>
        </div>
        <div class="card__icon-wrapper" v-else>
          <v-icon
            class="w-100"
            icon="fa-solid fa-heart"
            color="#f49d06"
          ></v-icon>
        </div>
      </v-btn>
      <v-btn
        :class="['card__button']"
        :disabled="!isSupported"
        :ripple="false"
        @click="router.push({ name: 'notification' })"
      >
        <span class="card__button-text">уведомления</span>
        <div class="card__icon-wrapper">
          <v-icon class="w-100" icon="fa-solid fa-bell"></v-icon>
          <v-badge
            color="#f49d06"
            dot
            offset-y="-15"
            offset-x="2"
            v-if="events.length > 0"
          >
          </v-badge>
        </div>
      </v-btn>
    </v-footer>
  </v-container>
</template>

<style scoped lang="scss">
.card {
  &__content {
    display: flex;
    flex-direction: column;
    @media (min-width: 600px) {
      margin-left: 40px;
    }
    @media (max-width: 599px) {
      margin-top: 25px;
    }
  }
  &__button-text {
    @media (max-width: 600px) {
      display: none;
    }
  }
  &__icon-wrapper {
    @media (min-width: 601px) {
      margin-left: 5px;
    }
  }
}
.actions-button {
  @media (max-width: 599px) {
    margin-top: 25px !important;
  }
  @media (max-width: 435px) {
    flex-direction: column;
    gap: 10px;
  }
}
.bottom-sheet {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #f5f2f2;
}

.input {
  position: relative;
  &__currency {
    position: absolute;
    right: 0;
  }
}
</style>
