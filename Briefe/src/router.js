import { createRouter, createWebHashHistory } from "vue-router";
import BriefListe from "./views/BriefListe.vue";
import BriefDetail from "./views/BriefDetail.vue";
import ProfilSeite from "./views/ProfilSeite.vue";
import KartenSeite from "./views/KartenSeite.vue";

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: "/", component: BriefListe },
    { path: "/brief/:id", component: BriefDetail, props: true },
    { path: "/mann", component: ProfilSeite, props: { datei: "profil-mann" } },
    { path: "/frau", component: ProfilSeite, props: { datei: "profil-frau" } },
    { path: "/karte", component: KartenSeite },
  ],
});
