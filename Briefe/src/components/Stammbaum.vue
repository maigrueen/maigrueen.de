<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { bildUrl } from "../briefe";

// Von Hand angeordneter Stammbaum rund um Fritz und Erna.
// Jede Person führt zu ihrem Glossar-Eintrag (id). Lebende Personen werden nicht namentlich genannt.
// Koordinaten im 680 px breiten Zeichenbereich; auf schmalen Bildschirmen lässt er sich seitlich verschieben.
const router = useRouter();
const box = ref(null);

const B = 76; // Breite der Geschwister-Kästen
const kaesten = [
  // Eltern: Mann und Frau gleichberechtigt nebeneinander, verbunden durch den Ehe-Strich
  { fam: "b", x: 13, y: 24, w: 104, zeilen: [["Carl", "vater-boettcher"]], jahre: "1867–1926", info: "Schuhmacher" },
  { fam: "b", x: 135, y: 24, w: 104, zeilen: [["Louise", "mutter-boettcher"]], jahre: "1867–1957", info: "geb. Schäfer" },
  { fam: "s", x: 357, y: 24, w: 104, zeilen: [["Johannes", "vater-steinmetz"]], jahre: "1876–1966", info: "Lehrer", foto: "19400401-Hans_Hedwig_Steinmetz.jpg", ausschnitt: "xMinYMin" },
  { fam: "s", x: 479, y: 24, w: 104, zeilen: [["Hedwig", "mutter-steinmetz"]], jahre: "1882–1941", info: "geb. Gonnermann", foto: "19400401-Hans_Hedwig_Steinmetz.jpg", ausschnitt: "xMaxYMin" },
  // Geschwister
  { fam: "b", x: 6, y: 146, zeilen: [["Karl", "karl"]], jahre: "* um 1900", info: "Schuhmacher" },
  { fam: "b", x: 88, y: 146, zeilen: [["Heinrich", "heinrich-boettcher"]], jahre: "Prokurist", info: "in Bremen" },
  { fam: "b", x: 170, y: 146, zeilen: [["Fritz", "fritz"]], jahre: "1905–1944", info: "Lehrer", haupt: true, foto: "Fritz-Pilsen.jpg" },
  { fam: "s", x: 268, y: 146, zeilen: [["Erna", "erna"]], jahre: "1907–1990", info: "⚭ 1938", haupt: true, foto: "19410000-Erna.jpg" },
  { fam: "s", x: 350, y: 146, zeilen: [["Heini", "heini"]], jahre: "* 1905", info: "⚭ Elise", info2: "elise" },
  { fam: "s", x: 432, y: 146, zeilen: [["Hugo", "hugo"]], jahre: "1910–1978", info: "⚭ Minna" },
  { fam: "s", x: 514, y: 146, zeilen: [["Edith", "edith"]], jahre: "1914–2007", info: "⚭ Konrad", info2: "konrad", foto: "19421224-Inge_Edith_Ursula.jpg" },
  { fam: "s", x: 596, y: 146, zeilen: [["Agnes", "agnes"]], jahre: "1921–1974", info: "⚭ Otto", info2: "otto", foto: "19390000-Agnes.jpg" },
  // Nächste Generation (nur, wer in Briefen oder Tagebuch vorkommt)
  { fam: "s", x: 514, y: 286, h: 58, zeilen: [["Inge", "inge"]], jahre: "1936–1995" },
  { fam: "s", x: 596, y: 286, h: 58, zeilen: [["Klaus", "klaus"]], jahre: "1944–2002" },
].map((k) => ({ w: B, h: 76, ...k }));

const linien = [
  "M126 66V122M44 122H208M44 122V146M126 122V146M208 122V146",
  "M470 66V122M306 122H634M306 122V146M388 122V146M470 122V146M552 122V146M634 122V146",
  "M552 222V286",
  "M634 222V286",
];

function gehe(id) {
  if (id) router.push({ path: "/glossar", hash: "#" + id });
}
const taste = (e, id) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), gehe(id));

// Auf schmalen Bildschirmen: Fritz und Erna in die Mitte scrollen
onMounted(() => {
  const el = box.value;
  if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (257 / 680) * el.scrollWidth - el.clientWidth / 2;
});
</script>

