<script setup lang="ts">
import { useStoreNotify } from "@/stores/StoreNotify";

const storeNotify = useStoreNotify();
</script>

<template>
  <Transition name="toast">
    <div
      v-if="storeNotify.active"
      class="toast"
      :class="storeNotify.type"
      role="alert"
      aria-live="assertive"
    >
      <span class="icon">
        {{ storeNotify.type === "error" ? "✕" : "!" }}
      </span>

      <span class="msg">{{
        storeNotify.message ? storeNotify.message : "Alguma coisa deu errado!"
      }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.msg {
  font-size: 1.5rem;
}

.toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;

  display: flex;
  align-items: center;
  gap: 12px;

  min-width: 280px;
  max-width: calc(100vw - 32px);
  padding: 16px 20px;

  color: #fff;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 8px 24px rgb(0 0 0 / 20%);
}

.error {
  background: #b91c1c;
  border: 1px solid #991b1b;
}

.alert {
  background: #15803d;
  border: 1px solid #166534;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 24px;
  height: 24px;
  border: 2px solid rgb(255 255 255 / 80%);
  border-radius: 50%;

  font-size: 14px;
  font-weight: 700;
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -15px);
}
</style>
