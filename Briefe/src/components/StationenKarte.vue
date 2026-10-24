<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { briefe, datumDe } from "../briefe";
import { personen, begriffe } from "../glossar";

// daten: { intro, linie, fahrt?, beide?, stationen: [{ ort, lat, lng, zeit, typ, notiz, … }] }
// fahrt: { titel, zeit, von, bis, notiz } -> Eintrag in der Liste für die Zwischenhalte (typ "reise"), vor der Station "bis"
// typ: "leben" | "militaer"   -> nummerierte Hauptstation
//      "ungewiss"             -> Ort unsicher ("?", gestrichelt)
//      "neben"                -> weiterer Ort (kleiner Punkt, ohne Nummer und ohne Route)
//      "reise"                -> Zwischenhalt einer Fahrt (kleiner Punkt, nur auf der Karte)
// Optionale Felder einer Station:
//   kurz:     ein kurzer Satz fürs Popup (sonst wird "notiz" gezeigt)
//   orte:     ["Pilsen"]                    -> alle Briefe mit diesem "ort:" im Kopf
//   zeitraum: ["1944-01-27", "1944-06-30"] -> alle Briefe aus diesem Zeitraum
//   briefe:   ["1943-12-14"]                -> zusätzlich diese Briefe
//   ohne:     ["1944-05-01"]                -> diese Briefe nicht
//   glossar:  ["haag", "lwfd"]              -> Links zu Glossar-Einträgen
//   linie:    false                         -> nicht in die Route einbeziehen
//   person:   "mann" | "frau"               -> nur in der Ansicht "Beide"
const props = defineProps({
  daten: { type: Object, required: true },
  oeffne: { type: String, default: "" }, // Ort, dessen Popup nach dem Laden geöffnet wird
});
const emit = defineEmits(["wechsel"]); // in der Ansicht "Beide": zur Karte einer Person springen

const el = ref(null);
let karte;
const marker = new Map();
const eintrag = ref({}); // Listeneinträge, zum Hinspringen aus dem Popup

const beide = !!props.daten.beide;
const stationen = props.daten.stationen;
const nummeriert = stationen.filter((s) => s.typ === "leben" || s.typ === "militaer");
const reise = stationen.filter((s) => s.typ === "reise");

// Die Fahrt als eigener Listeneintrag, chronologisch vor ihrem Ziel (z. B. Witebsk)
const fahrt =
  !beide && props.daten.fahrt && reise.length
    ? { ...props.daten.fahrt, ort: props.daten.fahrt.titel, typ: "fahrt", zeit: props.daten.fahrt.zeit ?? "" }
    : null;
const liste = stationen.filter((s) => s.typ !== "reise");
if (fahrt) {
  const ziel = liste.findIndex((s) => s.ort.startsWith(fahrt.bis));
  liste.splice(ziel < 0 ? liste.length : ziel, 0, fahrt);
}
const marke = (s) =>
  beide ? (s.person === "mann" ? "F" : "E") : s.typ === "ungewiss" ? "?" : s.typ === "neben" ? "" : nummeriert.indexOf(s) + 1;
const klasse = (s) => ["stn", "stn-" + s.typ, beide && "stn-person-" + s.person].filter(Boolean);
const pos = (s) => [s.lat, s.lng];

const legende = beide
  ? [[["stn", "stn-leben", "stn-person-mann"], "F", "Fritz"], [["stn", "stn-leben", "stn-person-frau"], "E", "Erna"]]
  : [
      ["leben", "1", "Leben"],
      ["militaer", "3", "Militär"],
      ["ungewiss", "?", "Ort unsicher"],
      ["neben", "", "Weiterer Ort"],
    ]
      .filter(([t]) => stationen.some((s) => s.typ === t))
      .map(([t, nr, name]) => [["stn", "stn-" + t], nr, name]);

