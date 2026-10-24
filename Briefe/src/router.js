import { createRouter, createWebHashHistory } from "vue-router";
import StartSeite from "./views/StartSeite.vue";
import BriefListe from "./views/BriefListe.vue";
import BriefDetail from "./views/BriefDetail.vue";
import ProfilSeite from "./views/ProfilSeite.vue";
import KartenSeite from "./views/KartenSeite.vue";
import GlossarSeite from "./views/GlossarSeite.vue";

export default createRouter({
  history: createWebHashHistory(),
  // Sprungmarken (z. B. /glossar#haag) anspringen, sonst nach oben
  scrollBehavior: (to) =>
    to.hash
      ? new Promise((ok) => setTimeout(() => ok({ el: to.hash, top: 20, behavior: "smooth" }), 50))
      : { top: 0 },
  routes: [
    { path: "/", component: StartSeite },
    { path: "/briefe", component: BriefListe },
    { path: "/brief/:id", component: BriefDetail, props: true },
    { path: "/mann", component: ProfilSeite, props: { datei: "profil-mann" } },
    { path: "/frau", component: ProfilSeite, props: { datei: "profil-frau" } },
    { path: "/karte", component: KartenSeite },
    { path: "/glossar", component: GlossarSeite },
  ],
});
