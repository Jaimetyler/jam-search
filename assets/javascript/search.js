

var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var videoID;
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    // $('#player').css(hidden);
    
    var player; 
    function onYouTubeIframeAPIReady() {
      console.log("you working?")
      player = new YT.Player('youtube-div', {
        height: '390',
        width: '640',
        videoId: videoID,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
    
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo();
    }
    
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.

    function onPlayerStateChange(event) {
      if (event.data === -1) {
        console.log(event.data)
        $("#youtube-div").remove;
      } else {
        document.getElementById("#youtube-div").style.display = "block";
      }
    } 
    function stopVideo() {
      player.stopVideo();
    }

  function renderYouTube (videoIDImport) {
    
    videoID = videoIDImport
    console.log(videoID)
    player.loadVideoById(videoIDImport)

  }



  function searchYoutube(artist) {

    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoLicense=youtube&q=" + artist + "&key=AIzaSyAhtXj_f5qNBZXU6LiTjrhVTjmQ7Tmk9zQ&videoEmbeddable=true&videoSyndicated=true";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      renderYouTube(response.items[0].id.videoId); //this is bringing back the youtube video ID!!

    });
  }
  function searchBandsInTown(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=47972149c9ef95f0470de3a7f2d73af9";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
      var artistName = $("<h1>").text(response.name);
      var artistURL = $("<a>").attr("href", response.url).append(artistName);
      var artistImage = $("<img>").attr("src", response.thumb_url);
      var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
      var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

      // Empty the contents of the artist-div, append the new artist content
      $("#artist-div").empty();
      $("#artist-div").append(artistURL, artistImage, upcomingEvents, goToArtist);
    });
}
  

  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#artist-input").val().trim();
    
    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchYoutube(inputArtist);
    searchBandsInTown(inputArtist);
    onPlayerReady();

  });