<template>
  <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription"  ref='potato'>
      <header class="modal-header">
        <!--<slot name="header">-->
          <div class='header-block img'>
            <img :src=getImage(this.trackNumber)>
          </div>
          <div class='header-block text'>
            <h2>{{ getTrackName(this.trackNumber) }}</h2>
            <h2>{{ getArtistName(this.trackNumber) }}</h2>
          </div>
          <div class='header-block close-button'>
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">
              x
            </button>
          </div>
        <!--</slot>-->
      </header>
      <section class="modal-body">

          <!--<pure-vue-chart
            :points="[{label: 'acousticness', value: this.acousticness},
                      {label: 'danceability', value: this.danceability},
                      {label: 'energy', value: this.energy},
                      {label: 'speechiness', value: speechiness},
                      {label: 'valence', value: this.valence}]"
            :show-x-axis="true"
            :width='this.parentWidth'
            :height='this.parentHeight'
          />-->
          <!--<bar-graph
            :points="[{label: 'acoustic', value: this.acousticness},
                      {label: 'danceability', value: this.danceability},
                      {label: 'energy', value: this.energy},
                      {label: 'speechiness', value: speechiness},
                      {label: 'valence', value: this.valence}]"
            :show-x-axis="true"
            :show-y-axis="true"
            :width='this.parentWidth'
            :height='this.parentHeight'
          />-->
          <bar-graph-second
            :datapoints="[this.acousticness,
                      this.danceability,
                      this.energy,
                      this.speechiness,
                      this.valence]"
            />
      </section>
      <!--<footer class="modal-footer">-->
        <!--<slot name="footer">
          I'm the default footer!
          <button type="button" class="btn-green" @click="close" aria-label="Close modal">
            Close me!
          </button>
        </slot>-->
      <!--</footer>-->
    </div>
  </div>
  </transition>
</template>
<script>
import { getTrackInfo } from '../services/spotifyApi';
import PureVueChart from 'pure-vue-chart';
import BarGraph from './BarGraph.vue';
import BarGraphSecond from './BarGraphSecond.vue';
export default {
  name: 'TrackInfo',
  props: ['trackNumber'],
  data () {
    return {
      // these initial values were nonzero for the first bar graph attempt or else errors like 
      // "<rect> attribute height: Expected length, "NaN"." appear on the console. New way 0 is fine!
      acousticness: 0,
      danceability: 0,
      energy: 0,
      instrumentalness: 0,
      liveness: 0,
      loudness: 0,
      speechiness: 0,
      valence: 0,
      tempo: 0,
      //parentHeight: 100,
      //parentWidth: 100,
      //dummy: 200,
    }
  },
  components: {
    PureVueChart,
    BarGraph,
    BarGraphSecond
  },
  methods: {
    getTrackInfo2 (index) {
      if (index < 0) {
        return;
      }
      const id = this.$store.getters.getTopTracks.items[index].id;
      getTrackInfo(id).then((response) => {
        this.acousticness = response.data.acousticness * 10;
        this.danceability = response.data.danceability * 10;
        this.energy = response.data.energy * 10;
        this.instrumentalness = response.data.instrumentalness * 10;
        this.liveness = response.data.liveness * 10;
        this.loudness = response.data.loudness * 10;
        this.speechiness = response.data.speechiness * 10;
        this.valence = response.data.valence * 10;
        this.tempo = response.data.tempo * 10;
      }).catch(err => console.log('something went wrong'));
    },
    /** let parent component know that the close button was pressed */
    close () {
      this.$emit('close');
    },
    /** function to get track's album image */
    getImage (index) {
      if (index < 0) return;
      return this.$store.getters.getTopTracks.items[index].album.images[1].url;
      //return this.$parent.getImage(index);
    },
    /** function get track name */
    getTrackName (index) {
      if (index < 0) return "none set yet";
      //return this.$store.getters.getTopTracks.items[index].name;
      return this.$parent.getTrackName(index);
    },
    /** function to get artist name */
    getArtistName (index) {
      if (index < 0) return "none set yet";
      //return this.$store.getters.getTopTracks.items[index].artists[0].name;
      return this.$parent.getArtistName(index);
    },
  },
  // gets info for track 0 by default on create (covers edge case when user first loads top tracks and 
  // views track information for the first track in the list, since updated() won't detect that)
  created () {
    this.getTrackInfo2(this.trackNumber);
    //this.parentHeight = Math.abs(this.$el.offsetHeight);
    //this.parentWidth = this.$parent.$el.offsetWidth;
  },
  // when user picks a new track (this.trackNumber changes!)to view, component will call the spotify api 
  // to get the right info. Created only runs once at the beginning of the component's creation, 
  // and since the component isn't destroyed when user clicks close, we need this here
  updated () {
    this.getTrackInfo2(this.trackNumber);
    //this.parentHeight = Math.abs(this.$el.offsetHeight);
    //this.parentWidth = this.$parent.$el.offsetWidth;
    this.parentHeight = this.$refs.potato.offsetHeight - 220;
    this.parentWidth = this.$refs.potato.offsetWidth *.85;
    //console.log(this.$refs.potato.offsetHeight);
  },
  mounted () {
    //this.parentHeight = Math.abs(this.$el.offsetHeight);
    //this.parentWidth = this.$parent.$el.offsetWidth;
    /*console.log("aight what the fuck?");
    console.log(this.$el.offsetHeight);
    console.log(this.$el.offsetWidth);
    console.log(this.$parent.$el.offsetWidth);
    console.log(this.$refs.potato.offsetHeight);*/
    // console.log("mounted " + this.$refs.potato.offsetHeight);
  }
}
</script>
<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: #154e6e;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 80%;
  }

  .modal-header{
    padding: 15px;
    display: flex;
    background-color: #133d55;
    color: rgb(103, 211, 191);
    justify-content: space-between;
    align-items: center;
  }

  .modal-header .img {
    flex-basis: 12%;
  }
  .modal-header .text {
    flex: 1 2 auto;
  }
  .modal-header .close-button {
    flex-basis: 12%;
    align-self: flex-start;
  }

  .modal-header img {
    display: block;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    border: .3em solid #e42c6a;
    margin: 10px;
    padding: 5px;
  }
  .modal-header .text {
    margin: 20px;
  }
  .modal-header h2 {
    margin: 0;
    font-size: 1.2em;
    @media screen and (min-width: 480px){
      color: orange;
    }
  }
  .modal-header h2:first-child {
    display: block;
    font-size: 1.7em;
    color: white;
  }

  .modal-body {
    /*overflow: hidden;*/ /** hide the scrollbar that might show up*/
    background: #133d55;
    position: relative;
    height: 100%;
  }

  .btn-close {
    float: right;
    border: none;
    font-size: 20px;
    padding: 5px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: rgb(103, 211, 191);
    border: 1px solid rgb(103, 211, 191);
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
  
  /*.chart-wrapper .pure-vue-bar-chart text {
    display: block;
    font-size: 20px;
    fill: orange;
    margin: 3em;
    transform: translate(10px, 10px);
  }
  .chart-wrapper .pure-vue-bar-chart [style] {
    fill: #4AAE9B !important;
  }*/
  @media screen and (max-width: 480px) {
    .modal {
      width: 100%;
    }
    .modal-header .img {
      flex-basis: 30%;
    }
    .modal-header h2 {
      font-size: .8em;
    }
    .modal-header h2:first-child {
      font-size: 1.3em;
    }
    .modal-header .close-button {
      flex-basis: 5%;
    }
    /*.modal-body {
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }*/
  }
</style>>