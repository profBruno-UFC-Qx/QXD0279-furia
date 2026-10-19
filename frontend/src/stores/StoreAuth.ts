import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { AuthService } from "@/api/AuthService";
import { type loginData } from "@/@types/loginData";
import { type registerData } from "@/@types/registerData";

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

  return { username, role, isLoged, login, register };
});
