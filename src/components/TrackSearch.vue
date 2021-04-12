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
            playlists: null,
            all_tracks: []
        }
    },
    components: {
        'fire-animation': FireAnimation
    },
    methods: {
        getUserPlaylists2 (limit, offset) {
            getUserPlaylists(limit, offset).then((response) => {
                this.playlists = response.data.items;
                console.log(this.playlists);
                /*for (i = 0; i < this.playlists.length; i++) {
                    all_tracks.push()
                }*/
                console.log(this.$store.getters.getUser);

            }).catch(err => console.log("what?"),
            );
        }
    },
    mounted () {
        this.getUserPlaylists2(50, 0);
    }
}
</script>

<style scoped>
</style>