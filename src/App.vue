<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<SpotifyLogin v-if='accessToken'/>
    <HelloWorld/>-->
    <Menu v-if="this.loggedIn">
      <a v-on:click="goHome()">
        <i class="fa fa-fw fa-star-o"></i>
        <span>Home</span>
      </a>
      <a v-on:click="goTopArtists()">
        <i class="fa fa-fw fa-bell-o"></i>
        <span>Top Artists</span>
      </a>
      <a v-on:click="goTopTracks()">
        <i class="fa fa-fw fa-envelope-o"></i>
        <span>Top Tracks</span>
      </a>
      <a v-on:click="logOut()">
        <i class="fa fa-fw fa-envelope-o"></i>
        <span>Log Out</span>
      </a>
    </Menu>
    <transition name = 'fade' mode='out-in'>
      <router-view/>
    </transition>
  </div>
</template>

<script>
/* import HellowWorld from "@/components/HelloWorld";
import SpotifyLogin from "@/components/SpotifyLogin"; */
import Menu from "./components/Menu.vue";
import { logout as removeTokens } from "./services/spotifyApi";
export default {
  name: 'App',
  components: {
    Menu
  },
  computed: {
    loggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    goHome () {
      this.$router.push('/');
    },
    goTopArtists () {
      this.$router.push('/topartists');
    },
    goTopTracks () {
      this.$router.push('/toptracks');
    },
    /** logs user out by removing them from the store and removing the locally stored tokens */
    logOut () {
      this.$store.commit('clearAll');
      removeTokens();
      // console.log("removed tokens");
      // window.alert("logged out");
      // this.$router.push({name: 'Home'});
      // this.$router.go();
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap');
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
}

body {
  /* min-height: 100%; */
  height: 100vh;
  /* background-color: #0a2b5c; */
  background: linear-gradient(rgba(10, 43, 92, 0.60), rgba(10, 43, 92, 0.60)),
  url("./assets/background-sgabriel.jpg"); /*background image + tint*/
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
  width: 100%;
}
h1 {
  color: white;
  font-family: 'Nothing You Could Do', cursive;
  font-size: 4em;
}
.header-wrapper {
  margin: auto;
  padding: 2em 5%;
}
.header-inside {
  border: 2px solid white;
}
.header-inside h1 {
  margin: .7em 0 .3em 0;
}
.timeperiod-button-container {
  margin-bottom: 2.1em;
}
.timeperiod-button-container button {
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: none;
}
.timeperiod-button-container button span {
  padding: .3em;
  font-size: 1em;
  color: white;
  font-weight: 700;
}
.timeperiod-button-container button span:hover {
  text-decoration: underline;
  color: orange;
}

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
@media screen and (max-width: 480px) {
  body {
    /* background-attachment doesn't work on mobile devices */
    background-size: contain;
    background-position: left top;
    background-attachment: scroll;
  }
  h1 {
    font-size: 2.5em;
  }
  .fire {
     top: calc(50% - 50px);
  }
  .timeperiod-button-container button span {
  font-size: 1em;
}
}

/*Router animation properties*/
.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.5s;
    transition-property: opacity;
    transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
