//global varibables
var bitApiKey = 47972149c9ef95f0470de3a7f2d73af9;
var ytApiKey = AIzaSyDlA29Y9uVBzC2-mNFClceSFZoJI0eew3U;
var artist = $("#artist-input").val().trim();

// build the BandsinTown queryURL
function searchBandsInTown(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=" + bitApiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        //this is where jquery will populate our page.

    });
}
//Still need to build this string
function searchYouTube(artist) {
    //var queryURL = "" + artist + ;
    $.ajax({
    url: queryURL,
    method: "GET"

    }).then(function(response){

        
        });


}