import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import { StateMain, IPost } from "../interfaces/Store";
import { Endpoints } from "../interfaces/Enums";
import { useAuthStore } from "./auth";

export const useMainStore = defineStore("main", {
  state: (): StateMain => ({
    posts: [],
    post: null,
    loading: false,
    isOverlayActive: true,
  }),
  getters: {
    getPosts: (state) => state.posts,
    getPost: (state) => state.post,
  },
  actions: {
    async fetchAllPosts() {
      const allPosts = [] as IPost[];
      this.loading = true;
      try {
        const res = await axios.get(
          Endpoints.fbURL + Endpoints.posts + ".json",
        );
        for (const key in res.data) {
          allPosts.push({ ...(res.data[key] as IPost), id: key });
        }
        this.posts = allPosts;
        return res;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchPost(postId: string | string[]) {
      this.loading = true;
      try {
        const res = await axios.get(
          Endpoints.fbURL + Endpoints.posts + "/" + postId + ".json",
        );
        this.post = res.data;
        return res.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async addAuthorToFav() {
      try {
        const storeAuth = useAuthStore();
        let addedAuthorsArr: string[] = [];
        const authorId = this.post?.author.id;
        if (authorId && storeAuth.userInfo.addedAuthors) {
          storeAuth.userInfo.addedAuthors.add(authorId);

          addedAuthorsArr = Array.from(storeAuth.userInfo.addedAuthors);
        }

        const res = await axios.patch(
          `${Endpoints.fbURL}${Endpoints.users}/${storeAuth.userInfo.userId}.json?auth=${storeAuth.token}`,
          {
            addedAuthors: addedAuthorsArr,
          },
        );
        return res;
      } catch (error) {
        throw error;
      }
    },
    async addPostToReadLater(postId: string) {
      try {
        const storeAuth = useAuthStore();

        let readLaterArr: string[] = [];
        if (storeAuth.userInfo.readLaterArr) {
          storeAuth.userInfo.readLaterArr.add(postId);

          readLaterArr = Array.from(storeAuth.userInfo.readLaterArr);
        }

        const res = await axios.patch(
          `${Endpoints.fbURL}${Endpoints.users}/${storeAuth.userInfo.userId}.json?auth=${storeAuth.token}`,
          { readLater: readLaterArr },
        );
        return res;
      } catch (error) {
        throw error;
      }
    },
    async deletePostFromReadLater(postId: string) {
      try {
        const storeAuth = useAuthStore();

        let readLaterArr: string[] = [];
        if (storeAuth.userInfo.readLaterArr) {
          storeAuth.userInfo.readLaterArr.delete(postId);

          readLaterArr = Array.from(storeAuth.userInfo.readLaterArr);
        }

        const res = await axios.patch(
          `${Endpoints.fbURL}${Endpoints.users}/${storeAuth.userInfo.userId}.json?auth=${storeAuth.token}`,
          { readLater: readLaterArr },
        );
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
