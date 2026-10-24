<script setup>
import { briefe, bildUrl, datumDe } from "../briefe";

const anzahlFritz = briefe.filter((b) => b.datum >= "1937" && b.datum < "1944-07").length;

// "Wo anfangen?" – eine kleine Auswahl als Einstieg
const einstieg = [
  { id: "1937-10-09-2", text: "Ein Gedicht für die Braut: Ein Männlein aus dem Tintenfass prüft das „gelehrte Dorfschulmeisterlein“." },
  { id: "1942-01-25", text: "Schneetag in der Pilsener Schreibstube, dazwischen Englisch, Italienisch und ein selbstgeschriebenes Wiegenlied." },
  { id: "1944-01-25-2", text: "Halt in Minsk, kurz vor der Front: Fritz schreibt, dass er vielleicht nicht wiederkommt, und was Erna dann tun soll." },
  { id: "1944-02-07", text: "Nächtlicher Rückzug über die Düna, nass bis auf die Haut: „So sieht ein siegreicher Rückzug ungefähr aus.“" },
  { id: "1944-05-01", text: "Der „Bandeneinsatz“ im Partisanengebiet: brennende Dörfer, Schlamm und ein Satz über erbeutete Hühner." },
  { id: "1944-06-20-1", text: "Der letzte erhaltene Brief, nachts als Wachhabender geschrieben, zwei Tage vor der sowjetischen Offensive." },
  { id: "1945", text: "Ein Kamerad schreibt Erna aus Tirol, was er über den 26. Juni 1944 weiß." },
  { id: "1972-01-31", text: "28 Jahre später: das Gutachten des DRK-Suchdienstes." },
];
const briefNachId = Object.fromEntries(briefe.map((b) => [b.id, b]));

// "Zwischen den Zeilen" – Zitate, an denen man das Beschönigen und Verschweigen sieht
const zitate = [
  { id: "1944-02-08-2", text: "Das Ganze ist kein Grund zu ernster Beunruhigung.", kontext: "nachdem ein sowjetisches Flugzeug knapp vor seinem Auto in die Straße geschossen hat" },
  { id: "1944-03-08", text: "Wie und wodurch wir dazu gekommen sind, kann ich nicht so ausführlich erzählen.", kontext: "über Rindfleisch, Hühner und Kaninchen, die die Schreibstube plötzlich hat" },
  { id: "1944-03-31", text: "Aber es sind keine Bauern mehr hier", kontext: "als Erna vorschlägt, er solle sich bei den russischen Bauern Essen besorgen" },
  { id: "1944-05-21", text: "Ich habe es ausdrücklich vermieden, Dir von der schmutzigen Handlungsweise eines jungen Vorgesetzten zu erzählen", kontext: "erst als er dafür schon zu Arrest verurteilt ist" },
  { id: "1944-06-17", text: "Ich ließ Dich in dem Glauben an eine spätere Zeit (August – Oktober), um Dich nicht zu enttäuschen.", kontext: "über seinen Urlaub" },
  { id: "1944-06-20-1", text: "Was den Krieg angeht, so sind wir hier zuversichtlicher denn je", kontext: "zwei Tage bevor die Front in Weißrussland zusammenbricht" },
];

const zeitleiste = [
  ["1937", "Fritz, Lehrer in Riede, schreibt Erna die ersten erhaltenen Briefe"],
  ["29. September 1938", "Hochzeit in Lohne bei Fritzlar"],
  ["1. September 1939", "Deutschland überfällt Polen, der Zweite Weltkrieg beginnt"],
  ["3. März 1941", "Fritz wird eingezogen, später Schreiber in Pilsen"],
  ["22. Juni 1941", "Deutschland überfällt die Sowjetunion"],
  ["Januar 1944", "Verlegung an die Front bei Witebsk (Weißrussland)"],
  ["20. Juni 1944", "Fritz’ letzter erhaltener Brief"],
  ["22. Juni 1944", "Sowjetische Großoffensive; seine Division wird bei Witebsk eingeschlossen"],
  ["8. Mai 1945", "Kriegsende in Europa"],
  ["1948 – 1972", "Erna hofft und sucht; 1972 hält der DRK-Suchdienst seinen Tod für sehr wahrscheinlich"],
  ["1990", "Erna stirbt in Riedstadt, 46 Jahre nach Fritz’ letztem Brief"],
];
</script>

