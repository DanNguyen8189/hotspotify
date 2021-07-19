<template>
    <div id="profile-page">
        <h1>Hi,</h1>
        <h1>{{ this.user.display_name }}</h1>
        <!--<a :href="this.user.external_urls.spotify">-->
            <img :src="this.user.images[0].url" alt="profile_picture" class="profile-pic">
            <!--<a href="#" v-on:click="getSampleUser()" class="btn btn-primary" id="login-button">get sample user</a><br>-->
        <!--</a>-->
        <!--<p>Email address: {{ this.user.email }}</p>-->
        <!--<p>Following: {{ this.user.followers.total }}</p>-->
        <!--<p>Followers: {{ this.user.followers.total }}</p>-->
        <!--
        <p>
            <a v-on:click="logOut()" class="btn btn-primary">Log Out</a>
        </p> -->
    </div>
</template>

<script>
import { logout as removeTokens, getUser } from "../services/spotifyApi";
const sampleUser = require( "../assets/sampleUser.json");
export default {
    name: 'Profile',
    metaInfo: {
        meta: [
            { name: 'description', content: 'spotify profile' },
        ]
    },
    computed: {
        user () {
            return this.$store.getters.getUser;
        }
    },
    methods: {
        /** logs user out by removing them from the store and removing the locally stored tokens */
        logOut () {
            this.$store.commit('clearAll');
            removeTokens();
            // console.log("removed tokens");
            // window.alert("logged out");
            this.$router.push({name: 'Home'});
            // this.$router.go();
        },

        /** Gets the user - calls the getUser method from spotifyApi.js if user logged in*/
        getUserInfo () {
            /*if (this.$route.params.sample){ 
                this.$store.commit('setUser', sampleUser.user);
            } else {
                getUser().then((response) => {
                    // this.$store.commit('setUser', response.user);
                    // console.log("why the fuck is this executing");
                    this.$store.commit('setUser', response.data);
                    // console.log(response.data);
                }).catch(err => console.log("user not logged in"));
            }*/

            this.$store.dispatch('getUser').then(response =>{
                console.log("vuex action worked!")
            }, (err) =>{
                console.log("vuex action bombed")
            })
        },

        /** Sets the button target url based on whether the app is in production or not */
        getLoginURI (element) {
            if (process.env.NODE_ENV !== 'production') {
                document.getElementById("login-button").href = 'http://localhost:5000/login';
            } else {
                document.getElementById("login-button").href = 'https://hotspotify.herokuapp.com/login';
            }
        },

        /** Utility function to use whenever I want to update the sample user. To use,
        click around the menu to populate the store with my information then click a button to
        call this function and log it all onto the console. */
        getSampleUser() {
            console.log(this.$store.state);
        }
    },
    created () {
        // console.log("route params check: " + this.$route.params.sample);
        this.getUserInfo();
    }
    
}
</script>

<style scoped>
*{
    margin: 0;
}

#profile-page {
    width: 100%; /* there's been cases where the page becomes wider than the phone screen and we don't want that */
}
#profile-page h1 {
    font-size: 2.5em;
    color: white;
}
#profile-page h1:nth-child(1) {
    margin-top: 0.5em; /* add some space above the top of the text */
}
#profile-page h1:nth-child(2) {
    margin-bottom: 0.5em; /* add some space below the text and above the profile image */
}

img {
    border-radius: 50%; /* make the profile image circular */
    width: 14em;
    border: .4em solid #e42c6a; /* add a magenta border around the profile image */
    padding: .5em;
    display: block; /* images are inline by default, but we want the image to clear everything next to it and 
    sit on its own line */
    margin: auto;
}

/*.btn-primary {
    cursor: pointer;
    border-radius: 2em;
    background-color: #e42c6a;
    display: inline-block;
    margin: auto;
    margin-top: 1em;
    padding: 0 2em;
    color: #f5d76e;
    text-decoration: none;
    letter-spacing: 2px;
    font-weight: 700;
    line-height: 4em;
}
.btn-primary:focus, .btn-primary:hover {
    background-color: #ff741e;
}*/
@media screen and (min-width: 480px) {
    #profile-page h1 {
        display: inline-block; /* the word "Hi" and the user's name should appear on the same line */
    }
    #profile-page h1:nth-child(2) {
        margin-left: .5em; /* give some space between "Hi" and the person's name when they're on the same line */
    }
}
</style>