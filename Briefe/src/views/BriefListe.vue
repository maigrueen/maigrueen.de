<script setup>
import { ref, computed } from "vue";
import { briefe, bildUrl, datumDe, metaZeile } from "../briefe";

// Lebensabschnitte statt "vor/im Krieg". Grenzen hier anpassen, falls nötig.
// "bis" ist jeweils das erste Datum, das nicht mehr dazugehört.
const abschnitte = [
  { id: "alle", label: "Alle" },
  { id: "vor", label: "Vor dem Krieg", bis: "1939-09-01", text: "Briefe, Gedichte und Zeichnungen aus der Zeit des Kennenlernens, 1937 und 1938." },
  { id: "pilsen", label: "Pilsen", bis: "1944-01-18", text: "Fritz ist Schreiber in einer Kaserne in Pilsen (Böhmen). Im Dezember 1943 hat er zuletzt Heimaturlaub." },
  { id: "front", label: "An der Front", bis: "1944-07-01", text: "Fahrt nach Osten und die Monate bei Witebsk (Weißrussland) bis zu seinem letzten Brief am 20. Juni 1944." },
  { id: "suche", label: "Die Suche", bis: "9999", text: "Was Erna nach seinem Verschwinden erfahren hat: Antworten von Heer und Rotem Kreuz und der Brief eines Kameraden." },
];
const abschnittVon = (b) => abschnitte.find((a) => a.bis && b.datum < a.bis).id;

const zeitraum = ref("alle");
const neuesZuerst = ref(false);

const anzahl = (id) => (id === "alle" ? briefe.length : briefe.filter((b) => abschnittVon(b) === id).length);
const aktiv = computed(() => abschnitte.find((a) => a.id === zeitraum.value));

// Nach Jahren gruppiert, damit man sich in der langen Liste zurechtfindet
const gruppen = computed(() => {
  let l = zeitraum.value === "alle" ? briefe : briefe.filter((b) => abschnittVon(b) === zeitraum.value);
  if (neuesZuerst.value) l = [...l].reverse();
  const g = [];
  for (const b of l) {
    const jahr = b.datum.slice(0, 4);
    if (!g.length || g[g.length - 1].jahr !== jahr) g.push({ jahr, briefe: [] });
    g[g.length - 1].briefe.push(b);
  }
  return g;
});
const vorschau = (t) => (t.length > 180 ? t.slice(0, 180).replace(/\s+\S*$/, "") + " …" : t);
</script>

<template>
  <h1>Briefe</h1>

  <div class="leiste">
    <div class="filter" role="group" aria-label="Lebensabschnitt">
      <button
        v-for="a in abschnitte"
        :key="a.id"
        :class="{ active: zeitraum === a.id }"
        :aria-pressed="zeitraum === a.id"
        @click="zeitraum = a.id"
      >
        {{ a.label }} ({{ anzahl(a.id) }})
      </button>
    </div>
    <button class="sortierung" @click="neuesZuerst = !neuesZuerst">
      {{ neuesZuerst ? "Älteste zuerst" : "Neueste zuerst" }}
    </button>
  </div>
  <p v-if="aktiv.text" class="meta abschnitt">{{ aktiv.text }}</p>

  <p v-if="!briefe.length">Noch keine Briefe. Lege eine .md-Datei in src/content/briefe an.</p>
  <p v-else-if="!gruppen.length">Keine Briefe in diesem Zeitraum.</p>

  <section v-for="g in gruppen" :key="g.jahr">
    <h2 class="jahr">{{ g.jahr }}</h2>
    <ol class="liste">
      <li v-for="b in g.briefe" :key="b.id">
        <router-link :to="'/brief/' + b.id" class="eintrag">
          <img v-if="b.bilder.length" :src="bildUrl(b.bilder[0])" alt="" loading="lazy" class="scan" />
          <span v-else class="scan leer" aria-hidden="true"></span>
          <span class="inhalt">
            <span class="datum">{{ datumDe(b.datum) }}</span>
            <span class="meta">{{ [b.titel, metaZeile(b)].filter(Boolean).join(" · ") }}</span>
            <span class="vorschau">{{ vorschau(b.text) }}</span>
          </span>
        </router-link>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.leiste { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem; margin-bottom: 1rem; }
.filter { display: flex; flex-wrap: wrap; gap: 0.8rem; }
.abschnitt { margin: 0 0 2rem; min-height: 2.4rem; }

.jahr { font-size: 2.4rem; margin: 3rem 0 0.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--timeline); }
.liste { list-style: none; margin: 0; padding: 0; }
.liste li { margin: 0; border-bottom: 1px solid var(--form-color-border); }

.eintrag { display: flex; gap: 1.5rem; padding: 1.4rem 0.8rem; color: var(--text-color); text-decoration: none; border-left: 3px solid transparent; transition: border-color 0.15s, background-color 0.15s; }
.eintrag:hover, .eintrag:focus-visible { border-left-color: var(--timeline); background-color: color-mix(in srgb, var(--timeline) 12%, transparent); color: var(--text-color); outline: none; }

.scan { flex: none; width: 64px; height: 84px; object-fit: cover; object-position: top; border: 1px solid var(--form-color-border); filter: sepia(0.25); }
.scan.leer { background: color-mix(in srgb, var(--timeline) 20%, transparent); }

.inhalt { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
.datum { font-size: 1.7rem; font-weight: 600; color: var(--link-color); }
.eintrag:hover .datum { text-decoration: underline; }
.vorschau { margin-top: 0.3rem; line-height: 1.5; overflow-wrap: anywhere; }

@media (max-width: 600px) {
  .leiste { justify-content: flex-start; }
  .scan { width: 48px; height: 64px; }
}
</style>