<template>
  <div ref="box" class="stammbaum-box">
    <svg viewBox="0 0 680 410" role="img" aria-labelledby="sb-titel sb-text">
      <title id="sb-titel">Stammbaum von Fritz und Erna</title>
      <desc id="sb-text">
        Links Fritz’ Familie Böttcher mit den Eltern Carl und Louise und den Brüdern Karl und Heinrich, rechts Ernas
        Familie Steinmetz mit den Eltern Johannes und Hedwig und den Geschwistern Heini, Hugo, Edith und Agnes. Fritz und Erna
        heiraten 1938. Darunter Ediths Tochter Inge und Agnes’ Sohn Klaus.
      </desc>
      <defs>
        <clipPath v-for="(k, i) in kaesten" :id="'sb-foto-' + i" :key="'c' + i">
          <circle :cx="k.x + k.w / 2" :cy="k.y" r="15" />
        </clipPath>
      </defs>

      <path v-for="(d, i) in linien" :key="'l' + i" :d="d" class="linie" />
      <path d="M117 58H135M117 66H135M461 58H479M461 66H479M246 180H268M246 188H268" class="ehe" />

      <g v-for="(k, i) in kaesten" :key="i" :class="['kasten', 'fam-' + k.fam, { haupt: k.haupt }]">
        <rect :x="k.x" :y="k.y" :width="k.w" :height="k.h" rx="6" />
        <template v-if="k.foto">
          <image
            :href="bildUrl(k.foto)"
            :x="k.x + k.w / 2 - 15"
            :y="k.y - 15"
            width="30"
            height="30"
            :preserveAspectRatio="(k.ausschnitt ?? 'xMidYMin') + ' slice'"
            :clip-path="`url(#sb-foto-${i})`"
          />
          <circle :cx="k.x + k.w / 2" :cy="k.y" r="15" class="foto-rand" />
        </template>
        <text
          v-for="([name, id], z) in k.zeilen"
          :key="name"
          :x="k.x + k.w / 2"
          :y="k.y + (k.foto ? 30 : 20) + z * 19"
          :class="['mitte', z === 0 ? 'name' : 'partner', { link: id }]"
          :role="id ? 'link' : null"
          :tabindex="id ? 0 : null"
          @click="gehe(id)"
          @keydown="taste($event, id)"
        >{{ name }}</text>
        <text :x="k.x + k.w / 2" :y="k.y + (k.foto ? 30 : 20) + k.zeilen.length * 19" class="klein mitte">{{ k.jahre }}</text>
        <text
          v-if="k.info"
          :x="k.x + k.w / 2"
          :y="k.y + (k.foto ? 30 : 20) + k.zeilen.length * 19 + 17"
          :class="['klein', 'mitte', { link: k.info2 }]"
          :role="k.info2 ? 'link' : null"
          :tabindex="k.info2 ? 0 : null"
          @click="gehe(k.info2)"
          @keydown="taste($event, k.info2)"
        >{{ k.info }}</text>
      </g>

      <!-- Die Linie zur Autorin, ohne Namen lebender Personen -->
      <path d="M552 344V364" class="linie gestrichelt" />
      <rect x="467" y="364" width="170" height="40" rx="6" class="autorin" />
      <text x="552" y="382" class="name mitte">Autorin dieser Seite</text>
      <text x="552" y="398" class="klein mitte">Enkelin von Inge</text>
    </svg>
  </div>
  <p class="meta hinweis">Ein Klick auf einen Namen führt zum Eintrag im Glossar.</p>
</template>

<style scoped>
.stammbaum-box { overflow-x: auto; margin: 1rem 0 0.5rem; }
svg { display: block; width: 100%; min-width: 620px; height: auto; font-family: inherit; }
.linie { fill: none; stroke: var(--btn-color-border); stroke-width: 1; }
.gestrichelt { stroke-dasharray: 4 4; }
.ehe { fill: none; stroke: var(--text-color); stroke-width: 1.2; }
.kasten rect { stroke-width: 0.8; }
.fam-b rect { fill: color-mix(in srgb, var(--btn-prim-color) 16%, var(--background-color)); stroke: var(--btn-prim-color); }
.fam-s rect { fill: color-mix(in srgb, var(--timeline) 22%, var(--background-color)); stroke: var(--timeline); }
.haupt rect { stroke-width: 2.2; }
.autorin { fill: none; stroke: var(--btn-color-border); stroke-dasharray: 4 4; }
.foto-rand { fill: none; stroke: var(--background-color); stroke-width: 2; }
text { fill: var(--text-color); }
.mitte { text-anchor: middle; }
.name { font-size: 14px; font-weight: 600; }
.partner { font-size: 12.5px; }
.klein { font-size: 11.5px; opacity: 0.8; }
.link { cursor: pointer; }
.link:hover, .link:focus { fill: var(--link-color); text-decoration: underline; outline: none; }
.hinweis { margin-bottom: 2rem; }
</style>
