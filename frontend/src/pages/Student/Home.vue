<script setup lang="ts">
import { ref } from "vue";
import Header from "@/components/Header/Header.vue";
import StatsCard from "@/components/Cards/StatsCard.vue";
import TableDocs from "@/components/Table/TableDocs.vue";
import ReviewsCard from "@/components/Cards/ReviewsCard.vue";
</script>

<template>
  <div class="home container">
    <Header
      title="Olá, Bruno!"
      description="Here's what's happening with your academic journey today."
    />
    <div class="stats">
      <StatsCard title="Reviews Written" value="12" icon="mdi-star" />
      <StatsCard title="Documents Uploaded" value="8" icon="mdi-upload" />
      <StatsCard title="Documents Downloaded" value="45" icon="mdi-upload" />
    </div>

    <div class="tableDocs">
      <TableDocs :documents="[]" />
    </div>

    <div class="tableReview">
      <div class="header">
        <h1>My Reviews</h1>
      </div>
      <div class="reviews">
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.tableReview {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #c3c6d7;
}

.header {
  padding: 24px;
  background-color: #f2f3ff;
}

.reviews {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tableDocs {
  display: block;
}

.home {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats {
  display: flex;
  gap: 24px;
}

.stats > * {
  flex-grow: 1;
}
</style>
