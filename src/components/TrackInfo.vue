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
        <slot name="body">
          <div class='chart-wrapper'>
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
          <bar-graph
            :points="[{label: 'acousticness', value: this.acousticness},
                      {label: 'danceability', value: this.danceability},
                      {label: 'energy', value: this.energy},
                      {label: 'speechiness', value: speechiness},
                      {label: 'valence', value: this.valence}]"
            :show-x-axis="true"
            :width='this.parentWidth'
            :height='this.parentHeight'
          />
          </div>
        </slot>
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

export default {
  name: 'TrackInfo',
  props: ['trackNumber'],
  data () {
    return {
      // these initial values are nonzero or else errors like 
      // "<rect> attribute height: Expected length, "NaN"." appear on the console
      acousticness: .5,
      danceability: .5,
      energy: .5,
      instrumentalness: .5,
      liveness: .5,
      loudness: .5,
      speechiness: .5,
      valence: .5,
      tempo: .5,
      parentHeight: 100,
      parentWidth: 100,
      dummy: 200,
    }
  },
  components: {
    PureVueChart,
    BarGraph
  },
  methods: {
    getTrackInfo2 (index) {
      if (index < 0) {
        return;
      }
      const id = this.$store.getters.getTopTracks.items[index].id;
      getTrackInfo(id).then((response) => {
        this.acousticness = response.data.acousticness;
        this.danceability = response.data.danceability;
        this.energy = response.data.energy;
        this.instrumentalness = response.data.instrumentalness;
        this.liveness = response.data.liveness;
        this.loudness = response.data.loudness;
        this.speechiness = response.data.speechiness;
        this.valence = response.data.valence;
        this.tempo = response.data.tempo;
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
    this.parentHeight = this.$refs.potato.offsetHeight - 250;
    this.parentWidth = this.$refs.potato.offsetWidth *.9;
    console.log(this.$refs.potato.offsetHeight);
  },
  mounted () {
    //this.parentHeight = Math.abs(this.$el.offsetHeight);
    //this.parentWidth = this.$parent.$el.offsetWidth;
    /*console.log("aight what the fuck?");
    console.log(this.$el.offsetHeight);
    console.log(this.$el.offsetWidth);
    console.log(this.$parent.$el.offsetWidth);
    console.log(this.$refs.potato.offsetHeight);*/
    console.log("mounted " + this.$refs.potato.offsetHeight);
  }
}
</script>>
<style>
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
    height: 95vh;
    width: 80%;
  }

  .modal-header{
    padding: 15px;
    display: flex;
  }

  .modal-header {
    background-color: #133d55;
    color: rgb(103, 211, 191);
    justify-content: space-between;
    align-items: center;
  }

  .modal-header .img {
    flex-basis: 15%;
  }
  .modal-header .text {
    flex: 1 1 auto;
    border: 5px solid red;
  }
  .modal-header .close-button {
    flex-basis: 15%;
    align-self: flex-start;
  }

  .modal-header img {
    display: block;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: .3em solid #e42c6a;
    margin: 10px;
    padding: 5px;
  }
  .modal-header h2 {
    margin: 0;
    font-size: 1.2em;
  }
  .modal-header h2:first-child {
    display: block;
    font-family: 'Nothing You Could Do', cursive;
    font-size: 2.5em;
    color: white;
  }
  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    float: right;
    border: none;
    font-size: 20px;
    padding: 20px;
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
  }
</style>>