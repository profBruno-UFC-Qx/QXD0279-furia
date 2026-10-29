<script setup lang="ts">
const { id, name, grade, diciplines } = defineProps<{
  id: number;
  name: string;
  grade: {
    nota_geral_media: number;
    nota_didatica_media: number;
    nota_metodologia_media: number;
  };
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
        <p>⭐ {{ grade.nota_geral_media }}</p>
      </div>
    </div>
    <div class="diciplines">
      <p class="title">Diciplinas</p>
      <ul class="list">
        <li v-for="dicipline in diciplines">{{ dicipline }}</li>
      </ul>
    </div>
    <div class="progress">
      <div class="skill">
        <p>Didatica</p>
        <v-progress-linear
          :model-value="grade.nota_didatica_media * 10"
          color="#0052cc"
          bg-color="#62697c"
          :height="8"
          rounded
        />
      </div>
      <div class="skill">
        <p>Metodologia</p>
        <v-progress-linear
          :model-value="grade.nota_metodologia_media * 10"
          color="#0052cc"
          bg-color="#62697c"
          :height="8"
          rounded
        />
      </div>
    </div>
    <v-btn
      variant="outlined"
      color="grey-lighten-2"
      class="text-none px-8 btn"
      height="38"
      :to="{ name: 'professorProfile', params: { id: id } }"
    >
      <span class="text-grey-darken-4 font-weight-medium"> View Profile </span>
    </v-btn>
  </div>
</template>

<style lang="css" scoped>
.progress {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.progress p {
  font-weight: bold;
}

.skill {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

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
