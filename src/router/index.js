import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "@/components/Home"
// import HelloWorld from "@/components/HelloWorld";
// import SpotifyLogin from "@/components/SpotifyLogin";
// import Profile from "@/components/Profile";
// import { accessToken } from "@/services/spotifyApi";
import TopArtists from "@/components/TopArtists"
import TopTracks from "@/components/TopTracks"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
      // redirect: "/spotifylogin"
      // beforeEnter: checkAuth()
    },
    /* {
      path: "/:tokens",
      name: "Home",
      component: Home
    }, */
    {
      path: "/topartists",
      name: "TopArtists",
      component: TopArtists
    },
    {
      path: "/toptracks",
      name: "TopTracks",
      component: TopTracks
    },
    {
      path: "/:tokens",
      name: "Home",
      component: Home
    }
    /* {
      path: "/spotifylogin",
      name: "SpotifyLogin",
      component: SpotifyLogin
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile
    } */
  ]
})
