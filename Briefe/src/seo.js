import { useHead } from "@unhead/vue";

export const SITE = "https://briefe.maigrueen.de";
const SUFFIX = " | Fritz und Erna – Briefe 1937–1944";

// Kürzt Text für die Beschreibung bei Google (ca. 155 Zeichen, am Wortende)
export const kurz = (text, max = 155) => {
  const t = (text || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max).replace(/\s+\S*$/, "") + " …";
};

// Setzt Titel, Beschreibung, kanonische Adresse und Vorschau-Angaben (Open Graph) einer Seite.
// Nimmt eine Funktion, damit sich alles mit der Seite (z. B. dem Brief) mitändert.
//   ({ titel, beschreibung, pfad, typ?, json? })
export function useSeite(daten) {
  useHead(() => {
    const d = daten();
    const titel = d.ganzerTitel ? d.titel : d.titel + SUFFIX;
    const url = SITE + d.pfad;
    return {
      htmlAttrs: { lang: "de" },
      title: titel,
      meta: [
        { name: "description", content: d.beschreibung },
        { property: "og:title", content: titel },
        { property: "og:description", content: d.beschreibung },
        { property: "og:url", content: url },
        { property: "og:type", content: d.typ || "website" },
        { property: "og:image", content: SITE + "/logo-512.png" },
        { property: "og:locale", content: "de_DE" },
        { name: "twitter:card", content: "summary" },
        ...(d.noindex ? [{ name: "robots", content: "noindex" }] : []),
      ],
      link: [{ rel: "canonical", href: url }],
      script: d.json
        ? [{ type: "application/ld+json", innerHTML: JSON.stringify(d.json).replace(/</g, "\\u003c") }]
        : [],
    };
  });
}
