import StartSeite from "./views/StartSeite.vue";
import BriefListe from "./views/BriefListe.vue";
import BriefDetail from "./views/BriefDetail.vue";
import ProfilSeite from "./views/ProfilSeite.vue";
import KartenSeite from "./views/KartenSeite.vue";
import GlossarSeite from "./views/GlossarSeite.vue";

// Sprungmarken (z. B. /glossar#haag) anspringen, sonst nach oben
export const scrollBehavior = (to) =>
    to.hash
      ? new Promise((ok) => setTimeout(() => ok({ el: to.hash, top: 20, behavior: "smooth" }), 50))
      : { top: 0 };

export const routes = [
    { path: "/", component: StartSeite },
    { path: "/briefe", component: BriefListe },
    { path: "/briefe/:id", component: BriefDetail, props: true },
    // alte Adresse (und alte #/brief/…-Links) weiterleiten
    { path: "/brief/:id", redirect: (to) => "/briefe/" + to.params.id },
    { path: "/fritz", component: ProfilSeite, props: { datei: "profil-mann" } },
    { path: "/erna", component: ProfilSeite, props: { datei: "profil-frau" } },
    // alte Adressen weiterleiten
    { path: "/mann", redirect: "/fritz" },
    { path: "/frau", redirect: "/erna" },
    { path: "/karte", component: KartenSeite },
    { path: "/glossar", component: GlossarSeite },
];
