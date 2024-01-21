<script setup lang="ts">
import { computed, ref, reactive, ComputedRef } from "vue";
import { useRoute } from "vue-router";
import { toast, type ToastOptions } from "vue3-toastify";
const route = useRoute();

interface IContent {
  id: number;
  author: string;
  contentTitle: string;
  content: string;
  imageUrl: string;
}

const loading = ref(false);
const isSupported = ref(false);
const alertContent = reactive({
  title: "",
  content: "",
  events: [
    "14.02 состоится встреча..",
    "Вышла новая книга..",
    "Встреча переносится на ..",
  ],
});
const alertEventCounter = ref(0);
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
  // if (isSupported.value) {
  //   return;
  // }
  isDialogOpen.value = false;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    isSupported.value = true;
    showAlerts();
  }, 2000);
}

function notify() {
  alertContent.content = alertContent.events[alertEventCounter.value];
  toast(alertContent.content, {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
    onOpen: () => {
      alertEventCounter.value >= 2
        ? (alertEventCounter.value = 0)
        : (alertEventCounter.value += 1);
    },
  } as ToastOptions);
}
function showAlerts() {
  notify();
  setInterval(() => {
    notify();
  }, 6000);
}
</script>
<template>
  <v-dialog
    transition="dialog-top-transition"
    width="300"
    v-model="isDialogOpen"
  >
    <v-card>
      <v-card-title class="text-center">Выберите сумму</v-card-title>
      <v-sheet class="pa-5 d-flex justify-center">
        <v-btn class="mr-5">100р</v-btn>
        <v-btn>150р</v-btn>
      </v-sheet>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="makeSupportPayment">Поддержать</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-sheet
    class="wrapper d-flex flex-column flex-sm-row flex-md-row flex-lg-row flex-xl-row"
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
      <v-btn
        class="card__btn"
        :ripple="false"
        :loading="loading"
        @click="isDialogOpen = true"
        >поддержать
        <template v-slot:append v-if="!isSupported">
          <v-icon icon="fa-solid fa-circle-check" color="primary"></v-icon>
        </template>
        <template v-slot:append v-else>
          <v-icon
            icon="fa-solid fa-circle-check"
            color="success"
          ></v-icon> </template
      ></v-btn>
    </v-sheet>
  </v-sheet>
  <v-sheet class="text-body-1 text-left pt-10">{{ content?.content }}</v-sheet>
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
      margin-top: 40px;
    }
  }
  &__btn {
    margin-top: auto;
    @media (max-width: 600px) {
      margin-top: 20px;
    }
  }
}
</style>
