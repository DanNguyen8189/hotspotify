<template>
    <div class='toptracks'>
        <template v-if='this.userTracksShort'>
        <div class='header-wrapper'>
            <div class='header-inside'>
                <h1>Top Tracks</h1>
                <div class='timeperiod-button-container'>
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
        <div role='list'>
            <div v-for='n in getAmount()' :key='n' class='list-item'
            v-bind:class='{ activeTrack: activeTrackIndex === n-1 && activeTrackPage === $store.state.timePeriod }'>
            <!--v-bind:class='{ activeTrack: activeTrack === n-1 }'-->
                <span class='flex-container'>
                    <!--<p class='track-number'>{{n}}</p>-->
                    <div class='left-block'>
                        <!--<p class='track-info' @click="showModal(n-1)">&#x1F6C8;</p>-->
                        <!--<p class='track-info' @click="showModal(n-1)">&#8942;</p>-->
                        <img :src=getImage(n-1) class='track-image'>
                        <!--<img src="https://img.icons8.com/office/30/000000/info.png"
                        @click="showModal(n-1)" class='track-info'/>-->
                        <svg @click="showModal(n-1)" class='track-info' opacity='0.75' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="50" height="50"
            viewBox="0 0 226 226"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,226v-226h226v226z" fill="none"></path><g fill="#ffffff"><path d="M113,9.04c-57.41756,0 -103.96,46.54244 -103.96,103.96c0,57.41756 46.54244,103.96 103.96,103.96c57.41756,0 103.96,-46.54244 103.96,-103.96c0,-57.41756 -46.54244,-103.96 -103.96,-103.96zM113,49.72c7.48964,0 13.56,6.07036 13.56,13.56c0,7.48964 -6.07036,13.56 -13.56,13.56c-7.48964,0 -13.56,-6.07036 -13.56,-13.56c0,-7.48964 6.07036,-13.56 13.56,-13.56zM131.08,171.76h-9.04h-18.08h-9.04v-9.04h9.04v-58.76h-9.04v-9.04h9.04h18.08v9.04v58.76h9.04z"></path></g></g></svg>
                    </div>
                    <div class = 'track-artist-text item-block'>
                        <p class='track-name'>{{ getTrackName(n-1) }}</p>
                        <p class='artist-name'>{{ getArtistName(n-1) }}</p>
                    </div>
                    <button v-if='getTrackURL(n-1) !== null' class='play-button-area'
                            v-bind:class='{ play: !(activeTrackIndex === n-1 && activeTrackPage === $store.state.timePeriod),
                                            pause: activeTrackIndex === n-1 && activeTrackPage === $store.state.timePeriod }'
                            @click.prevent='playTrack(n-1)'
                            aria-label='Pause or play current track'>
                    </button>
                    <p v-else class='play-button-area preview-na'>Preview N/A</p>
                </span>

            </div>
        </div>
        <div class = 'modal-wrapper'>
            <track-info
                v-show='isModalVisible'
                @close="closeModal"
                :track-number='this.trackViewIndex'
            />
        </div>
        <p>Information icons from <a href='https://icons8.com/'>https://icons8.com</a></p>
        </template>
        <template v-else>
        <!--This is here because the data from spotify doesn't come fast enough
        for the above template to render right away-->
            <fire-animation></fire-animation>
        </template>
    </div>
</template>

<script>
import { getTopTracks } from '../services/spotifyApi';
import FireAnimation from './FireAnimation.vue';
import TrackInfo from './TrackInfo.vue';

