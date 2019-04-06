console.log("this is a test to the Dom");

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


    var output = '<li>' +
    '<div class = "list-left">' +
    '<img src="'+thumb+'">' +
    '</div>' +
    '<div class="list-right">' +
    '<h3><a class = "fancybox fancybox.iframe" href="http://www.youtube.com/embed/">'+videoID+''+title+'</a></h3>' +
    '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
    '<p>'+description+'</p>' +
    '</div>'+
    '</li>' +
    '< div class= "clearfix"></div>'+
    '';

//<iframe src="https://gifer.com/embed/NgUv" width=480 height=328.800 frameBorder="0" allowFullScreen></iframe><p><a href="https://gifer.com">

    return output;






}



