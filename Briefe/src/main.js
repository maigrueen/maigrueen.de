import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import { routes, scrollBehavior } from "./router";

// vite-ssg rendert beim Build jede Seite vorab zu echtem HTML und übernimmt sie im Browser ("Hydration").
export const createApp = ViteSSG(App, { routes, scrollBehavior, base: import.meta.env.BASE_URL });
