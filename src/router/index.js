import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';
import Home from "@/components/Home";
import Profile from "@/components/Profile";
import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";
import TrackSearch from "@/components/TrackSearch";
import Login from "@/components/Login";

Vue.use(Router);
Vue.use(VueMeta, {
    keyName: 'metaInfo',
    attribute: 'data-vue-meta',
    ssrAttribute: 'data-vue-meta-server-rendered',
    tagIDKeyName: 'vmid',
    refreshOnceOnNavigation: true
});

const router = new Router({
    mode: 'history',
    routes: [
        /*{
            path: '/',
            name: 'Home',
            component: Home,
        },*/
        {
            path: '/profile/:sample?',
            name: 'Profile',
            component: Profile,
        },
        {
            path: '/topartists/:sample?',
            name: 'TopArtists',
            component: TopArtists,
            /* meta: {
                metaTags: [
                {
                    name: 'description',
                    content: 'your top artists on Spotify'
                },
                {
                    property: 'og:description',
                    content: 'your top artists on Spotify'
                }
                ]
            } */
        },
        {
            path: '/toptracks/:sample?',
            name: 'TopTracks',
            component: TopTracks,
            /* meta: {
                metaTags: [
                {
                    name: 'description',
                    content: 'your top tracks on Spotify'
                },
                {
                    property: 'og:description',
                    content: 'your top tracks on Spotify'
                }
                ]
            } */
        },
        {
            path: '/tracksearch',
            name: 'TrackSearch',
            component: TrackSearch,
        },
        /*{
            // home page route
            path: '/:tokens?',
            name: 'Home',
            component: Home,
        },*/
        {
            path: '/',
            name: 'Default',
            redirect: {
                name: 'Home'
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        }
    ]
});

// This callback runs before every route change, including on page load.
/* router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
}); */


export default router;
