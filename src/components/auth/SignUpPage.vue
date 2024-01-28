<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useMainStore } from "../../stores/main";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
const { smAndUp: isDesktop } = useDisplay();

const router = useRouter();
const storeAuth = useAuthStore();
const storeMain = useMainStore();

const password = ref("");
const email = ref("");

const auth = async () => {
  try {
    await storeAuth.onAuth(
      { email: email.value, password: password.value },
      "signup",
    );
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="form__wrapper">
    <v-card elevation="4" light tag="section">
      <v-card-title>
        <v-layout align-center justify-space-between>
          <h3 class="headline">Зарегистрироваться</h3>
        </v-layout>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-text-field
            outline
            label="Почта"
            type="text"
            v-model="email"
          ></v-text-field>
          <v-text-field
            outline
            hide-details
            label="Пароль"
            type="password"
            v-model="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions :class="{ 'pa-3': isDesktop }">
        <v-btn
          color="info"
          variant="plain"
          @click.prevent="router.push({ name: 'login' })"
        >
          Войти
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="info"
          :loading="storeMain.loading"
          :large="isDesktop"
          @click.preven="auth"
        >
          <v-icon left>lock</v-icon>
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.form {
  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 300px;
  }
}
</style>
