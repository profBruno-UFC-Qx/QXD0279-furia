<script setup lang="ts"></script>

<template>
  <v-card class="card" rounded="10">
    <div class="info">
      <h1>Dr. Helena Martins</h1>
      <span>Data Structures</span>
      <span>Nota: ⭐⭐⭐⭐⭐</span>
      <p>
        "Great methodology and very clear explanations. The practical exercises
        were extremely helpful for understanding complex algorithms."
      </p>
    </div>
    <div class="extraInfo">
      <span>Oct 15, 2023</span>
    </div>
  </v-card>
</template>

<style scoped>
.extraInfo span {
  background-color: #d3e4fe;
  padding: 4px 8px;
  font-size: 0.8rem;
  white-space: nowrap;
  border-radius: 10px;
  font-weight: bold;
}

.info {
  display: flex;
  flex-direction: column;
}

.info h1 {
  font-size: 1rem;
}

.info p {
  color: #434655;
}

.card {
  display: flex;
  padding: 16px;
  box-shadow: none;
  border: 1px solid #c3c6d7;
  justify-content: space-between;
}
</style>
