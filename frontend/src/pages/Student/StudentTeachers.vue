<script setup lang="ts">
import { onMounted, ref } from "vue";
import Header from "@/components/Header/Header.vue";
import Filters from "@/components/Filters/Filters.vue";
import TeacherCard from "@/components/Cards/TeacherCard.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import { TeacherService } from "@/api/TeacherService";
import { type TeacherResponse } from "@/api/TeacherService";

interface InputItem {
  type: "text" | "select";
  placeholder: string;
}

const professores = ref<Array<TeacherResponse>>();

onMounted(async () => {
  const data = await TeacherService.getAll();
});
</script>
<template>
  <div class="content container">
    <Header
      title="Find a Professor"
      description="Discover and evaluate professors across disciplines. Filter by ratings, courses,
and more to find the right academic fit."
    />

    <Filters
      :inputs="{
        text: true,
        dicipline: true,
        course: false,
        teacher: false,
      }"
    />

    <div class="teacherTable">
      <Ornament :text="'Professores buscados:'">
        <template #content>
          <div class="headerTable">
            <p>Total: 12 resultados</p>
          </div>
        </template>
      </Ornament>

      <div class="table">
        <TeacherCard
          v-for="prof in professores"
          :name="prof.user.name"
          :grade="5"
          :diciplines="
            prof.disciplines.map((diciplina) => {
              return diciplina.name;
            })
          "
        />

        <!-- <TeacherCard
          :name="'Aragão'"
          :grade="5"
          :diciplines="['Matemática', 'Física']"
        />
        <TeacherCard
          :name="'Ana Clara'"
          :grade="4.8"
          :diciplines="['História', 'Geografia']"
        />
        <TeacherCard
          :name="'Carlos Santos'"
          :grade="4.5"
          :diciplines="['Biologia', 'Química']"
        />
        <TeacherCard
          :name="'Mariana Souza'"
          :grade="5"
          :diciplines="['Português', 'Literatura']"
        />
        <TeacherCard
          :name="'Roberto Lima'"
          :grade="4.2"
          :diciplines="['Inglês']"
        /> -->
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.table {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.teacherTable {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.headerTable {
  padding-left: 20px;
  padding-bottom: 20px;
}

/* .headerTable p {
  font-size: 1.3rem;
}  */
</style>
