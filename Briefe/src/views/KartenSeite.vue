<script setup>
import { computed, ref } from "vue";
import StationenKarte from "../components/StationenKarte.vue";
import mann from "../content/karte-mann.json";
import frau from "../content/karte-frau.json";

// "Beide": alle Orte von Fritz und Erna auf einer Karte (ohne die Zwischenhalte der Zugfahrt)
const beide = {
  beide: true,
  linie: false,
  intro:
    "Fritz’ und Ernas Orte auf einer Karte. Hier sieht man, wie weit die beiden Welten auseinanderlagen: Zwischen Riede in Nordhessen und Witebsk in Weißrussland liegen rund 1.450 Kilometer Luftlinie. Ein Klick auf einen Punkt und dann auf „Mehr“ führt zur Karte der jeweiligen Person.",
  stationen: [
    ...mann.stationen.filter((s) => s.typ !== "reise").map((s) => ({ ...s, person: "mann" })),
    ...frau.stationen.map((s) => ({ ...s, person: "frau" })),
  ],
};

const personen = [
  { id: "mann", label: "Fritz", daten: mann },
  { id: "frau", label: "Erna", daten: frau },
  { id: "beide", label: "Beide", daten: beide },
];
const wahl = ref("mann");
const oeffne = ref("");
const aktiv = computed(() => personen.find((p) => p.id === wahl.value));

function waehle(id, ort = "") {
  oeffne.value = ort;
  wahl.value = id;
}
</script>

<template>
  <h1>Karte</h1>
  <div class="wahl" role="group" aria-label="Person">
    <button
      v-for="p in personen"
      :key="p.id"
      :class="{ active: wahl === p.id }"
      :aria-pressed="wahl === p.id"
      @click="waehle(p.id)"
    >
      {{ p.label }}
    </button>
  </div>
  <StationenKarte :key="wahl + oeffne" :daten="aktiv.daten" :oeffne="oeffne" @wechsel="waehle" />
</template>

<style scoped>
.wahl { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 1.5rem; }
</style>