export default {
    name: 'TopTracks',
    metaInfo: {
        title: 'Top tracks',
        meta: [
        { name: 'description', content: 'your top tracks on spotify' }
        ]
    },
    data () {
        return {
        msg: 'Top tracks page',
        audioElement: null,
        activeTrackIndex: -1,
        activeTrackPage: -1,
        trackViewIndex: -1,
        timOut: null,
        isModalVisible: false
        }
    },
    components :{
        'fire-animation': FireAnimation,
        'track-info': TrackInfo
    },
    // might not need this
    computed: {
        userTracksShort () {
        return this.$store.getters.getTopTracksShort
        },
        userTracksMedium () {
        return this.$store.getters.getTopTracksMedium
        },
        userTracksLong () {
        return this.$store.getters.topTracksLong
        }
    },
    methods: {
        /** function to get the top tracks and set them to the vuex store. Response from Spotify is in JSON format */
        getTopTracks2 () {
        getTopTracks().then((response) => {
            // this.$store.commit('setUser', response.user);
            /* console.log('Tracks response data:');
            console.log(response) */
            this.$store.commit('setTopTracks', response);
            // this.$store.commit('setTimePeriod', 'short');
        }).catch(err => console.log('user not logged in'));
        },
        /** function to change the time period to display */
        changeTimePeriod (state) {
            this.$store.commit('setTimePeriod', state);
        },
        /** function to get amount of tracks listed in this time period */
        getAmount () {
            return this.$store.getters.getTopTracks.total;
        },
        /** function to get album cover image based on the page state */
        getImage (index) {
            return this.$store.getters.getTopTracks.items[index].album.images[2].url;
        },
        /** function get track name */
        getTrackName (index) {
            return this.$store.getters.getTopTracks.items[index].name;
        },
        /** funciton to get artist name */
        getArtistName (index) {
            return this.$store.getters.getTopTracks.items[index].artists[0].name;
        },
        getTrackURL (index) {
            return this.$store.getters.getTopTracks.items[index].preview_url;
        },
        /** function to load currently selected track to play (and pause if it's the same as
         * the currently playing track) */
        playTrack (index) {
        // remove previous playing track's stuff if still playing
        if (this.audioElement) {
            this.audioElement.pause();

            // don't play the same track again, user wanted to pause
            if (this.activeTrackIndex === index && this.activeTrackPage === this.$store.state.timePeriod) {
            this.activeTrackIndex = -1;
            if (this.timeOut) clearTimeout(this.timeOut);
            return;        
            }
        }
        if (this.timeOut) clearTimeout(this.timeOut);

        const trackURL = this.getTrackURL(index);
        if (trackURL === null) {
            this.activeTrackIndex = -1; // needed if user clicks a track with no available preview
            return;
        }
        this.audioElement = new Audio(trackURL);
        // this.audioElement.addEventListener('ended', this.stop());
        this.audioElement.play();
        this.activeTrackIndex = index;
        this.activeTrackPage = this.$store.state.timePeriod;

        // set prop so that the activeTrack class is removed from the currently playing track after it ends 
        this.timeOut = setTimeout(function () {
            this.activeTrackIndex = -1;
        }.bind(this), 30000); //The value of this is different inside the setTimeout so bind(this) needed to be added
        },

        /** Functions for track information modals */
        showModal(index) {
            this.trackViewIndex = index;
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    },
    created () {
        this.getTopTracks2();
    }
}
</script>
<style scoped>
.toptracks {
    max-width: 65em;
    margin: auto;
}

.list-item {
    /*background-color: #154e6e;*/ /* 155479 */
    background-color: #113b59;
    margin: 0 5% .2em 5%;
    padding: 10px;
    border-radius: 5px;
    -webkit-transition: background-color 0.5s;
    -moz-transition:    background-color 0.5s;
    -ms-transition:     background-color 0.5s;
    -o-transition:      background-color 0.5s;
    transition:         background-color 0.5s;
}
.list-item .flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.list-item .left-block {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4em;
    height: 4em;
    padding: 0;
    position: relative;
}

.list-item .track-image{
    border-radius: 50%;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    position: relative;
    /*float: left;
    margin-left: 2%;
    margin-top: 0.5em;*/
    /*width: 4.01em;*/
}
.list-item .track-info {
    /*float: left;
    line-height: 10px;
    margin-left: 2%;*/
    color: #2f93c2;
    cursor: pointer;
    position: absolute;
    width: 40%;
    -webkit-transition: color 0.5s;
    -moz-transition:    color 0.5s;
    -ms-transition:     color 0.5s;
    -o-transition:      color 0.5s;
    transition:         color 0.5s;
}

.list-item .track-name, .list-item .artist-name {
    -webkit-transition: color 0.5s;
    -moz-transition:    color 0.5s;
    -ms-transition:     color 0.5s;
    -o-transition:      color 0.5s;
    transition:         color 0.5s;
}
.track-artist-text {
    display: inline-block;
    overflow: hidden;
    /*width: 40%;*/
    font-weight: 700;
}
.track-name {
    margin: 0;
    color: white;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; /* need this for text-overflow property to work */
    /* margin: 1.3em 0 0 0; */
}
.artist-name {
    color: rgba(255, 255, 255, 0.40);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 0 0 0 0;
}
.play-button-area {
    /*display: inline-block;*/
    transition: 100ms all ease;
    will-change: border-width;
    cursor: pointer; /* changes the cursor to the hand cursor on hover */
}
.play {
    /* width: 0;
    height: 0; */
    /* margin: 1.45em 1em 0 2em; */
    /*border-top: 20px solid transparent;
    border-left: 35px solid #0a2b5c;
    border-bottom: 20px solid transparent;
    border-right: 0px solid transparent;*/
    /*-webkit-transition: border-left 0.5s;
    -moz-transition:    border-left 0.5s;
    -ms-transition:     border-left 0.5s;
    -o-transition:      border-left 0.5s;
    transition:         border-left 0.5s;
    -webkit-transition: border-top 0.5s;
    -moz-transition:    border-top 0.5s;
    -ms-transition:     border-top 0.5s;
    -o-transition:      border-top 0.5s;
    transition:         border-top 0.5s;*/
    width: 35px;
    height: 35px;
    border-style: solid;
    border-width: 20px 0 20px 35px;
    /*border-color: transparent transparent transparent #0a2b5c;*/
    border-color: transparent transparent transparent #437ba3;
    background-color: transparent;
}
.pause {
    /*width: 24px;
    height: 37px;
    margin: 1.25em 1.7em 1.1em 2em;
    border-right: 8px solid #f5d76e;
    border-left: 8px solid #f5d76e;*/
    /*-webkit-transition: border-left 0.5s;
    -moz-transition:    border-left 0.5s;
    -ms-transition:     border-left 0.5s;
    -o-transition:      border-left 0.5s;
    transition:         border-left 0.5s;
    -webkit-transition: border-right 0.5s;
    -moz-transition:    border-right 0.5s;
    -ms-transition:     border-right 0.5s;
    -o-transition:      border-right 0.5s;
    transition:         border-right 0.5s;*/
    /* transition:         all 0.5s; */
    /* margin: 1.45em 1.8em 0 2em; */
    width: 35px;
    height: 40px;
    border-style: double;
    border-width: 0 0 0 24px;
    border-color: #f5d76e;
    background-color: transparent;
}

.preview-na {
    width: 4em;
    color: #2da9e2;
    font-weight: 500;
}

/*Active playing track styling*/
.activeTrack {
    background-color: #b92557;
}
.activeTrack .track-image, .activeTrack .track-info {
    animation: spin;
    animation-duration: 15s;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
}
.activeTrack .track-name {
    color: white;
}
.activeTrack .artist-name {
    color: #f5d76e;
}
.activeTrack .play {
    border-left: 35px solid #ff741e;
}
.activeTrack .track-info {
    color: #f5d76e;
}
@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}

