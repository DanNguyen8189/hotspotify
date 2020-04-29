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
    <router-view/>
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
  min-height: 100%;
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
  color: #fcd02c;
  font-family: 'Nothing You Could Do', cursive;
  font-size: 4em;
}

.timeperiod-button-container {
  margin-bottom: 3em;
}
.timeperiod-button-container button {
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: none;
}
.timeperiod-button-container button span {
  line-height: .5em;
  padding:  0 0 .3em 0;
  border-bottom: 2px solid #ff741e;
  font-size: 1.2em;
  color: #ff741e
}

@keyframes scaleUpDown {
  0%,
  100% {
    transform: scaleY(1) scaleX(1);
  }
  50%,
  90% {
    transform: scaleY(1.1);
  }
  75% {
    transform: scaleY(0.95);
  }
  80% {
    transform: scaleX(0.95);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: skewX(0) scale(1);
  }
  50% {
    transform: skewX(5deg) scale(0.9);
  }
}

@keyframes particleUp {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: -100%;
    transform: scale(0.5);
  }
}

@keyframes glow {
  0%,
  100% {
    background-color: #ef5a00;
  }
  50% {
    background-color: #ff7800;
  }
}

.fire {
  position: absolute;
  top: calc(55% - 50px);
  left: calc(50% - 50px);
  width: 100px;
  height: 100px;
  background-color: transparent;
  margin-left: auto;
  margin-right: auto;
}

.fire-main {
  position: absolute;
  height: 100%;
  width: 100%;
  animation: scaleUpDown 3s ease-out;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.fire-main .main-fire {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(farthest-corner at 10px 0, #d43300 0%, #ef5a00 95%);
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 60% 40%;
  filter: drop-shadow(0 0 10px #d43322);
}

.fire-main .particle-fire {
  position: absolute;
  top: 60%;
  left: 45%;
  width: 10px;
  height: 10px;
  background-color: #ef5a00;
  border-radius: 50%;
  filter: drop-shadow(0 0 10px #d43322);
  animation: particleUp 2s ease-out 0;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.fire-right {
  height: 100%;
  width: 100%;
  position: absolute;
  animation: shake 2s ease-out 0;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.fire-right .main-fire {
  position: absolute;
  top: 15%;
  right: -25%;
  width: 80%;
  height: 80%;
  background-color: #ef5a00;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 60% 40%;
  filter: drop-shadow(0 0 10px #d43322);
}

.fire-right .particle-fire {
  position: absolute;
  top: 45%;
  left: 50%;
  width: 15px;
  height: 15px;
  background-color: #ef5a00;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 50%;
  filter: drop-shadow(0 0 10px #d43322);
  animation: particleUp 2s ease-out 0;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.fire-left {
  position: absolute;
  height: 100%;
  width: 100%;
  animation: shake 3s ease-out 0;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.fire-left .main-fire {
  position: absolute;
  top: 15%;
  left: -20%;
  width: 80%;
  height: 80%;
  background-color: #ef5a00;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 60% 40%;
  filter: drop-shadow(0 0 10px #d43322);
}

.fire-left .particle-fire {
  position: absolute;
  top: 10%;
  left: 20%;
  width: 10%;
  height: 10%;
  background-color: #ef5a00;
  border-radius: 50%;
  filter: drop-shadow(0 0 10px #d43322);
  animation: particleUp 3s infinite ease-out 0;
  animation-fill-mode: both;
}

.fire-bottom .main-fire {
  position: absolute;
  top: 30%;
  left: 20%;
  width: 75%;
  height: 75%;
  background-color: #ff7800;
  transform: scaleX(0.8) rotate(45deg);
  border-radius: 0 40% 100% 40%;
  filter: blur(10px);
  animation: glow 2s ease-out 0;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
@media screen and (max-width: 480px) {
  h1 {
    font-size: 2.5em;
  }
  .fire {
     top: calc(50% - 50px);
  }
}
</style>
