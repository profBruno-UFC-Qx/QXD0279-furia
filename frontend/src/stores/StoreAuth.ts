import type { loginData } from "@/@types/loginData";
import type { registerData } from "@/@types/registerData";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { AuthService } from "@/api/AuthService";

export const authStore = defineStore("auth", () => {
  const username = ref<string | null>(localStorage.getItem("username"));
  const role = ref<string | null>(localStorage.getItem("role"));
  const token = ref<string | null>(localStorage.getItem("token"));

  const isLoged = computed(() => Boolean(token.value));

  async function login(payload: loginData) {
    const user = await AuthService.login(payload);

    username.value = user.userResponse.name;
    role.value = user.userResponse.role;
    token.value = user.token;

    persistData();

    return user;
  }

  async function register(payload: registerData) {
    const user = await AuthService.register(payload);

    username.value = user.userResponse.name;
    role.value = user.userResponse.role;
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

  function logout() {
    username.value = null;
    token.value = null;
    role.value = null;

    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  return { username, role, isLoged, login, register, logout };
});
