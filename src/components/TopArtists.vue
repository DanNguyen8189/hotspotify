<template>
    <div class="topartists">
        <template v-if="this.$store.getters.getTopArtists.items[10].images[1].url">
            <div class='header-wrapper'>
                <div class='header-inside'>
                    <h1>Top Artists</h1>
                    <div class='timeperiod-button-container' role='navigation'>
                        <button v-on:click='changeTimePeriod(0)'>
                            <span v-bind:class='{ active: this.$store.state.timePeriod === 0 }'>Past Month</span>
                        </button>
                        <button v-on:click='changeTimePeriod(1)'>
                            <span v-bind:class='{ active: this.$store.state.timePeriod === 1 }'>Past 6 Months</span>
                        </button>
                        <button v-on:click='changeTimePeriod(2)'>
                            <span v-bind:class='{ active: this.$store.state.timePeriod === 2 }'>All Time</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class='artist-list-container' role='list'>
        <!--<img :src="this.user.images[0].url" alt="profile_picture" class="profile_pic">-->
            <!--<img :src="this.userArtistsShort.items[0].images[2].url" alt="artist_picture">-->
                <div v-for='n in getAmount()' :key='n' class='list-item'>
                    <!--<img v-bind:src="`this.userArtistsShort.items[0].images[2].url`">-->
                    <!--<img src="https://i.scdn.co/image/6c785e6be62ae82a5222578045439fc235086f64">-->
                    <!--<img :src="this.userArtistsShort.items[0].images[2].url" alt="artist_picture">-->
                    <!--<img :src="this.$store.state.topArtistsShort.items[0].images[2].url" alt="artist_picture">-->
                    <img :src=getImage(n-1) :alt=getName(n-1)>
                    <div class='artist-text'>{{ getName(n-1) }}</div>
                </div>
            </div>
        </template>
        <template v-else>
        <!--This is here because the data from spotify doesn't come fast enough
        for the above template to render right away-->
            <fire-animation></fire-animation>
        </template>
    </div>
</template>

<script>
import { getTopArtists } from '../services/spotifyApi';
import FireAnimation from './FireAnimation.vue';
const sampleUser = require( "../assets/sampleUser.json");

export default {
    name: 'TopArtists',
    metaInfo: {
        title: 'Top artists',
        meta: [
            { name: 'description', content: 'your top artists on spotify' }
        ]
    },
    data () {
        return {
            msg: 'Top artists page'
        }
    },
    components :{
        'fire-animation': FireAnimation
    },
    // might not need this
    computed: {
        userArtistsShort () {
            return this.$store.getters.getTopArtistsShort
        },
        userArtistsMedium () {
            return this.$store.getters.getTopArtistsMedium
        },
        userArtistsLong () {
            return this.$store.getters.topArtistsLong
        }
    },
    methods: {
        /** function to get the top artists and set them to the vuex store. Response from Spotify is in JSON format */
        getTopArtists () {
            /*if (this.$store.getters.getTopArtists) {
                return;
            }
            if (this.$route.params.sample){ 
                console.log("viewing sample");
                var topArtistsData = {                 
                    topArtistsShort: sampleUser.topArtistsShort,
                    topArtistsMedium: sampleUser.topArtistsMedium,
                    topArtistsLong: sampleUser.topArtistsLong
                }
                this.$store.commit('setTopArtists', topArtistsData);
            } else {
                getTopArtists().then((response) => {
                    this.$store.commit('setTopArtists', response);
                }).catch(err => console.log("what?"),
                );
            }*/
            this.$store.dispatch('getTopArtists').then(response =>{
                console.log("vuex action worked!")
            }, (err) =>{
                console.log("vuex action bombed")
            })
        },
        /** function to change the time period to display */
        changeTimePeriod (state) {
            this.$store.commit('setTimePeriod', state);
        },
        /** function to get amount of artists listed for this time period */
        getAmount () {
            return this.$store.getters.getTopArtists.items.length;
        },
        /** function to get artist image based on the page state */
        getImage (index) {
            return this.$store.getters.getTopArtists.items[index].images[1].url;
        },
        /** function to get artist name base on the page state */
        getName (index) {
            return this.$store.getters.getTopArtists.items[index].name;
        }
    },
    created () {
        this.getTopArtists();
    }
}
</script>

<style scoped>

.topartists {
    max-width: 65em; /* didn't want the top artists section to expand to full width */
    margin: auto; /* horizontally center the top artists component */
}

/* the list of top artists sitting under the heading */
.artist-list-container {
    display: flex;
    flex-wrap: wrap; /* lets each artist block wrap onto multiple lines */
    justify-content: center; /* for the top artists to line up one by one down the middle */
    max-width: 60em; /* didn't want the top artists to expand to full width */
    margin: auto; /* horizontally center the top artists beneath the heading area */
    background-color: rgba(22, 85, 121, .5);
    padding-top: 1.5em;
}
.list-item{
    display: inline-block; /* we want each artist block to be able to sit next to each other if possible */
    margin: 1.2em 3%;
    flex-basis: 10em; /* original size of each artist block before the screen size adjustments */
    flex-shrink: 4; /* shrink ratio for each artist block if the size of the container becomes too small*/
}
.list-item img {
    border-radius: 50%; /* make artist image circular */
    width: 100%;
    height: 10em;
    object-fit: cover; /* used to keep aspect ratio of the image */
    display: inline-block;
    border: .2em solid #e42c6a;
    padding: 3%;
}
.list-item .artist-text{
    color: white;
    margin-top: 1em;
    font-size: 1.1em;
    font-weight: 600;
}
</style>
