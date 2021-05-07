<template>
    <div>
        <h1>Playlist search</h1>
        <button v-on:click="getUserPlaylists3()">Get all your playlists</button>
        <div>
            <input id="search_bar" v-model="input_area" v-on:keyup="search_suggest" autocomplete="off"
                @keydown.down = 'down'
                @keydown.up = 'up'
                @keydown.enter = 'enter'
                />
            <button v-on:click="search">Search</button>
            <ul class="dropdown-menu" v-if="open">
                <li v-for='n in search_suggestions.length' :key='n'
                    v-bind:class="{'active': isActive(n-1)}"
                    @click="suggestionClick(n-1)">
                    <a href="#">{{ search_suggestions[n-1] }}</a>
                </li>
            </ul>
        </div>
        <div v-for='n in search_results.length' :key='n'>
            <p>{{ search_results[n-1] }}</p>
        </div>
    </div>
</template>

<script>
import FireAnimation from './FireAnimation.vue';
import { getUserPlaylists, getPlaylistItems } from '../services/spotifyApi';
//import VueFuse from 'vue-fuse';
import Fuse from 'fuse.js/dist/fuse.js';
export default {
    name: 'TrackSearch',
    data () {
        return {
            msg: 'Track Search page',
            playlists: [],
            all_tracks: [],
            test_song_list: [],  
            input_area: '',
            search_suggestions: [], // song suggestions while user is typing
            search_results: [], // search results after user hits the search button
            suggestions_fuse_object: null,
            results_fuse_object: null,
            search_options: {
                includeScore: true,
                // Search in `author` and in `tags` array
            },
            current: 0,
            selection: null,
            open: false,
        }
    },
    components: {
        'fire-animation': FireAnimation
    },
    methods: {
        /*getUserPlaylists2 (limit, offset) {
            getUserPlaylists(limit, offset).then((response) => {
                console.log(response.data.items);
                this.playlists = response.data.items;
                console.log(this.playlists);

                // we need the user's market information (what region they are located in) to access playlist tracks
                this.$store.dispatch('getUser').then(response =>{
                }, (err) =>{
                })


                //TODO get all the playlist's songs and put them in an array tp search through later
                getPlaylistItems(this.playlists[0].id, this.$store.getters.getUser.country, 50, 0).then((response) => {
                    console.log(response.data.items[0].track);
                    var songinfo = response.data.items[0].track;
                    this.test_song_list.push({
                        "name": songinfo.name,
                        "artists": songinfo.artists.map(this.getArtist),
                        "playlist": this.playlists[0].name,
                        "index": 1
                    })
                    console.log(this.test_song_list);
                    const suggestions_options = {
                        includeScore: true,
                        threshold: 0.3,
                    // Search in `author` and in `tags` array
                        keys: ['name', 'artists', 'index']
                    }
                    this.suggestions_fuse_object = new Fuse(this.test_song_list, suggestions_options)
                    console.log(this.suggestions_fuse_object)
                }).catch(err=>console.log("getting tracks from playlist failed"))


            }).catch(err => console.log("what?"),
            );
        }*/

        async getUserPlaylists3(){
            // we need the user's market information (what region they are located in) to access playlist tracks
            // the "dispatch" is a vuex action, which commits mutations
            this.$store.dispatch('getUser').then(response =>{
            }, (err) =>{
            })
            var curr_response_length = 50 //the length of the last api call response. Since api only responds with 50 at a time
            var starting_index = 0 //starting playlsit index when calling the api

            //get call getUserPlaylists until there's none left
            while (curr_response_length == 50){
                await getUserPlaylists(50, starting_index).then((response) =>{
                    this.playlists = this.playlists.concat(
                        response.data.items.filter(
                            playlist => playlist.owner.id == this.$store.getters.getUser.id
                        )
                    );
                    curr_response_length = response.data.items.length;
                    starting_index += 50;
                })
            }
            /*await getUserPlaylists(50, 0).then((response) =>{
                //console.log(response.data.items);
                this.playlists = response.data.items;
                //console.log(this.playlists);

            });*/

            /*if (this.playlists.length == 50){
                console.log("getting second set of playlists");
                await getUserPlaylists(50, 51).then((response) =>{
                    this.playlists = this.playlists.concat(response.data.items);
                })
            }*/

            await this.getPlaylistsItems();
            const suggestions_options = {
                includeScore: true,
                threshold: 0.3,
                    // Search in `author` and in `tags` array
                keys: ['name', 'artists', 'index']
            }
            this.suggestions_fuse_object = new Fuse(this.test_song_list, suggestions_options)
        },
        // ?? get each playlists items, each playlist one at a time
        async getPlaylistsItems(){
            // we need the user's market information (what region they are located in) to access playlist tracks
            this.$store.dispatch('getUser').then(response =>{
            }, (err) =>{
            })

            // right now only getting the first track of each playlist from 50 playlists
            // (for testing purposes. prob going to try 
            // to cache these responses because it's A LOT if I'm gonna go more than 50 songs)
            console.log("number of playlists:" + this.playlists.length);
            for (var i = 0; i < this.playlists.length; i++) {

                var curr_response_length = 50
                var starting_index = 0
                while (curr_response_length == 50){
                    await getPlaylistItems(this.playlists[i].id, this.$store.getters.getUser.country, 50, starting_index).then((response) => {
                        //console.log(i);

                        for (var j = 0; j < response.data.items.length; j++){
                            var songinfo = response.data.items[j].track;
                            this.test_song_list.push({
                                "name": songinfo.name,
                                "artists": songinfo.artists.map(this.getArtist),
                                "playlist": this.playlists[i].name,
                                "index": 1
                            })
                        }
                        curr_response_length = response.data.items.length;
                        starting_index += 50;
                    });
                }
            }
            console.log("test song list:");
            console.log(this.test_song_list);
        },

        //helper function to filter out the artists for a song; to be used with the map function
        getArtist(spotify_artist){
            return spotify_artist.name;
        },
        search_suggest(){
            this.open = true;
            this.search_suggestions = this.suggestions_fuse_object.search(this.input_area);
            console.log(this.search_suggestions);
        },
        search(){
            this.search_results = this.results_fuse_object.search(this.input_area);
            console.log(this.search_results);
        },
        //For highlighting element
        isActive(index) {
            return index === this.current;
        },
        //When up pressed while suggestions are open
        up() {
            if(this.current > 0)
                this.current--;
        },

        //When up pressed while suggestions are open
        down() {
            if(this.current < this.search_suggestions.length - 1)
                this.current++;
        },

        //When enter pressed on the input (does the click ebvent detect this too? seems like it)
        enter() {
            //this.input_area = ""
            this.selection = this.search_suggestions[this.current];
            this.open = false;
            console.log(this.open);
            console.log(this.selection);
            //this.open = false;
        },

        //When one of the suggestion is clicked
        suggestionClick(index) {
            //this.selection = this.matches[index];
            //this.open = false;
            //this.input_area = "",
            this.selection = this.search_suggestions[index];
            this.current = index;
            this.open = false;
            console.log(this.selection);
        },
    },
    mounted () {
        //this.getUserPlaylists3(50, 0);

        /*var test_list = ["Old Man's War", "The Lock Artist"];
        const options = {
        includeScore: true
        }

        const fuse = new Fuse(test_list, options)

        const result = fuse.search('od man')
        console.log(result);*/

        //console.log(this.playlists);
        var test_list = [
            {
                "title": "Old Man's War",
                "author": "John Scalzi",
                "tags": ["fiction"]
            },
            {
                "title": "The Lock Artist",
                "author": "Steve",
                "tags": ["thriller"]
            },
            /*{
                "name": "7 Rings",
                ""
            }*/
        ]
        
        /*const suggestions_options = {
            includeScore: true,
            // Search in `author` and in `tags` array
            keys: ['title', 'author', 'tags']
        }

        //this will prob end up being done in getUserPlaylists2
        this.suggestions_fuse_object = new Fuse(test_list, suggestions_options)


        const results_options = {
            includeScore: true,
            // Search in `author` and in `tags` array
            keys: ['title', 'author', 'tags'],
            threshold: 0.0
        }
        this.results_fuse_object = new Fuse(test_list, results_options)*/
    }
}
</script>

<style scoped>
.open {
    background-color: white;
}
.active {
    background-color: white;
}
</style>