<script setup>
import { computed, ref } from "vue";
import Lightbox from "./Lightbox.vue";
import { briefe, bildUrl, datumDe } from "../briefe";

// Ein Eintrag kann optional haben:
//   briefe: ["1944-06-20-1", ...]              -> Links zu passenden Briefen (Dateiname ohne .md)
//   bilder: [{ "datei": "x.jpg", "text": "…" }] -> Vorschaubilder direkt im Eintrag
const props = defineProps({ eintraege: { type: Array, default: () => [] } });

const briefNachId = Object.fromEntries(briefe.map((b) => [b.id, b]));
const passendeBriefe = (e) => (e.briefe ?? []).map((id) => briefNachId[id]).filter(Boolean);
const briefLabel = (b) => b.titel || datumDe(b.datum);

// Alle Bilder der Timeline in einer Liste, damit man in der Bildansicht blättern kann
const offen = ref(null);
const alleBilder = computed(() =>
  props.eintraege.flatMap((e) =>
    (e.bilder ?? []).map((b) => ({ src: bildUrl(b.datei), text: `${e.zeit}: ${b.text}` }))
  )
);
const bildIndex = (ei, bi) =>
  props.eintraege.slice(0, ei).reduce((n, e) => n + (e.bilder?.length ?? 0), 0) + bi;
</script>

<template>
  <div>
  <ul class="lebenslauf">
    <li v-for="(e, ei) in eintraege" :key="e.zeit + e.titel">
      <time>{{ e.zeit }}</time>
      <em>{{ e.titel }}</em>
      <span v-if="e.text">: {{ e.text }}</span>

      <p v-if="passendeBriefe(e).length" class="briefe">
        <span class="meta">{{ passendeBriefe(e).length > 1 ? "Briefe" : "Brief" }}:</span>
        <router-link v-for="b in passendeBriefe(e)" :key="b.id" :to="'/brief/' + b.id">{{ briefLabel(b) }}</router-link>
      </p>

      <div v-if="e.bilder && e.bilder.length" class="bilder">
        <figure v-for="(b, bi) in e.bilder" :key="b.datei">
          <img
            :src="bildUrl(b.datei)"
            :alt="b.text"
            loading="lazy"
            role="button"
            tabindex="0"
            @click="offen = bildIndex(ei, bi)"
            @keydown.enter.prevent="offen = bildIndex(ei, bi)"
            @keydown.space.prevent="offen = bildIndex(ei, bi)"
          />
          <figcaption class="meta">{{ b.text }}</figcaption>
        </figure>
      </div>
    </li>
  </ul>
  <Lightbox :bilder="alleBilder" v-model="offen" />
  </div>
</template>

<style scoped>
/* Zeitleiste wie auf der Startseite: grüne Linie mit Punkten, ohne Farbkästen */
.lebenslauf { list-style: none; border-left: 2px solid var(--timeline); margin: 0 0 0 0.6rem; padding-left: 2.4rem; }
.lebenslauf li { position: relative; margin: 0; padding: 0 0 2.2rem; }
.lebenslauf li::before { content: ""; position: absolute; left: calc(-2.4rem - 8px); top: 0.4rem; width: 14px; height: 14px; border-radius: 50%; background: var(--timeline); border: 3px solid var(--background-color); box-sizing: border-box; }
time { display: block; font-size: 1.3rem; font-weight: 600; letter-spacing: 0.03rem; color: var(--link-color); margin-bottom: 0.2rem; }

.briefe { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.4rem 1.2rem; margin: 1rem 0 0; }
.briefe .meta { font-size: inherit; }

.bilder { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; }
.bilder figure { margin: 0; width: 160px; max-width: 100%; }
.bilder img { display: block; width: 100%; height: auto; border: 1px solid var(--btn-color-border); cursor: zoom-in; }
.bilder figcaption { margin-top: 0.4rem; font-size: 1.1rem; }
</style>
