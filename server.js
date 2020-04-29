/**
 * node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 * https://developer.spotify.com/documentation/general/guides/authorization-guide/
 * https://github.com/spotify/web-api-auth-examples/tree/master/authorization_code
 */

 //for reading environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request"); // request library
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const serveStatic = require('serve-static');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// remember to add redirect URIs to the spotify app through settings or else a client error occurs
let REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:5000/callback";
let FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:8080";
const port = process.env.PORT || 5000;

console.log("checking production or not");
if (process.env.NODE_ENV !== "production") {
    console.log("not production");
    REDIRECT_URI = "http://localhost:5000/callback";
    FRONTEND_URI = "http://localhost:8080";
}

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
var stateKey = "spotify_auth_state";


const app = express();
app
    .use(bodyParser.json())
    .use(cors())
    .use(cookieParser())
    .use(serveStatic(__dirname + "/dist"));

/*get request to status endpoint. If you go to /status in the browser you'll see the message in JSON format*/
app.get("/status", (req, res) => {
    res.send({
      message: "Yep, server's on *thumbs up"
    });
});
  
/*home page: __dirname tells you the absolute path of the directory containing the executing file
https://alligator.io/nodejs/how-to-use__dirname/*/  
app.get("/login", function(req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // what your application is alllowed to do. Spotify will ask user to allow access
    const scope =
    'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';
    console.log("logging in");
    // your application requests authorization, redirect to the spotify login page
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state
        })
    );
});
  
app.get("/callback", function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    console.log("got to callback function");
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
        res.redirect(
            "/#" +
            querystring.stringify({
                error: "state_mismatch"
            })
        );
    } else {
        res.clearCookie(stateKey);
  
        var authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: "authorization_code"
            },
            headers: {
                Authorization:
                    "Basic " +
                    new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")
            },
            json: true
        };
  
        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token,
                    refresh_token = body.refresh_token;
    
                var options = {
                    url: "https://api.spotify.com/v1/me",
                    headers: { Authorization: "Bearer " + access_token },
                    json: true
                };
    
                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    //the JSON data
                    console.log("request successful-returned api data:");
                    console.log(body);
                });
  
            //pass the tokens to the browser to make requests from there
                res.redirect(
                    `${FRONTEND_URI}/#${querystring.stringify({
                        access_token,
                        refresh_token,
                    })}`,
                );
            } else {
                res.redirect(
                    `/#${querystring.stringify({ 
                        error: 'invalid_token' 
                    })}`
                );
            }
        });
    }
});
  
app.listen(port);
console.log('server started '+ port);