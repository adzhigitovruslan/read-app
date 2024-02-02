<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
const storeAuth = useAuthStore();
</script>

<template>
  <v-toolbar class="header">
    <!-- <v-app-bar-nav-icon class="nav__icon"></v-app-bar-nav-icon> -->
    <div class="nav__btn-wrapper">
      <router-link
        active-class="active"
        class="nav__btn"
        :to="{ name: 'authors' }"
        >Авторы</router-link
      >
      <router-link
        active-class="active"
        class="nav__btn"
        :to="{ name: 'content' }"
        >Подборки</router-link
      >
    </div>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <router-link
        class="nav__btn nav__logout-btn"
        :to="{ name: 'login' }"
        v-if="!storeAuth.tokens.idToken"
        >Войти <v-icon>fa-solid fa-right-to-bracket</v-icon></router-link
      >
      <router-link
        class="nav__btn nav__logout-btn"
        to=""
        @click="storeAuth.onLogout"
        v-else
        >Выйти
        <v-icon>fa-solid fa-right-to-bracket</v-icon>
      </router-link>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style scoped lang="scss">
.header {
  padding: 0 10px;
}
.nav {
  &__icon {
    @media (min-width: 601px) {
      display: none;
    }
  }
  &__btn-wrapper {
    display: flex;
    gap: 10px;
  }
  &__logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  &__btn {
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
    color: inherit;
    text-decoration: none;
    transition: 0.2s;
    text-transform: uppercase;
    &.active {
      background-color: rgba(200, 199, 199, 0.751);
    }
  }
}
.nav-content {
  @media (max-width: 600px) {
    display: none;
  }
}

.no-hover::before {
  background-color: transparent !important;
}
</style>
