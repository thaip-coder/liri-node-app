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
var search = process.argv[3];

/* ---------- Command Switch Statements ---------- */
switch(command) {
    //Spotify command that calls spotifySong function
    case "spotify-this-song":
        spotifySong();
        break;
    //Movie command that calls movieThis function
    case "movie-this":
        movieURL = "http://www.omdbapi.com/?apikey=trilogy&t="+search+"&plot=short";
        movieThis();
        break;
    //Concert command that calls concertThis function
    case "concert-this":
        concertURL = "https://rest.bandsintown.com/artists/"+search+"/events?app_id=codingbootcamp";
        concertThis();
        break;
    //Command that imports and runs commands from random.txt file
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", (err, data) => {
            if(err) {
                console.log(err);
                return;
            };

            console.log(data);
            var dataRecord = data.split(",");
            search = dataRecord[1];

            //Same cases traversed when do-what-it-says command is run
            switch (dataRecord[0]) {
                case "spotify-this-song":
                spotifySong();
                break;
            case "movie-this":
                movieURL = "http://www.omdbapi.com/?apikey=trilogy&t="+search+"&plot=short";
                movieThis();
                break;
            case "concert-this":
                concertURL = "https://rest.bandsintown.com/artists/"+search+"/events?app_id=codingbootcamp";
                concertThis();
                break;
            };
        });
        break;
};

/* ---------- Action Functions ---------- */
//SpotifySong function: Song, artist, song album, link of spotify song
function spotifySong() {
    spotify.search({type: "track", query: search, limit: 1}, function(err, results) {
        if(err) {
            console.log("Error: " + err);
            return;
        };
        console.log("====================");
        console.log("\nSong Name: " + results.tracks.items[0].name);
        console.log("Artist(s): " + results.tracks.items[0].artists[0].name);
        console.log("Song Album: " + results.tracks.items[0].album.name);
        console.log("Song Link: " + results.tracks.items[0].external_urls.spotify);
        console.log("\n====================");
    });
};

//Movie search function: Title, Year, IMBD rating, Rotten Tomatoes Rating, Country Produced, Language, Plot, Actors
function movieThis() {
    axios.get(movieURL).then(function(response) {
        console.log("====================");
        console.log("\nMovie Title: " + response.data.Title);
        console.log("Year Released: " + response.data.Year);
        console.log("IMDB rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
        console.log("Country/Countries Shot In: " + response.data.Country);
        console.log("Languages: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("\n====================");
    });
};

//Concert search function: Name of venue, venue location, date of the event
function concertThis() {
    axios.get(concertURL).then(function(response) {
        console.log("====================");
        console.log("\nBand Playing: " + search);
        console.log("Venue Name: " + response.data[0].venue.name);
        console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
        console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        console.log("\n====================");
    });                                                                                                                                                 
};

