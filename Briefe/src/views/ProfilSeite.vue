<script setup>
import { computed, ref } from "vue";
import Lebenslauf from "../components/Lebenslauf.vue";
import Lightbox from "../components/Lightbox.vue";
import StationenKarte from "../components/StationenKarte.vue";
import { bildUrl } from "../briefe";

const props = defineProps({ datei: String });
const profile = import.meta.glob("../content/profil-*.json", { eager: true, import: "default" });
const profil = computed(() => profile[`../content/${props.datei}.json`]);

// Karte der Person: profil-mann -> karte-mann.json, profil-frau -> karte-frau.json
const karten = import.meta.glob("../content/karte-*.json", { eager: true, import: "default" });
const karte = computed(() => karten[`../content/karte-${props.datei.replace("profil-", "")}.json`]);

// Alle Dokumentbilder als eine Liste, damit man in der Bildansicht blättern kann
const offen = ref(null);
const dokBilder = computed(() =>
  (profil.value?.dokumente ?? []).flatMap((g) =>
    g.bilder.map((b) => ({ src: bildUrl(b.datei), text: `${g.titel}: ${b.text}` }))
  )
);
const dokIndex = (gi, bi) =>
  profil.value.dokumente.slice(0, gi).reduce((n, g) => n + g.bilder.length, 0) + bi;
</script>

<template>
  <article v-if="profil">
    <h1>{{ profil.name }}</h1>
    <p class="meta">{{ profil.lebensdaten }}</p>

    <figure v-if="profil.foto" class="portrait">
      <img :src="bildUrl(profil.foto)" :alt="profil.fotoText || profil.name" />
      <figcaption v-if="profil.fotoText" class="meta">{{ profil.fotoText }}</figcaption>
    </figure>

    <p class="text">{{ profil.text }}</p>

    <h3>Lebenslauf</h3>
    <Lebenslauf :eintraege="profil.lebenslauf" />

    <template v-if="karte">
      <h3>Karte</h3>
      <StationenKarte :key="datei" :daten="karte" />
    </template>

    <template v-if="profil.familie && profil.familie.length">
      <h3>Familie</h3>
      <ul class="familie">
        <li v-for="p in profil.familie" :key="p.name">
          <router-link v-if="p.link" :to="p.link">{{ p.name }}</router-link>
          <template v-else>{{ p.name }}</template>
          <span class="meta"> · {{ p.beziehung }}, {{ p.jahre }}</span>
        </li>
      </ul>
    </template>

    <template v-if="profil.dokumente && profil.dokumente.length">
      <h3>Dokumente</h3>
      <details v-for="(gruppe, gi) in profil.dokumente" :key="gruppe.titel" class="dok">
        <summary>{{ gruppe.titel }} ({{ gruppe.bilder.length }})</summary>
        <div class="galerie">
          <figure v-for="(b, bi) in gruppe.bilder" :key="b.datei">
            <img
              :src="bildUrl(b.datei)"
              :alt="b.text"
              loading="lazy"
              role="button"
              tabindex="0"
              @click="offen = dokIndex(gi, bi)"
              @keydown.enter.prevent="offen = dokIndex(gi, bi)"
              @keydown.space.prevent="offen = dokIndex(gi, bi)"
            />
            <figcaption class="meta">{{ b.text }}</figcaption>
          </figure>
        </div>
      </details>
      <Lightbox :bilder="dokBilder" v-model="offen" />
    </template>
  </article>
</template>

<style scoped>
.text { white-space: pre-line; }

/* Porträt unter Überschrift und Lebensdaten */
.portrait { margin: 2rem 0; width: 320px; max-width: 100%; }
.portrait img { display: block; width: 100%; height: auto; border: 1px solid var(--btn-color-border); }
.portrait figcaption { margin-top: 0.5rem; }

.familie { list-style: none; }
.dok { margin-bottom: 1.5rem; }
.dok summary { cursor: pointer; font-weight: 600; margin-bottom: 1rem; }
.galerie { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }
.galerie figure { margin: 0; }
.galerie img { width: 100%; height: auto; border: 1px solid var(--btn-color-border); cursor: zoom-in; }
</style>
