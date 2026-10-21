<template>
  <div class="panel-card">
    <header class="panel-header">
      <h2 class="panel-title">Documentos Recentes</h2>
      <button class="btn-add" @click="$emit('add-document')">Adicionar</button>
    </header>

    <div class="panel-body">
      <div
        v-for="doc in documents"
        :key="doc.id"
        class="document-card"
      >
        <div class="file-icon">
          <v-icon color="primary" icon="mdi-file-pdf-box" size="22" />
        </div>

        <div class="file-info">
          <span class="file-name">{{ doc.fileName }}</span>
          <span class="file-size">{{ doc.fileSize }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { RecentDocument } from '@/type/ProfessorData'

  defineProps<{
    documents: RecentDocument[]
  }>()

  defineEmits<{
    (e: 'add-document'): void
  }>()
</script>

<style scoped>
.panel-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}

.panel-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.btn-add {
  background-color: #0b4fd8;
  color: #ffffff;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #1d4ed8;
}

.panel-body {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.document-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-icon {
  width: 36px;
  height: 36px;
  background-color: #dbeafe;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.file-name {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 12px;
  color: #6b7280;
}
</style>
