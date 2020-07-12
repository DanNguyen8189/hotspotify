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
          I'm the default body!
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
export default {
  name: 'TrackInfo',
  props: ['trackNumber'],
  methods: {
    close() {
      this.$emit('close');
      console.log("Haha what the fuck?");
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