import daten from "./content/glossar.json";
import { briefe } from "./briefe";

// Findet Wortanfänge (auch mit Umlauten): "Feldpost" findet "Feldpostnummer", "Mama" findet "Mamas",
// aber "Rose" nicht in "Aprikose"
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const muster = (begriffe) =>
  begriffe?.length ? new RegExp(`(^|[^\\p{L}])(${begriffe.map(escape).join("|")})`, "u") : null;

// Zu jedem Eintrag die Briefe, in denen er vorkommt:
// "briefe" (feste Liste) plus alle Briefe, deren Text einen der "suche"-Begriffe enthält
function mitBriefen(eintrag) {
  const re = muster(eintrag.suche);
  const ids = new Set(eintrag.briefe ?? []);
  if (re) briefe.forEach((b) => re.test(b.text) && ids.add(b.id));
  return { ...eintrag, briefIds: briefe.filter((b) => ids.has(b.id)).map((b) => b.id) };
}

export const glossarIntro = daten.intro;
export const personen = daten.personen.map(mitBriefen);
export const begriffe = daten.begriffe.map(mitBriefen);

// Für die Briefseite: welche Personen und Begriffe kommen in diesem Brief vor?
export const personenIn = (id) => personen.filter((p) => p.briefIds.includes(id));
export const begriffeIn = (id) => begriffe.filter((b) => b.briefIds.includes(id));
