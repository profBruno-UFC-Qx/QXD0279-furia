import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { AuthService } from "@/api/AuthService";

interface payload {
  email: string;
  password: string;
}

export const authStore = defineStore("auth", () => {
  const username = ref<string | null>(localStorage.getItem("username"));
  const role = ref<string | null>(localStorage.getItem("role"));
  const token = ref<string | null>(localStorage.getItem("token"));

  const isLoged = computed(() => Boolean(token.value));

  async function login(payload: payload) {
    const user = await AuthService(payload);
    if (user instanceof Error) {
      throw user;
    }

    username.value = user.username;
    role.value = user.role;
    token.value = user.token;

    persistData();

    return user;
  }

  function save(key: string, value: string | null) {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }

  function persistData() {
    save("username", username.value);
    save("token", token.value);
    save("role", role.value);
  }

  return { username, role, isLoged, login };
});
