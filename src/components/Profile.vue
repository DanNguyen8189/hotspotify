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
            if (this.$route.params.sample){ 
                //console.log("viewing sample");
                //console.log(sampleUser);
                this.$store.commit('setUser', sampleUser.user);
            } else {
                getUser().then((response) => {
                    // this.$store.commit('setUser', response.user);
                    // console.log("why the fuck is this executing");
                    this.$store.commit('setUser', response.data);
                    // console.log(response.data);
                }).catch(err => console.log("user not logged in"));
            }
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
.home {
    height: 100%;
}
#login-page {
    transform: translateY(50%); /*vertically center*/
}
#login-page h1 {
    margin: 0;
}
#profile-page {
    width: 100%;
    transform: translateY(5%); /*vertically center*/
}
#profile-page h1 {
    font-size: 2.5em;
    color: white;
}
#profile-page h1:nth-child(1) {
    margin-bottom: 0;
}
#profile-page h1:nth-child(2) {
    margin-top: 0;
}
img {
    border-radius: 50%;
    width: 14em;
    border: .4em solid #e42c6a;
    padding: .5em;
    display: block;
    margin: auto;
}

.btn-primary {
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
}
@media screen and (min-width: 480px) {
    #profile-page {
        transform: translateY(0%); /*vertically center*/
    }
    #profile-page h1 {
        display: inline-block;
    }
    #profile-page h1:nth-child(2) {
        margin-left: .5em;
    }
}
</style>