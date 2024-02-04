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
    @click="router.push('/authors/' + id)"
  >
    <template v-slot:prepend>
      <v-avatar size="60" :image="imgUrl"></v-avatar>
    </template>
    <v-list-item-title class="list-title"
      >{{ name }} {{ surname }}</v-list-item-title
    >
  </v-list-item>
</template>

<style scoped>
.list-item {
  cursor: pointer;
}
.list-title {
  font-size: 24px;
}
</style>
