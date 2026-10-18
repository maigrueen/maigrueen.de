<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import stationen from "../content/stationen.json";

const el = ref(null);
let karte;

onMounted(() => {
  karte = L.map(el.value);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap-Mitwirkende",
  }).addTo(karte);

  const punkte = stationen.map((s) => [s.lat, s.lng]);
  L.polyline(punkte, { color: "#273582", weight: 2, dashArray: "6 6" }).addTo(karte);
  stationen.forEach((s, i) => {
    L.circleMarker([s.lat, s.lng], { radius: 9, color: "#273582", fillColor: "#a3d698", fillOpacity: 1 })
      .bindPopup(`<strong>${i + 1}. ${s.ort}</strong><br>${s.von} – ${s.bis}<br>${s.notiz || ""}`)
      .addTo(karte);
  });
  if (punkte.length) karte.fitBounds(punkte, { padding: [30, 30] });
  else karte.setView([51, 10], 5);
});

onBeforeUnmount(() => karte && karte.remove());
</script>

<template>
  <h1>Stationen</h1>
  <div ref="el" class="karte-box"></div>
  <ol>
    <li v-for="s in stationen" :key="s.ort + s.von">
      <strong>{{ s.ort }}</strong>, {{ s.von }} – {{ s.bis }}<span v-if="s.notiz"> ({{ s.notiz }})</span>
    </li>
  </ol>
</template>

<style scoped>
.karte-box { height: 420px; margin-bottom: 2rem; border: 1px solid var(--btn-color-border); }
</style>
