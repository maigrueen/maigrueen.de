<script>
export default {
  data() {
    return {
      job: true,
      project: true,
      cert: true,
    };
  },
};

// Timeline JS
/* (function () {
  "use strict";

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      console.log("we are here");
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})(); */
</script>

<template>
  <section class="timeline">
    <button
      v-on:click="this.job = !this.job"
      v-bind:class="{ active: this.job }"
    >
      <i class="fal fa-briefcase"></i> show jobs
    </button>
    <button
      v-on:click="this.project = !this.project"
      v-bind:class="{ active: this.project }"
    >
      <i class="fal fa-laptop-code"></i> show projects
    </button>
    <button
      v-on:click="this.cert = !this.cert"
      v-bind:class="{ active: this.cert }"
    >
      <i class="fal fa-file-certificate"> </i> show education
    </button>
    <p v-if="!this.job && !this.project && !this.cert">
      Please click on a button to show jobs, projects or education.
    </p>
    
    <ul>
    
      <li v-show="cert">
        <div>
          <time>2022</time><i class="fal fa-file-certificate"></i>
          <em> Change Management Specialist (CMS), Management and Strategy Institute (MSI): </em> Implementing Change in a corporate environment 
        </div>
      </li>
    
      <li v-show="project">
        <div>
          <time>2022</time><i class="fal fa-laptop-code"></i>
          <em>
            Web Project: Adaption of Period Tracker and Personal Dashboard,
            Google Sheets, Golang, HTML, CSS:
          </em>
          Adapting the
          <a
            href="http://www.alizaaufrichtig.com/period-tracker"
            target="_blank"
            >Period Tracker from Aliza Aufrichtig</a
          >
          and building a small Progressive Web App to make tracking daily as
          easy as possible. Creation of a Dashboard to show a data summary using
          the Google Sheets API in the Webbrowser of an ebook Reader.
          <a
            href="https://github.com/maigrueen/maigrueen.de/tree/main/PeriodTracker"
            target="_blank"
            >Repository PWA Tracker</a
          >,
          <a
            href="https://github.com/maigrueen/maigrueen.de/tree/main/Dashboard"
            target="_blank"
            >Repository Dashboard</a
          >
        </div>
      </li>

      <li v-show="job">
        <div>
          <time>2022 - now</time><i class="fal fa-briefcase"></i>
          <em> netzkontor nord gmbh, Process Manager: </em>
          Process management, Process optimization, Process automation,
          facilitation of workshops for stakeholders, requirements management,
          IT lifecycle management
        </div>
      </li>
      
      <li v-show="project">
        <div>
          <time>2022</time><i class="fal fa-laptop-code"></i>
          <em> Web Project: Affirmations App, JavaScript, HTML, CSS: </em>
          <a href="https://affirmations.maigrueen.de" target="_blank">
            Progressive Web App that shows randomized Affirmations for daily
            use</a
          >,
          <a
            href="https://github.com/maigrueen/maigrueen.de/tree/main/Affirmations"
            target="_blank"
            >Repository</a
          >
        </div>
      </li>
      
      <li v-show="job">
        <div>
          <time>2021 - 2022</time><i class="fal fa-briefcase"></i>
          <em>
            IBM iX Berlin GmbH (formerly Aperto GmbH), Process and Quality
            Manager:
          </em>
          Process management incl. optimization, facilitation of workshops for
          stakeholders, testing for compliance, requirements management,
          development of strategies for the introduction of new processes,
          stakeholder management, administration of Jira & Confluence
        </div>
      </li>
      
      <li v-show="cert">
        <div>
          <time>2021</time><i class="fal fa-file-certificate"></i>
          <em> The PowerMBA, Digital Business Programme: </em> Business
          Strategy, Entrepreneurship, Leadership, Scaling and Growth,
          Fundraising, Branding
        </div>
      </li>
      
      <li v-show="project">
        <div>
          <time>2021</time><i class="fal fa-laptop-code"></i>
          <em> Web Project: feelin', JavaScript, HTML, CSS: </em>
          <a href="https://feelin.team/" target="_blank"
            >feelin’ - anonymous mood app for workshops and team sessions</a
          >
        </div>
      </li>
      
      <li v-show="cert">
        <div>
          <time>2020</time><i class="fal fa-file-certificate"></i>
          <em>
            Next Generation Leadership Programme, IBM iX Berlin GmbH (formerly
            Aperto GmbH) / yuii:
          </em>
          Personal & People Leadership Skills, Coaching Mindset & Techniques,
          Business Storytelling
        </div>
      </li>
      
      <li v-show="cert">
        <div>
          <time>2018</time><i class="fal fa-file-certificate"></i>
          <em> ITIL v3 Foundation, AXELOS: </em> Key concepts of Service
          Management, 5 Phases of IT Service Management, Roles and
          Responsibilities, Process Model
        </div>
      </li>
      
      <li v-show="project">
        <div>
          <time>2018</time><i class="fal fa-laptop-code"></i>
          <em> Web Project: FTE Chart Planning App, JavaScript, HTML, CSS: </em>
          <a href="https://ftechart.maigrueen.de " target="_blank"
            >FTE Chart - visualizes the planning of full term equivalents</a
          >,
          <a href="https://github.com/maigrueen/FTEchart" target="_blank"
            >Repository</a
          >
        </div>
      </li>
      
      <li v-show="project">
        <div>
          <time>2018</time><i class="fal fa-laptop-code"></i>
          <em> Web Project: ToDo List App, JavaScript, HTML, CSS: </em>
          <a href="https://todo.maigrueen.de" target="_blank"
            >ToDo List - saves ToDos in the locale cache</a
          >,
          <a href="https://github.com/maigrueen/ToDoList" target="_blank"
            >Repository</a
          >
        </div>
      </li>
      
      <li v-show="cert">
        <div>
          <time>2017</time><i class="fal fa-file-certificate"></i>
          <em> Stakeholder Management, yuii: </em>
          Stakeholder Maps and canvases, Communiction with different
          stakeholders
        </div>
      </li>
      
      <li v-show="job">
        <div>
          <time>2017 - 2021</time><i class="fal fa-briefcase"></i>
          <em>
            IBM iX Berlin GmbH (formerly Aperto GmbH), Techical Project Manager
            / Service Manager:
          </em>
          Project management and technical consulting for website projects
          e.g.bmvg.de, baloise.ch, dihk.de, team development of software and
          infrastructure teams, service management, development of internal KPIs
          for serviceteams, administration of Jira & Confluence
          <br />
          Projects:
          <a href="https://www.bvg.de/" target="_blank">bvg.de</a>,
          <a href="https://www.idw.de/" target="_blank">idw.de</a>,
          <a href="https://www.dihk.de/" target="_blank">dihk.de</a>,
          <a href="https://www.baloise.ch/" target="_blank">baloise.ch</a>,
          <a href="https://www.bmvg.de/" target="_blank">bmvg.de</a>
        </div>
      </li>
      
      <li v-show="cert">
        <div>
          <time>2016</time><i class="fal fa-file-certificate"></i>
          <em> Lynda.com: </em> Agile Projectmanagement Foundations
        </div>
      </li>
      
      <li v-show="cert">
        <div>
          <time>2016</time><i class="fal fa-file-certificate"></i>
          <em> Code School: </em> Web Development Foundations: PHP, SQL, HTML,
          CSS, JavaScript
        </div>
      </li>
      
      <li v-show="cert">
        <div>
          <time>2016</time><i class="fal fa-file-certificate"></i>
          <em> Dierk Söllner Beratung: </em> Scrum Foundation
        </div>
      </li>
      
      <li v-show="job">
        <div>
          <time>2015 - 2017</time><i class="fal fa-briefcase"></i>
          <em> event it AG, Project Manager IT: </em>
          Development & support of participant management software, interface
          between clients & developers, first level support, on-site support of
          client events (technology & organisation of participant management)
        </div>
      </li>
      
      <li v-show="job">
        <div>
          <time>2014 - 2015</time><i class="fal fa-briefcase"></i>
          <em> VDVO e.V., Office staff: </em> Conception, implementation &
          moderation of board meetings, meetings, roadshows, conferences & trade
          fair appearances, sponsor & participant acquisition, partner & speaker
          management, member support & administration, project management &
          marketing, strategy development & market observation
        </div>
      </li>
      
      <li v-show="job">
        <div>
          <time>2013 - 2014</time><i class="fal fa-briefcase"></i>
          <em> SWOP GmbH, Project Manager Meetings / Conferences: </em>
          Conception and implementation of meetings, roadshows, conventions and
          conferences, project controlling, acquisition of sponsors and
          participants, partner and speaker management, content management of
          events in the higher education sector, design & layout of meeting &
          promotional materials
        </div>
      </li>
      
      <li v-show="job">
        <div>
          <time>2011 - 2012</time><i class="fal fa-briefcase"></i>
          <em>
            Universität Potsdam, Support of the pearls • Potsdam Research
            Network office: </em
          >Support with all work processes in the office, support with
          applications to BMBF, DFG, etc., independent organisation of
          high-profile events, maintenance of the homepage & social media
        </div>
      </li>
      
      <li v-show="job">
        <div>
          <time>2010 - 2012</time><i class="fal fa-briefcase"></i>
          <em>
            Technische Universität Berlin, Coordination of the development of
            the engineering faculty for the Turkish-German University Istanbul:
          </em>
          Coordination & administration of the DAAD-funded project, conception &
          coordination of engineering bachelor & master degree programmes,
          programme development, research, organisation of workshops &
          conferences in Germany & Turkey, presentation of the project at
          conferences, maintenance of the international professional network
        </div>
      </li>
      
      <li v-show="job">
        <div>
          <time>2009 - 2010</time><i class="fal fa-briefcase"></i>
          <em>
            Technische Universität Berlin, Support in the development of study
            programmes and accreditation of mathematics & science study
            programmes:
          </em>
          Development and adaptation of new teaching concepts for mathematics
          teaching, documentation of study programme schedules, creation of
          module catalogues, research, revision of study programme schedules
        </div>
      </li>
      
      <li v-show="cert">
        <div>
          <time>2008 - 2013</time><i class="fal fa-file-certificate"></i>
          <em> Technische Universität Berlin, Studies: </em> cand. Bachelor of
          Science Natural Sciences in the Information Society, major in
          Mathematics and Computer Science
        </div>
      </li>
      
      <li v-show="cert">
        <div>
          <time>2007 - 2008</time><i class="fal fa-file-certificate"></i>
          <em> Fachhochschule Lübeck, Studies: </em>
          cand. Diplom-Ingenieur Environmental Engineering
        </div>
      </li>
      
      <li v-show="cert">
        <div>
          <time>2004 - 2007</time><i class="fal fa-file-certificate"></i>
          <em> OSZIMT, A-levels: </em> focus on mathematics and computer
          engineering
        </div>
      </li>
      
    </ul>
  </section>
