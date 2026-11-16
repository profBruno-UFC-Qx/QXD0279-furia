<script setup lang="ts">
  import BaseModal from './BaseModal.vue'

  const props = defineProps<{
    modal: boolean
    title?: string
    itemName?: string
    loading?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'update:modal', value: boolean): void
    (e: 'confirm'): void
  }>()

  function close() {
    emit('update:modal', false)
  }

  function handleConfirm() {
    emit('confirm')
  }
</script>

<template>
  <BaseModal 
    :modal="modal" 
    @update:modal="emit('update:modal', $event ?? false)" 
    :title="title || 'Confirmar Exclusão'"
  >
    <div class="modal-content">
      
      <v-avatar color="red-lighten-5" size="88" class="modal-icon">
        <v-icon icon="mdi-alert-octagon-outline" color="error" size="48"></v-icon>
      </v-avatar>
      
      <p class="modal-message">
        <slot name="message">
          Tem a certeza que deseja remover <strong v-if="itemName">"{{ itemName }}"</strong>?<br>
          Esta ação é permanente e não poderá ser desfeita.
        </slot>
      </p>

      <div class="modal-actions">
        <v-btn
          variant="tonal"
          color="grey-darken-2"
          class="btn-action"
          @click="close"
        >
          Cancelar
        </v-btn>
        
        <v-btn
          color="error"
          variant="flat"
          class="btn-action"
          elevation="0"
          :loading="loading"
          @click="handleConfirm"
        >
          Sim, apagar
        </v-btn>
      </div>

    </div>
  </BaseModal>
</template>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
}

.modal-icon {
  margin-bottom: 24px;
}

.modal-message {
  font-size: 16px;
  color: #616161; /* grey-darken-2 */
  text-align: center;
  max-width: 420px;
  margin-bottom: 36px;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 16px;
}

.btn-action {
  flex-grow: 1;
  max-width: 160px;
  height: 48px !important;
  border-radius: 8px;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}
</style>