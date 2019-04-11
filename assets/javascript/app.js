$(document).ready(function () {
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

  const reviewData = firebase.database(artist);

  //var key = reviewData.key;
  //var reviewArtist = firebase.database().ref().key();

  //creating variables that will be stored
  var artistSearched;
  var numberOfSearches = 0;

  //function writeReview(artistSearched) {
     // reviewData.ref(artistSearched).set({
      //artistSearched: artistSearched,
      //review: review,
      //dataAdded: firebase.database.ServerValue.TIMESTAMP

  //});
  //}

  $("#submit").on("click", function () {
    event.preventDefault();

    review = $("#artistReview").val().trim();

    //how can i make this a parent in the data tree?????
    artistSearched = $("#query").val().trim();

    //writeReview();
    reviewData.ref().push({
    artistSearched: artistSearched,
    //numberOfSearches: numberOfSearches,
    review: review,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    //can i loop through this and append each review that finds the searched artist?


    console.log(artistSearched);
    console.log(review);
  });


  //global variable

  var artist = $("#query").val().trim();

  function searchBandEvents(artist) {
    console.log(artist);
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=47972149c9ef95f0470de3a7f2d73af9&date=upcoming";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      //empty table 
      $("#events-table").empty();
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
    }).then(function (response) {

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
  $("#select-artist").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#query").val().trim();
    console.log(inputArtist)
    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchBandsInTown(inputArtist);
    searchBandEvents(inputArtist);
    search();

  });



  function search() {

    $('#results').html('');
    $('#buttons').html('');

    //Get For input
    q = $('#query').val();

    //run Get Request on API

    $.get(
      "https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        type: 'video',
        key: 'AIzaSyAuU2FUW6RgwQSKOnI0TQDGGkJxBG81ksA'
      },

      function (data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;


        //loging the data
        console.log(data);

        $.each(data.items, function (i, item) {


          //getting the output
          var output = getOutput(item);

          //Display Results

          $('#results').append(output);




        });


      }
    );
  };


  function getOutput(item) {

    var videoId = item.id.videoId;

    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.ChannelTitle;
    var videoDate = item.snippet.publishedAt;

    // appends to the html
    var output = '<li>' +
      '<div class = "list-left">' +
      '<img src="' + thumb + '">' +
      '</div>' +
      '<div class="list-right">' +
      '<h3><a class = "iframe" href="http://www.youtube.com/watch/' + videoId + '"target="_blank">' + title + '</a></h3>' +
      '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
      '<p>' + description + '</p>' +
      '</div>' +
      '</li>' +
      '';





    return output;






  }


});
