<template>
    <div class='home'>
      <template v-if="this.user">
        <div id="profile-page">
          <h1>Hi,</h1>
          <h1>{{ this.user.display_name }}</h1>
          <a :href="this.user.external_urls.spotify">
            <img :src="this.user.images[0].url" alt="profile_picture" class="profile-pic">
          </a>
          <!--<p>Email address: {{ this.user.email }}</p>-->
          <!--<p>Following: {{ this.user.followers.total }}</p>-->
          <!--<p>Followers: {{ this.user.followers.total }}</p>-->
          <p>
            <a v-on:click="logOut()" class="btn btn-primary">Log Out</a>
          </p>
        </div>
      </template>
      <template v-else>
        <div id="login-page">
          <h1>Hotspotify</h1>
          <a href="#" v-on:click="getLoginURI()" class="btn btn-primary" id="login-button">Log In With Spotify</a><br>
          <!--<a href=# class="btn btn-primary">VIEW SAMPLE</a>-->
        </div>
      </template>
    </div>
</template>

<script>
// import axios from "axios";
// import { access_token } from "../services/spotifyApi";
import { logout as removeTokens, getUser } from "../services/spotifyApi";
// import { getTopArtistsShort, getTopeArtistsMedium, getTopArtistsLong } from "../services/spotifyApi";

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home page',
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    /** logs user out by removing them from the store and removing the locally stored tokens */
    logOut () {
      this.$store.commit('clearAll');
      removeTokens();
      // console.log("removed tokens");
      // window.alert("logged out");
      this.$router.push({name: 'Home'});
      // this.$router.go();
    },
    /** Calls the getUser method from spotifyApi.js */
    getUserInfo () {
      getUser().then((response) => {
        // this.$store.commit('setUser', response.user);
        this.$store.commit('setUser', response.data);
        console.log(response.data);
      });
    },
    /** Sets the button target url based on whether the app is in production or not */
    getLoginURI (element) {
      if (process.env.NODE_ENV !== 'production') {
        document.getElementById("login-button").href = 'http://localhost:5000/login';
      } else {
        document.getElementById("login-button").href = 'https://hotspotify.herokuapp.com/login';
      }
    }
  },
  created () {
    this.getUserInfo();
  }
}
</script>

<style scoped>
.home {
  height: 100%;
}
#login-page {
  transform: translateY(50%); /*vertically center*/
}
#login-page h1 {
  margin: 0;
}
#profile-page {
  width: 100%;
  transform: translateY(5%); /*vertically center*/
}
#profile-page h1 {
  font-size: 2.5em;
}
#profile-page h1:nth-child(1) {
  margin-bottom: 0;
}
#profile-page h1:nth-child(2) {
  margin-top: 0;
}
img {
  border-radius: 50%;
  width: 14em;
  border: .4em solid #e42c6a;
  padding: .5em;
  display: block;
  margin: auto;
}

.btn-primary {
  cursor: pointer;
  border-radius: 2em;
  background-color: #e56b1f;
  display: inline-block;
  margin: auto;
  margin-top: 1em;
  padding: 0 2em;
  color: white;
  text-decoration: none;
  letter-spacing: 2px;
  font-weight: 700;
  line-height: 4em;
}
.btn-primary:focus, .btn-primary:hover {
  background-color: #ff741e;
}
@media screen and (min-width: 480px) {
  #profile-page {
    transform: translateY(0%); /*vertically center*/
  }
  #profile-page h1 {
    display: inline-block;
  }
  #profile-page h1:nth-child(2) {
    margin-left: .5em;
  }
}
</style>>
