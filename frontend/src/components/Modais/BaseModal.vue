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
  padding: 24px;
}

.modal {
  background: white;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 24px rgb(0 0 0 / 20%);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  color: #111827;
}

.close-button {
  border: none;
  background: none;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  color: #6b7280;
}

.modal-content {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}
</style>
