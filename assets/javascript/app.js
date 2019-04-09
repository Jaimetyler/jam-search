$(document).ready(function(){
    $("#artist-review").hide();
    $(".wrap").hide();
  
    $("#submit").on("click", function () {
  
        $(".wrap").hide();
        $(".img").show();
        //$(code to send to firebase).????();
        $("#textarea").val('');
        $("#review").show();
    })
    $("#close").on("click", function () {
  
        $(".wrap").hide();
        $(".img").show();
        $("#review").show();
  
    })
  
    $(".img").on("click", function () {
  
        $(".wrap").show();
        $(".img").hide();
        $("#review").hide();
  
    })
  

 // Initialize Firebase  
var config = {
  apiKey: "AIzaSyBFpSgNqrH_XGmnK5tJgp7s-qPlDqe2vUM",
  authDomain: "project-x-60d84.firebaseapp.com",
  databaseURL: "https://project-x-60d84.firebaseio.com",
  projectId: "project-x-60d84",
  storageBucket: "project-x-60d84.appspot.com",
  messagingSenderId: "905166809578"
};  
firebase.initializeApp(config);

var reviewData = firebase.database();

//creating variables that will be stored
var review;
var rating;

$("#add-review").on("click", function(){
  event.preventDefault();

  review = $("#review-input").val().trim();

  reviewData.ref().push({
    review: review,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
});    
//Ask Jaime what this code is doing?
$("form")[0].reset();
});

//global variable

var artist = $("#artist-input").val().trim();

function searchBandEvents(artist) {
  console.log(artist);
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=47972149c9ef95f0470de3a7f2d73af9&date=upcoming";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //print the entire object to console
    console.log(response);
    for (i = 0; i < response.length; i++) {

    var eventDate = response[i].datetime;  
    var venueName = response[i].venue.name;
    var location = response[i].venue.city;
    var ticketURL = response[i].offers[0].url;

    var datePretty = moment(eventDate).format("MM/DD/YYYY");
    
    $("#events-table").append(`
      <tr>
      <td> ${datePretty} </td>
      <td> ${venueName} </td>
      <td> ${location} </td>
      <td> <a href=${ticketURL} target="_blank"> Buy Tickets </a> </td>

      </tr>


    `)  
    }
    
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
      var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
      var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
      var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

      // Empty the contents of the artist-div, append the new artist content
      $("#artist-div").empty();
      $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
    });  
  }  

  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#artist-input").val().trim();
    console.log(inputArtist)
    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchBandsInTown(inputArtist);
    searchBandEvents(inputArtist);
  });  
})  






console.log("this is a test to the Dom");
// animates the search bar......
$(function() {

var searchField = $ ('#query');
var icon = $('#search-btn');

$(searchField).on('focus', function() {

$(this).animate({

  width:'100%'
}, 100);
$(icon).animate({

right: '10px'

}, 100 );

});

$(searchField).on('blur', function() {

  if(searchField.val()== ''){

      $(searchField).animate({

          width: '45%'


      }, 100, function() {});

      $(icon).animate({

          right: '360px'


      }, 100, function() {});

  }
  
  });

  //end of the animation of search bar code.......





  $('#search-form').submit(function(e){

      e.preventDefault();

  });

})



function search () {

$('#results').html('');
$('#buttons').html('');

//Get For input
q = $('#query').val();

//run Get Request on API

$.get(
  "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      type:'video',
      key: 'AIzaSyAuU2FUW6RgwQSKOnI0TQDGGkJxBG81ksA'},

      function(data) {
          var nextPageToken = data.nextPageToken;
          var prevPageToken = data.prevPageToken;


          //loging the data
          console.log(data);

          $.each(data.items, function(i, item){


              //getting the output
              var output = getOutput (item);

              //Display Results

              $('#results').append(output);




          });
          

      }
);
};


function getOutput (item){

  var videoId = item.id.videoId;

  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.ChannelTitle;
  var videoDate = item.snippet.publishedAt;

  // appends to the html
  var output = '<li>' +
  '<div class = "list-left">' +
  '<img src="'+thumb+'">' +
  '</div>' +
  '<div class="list-right">' +
  '<h3><a class = "iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
  '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
  '<p>'+description+'</p>' +
  '</div>'+
  '</li>' +
  '< div class= "clearfix"></div>'+
  '';



  //old iframe code that didn't work.......
//<iframe src="https://gifer.com/embed/NgUv" width=480 height=328.800 frameBorder="0" allowFullScreen></iframe><p><a href="https://gifer.com">

  return output;






}


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
        $("#youtube-div").hide;
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
  

  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#artist-input").val().trim();
    
    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchYoutube(inputArtist);
    onPlayerReady();

  });

