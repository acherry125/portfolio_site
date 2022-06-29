<template>
  <header class="panel-header">
    <router-link class="portfolio-links" to="/">Portfolio</router-link>
    <h2>Worship</h2>
  </header>
  <main class="main-content">
    <p>
      Worship is a top-down village simulator written in Java using the
      Processing animation library and about 50 classes worth of custom behavior
      trees and world generation functionality.
    </p>
    <p>
      At its core, Worship is a god-game. An initially small village will face
      resource scarcity, earthquakes, and plagues. As their deity, it is your
      job to provide for them through godly powers. Unfortunately, these powers
      are not infinite, but rather based on the belief of the village. If the
      people believe, they will do as you say, and you will be able to grant
      them miracles. If they lose faith, your powers will slowly wither and
      disappear.
    </p>
    <div class="gallery half">
      <img src="../worship/images/worship-demoA.png" />
      <img src="../worship/images/worship-demoB.png" />
    </div>
    <div>
      <img width="500px" src="../worship/images/worship-demo2.gif"  />
    </div>
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
