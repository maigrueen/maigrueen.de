import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// base './' = relative Pfade, funktioniert in jedem Unterordner (z. B. maigrueen.de/Briefe/)
export default defineConfig({ base: "./", plugins: [vue()] });
