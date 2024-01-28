import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import { StateAuth } from "../interfaces/Store";
import { Endpoints } from "../interfaces/Enums";
import { useMainStore } from "./main";
const apiKey = import.meta.env[VITE_APP_KEY_FIREBASE];

export const useAuthStore = defineStore("auth", {
  state: (): StateAuth => ({
    error: "",
    tokens: {
      idToken: "",
      refreshToken: "",
      expiresIn: "",
    },
    userInfo: {
      userId: "",
      email: "",
      localId: "",
      addedAuthors: new Set(),
    },
  }),
  getters: {},
  actions: {
    async onAuth(payload: { email: string; password: string }, type: string) {
      const store = useMainStore();
      store.loading = true;
      const stringUrl = type === "signup" ? "signUp" : "signInWithPassword";
      try {
        const res = await axios.post(
          `${Endpoints.fbURLAuth}${stringUrl}?key=${apiKey}`,
          {
            ...payload,
            returnSecureToken: true,
          },
        );

        this.tokens = {
          idToken: res.data.idToken,
          refreshToken: res.data.refreshToken,
          expiresIn: res.data.expiresIn,
        };

        this.userInfo.email = res.data.email;
        this.userInfo.localId = res.data.localId;

        if (type === "signup") {
          const response = await this.createUser(
            res.data.localId,
            res.data.email,
          );
          this.userInfo.userId = response.name;
        } else if (type === "login") {
          this.fetchUser();
        }

        localStorage.setItem("tokens", JSON.stringify(this.tokens));
        localStorage.setItem("localId", JSON.stringify(this.userInfo.localId));

        return res;
      } catch (err: any) {
        switch (err.response.data.error.message) {
          case "EMAIL_EXISTS":
            this.error =
              "Адрес электронной почты уже используется другой учетной записью";
            break;
          case "OPERATION_NOT_ALLOWED":
            this.error =
              "Вход с паролем отключен. Обратитесь в службу поддержки";
            break;
          case "TOO_MANY_ATTEMPTS_TRY_LATER":
            this.error =
              "Мы заблокировали все запросы с этого устройства из-за необычной активности. Попробуйте позже.";
            break;
          case "EMAIL_NOT_FOUND":
            this.error = "Такая почта не найдена. Попробуйте еще раз.";
            break;
          case "INVALID_PASSWORD":
            this.error = "Пароль недействителен";
            break;
          case "USER_DISABLED":
            this.error =
              "Учетная запись пользователя отключена администратором.";
            break;
          case "INVALID_LOGIN_CREDENTIALS":
            this.error = "Неверно введены почта или пароль";
            break;
          default:
            this.error = "Ошибка";
            break;
        }
        throw err;
      } finally {
        store.loading = false;
      }
    },
    async createUser(localId: string, email: string) {
      try {
        const res = await axios.post(
          Endpoints.fbURL + Endpoints.users + ".json",
          {
            localId,
            email,
            addedAuthors: [],
          },
        );
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onLogout() {
      localStorage.removeItem("tokens");
      localStorage.removeItem("userInfo");
      this.tokens = {
        idToken: "",
        refreshToken: "",
        expiresIn: "",
      };
      this.userInfo = {
        email: "",
        userId: "",
        localId: "",
        addedAuthors: null,
      };
    },
    async fetchAllUsers() {
      return axios.get(`${Endpoints.fbURL}${Endpoints.users}.json`);
    },
    async fetchUser() {
      const response = await this.fetchAllUsers();
      for (const user in response.data) {
        if (response.data[user].localId === this.userInfo.localId) {
          this.userInfo = {
            ...this.userInfo,
            ...response.data[user],
            addedAuthors: new Set(response.data[user].addedAuthors),
            userId: user,
          };
        }
      }
      return response;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
