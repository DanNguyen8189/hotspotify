<template>
  <div class='topartists'>
  <h1>Top Tracks</h1>
    <template v-if="this.userTracksShort">
      <div class= "timeperiod-button-container">
          <button v-on:click="changeTimePeriod('short')" class="button"><span>Past Month</span></button>
          <button v-on:click="changeTimePeriod('medium')" class="button"><span>Past 6 Months</span></button>
          <button v-on:click="changeTimePeriod('long')" class="button"><span>All Time</span></button>
      </div>      
      <div v-for="n in getAmount()" :key="n" @click.prevent="playTrack(n-1)" class="list-item">
        <span>
        <p class="track-number">{{n}}</p>
        <img :src=getImage(n-1)>
        <div class = "track-artist-text">
          <p class="track-name">{{ getTrackName(n-1) }}</p>
          <p class="artist-name">{{ getArtistName(n-1) }}</p>
        </div>
        <div v-if="getTrackURL(n-1) !== null" class="play-button-area triangle-right"
          @click.prevent="playTrack(n-1)">
        </div>
        <p v-else class="play-button-area preview-na">Preview N/A</p>
        </span>
      </div>
    </template>
    <template v-else>
    <!--This is here because the data from spotify doesn't come fast enough
    for the above template to render right away-->
        <div class="fire">
          <div class="fire-left">
            <div class="main-fire"></div>
            <div class="particle-fire"></div>
          </div>
          <div class="fire-main">
            <div class="main-fire"></div>
            <div class="particle-fire"></div>
          </div>
          <div class="fire-right">
            <div class="main-fire"></div>
            <div class="particle-fire"></div>
          </div>
          <div class="fire-bottom">
            <div class="main-fire"></div>
          </div>
        </div>
    </template>
  </div>
</template>

<script>
import { getTopTracks } from "../services/spotifyApi";

export default {
  name: 'TopTracks',
  data () {
    return {
      msg: 'Top tracks page',
      audioElement: null
    }
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
        console.log("Tracks response data:");
        console.log(response)
        this.$store.commit('setTopTracks', response);
        // this.$store.commit('setTimePeriod', 'short');
      });
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
      if (this.audioElement) this.audioElement.pause();
      this.audioElement = new Audio(this.getTrackURL(index));
      // this.audioElement.addEventListener('ended', this.stop());
      this.audioElement.play();
    }
  },
  created () {
    this.getTopTracks2();
  }
}
</script>
<style scoped>
.topartists {
  max-width: 70em;
  margin: auto;
}

.list-item {
  cursor: pointer; /* changes the cursor to the hand cursor on hover */
  background-color: #165479; /* 155479 */
  margin: 0.5em 5%;
  height: 5em;
  -webkit-transition: background-color 0.5s;
  -moz-transition:    background-color 0.5s;
  -ms-transition:     background-color 0.5s;
  -o-transition:      background-color 0.5s;
  transition:         background-color 0.5s;
}
.list-item:hover {
  background-color: #b92557;
}
.list-item:hover .triangle-right {
  border-left: 35px solid #ff741e;
}
.list-item:hover .track-number {
  color: orange;
}
.list-item .track-number {
  float: left;
  line-height: 3em;
  margin-left: 2%;
  color: #2f93c2;
  -webkit-transition: color 0.5s;
  -moz-transition:    color 0.5s;
  -ms-transition:     color 0.5s;
  -o-transition:      color 0.5s;
  transition:         color 0.5s;
}
.list-item img {
  border-radius: 50%;
  float: left;
  margin-left: 2%;
  margin-top: 0.5em;
  width: 4.01em;
}
.track-artist-text {
  display: inline-block;
  overflow: hidden;
  width: 40%;
}
.track-name {
  color: white;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; /* need this for text-overflow property to work */
  margin: 1.2em 0 0 0;
}
.artist-name {
  color: rgba(255, 255, 255, 0.40);
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 0 0 0;
}
.play-button-area {
  float: right;
}
.triangle-right {
  /* width: 0;
  height: 0; */
  margin: 1.1em 1em 1.1em 2em;
  border-top: 20px solid transparent;
  border-left: 35px solid #0a2b5c;
  border-bottom: 20px solid transparent;
  -webkit-transition: border-left 0.5s;
  -moz-transition:    border-left 0.5s;
  -ms-transition:     border-left 0.5s;
  -o-transition:      border-left 0.5s;
  transition:         border-left 0.5s;
}
.preview-na {
  width: 4em;
  margin: 1.4em 1em 0 0.6em;
  color: #2da9e2;
}
@media screen and (max-width: 480px) {
  .list-item {
    margin: .25em 5%;
    height: 4.5em;
  }
  .list-item .track-number {
    float: left;
    line-height: 2em;
    margin-left: 2%;
  }
  .list-item img {
    width: 3.609em;
  }
  .triangle-right {
    margin: 1.25em 0.9em .99em 1.8em;
    border-top: 15px solid transparent;
    border-left: 26.25px solid #0a2b5c;
    border-bottom: 15px solid transparent;
  }
  .list-item:hover .triangle-right {
    border-left: 26.25px solid #ff741e;
  }
  .preview-na {
    width: 3em;
    margin: 1.05em 0.75em 0 0.45em;
  }
}
</style>
