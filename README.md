1. The problem my app is trying to solve:
    - My app is trying to provide the user with 3 functions. It can:
        1. Search for a spotify song and display the following information:
            - Song name
            - Artist name
            - Song album
            - Link to spotify song
        2. Search for information about a movie, displaying the following:
            - Movie title
            - Year movie was published
            - IMDB rating
            - Rotten tomatoes rating
            - Country produced
            - Language
            - Plot
            - Actors
        3. Search concert information given an artist, displaying the following information:
            - Name of venue
            - Venue location
            - Date of event
        4. Additionally, my app can import a command from a text file and run that command utilizing the 3 functions provided. 

2. How the app is organized:
    - Firstly, the global variables are introduced
        - This includes any required modules and process.argv's
    - Secondly, the switch statement will be traversed when the user decides what function they wish to use and what search query they input.
    - Lastly, the functions that are called in the switch statement are displayed.

3. How to run the app:
    1. In the command line, to intiate the app, type(without quotations):
        - "node liri" 
    2. After "liri" hit <space> and insert 1 of 4 commands:
        - spotify-this-song
            - After this command hit <space> and input the song you wish you search.
            - Then hit <enter>.
        - movie-this
            - After this command hit <space> and input the movie you wish to search.
            - Then hit <enter>.
        - concert-this
            - After this command hit <space> and input the artist you wish to search.
            -Then hit <enter>.
        - do-what-it-says
            - Hit enter, and it will run whatever command is in the random.txt file.

4. Images of code working will be provided in images folder

5. Deployed version of the app:
    - https://tp222.github.io/liri-node-app/

6. The app utilized the following:
    - dotenv module
    - node-spotify-api module
    - axios module
    - moment module
    - switch statements
    - APIs
        - spotify api
        - axios calling
            - omdb api
            - bandsintown

7. I developed this app as a homework assigment, myself. However I did receive aid from my fellow colleagues. 
