<script setup>
import kontakt from "../content/kontakt.json";
import { useSeite } from "../seo";

useSeite(() => ({
  titel: "Datenschutz und Kontakt",
  beschreibung: "Datenschutzerklärung und Kontakt zur Seite „Fritz und Erna – Briefe 1937–1944“.",
  pfad: "/datenschutz",
  noindex: true,
}));
</script>

<template>
  <article class="text-seite">
    <h1>Datenschutz und Kontakt</h1>

    <h2>Wer ist verantwortlich?</h2>
    <p>
      {{ kontakt.name }}<br />
      <template v-if="kontakt.anschrift">{{ kontakt.anschrift }}<br /></template>
      E-Mail: <a :href="'mailto:' + kontakt.email">{{ kontakt.email }}</a>
    </p>
    <p>Das <a href="https://maigrueen.de/impressum.html">Impressum</a> steht auf maigrueen.de.</p>
    <p>
      Diese Seite ist ein privates, nicht kommerzielles Familienprojekt. Sie zeigt Briefe, Fotos und Dokumente von
      Menschen, die vor langer Zeit gelebt haben.
    </p>

    <h2>Was passiert, wenn du die Seite besuchst?</h2>
    <p>
      Die Seite wird auf einem eigenen Server betrieben. Beim Aufruf speichert der Webserver in Protokolldateien
      (Logs) automatisch die IP-Adresse, Datum und Uhrzeit, die aufgerufene Adresse, den Antwortcode und die
      Browser-Kennung. Das ist technisch nötig, um die Seite auszuliefern und Missbrauch abzuwehren (Art. 6 Abs. 1
      lit. f DSGVO). Die Logs werden {{ kontakt.logDauer }} gespeichert und dann gelöscht. Eine Auswertung zu
      Werbe- oder Statistikzwecken findet nicht statt.
    </p>
    <p>
      Es gibt keine Cookies, keine Analyse- oder Werbedienste und keine eingebundenen Schriften oder Videos von
      Dritten.
    </p>

    <h2>Karten</h2>
    <p>
      Auf den Seiten mit Karte (Karte, Fritz, Erna) lädt dein Browser die Kartenkacheln direkt von den Servern der
      OpenStreetMap Foundation (tile.openstreetmap.org, Vereinigtes Königreich). Dabei erhält die Foundation deine
      IP-Adresse. Das geschieht, sobald du eine dieser Seiten öffnest, damit die Karte angezeigt werden kann
      (Art. 6 Abs. 1 lit. f DSGVO). Näheres steht in der
      <a href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener">Datenschutzerklärung der OpenStreetMap Foundation</a>.
      Wenn du das nicht möchtest, rufe diese Seiten nicht auf; alle Orte stehen zusätzlich als Liste unter der Karte.
    </p>

    <h2>Einstellung für Hell oder Dunkel</h2>
    <p>
      Wenn du zwischen hellem und dunklem Erscheinungsbild wechselst, merkt sich dein Browser die Auswahl lokal
      (Local Storage). Diese Information bleibt auf deinem Gerät und wird nicht an uns übertragen.
    </p>

    <h2>Personen in den Briefen</h2>
    <p>
      Die Seite nennt Menschen, die überwiegend vor Jahrzehnten gestorben sind. Es gibt Fälle, in denen das nicht
      sicher ist oder in denen Nachkommen betroffen sein könnten. Wenn du als Angehörige oder Angehöriger möchtest,
      dass etwas geändert, geschwärzt oder entfernt wird, schreib mir bitte kurz an die oben genannte Adresse. Ich
      kümmere mich zeitnah darum.
    </p>

    <h2>Deine Rechte</h2>
    <p>
      Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Widerspruch
      (Art. 15 bis 21 DSGVO) und kannst dich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei
      der für deinen Wohnort zuständigen.
    </p>
  </article>
</template>

<style scoped>
h2 { margin-top: 2.5rem; }
</style>