.modal-wrapper {
    height: 100vh;
}
p a {
    color: white;
}
p a:visited {
    color: white;
}
@media screen and (max-width: 480px) {
    .list-item .track-info {
        float: left;
        margin-left: 2%;
        font-size: 2em;
    }
    .list-item img {
        width: 3.609em;
    }
    .track-artist-text {
        font-size: .9em;
        font-weight: 700;
    }
    .play {
        /*margin: 1.5em 0.5em 0 1.8em;*/
        /*border-top: 15px solid transparent;
        border-left: 26.25px solid #0a2b5c;
        border-bottom: 15px solid transparent;*/

        width: 26.25px;
        height: 26.25px;
        border-style: solid;
        border-width: 15px 0 15px 26.25px;
    }
    .activeTrack .play {
        border-color: transparent transparent transparent #f5d76e;
    }
    .activeTrack .pause {
        /*width: 18px;
        height: 26px;
        border-right: 6px solid #f5d76e;
        border-left: 6px solid #f5d76e;
        margin: 1.35em 1.4em 0 1.8em;*/
        /*margin: 1.5em 1em 0 1.8em;*/
        width: 18px;
        height: 30px;
        border-style: double;
        border-width: 0 0 0 20px;
        border-color: #f5d76e;
        background-color: transparent;
    }
    .preview-na {
        font-size: .7em;
        width: 3em;
        /*margin: 1.7em 1.5em 0 1.2em;*/
    }
}

@media (hover:hover) {
    /* Primary Input responds to hover fully, such as a mouse or a Nintendo Wii controller */
    .list-item:hover {
    background-color: #b92557;
    }
    .list-item:hover .play {
        border-left: 35px solid #f5d76e;
    }
    .list-item:hover .track-info {
        color: #f5d76e;
    }
    .list-item:hover .track-name {
        color: white;
    }
    .list-item:hover .artist-name {
        color: #f5d76e;
    }
    /*.list-item:hover .play {
        border-left: 26.25px solid #ff741e;
    }*/
}

/*Keyboard user accessability*/
.list-item:focus {
    background-color: #b92557;
    outline: none;
}
.list-item:focus .play {
    border-color: transparent transparent transparent #f5d76e;
}
.list-item:focus .track-info {
    color: #f5d76e;
}
.list-item:focus .track-name {
    color: white;
}
.list-item:focus .artist-name {
    color: #f5d76e;
} 
.play:focus {
    border-color: transparent transparent transparent #f5d76e;;
    outline: none;
}
.pause:focus {
    outline: none;
}
</style>
