import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { readdirSync, writeFileSync } from "node:fs";

// Die Seite läuft auf der eigenen Subdomain briefe.maigrueen.de, daher Basis "/".
// (Mit sauberen Adressen wie /briefe/1943-05-12 würden relative Pfade ("./") auf Unterseiten brechen.)
const SITE = "https://briefe.maigrueen.de";
const briefIds = readdirSync("./src/content/briefe")
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""))
  .sort();

// Alle Seiten, die vorab als HTML erzeugt werden (Weiterleitungen wie /mann gehören nicht dazu)
const seiten = ["/", "/briefe", ...briefIds.map((id) => "/briefe/" + id), "/fritz", "/erna", "/karte", "/glossar"];

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
        seiten.map((p) => `  <url><loc>${SITE}${p === "/" ? "/" : p}</loc></url>`).join("\n") +
        "\n</urlset>\n";
      writeFileSync("./dist/sitemap.xml", xml);
    },
  },
});
