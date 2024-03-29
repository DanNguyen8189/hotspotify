import axios from 'axios';
import { getHashParams } from '../utils';

// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds
const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
    setTokenTimestamp();
    window.localStorage.setItem('spotify_access_token', token);
};
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');

// called on app start
export const getAccessToken = () => {
    const hashParams = getHashParams();
    const error = hashParams.error;
    const accessToken = hashParams.access_token;

    if (getLocalAccessToken() && Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
        console.warn('Access token has expired');
        if (accessToken){
            setLocalAccessToken(accessToken);
        }
    } 
    else if (getLocalAccessToken() !== null) {
        return getLocalAccessToken();
    }
    else if (accessToken){
        // console.log("setting local access token to hashparam: " + accessToken);
        setLocalAccessToken(accessToken);
    }
    // return localAccessToken;
    return accessToken;
}
export const token = getAccessToken();

export const logout = () => {
    // console.log("removing tokens from local storage");
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    // window.location.href("http://localhost:8080");
    if (process.env.NODE_ENV === "development") {
        window.location.assign("http://localhost:8080"); // Go back to home page without the hash params
    } else {
        window.location.assign("https://hotspotify.herokuapp.com/");
    } 
    // window.location.assign("http://localhost:8080"); // Go back to home page without the hash params
    // window.location.reload(); // all access token info is removed from the server and page is reloaded
};

// Spotify API calls--------------------------------------

const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
};

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
// export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });
/*export const getUser = () =>
axios.get('https://api.spotify.com/v1/me', { headers });*/

export const getUser = () => {
    if (token === undefined){
        // return an empty promise if we don't have an access token. We do this because the function calls 
        // this (getUser) expects a promise and we'd rather not call the spotify api with an undefned token 
        const emptyPromise = new Promise((resolve) => { resolve(null); });
        return emptyPromise;
    }
    else{
        return axios.get('https://api.spotify.com/v1/me', { headers });
    }
}

/**
 * Get Current User's Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
 */
export const getRecentlyPlayed = () =>
axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers });

/**
 * Get a User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopArtistsShort = () =>
axios.get('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50', { headers });
export const getTopArtistsMedium = () =>
axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', { headers });
export const getTopArtistsLong = () =>
axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopTracksShort = () =>
axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers });
export const getTopTracksMedium = () =>
axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', { headers });
export const getTopTracksLong = () =>
axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });

export const getUserInfo = () => {
return axios
    .all([getUser(), getTopArtistsShort(), getTopArtistsMedium(), getTopArtistsLong(),
    getTopTracksShort(), getTopTracksMedium(), getTopTracksLong()])
    .then(
    axios.spread((user, topArtistsShort, topArtistsMedium, topArtistsLong,
        topTracksShort, topTracksMedium, topTracksLong) => {
        return {
        user: user.data,
        topArtistsShort: topArtistsShort.data,
        topArtistsMedium: topArtistsMedium.data,
        topArtistsLong: topArtistsLong.data,
        topTracksShort: topTracksShort.data,
        topTracksMedium: topTracksMedium.data,
        topTracksLong: topTracksLong.data
        };
    })
    );
};

export const getTopArtists = () => {
    if (token === undefined){
        // return an empty promise if we don't have an access token. We do this because the function calls 
        // this (getTopArtists) expects a promise and we'd rather not call the spotify api with an undefned token 
        const emptyPromise = new Promise((resolve) => { resolve(null); });
        return emptyPromise;
    }
    return axios
        .all([getTopArtistsShort(), getTopArtistsMedium(), getTopArtistsLong()])
            .then(
            axios.spread((topArtistsShort, topArtistsMedium, topArtistsLong) => {
                return {
                topArtistsShort: topArtistsShort.data,
                topArtistsMedium: topArtistsMedium.data,
                topArtistsLong: topArtistsLong.data
                };
            })
        );
};

export const getTopTracks = () => {
    if (token === undefined){
        // return an empty promise if we don't have an access token. We do this because the function calls 
        // this (getTopTracks) expects a promise and we'd rather not call the spotify api with an undefned token 
        const emptyPromise = new Promise((resolve) => { resolve(null); });
        return emptyPromise;
    }
    return axios
        .all([getTopTracksShort(), getTopTracksMedium(), getTopTracksLong()])
            .then(
            axios.spread((topTracksShort, topTracksMedium, topTracksLong) => {
                return {
                topTracksShort: topTracksShort.data,
                topTracksMedium: topTracksMedium.data,
                topTracksLong: topTracksLong.data
                };
            })
        );
};

export const getTrackInfo = (id) => { 
    //return axios.get('https://api.spotify.com/v1/audio-features/{' + id + '}', { headers });
    return axios.get(`https://api.spotify.com/v1/audio-features/${id}`, { headers });
}

export const getUserPlaylists = (limit, offset) => {
    if (token === undefined){
        // return an empty promise if we don't have an access token. We do this because the function calls 
        // this (getTopArtists) expects a promise and we'd rather not call the spotify api with an undefned token 
        const emptyPromise = new Promise((resolve) => { resolve(null); });
        return emptyPromise;
    }
    return axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, { headers });
}

export const getPlaylistItems = (id, market, limit, offset) => {
    if (token === undefined){
        // return an empty promise if we don't have an access token. We do this because the function calls 
        // this (getTopArtists) expects a promise and we'd rather not call the spotify api with an undefned token 
        const emptyPromise = new Promise((resolve) => { resolve(null); });
        return emptyPromise;
    }
    return axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks?market=${market}&limit=${limit}&offset=${offset}`, { headers });
}