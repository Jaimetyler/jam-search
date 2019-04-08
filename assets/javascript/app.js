 $(document).ready(function(){

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
