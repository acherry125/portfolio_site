<template>
  <header class="panel-header">
    <img class="logo" src="../images/glasses.svg" />
    <h2>Front End Web Developer</h2>
    <h3>Let's make good things.</h3>
  </header>
  <main>
    <section id="home" class="tiles-section">
      <a
        href="https://www.linkedin.com/in/alexander-cherry"
        class="showcase-tile linkedin-link"
        title="My LinkedIn"
      >
        <img class="icon" src="../images/linkedin-icon.png" />
        <img
          class="icon hover"
          src="../images/linkedin-icon-blue.png"
          aria-hide
        />
      </a>
      <a
        href="https://github.com/acherry125"
        class="github-link showcase-tile"
        title="My Github"
      >
        <img class="icon" src="../images/github-icon.svg" />
        <img
          class="icon hover"
          src="../images/github-icon-purple.svg"
          aria-hide
        />
      </a>
    </section>
    <section class="portfolio-links main-content">
      <h3>Past (and Present) Work</h3>
      <ul>
        <li>
          <router-link to="/salt">
            <h4>Salt - A product of American Student Assistance</h4>
          </router-link>
          <p>
            A student financial aid assistance website I developed as a member
            of the Salt application team at American Student Assistance from
            July 2016 - May 2018.
          </p>
        </li>
        <li>
          <router-link to="/event-horizon">
            <h4>Event Horizon</h4>
          </router-link>
          <p>A POC landing page for an event hosting website.</p>
        </li>
        <li>
          <router-link to="/the-city">
            <h4>The City</h4>
          </router-link>
          <p>
            A work-in-progress React.js text-adventure game exploring a war-torn
            Boston City Hall.
          </p>
        </li>
        <li>
          <router-link to="/worship">
            <h4>Worship - The Game</h4>
          </router-link>
          <p>A Java village-god simulator.</p>
        </li>
      </ul>
    </section>
  </main>
  <footer>
    <div class="row">
      <h3>
        <a href="mailto:acherry125@gmail.com" title="My email"
          >acherry125@gmail.com</a
        >
      </h3>
      <p><small>© 2022 Alexander Cherry</small></p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
