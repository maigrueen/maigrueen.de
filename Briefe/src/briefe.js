const dateien = import.meta.glob("./content/briefe/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parse(pfad, roh) {
  const id = pfad.split("/").pop().replace(".md", "");
  const m = roh.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const kopf = m ? m[1] : "";
  const text = (m ? m[2] : roh).trim();
  const brief = { id, datum: "", ort: "", titel: "", art: "", bilder: [], text };
  let liste = false;
  for (const zeile of kopf.split("\n")) {
    const kv = zeile.match(/^(\w+):\s*(.*)$/);
    if (kv) {
      liste = kv[1] === "bilder";
      if (!liste) brief[kv[1]] = kv[2].trim();
    } else if (liste && zeile.trim().startsWith("-")) {
      brief.bilder.push(zeile.replace(/^\s*-\s*/, "").trim());
    }
  }
  return brief;
}

export const briefe = Object.entries(dateien)
  .map(([pfad, roh]) => parse(pfad, roh))
  .sort((a, b) => a.datum.localeCompare(b.datum) || a.id.localeCompare(b.id));

export const bildUrl = (name) => import.meta.env.BASE_URL + "bilder/" + name;

// Versteht JJJJ-MM-TT, JJJJ-MM (nur Monat bekannt) und JJJJ
export const datumDe = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  if (!m) return String(y);
  const monat = new Date(y, m - 1, 1).toLocaleDateString("de-DE", { month: "long" });
  return d ? `${d}. ${monat} ${y}` : `${monat} ${y}`;
};

// Zeile unter dem Datum: z. B. "Postkarte, Im Osten"
export const metaZeile = (b) => [b.art, b.ort].filter(Boolean).join(", ");
