<template>
  <div class="login"><h1>Test text</h1></div>
</template>

<script>
  import { mapActions } from "vuex";
  import router from "@/router";
  import { getHashParams } from '../utils';
  export default {
    name: "Login",
    methods: {
      /*...mapActions([
        "setAccessToken",
        "setRefreshToken",
        "setExpiryTime",
        "getAccessToken",
      ])*/
      setAccessToken(access_token){
          this.$store.commit('setAccessToken', access_token);
      },
        setRefreshToken(refresh_token){
          this.$store.commit('setRefreshToken', refresh_token);
      },
        setExpiryTime(time){
          this.$store.commit('setExpiryTime', time);
      },
      getAccessToken(){
          return this.$store.getters.getAccessToken;
      }
      
    },
    created() {
        
      /*const {
        access_token,
        refresh_token,
        expires_in,
        error
      } = this.$route.query;*/
      const hashParams = getHashParams();
      const access_token = hashParams.access_token;
      console.log(hashParams);
      if (hashParams.error) {
        console.error(hashParams.error);
      } else if (hashParams.access_token && hashParams.refresh_token) {
        this.setAccessToken(hashParams.access_token);
        this.setRefreshToken(hashParams.refresh_token);
        this.setExpiryTime(3600 * 1000);
      }
      console.log("successfully set token " + this.getAccessToken());
      router.push("/profile");
    }
  };
</script>