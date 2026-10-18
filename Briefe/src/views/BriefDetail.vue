<script setup>
import { computed } from "vue";
import { briefe, bildUrl, datumDe } from "../briefe";

const props = defineProps({ id: String });
const i = computed(() => briefe.findIndex((b) => b.id === props.id));
const brief = computed(() => briefe[i.value]);
const zurueck = computed(() => briefe[i.value - 1]);
const weiter = computed(() => briefe[i.value + 1]);
</script>

<template>
  <p v-if="!brief">Brief nicht gefunden. <router-link to="/">Zur Übersicht</router-link></p>
  <article v-else>
    <h1>{{ datumDe(brief.datum) }}</h1>
    <p v-if="brief.ort" class="meta">Geschrieben in {{ brief.ort }}</p>

    <div class="bilder">
      <a v-for="b in brief.bilder" :key="b" :href="bildUrl(b)" target="_blank">
        <img :src="bildUrl(b)" :alt="'Brief vom ' + datumDe(brief.datum)" />
      </a>
    </div>

    <h3>Transkription</h3>
    <p class="text">{{ brief.text }}</p>

    <p class="paging">
      <router-link v-if="zurueck" :to="'/brief/' + zurueck.id">← {{ datumDe(zurueck.datum) }}</router-link>
      <router-link v-if="weiter" :to="'/brief/' + weiter.id">{{ datumDe(weiter.datum) }} →</router-link>
    </p>
  </article>
</template>

<style scoped>
.bilder { display: grid; gap: 1.5rem; }
.bilder img { width: 100%; height: auto; border: 1px solid var(--btn-color-border); }
.text { white-space: pre-line; }
.paging { display: flex; justify-content: space-between; margin-top: 3rem; }
</style>
