<template>
    <div>
        <h1>Playlist search</h1>
    </div>
</template>

<script>
import FireAnimation from './FireAnimation.vue';
import { getUserPlaylists } from '../services/spotifyApi';
export default {
    name: 'TrackSearch',
    data () {
        return {
            msg: 'Track Search page',
            playlist_tracks: null
        }
    },
    components: {
        'fire-animation': FireAnimation
    },
    methods: {
        getUserPlaylists2 (offset) {
            getUserPlaylists(offset).then((response) => {
                this.playlist_tracks = response;
                console.log(this.playlist_tracks);
            }).catch(err => console.log("what?"),
            );
        }
    },
    mounted () {
        this.getUserPlaylists2(0);
    }
}
</script>

<style scoped>
</style>