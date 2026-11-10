import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

// Die Seite läuft auf der eigenen Subdomain briefe.maigrueen.de, daher Basis "/".
// (Mit sauberen Adressen wie /briefe/1943-05-12 würden relative Pfade ("./") auf Unterseiten brechen.)
const SITE = "https://briefe.maigrueen.de";
const briefIds = readdirSync("./src/content/briefe")
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""))
  .sort();

// Der Build bricht ab, solange in src/content/kontakt.json noch "TODO" steht:
// Die Datenschutzerklärung darf nicht ohne Verantwortliche und E-Mail-Adresse online gehen.
const kontakt = JSON.parse(readFileSync("./src/content/kontakt.json", "utf-8"));
const offen = Object.entries(kontakt).filter(([, v]) => String(v).includes("TODO")).map(([k]) => k);
if (offen.length && process.argv.some((a) => a === "build")) {
  throw new Error(`src/content/kontakt.json ist noch nicht ausgefüllt: ${offen.join(", ")}`);
}

// Alle Seiten, die vorab als HTML erzeugt werden (Weiterleitungen wie /mann gehören nicht dazu)
const sitemapSeiten = ["/", "/briefe", ...briefIds.map((id) => "/briefe/" + id), "/fritz", "/erna", "/karte", "/glossar"];
// Die Datenschutz-Seite wird erzeugt, steht aber nicht in der Sitemap und ist auf noindex gesetzt
const seiten = [...sitemapSeiten, "/datenschutz"];

export default defineConfig({
  base: "/",
  plugins: [vue()],
  ssgOptions: {
    // /briefe.html statt /briefe/index.html, damit /briefe (Liste) und /briefe/<datum> nebeneinander bestehen
    dirStyle: "flat",
    includedRoutes: () => seiten,
    // Sitemap nach dem Build schreiben
    onFinished() {
      const xml =
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        sitemapSeiten.map((p) => `  <url><loc>${SITE}${p === "/" ? "/" : p}</loc></url>`).join("\n") +
        "\n</urlset>\n";
      writeFileSync("./dist/sitemap.xml", xml);
    },
  },
});
