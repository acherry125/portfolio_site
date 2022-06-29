<template>
    <header>
        <nav class="nav">
            <router-link class="nav__logo" to="/"><img src="../event-horizon/images/eh.svg"></router-link>
            <div class="nav__links">
                <a class="nav__links__link">Create an Event</a>
                <a class="nav__links__link">Solution Center</a>
            </div>
        </nav>
    </header>
    <main class="main-area">
        <div class="anim revolving">
            <div class="anim__sky">
                <div class="anim__sky__sun"></div>
                <div class="anim__strip">
                    <div class="anim__strip__tent">
                        <div class="tri"></div>
                        <div class="rect"></div>
                        <div class="tri"></div>
                        <div class="pole"></div>
                        <div class="pole"></div>
                        <div class="pole"></div>
                        <div class="pole"></div>
                        <div class="building"></div>
                    </div>
                </div>
            </div>
            <div class="anim__ground">
                <div class="content-area">
                    <div class="search-wrapper">
                        <!-- Subtitle -->
                        <h2>Explore your area's most interesting events</h2>
                        <form class="search">
                            <div class="search__text">
                                <label for="event-search-name">Find Events</label>
                                <input type="text" class="search__text__in" id="event-search-name" placeholder="Event name">
                            </div>
                            <div class="search__text">
                                <label for="event-search-loc">Location</label>
                                <input type="text" class="search__text__in" id="event-search-loc" placeholder="Location to search">
                            </div>
                            <input class="search__text__submit" type="submit" value="Search">
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <section class="content-area main-content">
            <div>
                <!-- First Block -->
                <h1>Find Events!</h1>
            </div>
            <div>
                <p>
                    Event Horizon is a platform for finding events all around the world. Its database of events is open for anyone to browse,
                    and with just a username and password to pick, you can become a member and follow events, rate hosting organizations,
                    and direct message those same hosts with any questions.
                </p>
                <div class="cta-wrap">
                    <a href="#" class="cta">Sign up</a>
                </div>
            </div>
            <!-- Second block -->
            <div>
                <h1>Starting your own event</h1>
                <p>
                    Event planners can create organizations which they can post events from, then use real Google Maps data to show their users
                    exactly where in the world the event is. To become an event planner, just check the event planner box during
                    sign-up or if you forget, go to your account and check the box from there.
                </p>
                <div class="cta-wrap">
                    <a href="#" class="cta">Sign up</a>
                </div>
            </div>
            <!-- Third Block -->
            <div>
                <h1>And More...</h1>
            </div>
            <div>
                <ul>
                    <li>
                        <p>
                            Post Pictures! Once you have created your event, go to that event's edit page to add any pictures you think will showcase
                            why people should come!
                        </p>
                    </li>
                    <li>
                        <p>
                            Follow events to have them displayed on your profile page for easy finding later!
                        </p>
                    </li>
                    <li>
                        <p>
                            Is event planning your profession? Open up a different organization for each client, and when you recieve messages from potential
                            event goers, they will be labeled with the organization they are responding for!
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    </main>
    <footer>
		<div class="row"> 
			<h3><a href="mailto:acherry125@gmail.com" title="My email">acherry125@gmail.com</a></h3>
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

<style scoped>
html {
  font-size: 2rem;
}
main {
  padding: 0;
}
.search .search__text__submit, .cta {
  text-decoration: none;
  line-height: 1;
  height: 35px;
  background-color: #306A82;
  border: 0;
  color: #ffffff;
}

.nav .nav__logo, .nav .nav__links {
  text-decoration: none;
  cursor: pointer;
  color: inherit;
}

* {
  box-sizing: border-box;
}

html, body {
  font-size: 16px;
  font-family: Roboto;
}

h1, h2, h3, h4, h5, h6 {
  font-size: 1em;
}

.main-area {
  width: 100%;
  background-color: #EFEFEF;
  color: #676767;
  min-height: calc(100vh - 64px);
  display: flex;
  flex-flow: column nowrap;
}

.main-content h1, .main-content h2, .main-content h3, .main-content h4, .main-content h5 {
  color: #333;
}

.content-area {
  max-width: 1120px;
  padding: 0 16px;
  margin: 0 auto;
}

.nav {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  width: 100%;
  max-width: 2240px;
  margin: 0 auto;
  padding: 0 4px;
}

.nav .nav__logo {
  font-size: 1.5rem;
  font-family: Lato;
}

.nav .nav__logo img {
  display: block;
  width: 30rem;
}

.nav .nav__links {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  margin: 10px 0;
}

.nav .nav__links .nav__links__link {
  margin: 0 3rem;
  border-bottom: 1px solid #71D3D3;
}

