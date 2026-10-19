<script setup>
import { ref, computed } from "vue";
import { briefe, datumDe, metaZeile } from "../briefe";

// Kriegsbeginn: 1. September 1939 (Überfall auf Polen). Hier ändern, falls anders gewünscht.
const KRIEGSBEGINN = "1939-09-01";

const zeitraum = ref("alle"); // "alle" | "vor" | "im"
const neuesZuerst = ref(false);

const vorKrieg = briefe.filter((b) => b.datum < KRIEGSBEGINN);
const imKrieg = briefe.filter((b) => b.datum >= KRIEGSBEGINN);
const filter = [
  { id: "alle", label: "Alle", n: briefe.length },
  { id: "vor", label: "Vor dem Krieg", n: vorKrieg.length },
  { id: "im", label: "Im Krieg", n: imKrieg.length },
];

const liste = computed(() => {
  const l = zeitraum.value === "vor" ? vorKrieg : zeitraum.value === "im" ? imKrieg : briefe;
  return neuesZuerst.value ? [...l].reverse() : l;
});
const vorschau = (t) => (t.length > 160 ? t.slice(0, 160).trim() + " …" : t);
</script>

<template>
  <h1>Briefe</h1>

  <div class="leiste">
    <div class="filter" role="group" aria-label="Zeitraum">
      <button
        v-for="f in filter"
        :key="f.id"
        :class="{ active: zeitraum === f.id }"
        :aria-pressed="zeitraum === f.id"
        @click="zeitraum = f.id"
      >
        {{ f.label }} ({{ f.n }})
      </button>
    </div>
    <button @click="neuesZuerst = !neuesZuerst">
      {{ neuesZuerst ? "Älteste zuerst" : "Neueste zuerst" }}
    </button>
  </div>

  <p v-if="!briefe.length">Noch keine Briefe. Lege eine .md-Datei in src/content/briefe an.</p>
  <p v-else-if="!liste.length">Keine Briefe in diesem Zeitraum.</p>

  <article v-for="b in liste" :key="b.id" class="karte">
    <h3><router-link :to="'/brief/' + b.id">{{ datumDe(b.datum) }}</router-link></h3>
    <p v-if="b.titel || metaZeile(b)" class="meta">{{ [b.titel, metaZeile(b)].filter(Boolean).join(" · ") }}</p>
    <p>{{ vorschau(b.text) }}</p>
  </article>
</template>

<style scoped>
.leiste { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; margin-bottom: 3rem; }
.filter { display: flex; flex-wrap: wrap; gap: 0.8rem; }
</style>
