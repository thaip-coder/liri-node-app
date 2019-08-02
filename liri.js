/* ---------- Spotify ID and Secret ---------- */
require("dotenv").config();

/* ---------- Global Variables ---------- */
var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");

var command = process.argv[2];

console.log(result)
/* ---------- Command switch statements ---------- */
switch(command) {
    case "spotify-this-song":
        spotifySong();
        break;
    case "movie-this":
        search = search.split(" ").join("+");
        movieURL = "http://www.omdbapi.com/?apikey=trilogy&t="+search+"&plot=short";
        movieThis();
        break;
    case "concert-this":
        search = search.split(" ").join("+");
        concertURL = "https://rest.bandsintown.com/artists/"+search+"/events?app_id=codingbootcamp";
        concertThis();
        break;
    case "do-what-it-says":
        fs.readFile("random.txt", "UTF-8", (err, data) => {
            if(err) {
                console.log(err);
                return;
            };

            var dataRecord = data.split(",");

            search = dataRecord[1];

            switch (dataRecord[0]) {
                case "spotify-this-song":
                spotifySearch();
                break;
            case "movie-this":
                search = search.split(" ").join("+");
                movieURL = "http://www.omdbapi.com/?apikey=trilogy&t="+search+"&plot=short";
                movieThis();
                break;
            case "concert-this":
                search = search.split(" ").join("+");
                concertURL = "https://rest.bandsintown.com/artists/"+search+"/events?app_id=codingbootcamp";
                concertThis();
                break;
            };
        });
        break;
};

/* ---------- Action Functions ---------- */
//Song, artist, song album, link of spotify song
function spotifySong() {
    spotify.search({type: "track", query: search, limit: 1}, function(err, result) {
        if(err) {
            console.log("Error: " + err);
            return;
        };
        console.log("\nSpotify Song")
        console.log()
    })
};

//Title, Year, IMBD rating, Rotten Tomatoes Rating, Country Produced, Language, Plot, Actors
function movieThis() {
    axios.get(movieURL).then(function(response) {
        console.log("\nMovie Title: " + response.data.Title);
        console.log("Year Released: " + response.data.Year);
        console.log("IMDB rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
        console.log("Country/Countries Shot In: " + response.data.Country);
        console.log("Languages: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    });
};

//Name of venue, venue location, date of the event
function concertThis() {
    axios.get(concertURL).then(function(response) {
        console.log("\nBand Playing: " + search);
        console.log("Venue Name: " + response.data[0].venue.name);
        console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
        console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
    });

};

