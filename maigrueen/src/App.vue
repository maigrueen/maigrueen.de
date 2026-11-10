<script setup>
import ThemeToggle from "./components/ThemeToggle.vue";
import Timeline from "./components/Timeline.vue";
import { onMounted, onBeforeUnmount, ref } from "vue";
import kontakt from "./content/kontakt.json";

// Zweite Ansicht "Impressum und Datenschutz" unter /#impressum, im selben Rahmen wie die Startseite
const recht = ref(false);
const aktualisieren = () => {
  recht.value = window.location.hash === "#impressum";
  window.scrollTo(0, 0);
};
onMounted(() => {
  aktualisieren();
  window.addEventListener("hashchange", aktualisieren);
});
onBeforeUnmount(() => window.removeEventListener("hashchange", aktualisieren));
</script>

<template>
  <div>
    <header>
      <img src="./assets/logo.png" alt="Logo green leaf in a circle" />
      <ThemeToggle />
    </header>

    <main v-if="!recht">
      <h1>Moin!</h1>
      <p>
        My name is Astrid, I'm living in Schleswig-Holstein in Germany and I'm working as a
        Project, Process and Knowledge  Manager, currently with a focus on Atlassian Tools. You can find out more about me
        below.
        <br />

        tl;dr: I make my environment a little bit better every day - and I want
        people around me to find it easy to make their own environment a little bit
        better every day.
        <br />
        <br />

        With my educational background - I studied natural sciences in the
        information society - I have laid a foundation as a communicator between
        different disciplines from the very beginning. Through my work
        experience, I was able to develop as an empathetic mediator between
        different stakeholders.
        <br />

        I have been able to prove my proactive and structured way of
        working in several projects since 2009. My greatest strength is
        organisation: Getting a quick grip on what needs to be done, interfacing
        between different stakeholders to achieve an aligned outcome, and
        documenting and reporting results: be it within the team, with clients
        and service providers, or even across disciplines, from creation to
        controlling. Of course, I am also used to having several projects on the
        table at the same time.
        <br />

        Because I always have holistic improvement in mind, I have had the
        opportunity to prove myself in organisational development in recent
        years. At my former employers, I was able to initiate and accompany both
        recognized quick wins and larger process improvements that accompanied
        the development as an agile organisation.
        <br />
        <br />

        I like to find individual and efficient solutions to achieve goals,
        tailored to different target groups and strategically chosen objectives.
        Of course, I also fall back on well-known and proven methods and do not
        reinvent the wheel every time. I feel particularly comfortable in an
        agile context. Since sustainability is important to me, I pay particular
        attention to the communication and involvement of all stakeholders in
        change management, for individual milestones and features as well as for
        projects as a whole.
      </p>
      <h3>Reach out</h3>
      <a href="mailto:astrid@maigrueen.de">write me</a> or
      <a href="https://www.linkedin.com/in/deichmann">find me on LinkedIn</a> or
      <a href="https://github.com/maigrueen">find me on GitHub</a>

      <h3>My core values</h3>
      <p>Autonomy, transparency, learning new stuff - those are my big three. 
        <br>

        If you don't mind German check out this link for a fast method to find you core values: <a href="https://einguterplan.de/werte/">Werte-Onlinetest from einguterplan.de</a></p>

      <h3>Tools I love to work with</h3>
      <p>
        Atlassian Jira, Atlassian Confluence, Atlassian Service
        Management, Trello, Notion, Microsoft Office Excel
      </p>

      <h3>Languages</h3>
      <p>German (native), English (B2)</p>
      <p>Basics in HTML, CSS, JavaScript (Vanilla, vue.js), proficient in BPMN 2.0</p>

      <h3>Experience</h3>
      <Timeline />
    </main>
    <main v-else>
      <h1>Impressum und Datenschutz</h1>

      <h2>Impressum</h2>
      <h3>Angaben gemäß § 5 DDG</h3>
      <p>
        {{ kontakt.name }}<br />
        <template v-for="zeile in kontakt.anschrift" :key="zeile">{{ zeile }}<br /></template>
      </p>
      <h3>Kontakt</h3>
      <p>E-Mail: <a :href="'mailto:' + kontakt.email">{{ kontakt.email }}</a></p>
      <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
      <p>{{ kontakt.name }}, Anschrift wie oben</p>

      <h2>Datenschutz</h2>
      <h3>Wer ist verantwortlich?</h3>
      <p>
        {{ kontakt.name }}, Anschrift und Kontakt siehe oben.<br />
        E-Mail: <a :href="'mailto:' + kontakt.email">{{ kontakt.email }}</a>
      </p>

      <h3>Was passiert, wenn du die Seite besuchst?</h3>
      <p>
        Die Seite wird auf einem eigenen Server betrieben. Beim Aufruf speichert der Webserver in Protokolldateien
        (Logs) automatisch die IP-Adresse, Datum und Uhrzeit, die aufgerufene Adresse, den Antwortcode und die
        Browser-Kennung. Das ist technisch nötig, um die Seite auszuliefern und Missbrauch abzuwehren (Art. 6 Abs. 1
        lit. f DSGVO). Die Logs werden {{ kontakt.logDauer }} gespeichert und dann gelöscht. Eine Auswertung zu
        Werbe- oder Statistikzwecken findet nicht statt.
      </p>
      <p>
        Es gibt keine Cookies, keine Analyse- oder Werbedienste und keine eingebundenen Inhalte von Dritten. Schriften
        und Symbole werden von meinem eigenen Server geladen.
      </p>

      <h3>Einstellung für Hell oder Dunkel</h3>
      <p>
        Wenn du zwischen hellem und dunklem Erscheinungsbild wechselst, merkt sich dein Browser die Auswahl lokal
        (Local Storage). Diese Information bleibt auf deinem Gerät und wird nicht an mich übertragen.
      </p>

      <h3>Kontakt per E-Mail</h3>
      <p>
        Wenn du mir schreibst, verarbeite ich deine Nachricht und deine E-Mail-Adresse, um zu antworten
        (Art. 6 Abs. 1 lit. b oder f DSGVO). Ich lösche sie, sobald die Anfrage erledigt ist und keine gesetzlichen
        Aufbewahrungspflichten entgegenstehen.
      </p>

      <h3>Links zu anderen Seiten</h3>
      <p>
        Die Seite verlinkt auf LinkedIn, GitHub und weitere Seiten. Diese Angebote sind nicht eingebunden. Erst wenn du
        einen Link anklickst, verlässt du meine Seite, und es gelten die Datenschutzbestimmungen des jeweiligen
        Anbieters.
      </p>

      <h3>Deine Rechte</h3>
      <p>
        Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Widerspruch
        (Art. 15 bis 21 DSGVO). Du kannst dich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren, zum
        Beispiel beim Unabhängigen Landeszentrum für Datenschutz Schleswig-Holstein.
      </p>
    </main>
    <footer>
      <a v-if="!recht" href="#impressum">Impressum und Datenschutz</a>
      <a v-else href="#start">Zurück zur Startseite</a>
    </footer>
  </div>
</template>

<style>
@import "./assets/base.css";
@import "./assets/fontawesome-pro-5.15.4-web/css/fontawesome.css";
@import "./assets/fontawesome-pro-5.15.4-web/css/light.css";

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 5%;
  margin-bottom: 5%;
}

footer {
  margin: 4rem 0 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--btn-color-border);
  font-size: 1.3rem;
}
</style>
