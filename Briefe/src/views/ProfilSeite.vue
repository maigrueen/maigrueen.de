<script setup>
import { computed } from "vue";
import Lebenslauf from "../components/Lebenslauf.vue";
import { bildUrl } from "../briefe";

const props = defineProps({ datei: String });
const profile = import.meta.glob("../content/profil-*.json", { eager: true, import: "default" });
const profil = computed(() => profile[`../content/${props.datei}.json`]);
</script>

<template>
  <article v-if="profil">
    <div class="kopf">
      <figure v-if="profil.foto" class="portrait">
        <img :src="bildUrl(profil.foto)" :alt="profil.fotoText || profil.name" />
        <figcaption v-if="profil.fotoText" class="meta">{{ profil.fotoText }}</figcaption>
      </figure>
      <div class="kopf-text">
        <h1>{{ profil.name }}</h1>
        <p class="meta">{{ profil.lebensdaten }}</p>
      </div>
    </div>

    <p class="text">{{ profil.text }}</p>

    <h3>Lebenslauf</h3>
    <Lebenslauf :eintraege="profil.lebenslauf" />

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
      <details v-for="gruppe in profil.dokumente" :key="gruppe.titel" class="dok">
        <summary>{{ gruppe.titel }} ({{ gruppe.bilder.length }})</summary>
        <div class="galerie">
          <figure v-for="b in gruppe.bilder" :key="b.datei">
            <a :href="bildUrl(b.datei)" target="_blank">
              <img :src="bildUrl(b.datei)" :alt="b.text" loading="lazy" />
            </a>
            <figcaption class="meta">{{ b.text }}</figcaption>
          </figure>
        </div>
      </details>
    </template>
  </article>
</template>

<style scoped>
.text { white-space: pre-line; }

/* Porträt neben dem Namen, auf schmalen Bildschirmen darüber */
.kopf { display: flex; flex-wrap: wrap; gap: 2.5rem; align-items: flex-end; margin-bottom: 2rem; }
.portrait { margin: 0; width: 320px; max-width: 100%; }
.portrait img { display: block; width: 100%; height: auto; border: 1px solid var(--btn-color-border); }
.portrait figcaption { margin-top: 0.5rem; }
.kopf-text { flex: 1 1 260px; }
.kopf-text h1 { margin-top: 0; }

.familie { list-style: none; }
.dok { margin-bottom: 1.5rem; }
.dok summary { cursor: pointer; font-weight: 600; margin-bottom: 1rem; }
.galerie { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }
.galerie figure { margin: 0; }
.galerie img { width: 100%; height: auto; border: 1px solid var(--btn-color-border); }
</style>
