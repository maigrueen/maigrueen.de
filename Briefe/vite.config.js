import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Die Seite läuft auf der eigenen Subdomain briefe.maigrueen.de, daher Basis "/".
// (Mit sauberen Adressen wie /brief/1943-05-12 würden relative Pfade ("./") auf Unterseiten brechen.)
export default defineConfig({ base: "/", plugins: [vue()] });
