<template>
  <div class="loading-screen">
    <v-progress-circular indeterminate color="primary" size="64" width="6" />
    <span>Carregando...</span>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;
  color: #2664eb;
  font-size: 14px;
  font-weight: 500;
}
</style>