<template>
  <article class="start">
    <section class="kopf">
      <div class="bilder">
        <figure>
          <img :src="bildUrl('Fritz-Pilsen.jpg')" alt="Fritz Böttcher in Uniform, Pilsen" />
          <figcaption class="meta">Fritz in Pilsen</figcaption>
        </figure>
        <figure>
          <img :src="bildUrl('19410000-Erna.jpg')" alt="Erna Böttcher, Porträt 1941" />
          <figcaption class="meta">Erna, 1941</figcaption>
        </figure>
      </div>
      <div>
        <h1>Fritz und Erna</h1>
        <p class="lead">
          Briefe eines Lehrers aus Nordhessen an seine Frau, 1937 bis 1944. Ein digitales Denkmal für zwei Menschen,
          deren gemeinsames Leben der Krieg beendet hat.
        </p>
        <p class="knoepfe">
          <router-link to="/briefe" class="button button-primary">Zu den Briefen</router-link>
          <a href="#einstieg" class="button" @click.prevent="$router.push({ hash: '#einstieg' })">Wo anfangen?</a>
        </p>
      </div>
    </section>

    <section>
      <h2>Worum es geht</h2>
      <p>
        <router-link to="/mann">Fritz Böttcher</router-link> ist Volksschullehrer in Riede bei Wolfhagen, als er 1937
        <router-link to="/frau">Erna Steinmetz</router-link> kennenlernt. Er schreibt ihr Gedichte, 1938 heiraten die
        beiden. Im März 1941 wird Fritz eingezogen. Lange Zeit ist er Schreiber in Pilsen in Böhmen,
        im Januar 1944 kommt er an die Front bei Witebsk in Weißrussland. Von dort schreibt er Erna oft mehrmals in der Woche.
      </p>
      <p>
        Sein letzter erhaltener Brief ist vom 20. Juni 1944. Zwei Tage später beginnt die sowjetische Sommeroffensive,
        und die deutsche Front in Weißrussland bricht zusammen. Fritz gilt seitdem als vermisst. Erna sucht jahrzehntelang
        nach ihm, beim Heer und beim Roten Kreuz; ein Kamerad schreibt ihr, Fritz sei in Gefangenschaft geraten. 1972 schreibt ihr der Suchdienst, dass Fritz mit hoher
        Wahrscheinlichkeit kurz nach seiner Gefangennahme gestorben ist. Wo und wann, weiß bis heute niemand. Erna lebt
        noch 46 Jahre ohne ihn.
      </p>
      <p>
        Auf dieser Seite sind {{ anzahlFritz }} Briefe und Karten von Fritz zu lesen, jeweils mit Scan und Abschrift,
        dazu die Dokumente der Suche nach ihm und die Lebensläufe der beiden.
      </p>
    </section>

    <section>
      <h2>Zwei Welten</h2>
      <p>
        Fritz misst Russland mit den Maßstäben von daheim. Die Front ist „etwa von Riede bis Fritzlar entfernt“, die
        Rollbahn nur wenig breiter als die Straße nach Merxhausen, und ein brennendes Dorf sieht aus, „als ob Lohne brenne“.
        Er schreibt von Möhrensuppe, Läusen und Schlamm bis an die Waden, von 20 Mann auf Stroh in einer halben Bauernhütte.
        Erna schreibt ihm von Kirschblüten, Hausputz und Maiglöckchen. Im letzten Brief stellt er seinen wackeligen
        Tisch mit Stahlhelm und Pistole neben ihren Schreibtisch daheim. Darin sehe er „genau den Unterschied Russland – Daheim bei Dir“.
      </p>
      <p>
        Aber auch Nordhessen ist 1944 kein Idyll mehr. Ernas Schwester Agnes flüchtet mit ihrem Baby vor den Luftangriffen
        aus Fritzlar nach Riede, Tiefflieger schießen auf Menschen bei der Feldarbeit, Ernas Brüder und Schwäger sind
        Soldaten. Und das Land, in dem Fritz liegt, ist besetzt: Die jüdische Bevölkerung von Witebsk war schon 1941
        ermordet worden, und die Menschen, die in den Briefen nur am Rand vorkommen, „Russenmädchen“, die für die Soldaten
        heizen und waschen, und Russen, die Knüppeldämme bauen, haben sich das nicht ausgesucht.
      </p>
    </section>

    <section>
      <h2>Zwischen den Zeilen</h2>
      <p>
        Feldpost wurde zensiert, und Fritz wollte seine Frau nicht ängstigen. Deshalb sind seine Briefe kein neutraler
        Bericht. Er beruhigt, er lässt weg, er schreibt „W.“ statt Witebsk, und Ernas Briefe verbrennt er meist, nachdem
        er sie beantwortet hat. Manchmal verrät er selbst, dass er etwas zurückhält:
      </p>
      <ul class="zitate">
        <li v-for="z in zitate" :key="z.id + z.text">
          <blockquote>„{{ z.text }}“</blockquote>
          <p class="meta">
            {{ z.kontext }} ·
            <router-link :to="'/brief/' + z.id">{{ datumDe(briefNachId[z.id].datum) }}</router-link>
          </p>
        </li>
      </ul>
      <p>
        Was er gar nicht schreibt, muss man dazudenken. Im April und Mai 1944 ist er wochenlang im „Bandeneinsatz“
        gegen Partisanen, rund 100 km westlich von Witebsk. Er schildert Märsche durch den Morast, halb abgebrannte
        Dörfer und wie die Soldaten Hühner, Kälber und Ferkel „organisieren“. Zur selben Zeit und in derselben Gegend
        lief das Unternehmen „Frühlingsfest“ gegen das Partisanengebiet um Uschatschi. Bei diesem und einem weiteren
        Einsatz wurden
        <a href="https://de.wikipedia.org/wiki/Panzergruppe_3" target="_blank" rel="noopener">nach heutigem Wissen</a>
        über 7.000 Menschen getötet und mehr als 11.000 als Zwangsarbeiter verschleppt, die meisten von ihnen Zivilisten.
        Ob Fritz’ Einheit daran beteiligt war, ist nicht belegt. In seinen Briefen steht davon nichts.
      </p>
    </section>

    <section id="einstieg">
      <h2>Wo anfangen?</h2>
      <p>Wer nicht alle Briefe lesen möchte, findet hier eine Auswahl:</p>
      <ul class="einstieg">
        <li v-for="e in einstieg" :key="e.id">
          <router-link :to="'/brief/' + e.id">{{ datumDe(briefNachId[e.id].datum) }}</router-link>
          <span>{{ e.text }}</span>
        </li>
      </ul>
      <p>
        Unbekannte Wörter und Namen erklärt das <router-link to="/glossar">Glossar</router-link>; die Orte zeigt die
        <router-link to="/karte">Karte</router-link>.
      </p>
    </section>

    <section>
      <h2>Zeitleiste</h2>
      <ul class="zeitleiste">
        <li v-for="[zeit, text] in zeitleiste" :key="zeit">
          <time>{{ zeit }}</time>
          <span>{{ text }}</span>
        </li>
      </ul>
    </section>

    <section class="ueber">
      <h2>Über diese Seite</h2>
      <p>
        Erna war die Schwester meiner Urgroßmutter Edith. Ich bin 1987 geboren und habe keine Erinnerungen an sie.
        Kennengelernt habe ich sie und Fritz erst durch diese Briefe.
      </p>
      <p>
        Mit dieser Seite möchte ich zeigen, wie schlimm Krieg ist, auch für die, die ihn überleben. Ich möchte einen
        möglichst nüchternen Einblick in diese Zeit geben: wie verschieden das Leben in Nordhessen und in Russland war,
        und wie viel ein Soldat in seinen Briefen beschönigt oder weglässt. Fritz war kein Held und kein Täter, über den
        diese Seite urteilen will. Er war Soldat in einem verbrecherischen Angriffskrieg, und seine Briefe sind Zeugnisse
        dieser Zeit, keine Rechtfertigung.
      </p>
      <p>
        Die originalen Feldpostbriefe liegen im
        <a href="https://www.mfk-berlin.de/" target="_blank" rel="noopener">Museum für Kommunikation Berlin</a>.
        Die Seite und die Abschriften habe ich selbst erstellt, nach bestem Wissen und Gewissen. Fritz schrieb in
        deutscher Schreibschrift, nicht alles ist sicher zu lesen: Unsichere Stellen sind mit [?] markiert, unleserliche
        mit …. Zu jedem Brief gibt es den Scan des Originals zum Vergleich.
      </p>
    </section>
  </article>
