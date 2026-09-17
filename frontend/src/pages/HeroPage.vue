<script setup lang="ts">
import { ref } from "vue";
import CategoryCard from "@/components/Cards/CategoryCard.vue";
</script>

<template>
  <div class="heroPage">
    <div class="hero">
      <h1 class="title">Sua jornada acadêmica, compartilhada.</h1>
      <p class="desc">
        Descubra as melhores disciplinas, encontre professores incríveis e
        acesse documentos de estudo para impulsionar sua vida universitária.
      </p>
      <div class="buttons">
        <v-btn color="#2664EB"> Find a Professor </v-btn>
        <v-btn variant="outlined"> Browse Documents </v-btn>
      </div>
    </div>
    <div class="category">
      <h1>Explore por Categoria</h1>
      <div class="categoryList">
        <CategoryCard
          title="Professor"
          subtitle="Avaliações e perfis detalhados do
corpo docente."
          icon="mdi-account-search-outline"
        />
        <CategoryCard
          title="Disciplines"
          subtitle="Ementas, dificuldades e dicas por
matéria."
          icon="mdi-book-marker-outline

"
        />
        <CategoryCard
          title="Reviews"
          subtitle="Opiniões sinceras da comunidade
acadêmica."
          icon="mdi-comment-edit-outline"
        />
        <CategoryCard
          title="Documents"
          subtitle="Provas antigas, resumos e
materiais de estudo."
          icon="mdi-folder-outline"
        />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.heroPage {
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 180px;
}

.hero {
  max-width: 780px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px auto;
}

.buttons {
  display: flex;
  gap: 15px;
}

.title {
  font-size: 4rem;
}

.desc {
  font-size: 1.5rem;
}

.category {
  margin: 0px 32px;
}

.categoryList {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.categoryList div {
  flex: 1;
}
</style>
