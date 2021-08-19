import Vuex from 'vuex';
import Vue from 'vue';
import vuexPersistedstate from 'vuex-persistedstate';
Vue.use(Vuex);

import router from '../router/index.js'
const sampleUser = require( "../assets/sampleUser.json");
import { getUser, getTopArtists, getTopTracks } from '../services/spotifyApi';

const persistedState = vuexPersistedstate({
    // this is for persisting part of the state on page reloads
    key: 'spotify_app_state',
    reducer: state => ({
        accessToken: state.accesstoken,
        refreshToken: state.refreshToken,
        expiryTime: state.expiryTime
    }),
});

export default new Vuex.Store({
    state: {
        loggedIn: false,
        accessToken: "",
        refreshToken: "",
        expiryTime: "",
        user: null, // used by Home.vue to store basic user information
        timePeriod: null, // set by TopArtists.vue and TopTracks.vue to determine which set of artists to display
        // The getters use this to determine which set of artists and tracks to return
        // all of the below are in JSON format.
        topArtistsShort: null, // list of top artists from the past month
        topArtistsMedium: null, // list of top artists from the past 6 months
        topArtistsLong: null, // list of top artists all time
        topTracksShort: null, // list of top tracks from the past month
        topTracksMedium: null, // list of top tracks from the past 6 months
        topTracksLong: null // list of top tracks all time
    },
    mutations: {
        setUser (state, user) {
            state.loggedIn = true;
            state.user = user;
        },
        setAccessToken (state, token){
            state.accessToken = token;
        },
        setRefreshToken (state, token){
            state.refreshToken = token;
        },
        setExpiryTime(state, expiryTime){
            state.expiryTime = expiryTime;
        },
        setTopArtistsShort (state, artists) {
            state.topArtistsShort = artists;
        },
        setTopArtistsMedium (state, artists) {
            state.topArtistsMedium = artists;
        },
        setTopArtistsLong (state, artists) {
            state.topArtistsLong = artists;
        },
        setTopTracksShort (state, tracks) {
            state.topTracksShort = tracks;
        },
        setTopTracksMedium (state, tracks) {
            state.topTracksMedium = tracks;
        },
        setTopTracksLong (state, tracks) {
            state.topTracksLong = tracks;
        },
        setTopArtists (state, data) {
            state.topArtistsShort = data.topArtistsShort;
            state.topArtistsMedium = data.topArtistsMedium;
            state.topArtistsLong = data.topArtistsLong;
            state.timePeriod = 0;
            state.loggedIn = true;
        },
        setTopTracks (state, data) {
            state.topTracksShort = data.topTracksShort;
            state.topTracksMedium = data.topTracksMedium;
            state.topTracksLong = data.topTracksLong;
            state.timePeriod = 0;
            state.loggedIn = true;
        },
        // set the time period - the options for the data are 'short', 'medium', and 'long'
        setTimePeriod (state, data) {
            // console.log("time period setter:" + data);
            state.timePeriod = data;
        },
        clearAll (state) {
            state.loggedIn = false;
            state.user = null;
            state.timePeriod = null;
            state.topArtistsShort = null;
            state.topArtistsMedium = null;
            state.topArtistsLong = null;
            state.topTracksShort = null;
            state.topTracksMedium = null;
            state.topTracksLong = null;
        }
    },
    getters: {
        isLoggedIn (state) {
            return state.loggedIn;
        },
        getAccessToken(state){
            return state.accessToken;
        },
        getRefreshToken(state){
            return state.refreshToken;
        },
        getExpiryTime(state){
            return state.expiryTime;
        },
        getUser (state) {
            return state.user
        },
        getTopArtistsShort (state) {
            return state.topArtistsShort;
        },
        getTopArtistsMedium (state) {
            return state.topArtistsMedium;
        },
        getTopArtistsLong (state) {
            return state.topArtistsLong;
        },
        getTopTracksShort (state) {
            return state.topTracksShort;
        },
        getTopTracksMedium (state) {
            return state.topTracksMedium;
        },
        getTopTracksLong (state) {
            return state.topTracksLong;
        },
        // return the top artists list based in the timePeriod state
        getTopArtists (state) {
            switch (state.timePeriod) {
                case 0:
                // console.log("returning short artists");
                return state.topArtistsShort;
                case 1:
                return state.topArtistsMedium;
                case 2:
                return state.topArtistsLong;
                default:
                // console.log("defaulting");
                return state.topArtistsShort;
            }
        },
        // return the top tracks list based on the timePeriod state
        getTopTracks (state) {
            switch (state.timePeriod) {
                case 0:
                // console.log("returning short tracks");
                return state.topTracksShort;
                case 1:
                return state.topTracksMedium;
                case 2:
                return state.topTracksLong;
                default:
                // console.log("defaulting");
                return state.topTracksShort;
            }
        }
    },
    /** the components call these to access/populate the state */
    actions: {
        getUser (context) {
            if (context.getters.getUser) {
                return;
            } else if (router.currentRoute.params.sample){ 
                //console.log("viewing sample");
                //console.log(sampleUser);
                context.commit('setUser', sampleUser.user);
            } else {
                getUser().then((response) => {
                    // this.$store.commit('setUser', response.user);
                    // console.log("why the fuck is this executing");
                    context.commit('setUser', response.data);
                    // console.log(response.data);
                }).catch(err => console.log("user not logged in"));
            }
        },
        getTopArtists (context) {
            if (context.getters.getTopArtists) {
                return;
            }
            if (router.currentRoute.params.sample){ 
                console.log("viewing sample");
                var topArtistsData = {                 
                    topArtistsShort: sampleUser.topArtistsShort,
                    topArtistsMedium: sampleUser.topArtistsMedium,
                    topArtistsLong: sampleUser.topArtistsLong
                }
                context.commit('setTopArtists', topArtistsData);
            } else {
                getTopArtists().then((response) => {
                    context.commit('setTopArtists', response);
                    // this.$store.commit('setTimePeriod', 'short');
                }).catch(err => console.log("what?"),
                );
            }
        },
        getTopTracks (context) {
            if (context.getters.getTopTracks) {
                return;
            }
            if (router.currentRoute.params.sample){ 
                // console.log("viewing sample");
                var topTracksData = {                 
                    topTracksShort: sampleUser.topTracksShort,
                    topTracksMedium: sampleUser.topTracksMedium,
                    topTracksLong: sampleUser.topTracksLong
                }
                context.commit('setTopTracks', topTracksData);
            } else {
                getTopTracks().then((response) => {
                    // this.$store.commit('setUser', response.user);
                    /* console.log('Tracks response data:');
                    console.log(response) */
                    context.commit('setTopTracks', response);
                    // this.$store.commit('setTimePeriod', 'short');
                }).catch(err => console.log('user not logged in'));
            }
        },
    },
    plugins: [persistedState],
});
