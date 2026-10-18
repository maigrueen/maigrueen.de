<script setup>
import { computed } from "vue";
import Lebenslauf from "../components/Lebenslauf.vue";

const props = defineProps({ datei: String });
const profile = import.meta.glob("../content/profil-*.json", { eager: true, import: "default" });
const profil = computed(() => profile[`../content/${props.datei}.json`]);
</script>

<template>
  <article v-if="profil">
    <h1>{{ profil.name }}</h1>
    <p class="meta">{{ profil.lebensdaten }}</p>
    <p class="text">{{ profil.text }}</p>
    <h3>Lebenslauf</h3>
    <Lebenslauf :eintraege="profil.lebenslauf" />
  </article>
</template>

<style scoped>
.text { white-space: pre-line; }
</style>