.search-wrapper {
  color: #EFEFEF;
  padding: 10px;
  background: rgba(255, 255, 255, 0.3);
  width: 60%;
  font-size: 16px;
}

.search-wrapper h1, .search-wrapper h2, .search-wrapper h3 {
  margin-top: 0;
  font-size: 1.5em;
}

.search {
  display: flex;
  flex-flow: column nowrap;
}

.search .search__text {
  display: flex;
  flex-flow: column nowrap;
  margin: 12px 0;
}

.search .search__text .search__text__in {
  max-width: 560px;
  padding: 0 16px;
  height: 35px;
  border: 1px solid #AACECA;
}

.search .search__text__submit {
  margin-bottom: 1rem;
}

.cta-wrap {
  text-align: center;
  margin: 3rem;
}

.cta {
  padding: 8px 20px;
  border-radius: 15px;
}

.revolving {
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  width: 100%;
  overflow: hidden;
}

.revolving .content-area {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.revolving .anim__sky {
  height: 50%;
  background: #71D3D3;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  animation: sky 4s infinite;
}

.revolving .anim__sky .anim__sky__sun {
  margin-left: 60px;
  width: 120px;
  height: 120px;
  background: #feff01;
  border-radius: 100%;
  animation: sun 4s infinite;
}

.revolving .anim__sky .anim__strip {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-end;
  align-self: flex-start;
  width: 100%;
  max-width: 600px;
  padding: 0 2rem;
  margin: 0 auto;
  transform: translateY(-5px);
  animation: rising-building 4s infinite;
}

.revolving .anim__sky .anim__strip .anim__strip__tent {
  width: 125px;
  height: 63px;
  margin-right: 10px;
  position: relative;
}

.revolving .anim__sky .anim__strip .anim__strip__tent .tri:first-child {
  width: 0;
  height: 0;
  position: absolute;
  border-top: 30px solid transparent;
  border-bottom: 19px solid transparent;
  border-right: 31px solid white;
  transform: rotateZ(-135deg);
  top: 4px;
  left: -9px;
}

.revolving .anim__sky .anim__strip .anim__strip__tent .rect {
  width: 80%;
  height: 35px;
  position: absolute;
  top: 0;
  left: 10%;
  background: white;
}

.revolving .anim__sky .anim__strip .anim__strip__tent .tri:nth-child(3) {
  width: 0;
  height: 0;
  position: absolute;
  border-top: 30px solid transparent;
  border-bottom: 19px solid transparent;
  border-right: 31px solid white;
  transform: rotateZ(-225deg) rotateY(180deg);
  top: 4px;
  right: -9px;
}

.revolving .anim__sky .anim__strip .anim__strip__tent .pole {
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 28px;
  background: #676767;
}

.revolving .anim__sky .anim__strip .anim__strip__tent .pole:nth-child(5) {
  left: 15px;
}

.revolving .anim__sky .anim__strip .anim__strip__tent .pole:nth-child(6) {
  right: 15px;
}

.revolving .anim__sky .anim__strip .anim__strip__tent .pole:nth-child(7) {
  right: 0px;
}

.revolving .anim__sky .anim__strip .anim__strip__tent .building {
  position: absolute;
  top: 64px;
  left: -30%;
  height: 120px;
  width: 160%;
  background: #949494;
}

.revolving .anim__ground {
  z-index: 2;
  height: 50%;
  background: #693B54;
  animation: ground 4s infinite;
}

@keyframes rising-building {
  0% {
    transform: translateY(-120px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(-120px);
  }
}

@keyframes sky {
  0% {
    background: black;
  }
  50% {
    background: #71D3D3;
  }
  100% {
    background: #306A82;
  }
}

@keyframes sun {
  0% {
    transform: translateX(-150px) translateY(250px);
  }
  50% {
    transform: translateX(0) translateY(10px);
  }
  100% {
    transform: translateX(150px) translateY(260px);
  }
}

@keyframes ground {
  0% {
    background: #693B54;
  }
  50% {
    background: #F14F62;
  }
  100% {
    background: #693B54;
  }
}

@media only screen and (min-width: 35em) {
  .content-area {
    padding: 0 64px;
  }
  .nav {
    flex-flow: row nowrap;
  }
  .nav .nav__logo {
    margin: 0 2rem;
  }
  .nav .nav__links {
    flex-flow: row nowrap;
  }
  .search {
    flex-flow: row nowrap;
    align-items: flex-end;
  }
  .search .search__text {
    margin: 0;
  }
  .search .search__text:nth-child(2) {
    margin-left: 1rem;
  }
  .search .search__text__submit {
    margin-bottom: 0;
  }
  .revolving {
    min-height: auto;
    height: 400px;
  }
}

header, footer {
  padding: 10px 10px;
  text-align: center;
}
</style>