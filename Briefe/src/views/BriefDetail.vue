<script setup>
import { computed, ref } from "vue";
import { briefe, bildUrl, datumDe, metaZeile } from "../briefe";
import Lightbox from "../components/Lightbox.vue";
import { personenIn, begriffeIn } from "../glossar";

const props = defineProps({ id: String });
const personen = computed(() => personenIn(props.id));
const begriffe = computed(() => begriffeIn(props.id));
const i = computed(() => briefe.findIndex((b) => b.id === props.id));
const brief = computed(() => briefe[i.value]);
const zurueck = computed(() => briefe[i.value - 1]);
const weiter = computed(() => briefe[i.value + 1]);

const offen = ref(null);
const bilder = computed(() =>
  brief.value
    ? brief.value.bilder.map((b, n) => ({
        src: bildUrl(b),
        text: `${datumDe(brief.value.datum)}, Seite ${n + 1} von ${brief.value.bilder.length}`,
      }))
    : []
);
</script>

<template>
  <p v-if="!brief">Brief nicht gefunden. <router-link to="/briefe">Zur Übersicht</router-link></p>
  <article v-else>
    <h1>{{ datumDe(brief.datum) }}</h1>
    <p v-if="brief.titel || metaZeile(brief)" class="meta">{{ [brief.titel, metaZeile(brief)].filter(Boolean).join(" · ") }}</p>

    <div class="bilder">
      <img
        v-for="(b, n) in brief.bilder"
        :key="b"
        :src="bildUrl(b)"
        :alt="'Brief vom ' + datumDe(brief.datum) + ', Seite ' + (n + 1)"
        role="button"
        tabindex="0"
        @click="offen = n"
        @keydown.enter.prevent="offen = n"
        @keydown.space.prevent="offen = n"
      />
    </div>
    <Lightbox :bilder="bilder" v-model="offen" />

    <h3>Transkription</h3>
    <p class="text">{{ brief.text }}</p>

    <aside v-if="personen.length || begriffe.length" class="glossar">
      <p v-if="personen.length">
        <span class="meta">Personen:</span>
        <router-link v-for="p in personen" :key="p.id" :to="{ path: '/glossar', hash: '#' + p.id }">{{ p.name }}</router-link>
      </p>
      <p v-if="begriffe.length">
        <span class="meta">Begriffe:</span>
        <router-link v-for="b in begriffe" :key="b.id" :to="{ path: '/glossar', hash: '#' + b.id }">{{ b.begriff }}</router-link>
      </p>
    </aside>

    <p class="paging">
      <router-link v-if="zurueck" :to="'/brief/' + zurueck.id">← {{ datumDe(zurueck.datum) }}</router-link>
      <router-link v-if="weiter" :to="'/brief/' + weiter.id">{{ datumDe(weiter.datum) }} →</router-link>
    </p>
  </article>
</template>

<style scoped>
.bilder { display: grid; gap: 1.5rem; }
.bilder img { width: 100%; height: auto; border: 1px solid var(--btn-color-border); cursor: zoom-in; }
.text { white-space: pre-line; }
.glossar { border-top: 1px solid var(--btn-color-border); margin-top: 3rem; padding-top: 1.5rem; }
.glossar p { display: flex; flex-wrap: wrap; gap: 0.4rem 1.2rem; margin: 0 0 0.8rem; }
.paging { display: flex; justify-content: space-between; margin-top: 3rem; }
</style>
