<script setup lang="ts">
import { ref, Ref } from "vue";
import router from "../../router/router";
import { useAuthStore } from "../../stores/auth";
import { useMainStore } from "../../stores/main";
const storeAuth = useAuthStore();
const storeMain = useMainStore();

const props = defineProps<{
  id?: string | number | undefined;
  title: string;
  name: string;
  surname: string;
  content: string;
  imageUrl: string;
}>();

const postId = String(props.id);
const isFavourite = ref(storeAuth.userInfo.readLaterArr?.has(postId) || false);

function goToUrl() {
  if (!props.id) return;
  router.push("/book/" + props.id);
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

async function makeSupportPayment() {
  if (!storeAuth.token) return;
  console.log("supported");
}
</script>

<template>
  <v-col class="posts__col" @click="goToUrl">
    <v-card class="card h-100">
      <v-img rounded="rounded" height="150" cover :src="imageUrl"></v-img>
      <v-container class="card__icon-wrapper">
        <v-card
          class="d-inline-flex pa-1"
          rounded="rounded"
          color="hsla(0,0%,100%,.8)"
          @click.stop="debouncedFavPost"
        >
          <v-icon
            class="card__icon"
            icon="fa-regular fa-heart"
            size="small"
            v-if="!isFavourite"
          />
          <v-icon
            class="card__icon"
            icon="fa-solid fa-heart"
            style="color: #f49d06"
            size="small"
            v-else
          />
        </v-card>
        <v-card
          class="d-inline-flex pa-1"
          rounded="rounded"
          color="hsla(0,0%,100%,.8)"
          @click.stop="makeSupportPayment"
        >
          <v-icon
            class="card__icon"
            icon="fa-solid fa-credit-card"
            size="small"
          />
        </v-card>
      </v-container>
      <v-card-title class="text-left"> {{ name }} {{ surname }} </v-card-title>
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
    top: 0%;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.posts {
  &__col {
    max-width: 220px;
    width: 100%;
  }
}
</style>