</template>

<style scoped>
.start section { margin-bottom: 4rem; }
.kopf { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr); gap: 3rem; align-items: center; }
.bilder { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.bilder figure { margin: 0; }
.bilder img { display: block; width: 100%; aspect-ratio: 3 / 4; object-fit: cover; border: 1px solid var(--btn-color-border); filter: grayscale(0.3); }
.bilder figcaption { margin-top: 0.5rem; }
.kopf h1 { margin-top: 0; }
.lead { font-size: 1.9rem; line-height: 1.5; }
.knoepfe { display: flex; flex-wrap: wrap; gap: 1rem; }

.zitate { list-style: none; padding: 0; margin: 2rem 0; }
.zitate li { border-left: 3px solid var(--timeline); padding: 0.2rem 0 0.2rem 1.5rem; margin-bottom: 1.8rem; }
.zitate blockquote { margin: 0; font-size: 1.7rem; font-style: italic; }
.zitate .meta { margin-top: 0.3rem; }

.einstieg { list-style: none; padding: 0; }
.einstieg li { display: grid; grid-template-columns: 17rem 1fr; gap: 1.5rem; padding: 1rem 0; border-bottom: 1px solid var(--btn-color-border); }

.zeitleiste { list-style: none; padding: 0; border-left: 2px solid var(--timeline); margin-left: 0.5rem; }
.zeitleiste li { position: relative; padding: 0 0 1.2rem 2rem; }
.zeitleiste li::before { content: ""; position: absolute; left: -7px; top: 0.7rem; width: 12px; height: 12px; border-radius: 50%; background: var(--timeline); }
.zeitleiste time { display: block; font-weight: 600; }

.ueber { border-top: 1px solid var(--btn-color-border); padding-top: 1rem; }

@media (max-width: 700px) {
  .kopf { grid-template-columns: 1fr; }
  .einstieg li { grid-template-columns: 1fr; gap: 0.3rem; }
}
</style>
