import { ref } from "vue";
import { defineStore } from "pinia";

export const useStoreNotify = defineStore("notify", () => {
  const active = ref(false);
  const message = ref("");
  const type = ref<"error" | "alert">();
  const loading = ref<boolean>(false);

  function notify(msg: string, notificationType: "error" | "alert") {
    message.value = msg;
    type.value = notificationType;
    active.value = true;

    setTimeout(() => {
      active.value = false;
    }, 5000);
  }

  function startLoad() {
    loading.value = true;
  }

  function endLoad() {
    loading.value = false;
  }

  return { active, message, type, notify, startLoad, endLoad ,loading};
});
