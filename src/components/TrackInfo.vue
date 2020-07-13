<template>
  <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
      <header class="modal-header">
        <!--<slot name="header">-->
          <div class='header-block'>
            <img :src=getImage(this.trackNumber)>
          </div>
          <div class='header-block'>
            <h2>{{ getTrackName(this.trackNumber) }}</h2>
            <h2>{{ getArtistName(this.trackNumber) }}</h2>
          </div>
          <div class='header-block'>
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">
              x
            </button>
          </div>
        <!--</slot>-->
      </header>
      <section class="modal-body">
        <slot name="body">
          {{ this.acousticness }}
        </slot>
      </section>
      <footer class="modal-footer">
        <!--<slot name="footer">
          I'm the default footer!
          <button type="button" class="btn-green" @click="close" aria-label="Close modal">
            Close me!
          </button>
        </slot>-->
      </footer>
    </div>
  </div>
  </transition>
</template>
<script>
import { getTrackInfo } from '../services/spotifyApi';
export default {
  name: 'TrackInfo',
  props: ['trackNumber'],
  data () {
    return {
      acousticness: -1,
      danceability: -1,
      energy: -1,
      instrumentalness: -1,
      liveness: -1,
      loudness: -1,
      speechiness: -1,
      valenece: -1,
      tempo: -1
    }
  },
  methods: {
    getTrackInfo2 (index) {
      const id = this.$store.getters.getTopTracks.items[index].id;
      console.log('id: ' + id);
      console.log('it should be ' + 'https://api.spotify.com/v1/audio-features/{' + id + '}');
      getTrackInfo(id).then((response) => {
        console.log(response);
        this.acousticness = response.data.acousticness;
        this.danceability = response.data.danceability;
        this.energy = response.data.energy;
        this.instrumentalness = response.data.instrumentalness;
        this.liveness = response.data.liveness;
        this.loudness = response.data.loudness;
        this.speechiness = response.data.valence;
        this.tempo = response.data.tempo;
      }).catch(err => console.log('something went wrong'));
    },
    close () {
      this.$emit('close');
    },
    getImage (index) {
      return this.$store.getters.getTopTracks.items[index].album.images[1].url;
      //return this.$parent.getImage(index);
    },
    /** function get track name */
    getTrackName (index) {
      //return this.$store.getters.getTopTracks.items[index].name;
      return this.$parent.getTrackName(index);
    },
    /** funciton to get artist name */
    getArtistName (index) {
      //return this.$store.getters.getTopTracks.items[index].artists[0].name;
      return this.$parent.getArtistName(index);
    },
  },
  updated () {
    console.log("uh this got created?");
    this.getTrackInfo2(this.trackNumber);
  }
}
</script>>
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
    height: 95vh;
    width: 80%;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-header .header-block {
    flex: 1 1 0;
  }

  .modal-header img {
    float: left;
    display: block;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: .3em solid #e42c6a;
  }
  .modal-header h2 {
    display: block;
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
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
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
</style>>