// Briefe und Glossar-Einträge pro Station
function briefeFuer(s) {
  const ids = new Set(s.briefe ?? []);
  for (const b of briefe) {
    if (s.orte?.includes(b.ort)) ids.add(b.id);
    if (s.zeitraum && b.datum >= s.zeitraum[0] && b.datum <= s.zeitraum[1]) ids.add(b.id);
  }
  (s.ohne ?? []).forEach((id) => ids.delete(id));
  return briefe.filter((b) => ids.has(b.id));
}
const glossarNachId = Object.fromEntries([
  ...personen.map((p) => [p.id, { id: p.id, label: p.name }]),
  ...begriffe.map((b) => [b.id, { id: b.id, label: b.begriff }]),
]);
const links = new Map(
  stationen.map((s) => [s, { briefe: briefeFuer(s), glossar: (s.glossar ?? []).map((id) => glossarNachId[id]).filter(Boolean) }])
);
if (fahrt) {
  const ids = new Set([...(fahrt.briefe ?? []), ...reise.flatMap((r) => links.get(r).briefe.map((b) => b.id))]);
  links.set(fahrt, { briefe: briefe.filter((b) => ids.has(b.id)), glossar: (fahrt.glossar ?? []).map((id) => glossarNachId[id]).filter(Boolean) });
}
const briefLabel = (b) => b.titel || datumDe(b.datum);

// Lange Brieflisten in der Liste zuerst eingeklappt
const GRENZE = 6;
const offen = ref({});

const esc = (t = "") =>
  String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Popup bewusst knapp: Ort, Zeit, ein Satz und ein Sprung zu den Details
function popup(s) {
  const n = links.get(s).briefe.length;
  let html = `<div class="popup-ort">${esc(s.ort)}</div><div class="popup-zeit">${esc(s.zeit)}</div>`;
  if (s.kurz || s.notiz) html += `<p class="popup-text">${esc(s.kurz || s.notiz)}</p>`;
  if (s.typ === "reise") return fahrt ? html + `<a href="#" class="popup-mehr">Mehr zur Fahrt ↓</a>` : html;
  const wohin = beide ? `Mehr auf ${s.person === "mann" ? "Fritz’" : "Ernas"} Karte` : n ? `${n > 1 ? n + " Briefe" : "1 Brief"} und mehr` : "Mehr dazu";
  return html + `<a href="#" class="popup-mehr">${wohin} ↓</a>`;
}

// Aus der Liste heraus zur Station springen (hilft, wenn Markierungen nah beieinander liegen)
function zeige(s) {
  el.value.scrollIntoView({ behavior: "smooth", block: "center" });
  karte.flyTo(pos(s), Math.max(karte.getZoom(), 9), { duration: 0.6 });
  setTimeout(() => marker.get(s)?.openPopup(), 700);
}
// Die ganze Fahrt auf der Karte zeigen (Start, Zwischenhalte, Ziel)
function zeigeFahrt() {
  const ende = [fahrt.von, fahrt.bis].map((o) => stationen.find((s) => s.ort.startsWith(o))).filter(Boolean);
  el.value.scrollIntoView({ behavior: "smooth", block: "center" });
  karte.closePopup();
  karte.flyToBounds([...ende, ...reise].map(pos), { padding: [30, 30], duration: 0.6 });
}
// Aus dem Popup heraus zum Listeneintrag springen
function details(s) {
  if (beide) return emit("wechsel", s.person, s.ort);
  karte.closePopup();
  eintrag.value[s.ort]?.scrollIntoView({ behavior: "smooth", block: "start" });
}

