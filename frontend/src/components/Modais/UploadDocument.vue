<script setup lang="ts">
  defineProps<{
    title: string
  }>()

  const modal = defineModel<boolean>('modal')

  function close () {
    modal.value = false
  }
</script>

<template>
  <div v-if="modal" class="modal-overlay" @click.self="close">
    <div class="modal">
      <header class="modal-header">
        <h2>{{ title }}</h2>
        <button class="close-button" @click="close">×</button>
      </header>

      <main class="modal-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  width: 100%;
  max-width: 700px;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 20%);
}

.modal-header,
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
}

.close-button {
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-content {
  margin: 20px 0;
}
</style>
