import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home"
import TopArtists from "@/components/TopArtists"
import TopTracks from "@/components/TopTracks"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
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
  ]
})