onMounted(async () => {
  karte = L.map(el.value);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    className: "kacheln", // für die Einfärbung, siehe CSS unten
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap-Mitwirkende",
  }).addTo(karte);

  // Optional: Route als Linie, der unsichere Teil gestrichelt
  if (props.daten.linie !== false) {
    const imZug = (s) => s.linie !== false && s.typ !== "neben";
    const sicher = stationen.filter((s) => imZug(s) && s.typ !== "ungewiss");
    const unsicher = stationen.filter((s) => imZug(s) && s.typ === "ungewiss");
    L.polyline(sicher.map(pos), { color: "#273582", weight: 2, opacity: 0.7, className: "route" }).addTo(karte);
    if (sicher.length && unsicher.length) {
      L.polyline([pos(sicher[sicher.length - 1]), ...unsicher.map(pos)], {
        color: "#273582", weight: 2, dashArray: "6 6", className: "route",
      }).addTo(karte);
    }
  }

  stationen.forEach((s) => {
    const klein = s.typ === "reise" || (s.typ === "neben" && !beide);
    const icon = klein
      ? L.divIcon({ className: "", html: `<span class="stn-dot stn-dot-${s.typ}"></span>`, iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -8] })
      : L.divIcon({ className: "", html: `<span class="${klasse(s).join(" ")}">${marke(s)}</span>`, iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] });
    const m = L.marker(pos(s), { icon, title: s.ort }).bindPopup(popup(s), { maxWidth: 280, minWidth: 200 }).addTo(karte);
    m.on("popupopen", (e) => {
      e.popup.getElement().querySelector(".popup-mehr")?.addEventListener("click", (ev) => {
        ev.preventDefault();
        details(s.typ === "reise" && fahrt ? fahrt : s);
      });
    });
    marker.set(s, m);
  });
  // Anfangsansicht mit allen Orten, und ein Knopf unter +/−, der dorthin zurückspringt
  const ueberblick = () => karte.fitBounds(stationen.map(pos), { padding: [30, 30], maxZoom: 12 });
  ueberblick();
  const Zurueck = L.Control.extend({
    options: { position: "topleft" },
    onAdd() {
      const box = L.DomUtil.create("div", "leaflet-bar");
      const knopf = L.DomUtil.create("a", "karte-ueberblick", box);
      knopf.href = "#";
      knopf.title = "Alle Orte zeigen";
      knopf.setAttribute("role", "button");
      knopf.setAttribute("aria-label", "Alle Orte zeigen");
      knopf.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      L.DomEvent.on(knopf, "click", (e) => {
        L.DomEvent.preventDefault(e);
        L.DomEvent.stopPropagation(e);
        karte.closePopup();
        ueberblick();
      });
      return box;
    },
  });
  new Zurueck().addTo(karte);

  if (props.oeffne) {
    const s = stationen.find((x) => x.ort === props.oeffne);
    if (s) {
      await nextTick();
      zeige(s);
    }
  }
});

onBeforeUnmount(() => karte && karte.remove());
</script>

<template>
  <p v-if="daten.intro" class="meta">{{ daten.intro }}</p>

  <ul class="legende">
    <li v-for="[k, nr, name] in legende" :key="name">
      <span v-if="k.includes('stn-neben')" class="stn-dot stn-dot-neben"></span>
      <span v-else :class="k">{{ nr }}</span>
      {{ name }}
    </li>
    <li v-if="reise.length"><span class="stn-dot stn-dot-reise"></span> Zwischenhalt auf der Fahrt</li>
  </ul>

  <div ref="el" class="karte-box"></div>

  <ol v-if="!beide" class="stationen">
    <li v-for="s in liste" :key="s.ort" :ref="(e) => (eintrag[s.ort] = e)" :class="{ neben: s.typ === 'neben' || s.typ === 'fahrt' }">
      <span v-if="s.typ === 'neben'" class="stn-dot stn-dot-neben listen-punkt"></span>
      <span v-else-if="s.typ === 'fahrt'" class="stn-dot stn-dot-reise listen-punkt"></span>
      <span v-else :class="klasse(s)">{{ marke(s) }}</span>
      <div>
        <strong>{{ s.ort }}</strong> <span class="meta">· {{ s.zeit }}</span>
        <p v-if="s.typ === 'fahrt'" class="strecke">{{ [s.von, ...reise.map((r) => r.ort), s.bis].join(" → ") }}</p>
        <p>{{ s.notiz }}</p>
        <p v-if="links.get(s).briefe.length" class="verweise">
          <span class="meta">{{ links.get(s).briefe.length > 1 ? `${links.get(s).briefe.length} Briefe` : "Brief" }}:</span>
          <router-link
            v-for="b in offen[s.ort] ? links.get(s).briefe : links.get(s).briefe.slice(0, GRENZE)"
            :key="b.id"
            :to="'/brief/' + b.id"
          >{{ briefLabel(b) }}</router-link>
          <a v-if="links.get(s).briefe.length > GRENZE && !offen[s.ort]" href="#" @click.prevent="offen[s.ort] = true">alle zeigen</a>
        </p>
        <p v-if="links.get(s).glossar.length" class="verweise">
          <span class="meta">Glossar:</span>
          <router-link v-for="g in links.get(s).glossar" :key="g.id" :to="{ path: '/glossar', hash: '#' + g.id }">{{ g.label }}</router-link>
        </p>
        <button type="button" class="zeigen" @click="s.typ === 'fahrt' ? zeigeFahrt() : zeige(s)">Auf der Karte zeigen</button>
      </div>
    </li>
  </ol>

