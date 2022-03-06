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
        <br />
        <br />
      </p>
      <h1>Reach out</h1>
      <a href="mailto:astrid@maigrueen.de">write me</a>
      <br />

      <a href="https://www.linkedin.com/in/deichmann">LinkedIn</a>
      <br />

      <a href="https://github.com/maigrueen">GitHub</a>
      <br />
      <br />

      <h1>My core values</h1>
        <p>Autonomy, transparency, curiosity</p>

      <h1>Tools I love to work with</h1>
      <p>Notion, Atlassian Jira, Atlassian Confluence, Atlassian Service Management, Trello, Microsoft Office Excel</p>

      <h1>Languages</h1>
      <p>German (native), English (B2), Swedish (A1), Spanish (A1)</p>
      <p>Basics in HTML, CSS, JavaScript (Vanilla, vue.js)</p>

      <h1>Experience</h1>
      <Timeline />
    </main>
  </div>
</template>

<style>
@import "./assets/base.css";

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
