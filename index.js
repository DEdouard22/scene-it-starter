$(function() {

    //jQuery form submit listener:
    $('form').on('submit', function(e){
        e.preventDefault();

        var searchString = $('.search-bar').val();
        var urlEncodedSearchString = encodeURIComponent(searchString);
        $.ajax({
            url: 'http://www.omdbapi.com/?apikey=3430a78&s=' + urlEncodedSearchString,
            method: "GET",
            success: function(response){
                movieData = response.Search;
                var finalHTML = renderMovies(response.Search);
                $('.movies-container').html(finalHTML);
                var watchlistJSON = localStorage.getItem('watchlist');

            var watchlist = JSON.parse(watchlistJSON);
            watchlist.forEach(function(current){
            var imdbID = current.imdbID;
            console.log(imdbID);
            $("[data-id='"+imdbID+"']").html('ADDED');
            $("[data-id='"+imdbID+"']").toggleClass('btn-success');    
        });  
            }
        });

        /*
        var finalHTML = renderMovies(movieData);
        $('.movies-container').html(finalHTML);*/
        //Need a way to view what is currently in local storage and prevent user from adding
        //  the same movie multiple times.
        
    }); 

    $('.movies-container').on('click', '.add-movie', function(){
        var imdbID = $(this).data('id');
        var movie = movieData.find(function(currentMovie){
            return currentMovie.imdbID == imdbID;
        });
        var newWatchlist = [];
        console.log(newWatchlist)
        var watchlistJSON = localStorage.getItem('watchlist');
        console.log(watchlistJSON);
        var watchlist = JSON.parse(watchlistJSON);
        if (watchlist != null) {
            console.log("There is already a list in the local storage");
            console.log(watchlist);
            newWatchlist = watchlist;
        }
        newWatchlist.push(movie);
        watchlistJSON = JSON.stringify(newWatchlist);
        localStorage.setItem('watchlist', watchlistJSON);
        console.log("There should be something in the local storage now");
        //console.log($(this).prop('disabled'));
        $(this).prop('disabled', true);
        //console.log($(this).prop('disabled'));
        console.log(this);
        $(this).html('ADDED');
		$(this).toggleClass('btn-success');

    });

    //define a function called renderMovies
    function renderMovies(movieArray){
        var finalHTML = "";
        movieArray.forEach(function(currentMovie){
            finalHTML += '<div class="col-sm-4"> <div class="movie"> <div class="card">';
            finalHTML += '<img class="card-img-top " + src="' + currentMovie.Poster + '" alt="Card image cap">';    
            finalHTML += '<div class="card-body"> <h5 class="card-tite">' + currentMovie.Title + '</h5>';
            finalHTML += '<span class="card-text">' + currentMovie.Year + '</span>';
            finalHTML += '<a href="#" data-id="'+ currentMovie.imdbID +'" class="add-movie btn btn-primary">Add</a>';
            finalHTML += '</div></div></div></div>';
        });
        return finalHTML;
    } 

});
