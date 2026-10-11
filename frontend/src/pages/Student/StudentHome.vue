<script setup lang="ts">
import { ref } from "vue";
import Header from "@/components/Header/Header.vue";
import StatsCard from "@/components/Cards/StatsCard.vue";
import TableDocs from "@/components/Table/TableDocs.vue";
import ReviewsCard from "@/components/Cards/ReviewsCard.vue";
import Ornament from "@/components/Ornament/Ornament.vue";

const boats = [
  {
    nome: "1 Speedster",
    disciplina: "matematica",
    data: "03/06/2026",
  },
  {
    nome: "2 Speedster",
    disciplina: "matematica",
    data: "03/06/2026",
  },
  {
    nome: "3 Speedster",
    disciplina: "matematica",
    data: "03/06/2026",
  },
  {
    nome: "4 Speedster",
    disciplina: "matematica",
    data: "03/06/2026",
  },
];
</script>

<template>
  <div class="content container">
    <Header
      title="Olá, Bruno!"
      description="Here's what's happening with your academic journey today."
    />
    <div class="stats">
      <StatsCard title="Reviews Written" value="12" icon="mdi-star" />
      <StatsCard title="Documents Uploaded" value="8" icon="mdi-upload" />
      <StatsCard title="Documents Downloaded" value="45" icon="mdi-upload" />
    </div>

    <Ornament :text="'My documents'">
      <template #content>
        <div>
          <TableDocs :documents="boats" />
        </div>
      </template>
    </Ornament>

    <Ornament :text="'My reviews'">
      <template #content>
        <div class="reviews">
          <ReviewsCard
            teacher-name="Dr. Helena Martins"
            dicipline="Data Structures"
            :rating="4"
            comment="Great methodology and very clear explanations. The practical exercises were extremely helpful for understanding complex
algorithms."
            date="Oct 15, 2023"
          />
          <ReviewsCard
            teacher-name="Dr. Helena Martins"
            dicipline="Data Structures"
            :rating="4"
            comment="Great methodology and very clear explanations. The practical exercises were extremely helpful for understanding complex
algorithms."
            date="Oct 15, 2023"
          />
        </div>
      </template>
    </Ornament>
  </div>
</template>

<style lang="css" scoped>
.reviews {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats {
  display: flex;
  gap: 24px;
}

.stats * {
  flex-grow: 1;
}

@media screen and (max-width: 630px) {
  .stats {
    flex-direction: column;
  }
}
</style>
