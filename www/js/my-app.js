// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    // Anti-cache
    $.getJSON("http://admin.hausradio.co.uk/api/nowplaying", function(data){
        streamUrl = data[0]['station']['listen_url'];
        $('#stream-url').attr("src", streamUrl);
    })

    // Audio
    $('.playButton').click(function() {
        myApp.alert("Now Playing: "+songArtist+" - "+songTitle, "Haus Radio");
        if($('#player').prop("paused") == false) {
            $('#player').trigger("pause");
            $('.playButton').text("play_fill");
            myApp.alert("Paused");
        } else {
            $('#player').trigger("play")
            $('.playButton').text("pause_fill");
            myApp.alert("Playing");
        }
    })

    // Metadata
    pollTime = "1000";
    var songID = "";

    function poll(){
        $.getJSON( "http://admin.hausradio.co.uk/api/nowplaying", function(data){
            var songData = data[0]['now_playing']['song'];
            var songHistory = data[0]['song_history'];
            var songNext = data[0]['playing_next']['song'];
            if ((songData['id'] != songID)) {
                songID = songData['id'];
                songArtist = songData['artist'];
                songTitle = songData['title'];
                songArt = songData['art'];
                songTitleNext = songNext['title'];
                songArtistNext = songNext['artist'];
                songArtNext = songNext['art'];
                $('.song-artist').text(songArtist);
                $('.song-title').text(songTitle);
                $('#now-playing-image').attr("src", songArt);
                $('#songTitleNext').text(songTitleNext);
                $('#songArtistNext').text(songArtistNext);
                $('#songArtNext').attr("src", songArtNext);

                //pollTime = data[0]['now_playing']['remaining']+"000"; //production
                console.log(songArtist);
                console.log(songTitle);
                console.log("Art: "+songArt);
                console.log("Next poll in: "+pollTime+" ms");
                setTimeout(poll, pollTime);
            }
            else {
                setTimeout(poll, 1000);
                $('#now-playing-image').attr("src", songArt);
            }
        });
    }
    poll();
});


// Now we need to run the code that will be executed only for listen page.

myApp.onPageInit('listen', function (page) {
    myApp.alert('Please note, this is an early beta and soeme features may be missing or not working.', "Haus");

    // Past Metadata
    var song0ID = "";

    function pollPast(){
        $.getJSON("http://admin.hausradio.co.uk/api/nowplaying", function(data){
            var songHistory = data[0]['song_history'];
            if ((songHistory[0]['song']['id'] != song0ID)) {
                song0ID = songHistory[0]['song']['id'];
                songArtist0 = songHistory[0]['song']['artist'];
                songTitle0 = songHistory[0]['song']['title'];
                songArt0 = songHistory[0]['song']['art'];
                $('#song-artist-0').text(songArtist0);
                $('#song-title-0').text(songTitle0);
                $('#song-art-0').attr("src", songArt0);

                song1ID = songHistory[1]['song']['id'];
                songArtist1 = songHistory[1]['song']['artist'];
                songTitle1 = songHistory[1]['song']['title'];
                songArt1 = songHistory[1]['song']['art'];
                $('#song-artist-1').text(songArtist1);
                $('#song-title-1').text(songTitle1);
                $('#song-art-1').attr("src", songArt1);

                song2ID = songHistory[2]['song']['id'];
                songArtist2 = songHistory[2]['song']['artist'];
                songTitle2 = songHistory[2]['song']['title'];
                songArt2 = songHistory[2]['song']['art'];
                $('#song-artist-2').text(songArtist2);
                $('#song-title-2').text(songTitle2);
                $('#song-art-2').attr("src", songArt2);

                song3ID = songHistory[3]['song']['id'];
                songArtist3 = songHistory[3]['song']['artist'];
                songTitle3 = songHistory[3]['song']['title'];
                songArt3 = songHistory[3]['song']['art'];
                $('#song-artist-3').text(songArtist3);
                $('#song-title-3').text(songTitle3);
                $('#song-art-3').attr("src", songArt3);

                song4ID = songHistory[4]['song']['id'];
                songArtist4 = songHistory[4]['song']['artist'];
                songTitle4 = songHistory[4]['song']['title'];
                songArt4 = songHistory[4]['song']['art'];
                $('#song-artist-4').text(songArtist4);
                $('#song-title-4').text(songTitle4);
                $('#song-art-4').attr("src", songArt4);

                //pollTime = data[0]['now_playing']['remaining']+"000"; //production
                setTimeout(pollPast, pollTime);
            }
            else {
                setTimeout(pollPast, 1000);
            }
        });
    }
    pollPast();
})
