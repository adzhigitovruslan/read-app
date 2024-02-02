<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

defineProps<{
  id: string;
  name: string;
  surname: string;
  imgUrl: string;
}>();
</script>

<template>
  <v-list-item
    class="text-left list-item"
    :title="`${name} ${surname}`"
    :prepend-avatar="imgUrl"
    @click="router.push('/authors/' + id)"
  >
  </v-list-item>
</template>

<style scoped>
.list-item {
  cursor: pointer;
}
</style>
