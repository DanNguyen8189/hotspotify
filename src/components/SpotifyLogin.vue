<template>
  <div class="login">
    <div class="container">
      <div id="login">
        <h1>This is an example of the Authorization Code flow</h1>
        <!--<a href="/login" class="btn btn-primary">Log in with Spotify</a>-->
        <!--won't work with button for a server redirect, just <a> tag-->
        <a href="http://localhost:8081/login">Login with Spotify</a>
      </div>
      <div id="loggedin">
        <div id="user-profile"></div>
        <div id="oauth"></div>
        <button
          class="btn btn-default"
          id="obtain-new-token"
        >Obtain new token using the refresh token</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { getHashParams } from '../utils';
// TODO CHANGE FOR PRODUCTION
const LOGIN_REDIRECT = "http://localhost:8081/login";

export default {
  name: 'SpotifyLogin',
  data () {
    return {
      msg: 'Login for spotify'
    }
  },
  methods: {
    loginRedirect () {
      this.$router.push(LOGIN_REDIRECT);
    }
  }
}
</script>

<style scoped>
/*#login,
#loggedin {
  display: none;
}*/
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 500px;
}
</style>
