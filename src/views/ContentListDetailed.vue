<script setup lang="ts">
import { ref, Ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "../stores/main";
import { useAuthStore } from "../stores/auth";
import TheLoader from "../components/UI/TheLoader.vue";
import { IPost } from "../interfaces/Store";

const storeMain = useMainStore();
const storeAuth = useAuthStore();
const router = useRouter();
const route = useRoute();

const inputSum: Ref<null | number> = ref(250);
const loading = ref(false);
const postId = String(route.params.id);
const isSupported = computed(() => {
  if (storeMain.post?.author.id) {
    return storeAuth.userInfo.addedAuthors?.has(storeMain.post.author.id);
  } else {
    return false;
  }
});
const acceptIconVisible = ref(false);
const isFavourite = ref(storeAuth.userInfo.readLaterArr?.has(postId) || false);
const events: Ref<{ [key: string]: string }[]> = ref([]);
const isDialogOpen = ref(false);
const post: Ref<undefined | IPost> = ref();

async function makeSupportPayment() {
  isDialogOpen.value = false;
  loading.value = true;
  try {
    acceptIconVisible.value = true;
    await storeMain.addAuthorToFav();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
    setTimeout(() => {
      acceptIconVisible.value = false;
    }, 4000);
  }
}

const debounce = <F extends (...args: any[]) => any>(
  func: F,
  ms: number,
  toggleVal?: Ref<boolean>,
  id?: string,
) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      if (!storeAuth.token) {
        router.push({ name: "login" });
        return;
      }
      if (toggleVal) toggleVal.value = !toggleVal.value;
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(toggleVal, id)), ms);
    });
};

const debouncedFavPost = debounce(addToReadLater, 1000, isFavourite, postId);
let oldFavVal = false;
async function addToReadLater(toggleVal: Ref<boolean>, postId: string) {
  try {
    if (oldFavVal !== toggleVal.value && toggleVal.value === true) {
      await storeMain.addPostToReadLater(postId);
    } else if (oldFavVal !== toggleVal.value && toggleVal.value === false) {
      await storeMain.deletePostFromReadLater(postId);
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  } finally {
    oldFavVal = toggleVal.value;
  }
}

// function notify() {
//   events.value.push({
//     event: "Название события",
//     content: "Содержание события",
//   });
// }
onMounted(async () => {
  post.value = await storeMain.fetchPost(route.params.id);
});
</script>
<template v-if="post && post !== undefined">
  <v-app>
    <v-layout>
      <v-container v-if="!storeMain.loading">
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
              <v-btn variant="text" @click="makeSupportPayment"
                >Поддержать</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card
          flat
          class="wrapper d-flex flex-column flex-sm-row flex-md-row flex-lg-row flex-xl-row pb-2"
        >
          <v-img
            rounded="rounded"
            :src="post?.['image-url']"
            height="250"
            width="250"
            class="flex-0-1"
            cover
          ></v-img>
          <v-sheet class="card__content">
            <div class="card__title text-left font-weight-block">
              {{ post?.["content-title"] }}
            </div>
            <router-link class="card__link" :to="'/authors/' + post?.author.id">
              <div class="card__subtitle text-left">
                {{ post?.author.name }} {{ post?.author.surname }}
              </div>
            </router-link>
          </v-sheet>
        </v-card>
        <v-sheet class="card__main-text text-left pt-10 pb-10">{{
          post?.content
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
          <v-btn class="card__button" :ripple="false" @click="debouncedFavPost">
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
      <v-container class="pa-2 d-flex h-100 justify-center align-center" v-else>
        <TheLoader />
      </v-container>
    </v-layout>
  </v-app>
</template>

<style scoped lang="scss">
.card {
  &__link {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
  }
  &__title {
    font-weight: 600;
    font-size: 34px;
    @media (max-width: 1200px) {
      font-size: calc(22px + (34 - 22) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__subtitle {
    font-weight: 500;
    font-size: 28px;
    @media (max-width: 1200px) {
      font-size: calc(22px + (28 - 22) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__main-text {
    font-weight: 500;
    font-size: 25px;
    @media (max-width: 1200px) {
      font-size: calc(20px + (25 - 20) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    @media (min-width: 600px) {
      margin-left: 40px;
      width: 65%;
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