</template>

<!-- Global, weil Leaflet die Markierungen und Popups außerhalb dieser Komponente erzeugt -->
<style>
.stn { display: inline-flex; align-items: center; justify-content: center; flex: none; box-sizing: border-box; width: 28px; height: 28px; border-radius: 50%; border: 2px solid #273582; color: #00241b; font-size: 13px; font-weight: 600; line-height: 1; }
.stn-leben { background: var(--timeline); }
.stn-militaer { background: var(--btn-prim-color); }
.stn-ungewiss { background: #fff; border-style: dashed; }
.stn-neben { background: var(--timeline); width: 22px; height: 22px; font-size: 11px; }
.stn-person-mann { background: var(--btn-prim-color); }
.stn-person-frau { background: var(--timeline); }
.stn-person-mann.stn-ungewiss, .stn-person-frau.stn-ungewiss { background: #fff; }
.stn-dot { display: inline-block; flex: none; box-sizing: border-box; width: 12px; height: 12px; border-radius: 50%; background: #273582; border: 2px solid #fff; }
.stn-dot-neben { width: 14px; height: 14px; background: var(--timeline); border-color: #273582; }

/* Knopf "Alle Orte zeigen" unter +/− */
.karte-ueberblick { display: flex !important; align-items: center; justify-content: center; color: #222 !important; }

/* Popups: größere, gut lesbare Schrift */
.leaflet-popup-content { margin: 12px 16px; font-family: "Raleway", "Helvetica Neue", Arial, sans-serif; font-size: 15px; line-height: 1.45; color: #222; }
.popup-ort { font-weight: 600; font-size: 16px; }
.popup-zeit { font-size: 13px; opacity: 0.75; }
.popup-text { margin: 8px 0 !important; }
.popup-mehr { font-weight: 600; color: #273582 !important; }

/* Einfärbung des Kartenhintergrunds (nur die Kacheln, nicht die Markierungen).
   Hell: entsättigt und leicht sepia, wie ein altes Dokument.
   Dunkel: abgedunkelt und grünlich, passend zum dunkelgrünen Hintergrund.
   Die Werte lassen sich frei anpassen; ohne diese zwei Regeln ist die Karte wieder bunt. */
.kacheln { filter: grayscale(0.75) sepia(0.35) brightness(1.03) contrast(0.95); }
/* Route: im Dunkelmodus hell und etwas kräftiger, damit sie auf der dunklen Karte sichtbar bleibt */
:root.dark-theme .route { stroke: #a3d698; stroke-opacity: 0.9; stroke-width: 3px; }
:root.dark-theme .kacheln { filter: grayscale(1) invert(0.9) sepia(0.45) hue-rotate(60deg) brightness(0.75) contrast(1.1); }
</style>

<style scoped>
.karte-box { position: relative; z-index: 0; background: var(--background-color); height: 460px; margin: 1.5rem 0 2rem; border: 1px solid var(--btn-color-border); }
.legende { display: flex; flex-wrap: wrap; gap: 1.5rem; list-style: none; margin: 0 0 1rem; }
.legende li { display: flex; align-items: center; gap: 0.6rem; margin: 0; font-size: 1.3rem; }
.stationen { list-style: none; }
.stationen li { display: flex; gap: 1.2rem; align-items: flex-start; margin-bottom: 2rem; scroll-margin-top: 2rem; }
.stationen li.neben { padding-left: 0.7rem; }
.listen-punkt { margin: 0.5rem 0.7rem 0 0; }
.stationen p { margin: 0.3rem 0 0.4rem; }
.strecke { font-size: 1.3rem; opacity: 0.85; }
.verweise { display: flex; flex-wrap: wrap; gap: 0.3rem 1.2rem; font-size: 1.3rem; }
.zeigen { height: auto; padding: 0; border: 0; line-height: 1.4; font-size: 1.3rem; letter-spacing: 0; text-transform: none; color: var(--link-color); text-decoration: underline; }
.zeigen:hover, .zeigen:focus { color: var(--link-color-hover); border: 0; }
</style>
