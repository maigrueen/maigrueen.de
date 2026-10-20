<script setup>
import { computed, ref } from "vue";
import StationenKarte from "../components/StationenKarte.vue";
import mann from "../content/karte-mann.json";
import frau from "../content/karte-frau.json";

const personen = [
  { id: "mann", label: "Fritz", daten: mann },
  { id: "frau", label: "Erna", daten: frau },
];
const wahl = ref("mann");
const aktiv = computed(() => personen.find((p) => p.id === wahl.value));
</script>

<template>
  <h1>Karte</h1>
  <div class="wahl" role="group" aria-label="Person">
    <button
      v-for="p in personen"
      :key="p.id"
      :class="{ active: wahl === p.id }"
      :aria-pressed="wahl === p.id"
      @click="wahl = p.id"
    >
      {{ p.label }}
    </button>
  </div>
  <StationenKarte :key="wahl" :daten="aktiv.daten" />
</template>

<style scoped>
.wahl { display: flex; gap: 0.8rem; margin-bottom: 1.5rem; }
</style>
