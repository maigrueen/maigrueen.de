<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// daten: { intro, linie, fahrt?, stationen: [{ ort, lat, lng, zeit, typ, notiz }] }
// typ: "leben" | "militaer" | "ungewiss" | "reise" (kleiner Zwischenhalt ohne Nummer)
const props = defineProps({ daten: { type: Object, required: true } });

const el = ref(null);
let karte;
const marker = new Map();

const stationen = props.daten.stationen;
const haupt = stationen.filter((s) => s.typ !== "reise");
const reise = stationen.filter((s) => s.typ === "reise");
const marke = (s) => (s.typ === "ungewiss" ? "?" : haupt.indexOf(s) + 1);
const pos = (s) => [s.lat, s.lng];

const typen = { leben: ["1", "Leben"], militaer: ["3", "Militär"], ungewiss: ["?", "Ort unsicher"] };
const legende = Object.entries(typen).filter(([t]) => stationen.some((s) => s.typ === t));

const esc = (t = "") =>
  String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const popup = (s) =>
  `<strong>${esc(s.ort)}</strong><br><em>${esc(s.zeit)}</em>` + (s.notiz ? `<br>${esc(s.notiz)}` : "");

// Aus der Liste heraus zur Station springen (hilft, wenn Markierungen nah beieinander liegen)
function zeige(s) {
  el.value.scrollIntoView({ behavior: "smooth", block: "center" });
  karte.flyTo(pos(s), Math.max(karte.getZoom(), 11), { duration: 0.6 });
  setTimeout(() => marker.get(s)?.openPopup(), 700);
}

onMounted(() => {
  karte = L.map(el.value);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap-Mitwirkende",
  }).addTo(karte);

  // Optional: Route als Linie, der unsichere Teil gestrichelt
  if (props.daten.linie !== false) {
    const sicher = stationen.filter((s) => s.typ !== "ungewiss");
    const unsicher = stationen.filter((s) => s.typ === "ungewiss");
    L.polyline(sicher.map(pos), { color: "#273582", weight: 2, opacity: 0.7 }).addTo(karte);
    if (sicher.length && unsicher.length) {
      L.polyline([pos(sicher[sicher.length - 1]), ...unsicher.map(pos)], {
        color: "#273582", weight: 2, dashArray: "6 6",
      }).addTo(karte);
    }
  }

  stationen.forEach((s) => {
    const icon =
      s.typ === "reise"
        ? L.divIcon({ className: "", html: '<span class="stn-dot"></span>', iconSize: [12, 12], iconAnchor: [6, 6], popupAnchor: [0, -8] })
        : L.divIcon({ className: "", html: `<span class="stn stn-${s.typ}">${marke(s)}</span>`, iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] });
    marker.set(s, L.marker(pos(s), { icon, title: s.ort }).bindPopup(popup(s)).addTo(karte));
  });
  karte.fitBounds(stationen.map(pos), { padding: [30, 30], maxZoom: 12 });
});

onBeforeUnmount(() => karte && karte.remove());
</script>

<template>
  <p v-if="daten.intro" class="meta">{{ daten.intro }}</p>

  <ul class="legende">
    <li v-for="[t, [nr, name]] in legende" :key="t"><span :class="['stn', 'stn-' + t]">{{ nr }}</span> {{ name }}</li>
    <li v-if="reise.length"><span class="stn-dot"></span> Zwischenhalt auf der Fahrt</li>
  </ul>

  <div ref="el" class="karte-box"></div>

  <ol class="stationen">
    <li v-for="s in haupt" :key="s.ort">
      <span :class="['stn', 'stn-' + s.typ]">{{ marke(s) }}</span>
      <div>
        <strong>{{ s.ort }}</strong> <span class="meta">· {{ s.zeit }}</span>
        <p>{{ s.notiz }}</p>
        <button type="button" class="zeigen" @click="zeige(s)">Auf der Karte zeigen</button>
      </div>
    </li>
  </ol>

  <p v-if="daten.fahrt && reise.length">
    <strong>{{ daten.fahrt.titel }}:</strong>
    {{ daten.fahrt.von }} → {{ reise.map((r) => r.ort).join(" → ") }} → {{ daten.fahrt.bis }}
  </p>
</template>

<!-- Global, weil Leaflet die Markierungen außerhalb dieser Komponente erzeugt -->
<style>
.stn { display: inline-flex; align-items: center; justify-content: center; flex: none; box-sizing: border-box; width: 28px; height: 28px; border-radius: 50%; border: 2px solid #273582; color: #00241b; font-size: 13px; font-weight: 600; line-height: 1; }
.stn-leben { background: var(--timeline); }
.stn-militaer { background: var(--btn-prim-color); }
.stn-ungewiss { background: #fff; border-style: dashed; }
.stn-dot { display: inline-block; box-sizing: border-box; width: 12px; height: 12px; border-radius: 50%; background: #273582; border: 2px solid #fff; }
</style>

<style scoped>
.karte-box { position: relative; z-index: 0; height: 460px; margin: 1.5rem 0 2rem; border: 1px solid var(--btn-color-border); }
.legende { display: flex; flex-wrap: wrap; gap: 1.5rem; list-style: none; margin: 0 0 1rem; }
.legende li { display: flex; align-items: center; gap: 0.6rem; margin: 0; font-size: 1.3rem; }
.stationen { list-style: none; }
.stationen li { display: flex; gap: 1.2rem; align-items: flex-start; }
.stationen p { margin: 0.3rem 0 0.4rem; }
.zeigen { height: auto; padding: 0; border: 0; line-height: 1.4; font-size: 1.3rem; letter-spacing: 0; text-transform: none; color: var(--link-color); text-decoration: underline; }
.zeigen:hover, .zeigen:focus { color: var(--link-color-hover); border: 0; }
</style>
