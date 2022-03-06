<script setup>
import ThemeToggle from "./components/ThemeToggle.vue";
import Timeline from "./components/Timeline.vue";
</script>

<template>
  <div>
    <header>
      <img src="./assets/logo.png" alt="Logo green leaf in a circle" />
      <ThemeToggle />
    </header>

    <main>
      <h1>Moin!</h1>
      <p>
        My name is Astrid, I'm living in Schleswig-Holstein and working as a
        Project, Process and Quality Manager. You can find out more about me
        below.
        <br />

        tl;dr: I make my environment a little bit better every day - and I want
        my colleagues to find it easy to make their own environment a little bit
        better every day.
        <br />
        <br />

        With my educational background - I studied natural sciences in the
        information society - I have laid a foundation as a communicator between
        different disciplines from the very beginning. Through my work
        experience, I was able to develop as an empathetic mediator between
        different stakeholders.
        <br />

        I have already been able to prove my proactive and structured way of
        working in several projects since 2009. My greatest strength is
        organisation: Getting a quick grip on what neets to be done, interfacing
        between different stakeholders to achieve an aligned outcome, and
        documentating and reporting results: be it within the team, with clients
        and service providers, or even across disciplines, from creation to
        controlling. Of course, I am also used to having several projects on the
        table at the same time.
        <br />

        Because I always have holistic improvement in mind, I have had the
        opportunity to prove myself in organisational development in recent
        years. At my current employer, I was able to initiate and accompany both
        recognised quick wins and larger process improvements that accompanied
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
        Notion, Atlassian Jira, Atlassian Confluence, Atlassian Service
        Management, Trello, Microsoft Office Excel
      </p>

      <h3>Languages</h3>
      <p>German (native), English (B2), Swedish (A1), Spanish (A1)</p>
      <p>Basics in HTML, CSS, JavaScript (Vanilla, vue.js), proficient in BPMN 2.0</p>

      <h3>Experience</h3>
      <Timeline />
    </main>
  </div>
</template>

<style>
@import "./assets/base.css";
@import "./assets/fontawesome-pro-5.15.4-web/css/all.css";

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