</template>

<style scoped>
.timeline ul {
  background: var(--background-color);
  padding: 50px 0;
}

.timeline ul li {
  list-style-type: none;
  position: relative;
  width: 6px;
  margin: 0 auto;
  padding-top: 50px;
  background: var(--timeline);
}

.timeline ul li::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: inherit;
  z-index: 1;
}

.timeline ul li div {
  box-sizing: border-box;
  position: relative;
  bottom: 0;
  width: 400px;
  padding: 15px;
  background: var(--background-timeline);
}

.timeline ul li div::before {
  content: "";
  position: absolute;
  bottom: 7px;
  width: 0;
  height: 0;
  border-style: solid;
}

.timeline ul li:nth-child(odd) div {
  left: 45px;
}

.timeline ul li:nth-child(odd) div::before {
  left: -15px;
  border-width: 8px 16px 8px 0;
  border-color: transparent var(--background-timeline) transparent transparent;
}

.timeline ul li:nth-child(even) div {
  left: -439px;
}

.timeline ul li:nth-child(even) div::before {
  right: -15px;
  border-width: 8px 0 8px 16px;
  border-color: transparent transparent transparent var(--background-timeline);
}

time {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

/* TIMELINE EFFECTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
/* 
.timeline ul li::after {
  transition: background 0.5s ease-in-out;
}

.timeline ul li.in-view::after {
  background: var(--background-timeline);
}

.timeline ul li div {
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

.timeline ul li:nth-child(odd) div {
  transform: translate3d(200px, 0, 0);
}

.timeline ul li:nth-child(even) div {
  transform: translate3d(-200px, 0, 0);
}

.timeline ul li.in-view div {
  transform: none;
  visibility: visible;
  opacity: 1;
} */

/* TIMELINE GENERAL MEDIA QUERIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */

@media screen and (max-width: 900px) {
  .timeline ul li div {
    width: 250px;
  }
  .timeline ul li:nth-child(even) div {
    left: -289px;
    /*250+45-6*/
  }
}

@media screen and (max-width: 600px) {
  .timeline ul li {
    margin-left: 20px;
  }
  .timeline ul li div {
    width: calc(100vw - 91px);
  }
  .timeline ul li:nth-child(even) div {
    left: 45px;
  }
  .timeline ul li:nth-child(even) div::before {
    left: -15px;
    border-width: 8px 16px 8px 0;
    border-color: transparent var(--background-timeline) transparent transparent;
  }
}

/* TIMELINE EXTRA/CLIP PATH STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.timeline-clippy ul li::after {
  width: 40px;
  height: 40px;
  border-radius: 0;
}

.timeline-rhombus ul li::after {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.timeline-rhombus ul li div::before {
  bottom: 12px;
}

.timeline-star ul li::after {
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
}

.timeline-heptagon ul li::after {
  clip-path: polygon(
    50% 0%,
    90% 20%,
    100% 60%,
    75% 100%,
    25% 100%,
    0% 60%,
    10% 20%
  );
}

.timeline-infinite ul li::after {
  animation: scaleAnimation 2s infinite;
}

@keyframes scaleAnimation {
  0% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.25);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}

/* TIMELINE FOOTER STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
/* .page-footer {
  position: fixed;
  right: 0;
  bottom: 20px;
  display: flex;
  align-items: center;
  padding: 5px;
  color: black;
  background: rgba(255, 255, 255, 0.65);
}

.page-footer a {
  display: flex;
  margin-left: 4px;
} */
</style>
