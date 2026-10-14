<script setup lang="ts">
const { name, grade, diciplines } = defineProps<{
  name: string;
  grade: number;
  diciplines: Array<string>;
}>();
</script>

<template>
  <div class="card">
    <div class="header">
      <div class="personalInformarion">
        <v-icon :icon="'mdi-school'" size="40" color="primary" class="icon" />
        <p class="name">
          {{ name.length > 13 ? name.slice(0, 13) + "..." : name }}
        </p>
      </div>
      <div class="grade">
        <p>⭐ {{ grade }}</p>
      </div>
    </div>
    <div class="diciplines">
      <p class="title">COURSES</p>
      <ul class="list">
        <li v-for="dicipline in diciplines">{{ dicipline }}</li>
      </ul>
    </div>
    <v-btn
      variant="outlined"
      color="grey-lighten-2"
      class="text-none px-8 btn"
      height="38"
    >
      <span class="text-grey-darken-4 font-weight-medium"> View Profile </span>
    </v-btn>
  </div>
</template>

<style lang="css" scoped>
.card {
  padding: 20px;
  background-color: #f6f7ff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);

  border: 1px solid #e2e8f0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.grade p {
  white-space: nowrap;
}

.grade {
  background-color: #fcfcff;
  padding: 5px;
  border-radius: 5px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.title {
  font-size: 0.8rem;
  font-weight: bold;
}

.name {
  font-size: 1.5rem;
}

.personalInformarion {
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn {
  border-radius: 10px;
}

.diciplines .list {
  display: flex;
  gap: 10px;
}

.list li {
  background-color: #f2f3ff;
  padding: 5px;
  border-radius: 3px;
}
</style>
