<script setup lang="ts">
import BookItem from "../components/BookItem.vue";
import { ref } from "vue";

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
</script>
<template>
  <v-row>
    <BookItem
      v-for="obj in contentList"
      :key="obj.id"
      :id="obj.id"
      :title="obj.contentTitle"
      :author="obj.author"
      :content="obj.content"
      :image-url="obj.imageUrl"
    />
  </v-row>
</template>
