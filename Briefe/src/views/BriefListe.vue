<script setup>
import { ref, computed } from "vue";
import { briefe, datumDe, metaZeile } from "../briefe";

const neuesZuerst = ref(false);
const liste = computed(() => (neuesZuerst.value ? [...briefe].reverse() : briefe));
const vorschau = (t) => (t.length > 160 ? t.slice(0, 160).trim() + " …" : t);
</script>

<template>
  <h1>Briefe</h1>
  <button @click="neuesZuerst = !neuesZuerst">
    {{ neuesZuerst ? "Älteste zuerst" : "Neueste zuerst" }}
  </button>
  <p v-if="!briefe.length">Noch keine Briefe. Lege eine .md-Datei in src/content/briefe an.</p>
  <article v-for="b in liste" :key="b.id" class="karte">
    <h3><router-link :to="'/brief/' + b.id">{{ datumDe(b.datum) }}</router-link></h3>
    <p v-if="b.titel || metaZeile(b)" class="meta">{{ [b.titel, metaZeile(b)].filter(Boolean).join(" · ") }}</p>
    <p>{{ vorschau(b.text) }}</p>
  </article>
</template>
