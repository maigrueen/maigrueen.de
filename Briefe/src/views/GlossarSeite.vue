<script setup>
import { computed, ref } from "vue";
import { briefe, datumDe } from "../briefe";
import { glossarIntro, personen, begriffe } from "../glossar";

const briefNachId = Object.fromEntries(briefe.map((b) => [b.id, b]));
const briefLabel = (id) => briefNachId[id].titel || datumDe(briefNachId[id].datum);

// Freitextsuche über Name/Begriff und Erklärung
const suche = ref("");
const passt = (...felder) => {
  const s = suche.value.trim().toLowerCase();
  return !s || felder.some((f) => (f ?? "").toLowerCase().includes(s));
};

const gruppen = computed(() => {
  const g = {};
  personen
    .filter((p) => passt(p.name, p.text, p.gruppe))
    .forEach((p) => (g[p.gruppe] ??= []).push(p));
  return Object.entries(g);
});
const begriffListe = computed(() =>
  begriffe.filter((b) => passt(b.begriff, b.text)).sort((a, b) => a.begriff.localeCompare(b.begriff, "de"))
);

// Lange Brieflisten zuerst eingeklappt
const offen = ref({});
const GRENZE = 8;
const sichtbar = (e) => (offen.value[e.id] ? e.briefIds : e.briefIds.slice(0, GRENZE));
</script>

<template>
  <h1>Glossar</h1>
  <p class="meta">{{ glossarIntro }}</p>

  <nav class="sprung" aria-label="Abschnitte">
    <a href="#" @click.prevent="$router.push({ hash: '#personen' })">Personen</a>
    <a href="#" @click.prevent="$router.push({ hash: '#begriffe' })">Begriffe</a>
    <input v-model="suche" type="search" placeholder="Suchen …" aria-label="Glossar durchsuchen" />
  </nav>

  <h2 id="personen">Personen</h2>
  <p v-if="!gruppen.length">Keine Person gefunden.</p>
  <section v-for="[gruppe, liste] in gruppen" :key="gruppe">
    <h3>{{ gruppe }}</h3>
    <dl>
      <template v-for="p in liste" :key="p.id">
        <dt :id="p.id">
          <router-link v-if="p.link" :to="p.link">{{ p.name }}</router-link>
          <template v-else>{{ p.name }}</template>
        </dt>
        <dd>
          {{ p.text }}
          <span v-if="p.briefIds.length" class="briefe">
            <span class="meta">{{ p.briefIds.length > 1 ? `${p.briefIds.length} Briefe` : "Brief" }}:</span>
            <router-link v-for="id in sichtbar(p)" :key="id" :to="'/brief/' + id">{{ briefLabel(id) }}</router-link>
            <a v-if="p.briefIds.length > GRENZE && !offen[p.id]" href="#" @click.prevent="offen[p.id] = true">alle zeigen</a>
          </span>
        </dd>
      </template>
    </dl>
  </section>

  <h2 id="begriffe">Begriffe</h2>
  <p v-if="!begriffListe.length">Kein Begriff gefunden.</p>
  <dl>
    <template v-for="b in begriffListe" :key="b.id">
      <dt :id="b.id">{{ b.begriff }}</dt>
      <dd>
        {{ b.text }}
        <span v-if="b.briefIds.length" class="briefe">
          <span class="meta">{{ b.briefIds.length > 1 ? `${b.briefIds.length} Briefe` : "Brief" }}:</span>
          <router-link v-for="id in sichtbar(b)" :key="id" :to="'/brief/' + id">{{ briefLabel(id) }}</router-link>
          <a v-if="b.briefIds.length > GRENZE && !offen[b.id]" href="#" @click.prevent="offen[b.id] = true">alle zeigen</a>
        </span>
      </dd>
    </template>
  </dl>
</template>

<style scoped>
.sprung { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; margin: 2rem 0; }
.sprung input { flex: 1 1 200px; height: 38px; padding: 0 1rem; border: 1px solid var(--form-color-border); border-radius: 4px; background: transparent; color: var(--text-color); font: inherit; }
dt { font-weight: 600; margin-top: 1.8rem; scroll-margin-top: 2rem; }
dt:target { background: var(--background-timeline); }
dd { margin: 0.3rem 0 0; }
.briefe { display: flex; flex-wrap: wrap; gap: 0.4rem 1.2rem; margin-top: 0.5rem; font-size: 1.3rem; }
</style>
