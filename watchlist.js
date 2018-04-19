$(function() {
    var watchlistJSON = localStorage.getItem('watchlist');
    var watchlist = JSON.parse(watchlistJSON);
    var finalHTML = renderMovies(watchlist);
    $('.movies-container').html(finalHTML);

    function renderMovies(movieArray){
        var finalHTML = "";
        movieArray.forEach(function(currentMovie){
            finalHTML += '<div class="col-sm-4"> <div class="movie"> <div class="card">';
            finalHTML += '<img class="card-img-top " + src="' + currentMovie.Poster + '" alt="Card image cap">';    
            finalHTML += '<div class="card-body"> <h5 class="card-tite">' + currentMovie.Title + '</h5>';
            finalHTML += '<span class="card-text">' + currentMovie.Year + '</span>';
            finalHTML += '<a href="#" data-id="'+ currentMovie.imdbID +'" class="remove-movie btn btn-danger">Remove</a>';
            finalHTML += '</div></div></div></div>';
        });
        return finalHTML;
    } 

    $('.movies-container').on('click', '.remove-movie', function(){
        var imdbIDtoRemove = $(this).data("id");
        watchlist = watchlist.filter(function(currentMovie){
            console.log(imdbIDtoRemove);
            console.log(currentMovie.imdbID);
            return currentMovie.imdbID != imdbIDtoRemove;
        });
        var watchlistJSON = JSON.stringify(watchlist);
        localStorage.setItem("watchlist", watchlistJSON);
        $(this).parent().parent().parent().parent().remove();

    });

});