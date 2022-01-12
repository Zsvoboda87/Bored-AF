$(document).foundation();
//universal variables
var homeBtn = document.querySelector("#home");

// variables for Movie Search
var searchMoviesBtn = document.querySelector("#search-movies");
var runGenreSearch= document.querySelector("#search-genre");
var modalBg = document.querySelector(".modal-bg");
var checkboxes = document.querySelectorAll(".checkbox");
var movieSuggestions = document.querySelector("#movie-suggestion")
var str = "";

// variables for Youtube Search
var youtubeEL = document.querySelector("#youtube-suggestion");
var youtubeModalBg = document.querySelector("#youtube-modal-bg")
var searchYoutubeBtn = document.querySelector("#search-youtube");
var runYoutubeSearch = document.querySelector("#run-youtube-search")
var inputOne = document.querySelector("#input-1")
var promptEl = document.querySelector("#prompt")
var formEl = document.querySelector("#youtube-form")
var promptArray = [ "What is your favorite animal?","What is your favorite food?","What is your favorite sport?","Write the first word you can think of.","What is the coolest place you've been?", "Name a hobby.", "Name a planet.",]

//save watched movies var
var watched = [];
var x = 0;

//variables for NYT book search
var searchNewsBtn = document.querySelector("#search-news");
var newsSuggestions = document.querySelector("#news-suggestion");

//variables for podcast search
var searchPodcastBtn = document.querySelector("#search-podcasts");
var podcastSuggestions = document.querySelector("#podcast-suggestion");
var podcastModal = document.querySelector("#podcast-modal");
var runPodcastSearch = document.querySelector("#search-podcast");

var clearDisplay = function () {
    if(document.querySelector(".video-card"))
    {
        document.querySelectorAll(".video-card").forEach(el => el.remove());
    }
    if(document.querySelector(".movie-card"))
    {
        document.querySelectorAll(".movie-card").forEach(el => el.remove());
    }
    if(document.querySelector(".podcast-card"))
    {
        document.querySelectorAll(".podcast-card").forEach(el => el.remove());
    }
}

// functions for Movie Search
var movieAPI = function (genre) {
    var apiUrl = "https://imdb-api.com/API/AdvancedSearch/k_0m8x9src/?genres=" + genre + "&count=50"
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                for(i=0; i < 4; i++) {
                var r = (Math.floor(Math.random() * 50));
                var mTitle = data.results[r].title;
                var mImageURL = data.results[r].image
                displayMovies(mTitle, mImageURL)
            }
        
        })} else {
            window.alert('not valid')
        }
    });
};

var resetCheckboxes = function() {
    str = "";
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

var displayMovies = function (mTitle, mImageURL) {
    var movieCard = document.createElement("div")
    movieCard.classList.add("mov-image-width")
    movieCard.classList.add("movie-card")

    var movTitleEl = document.createElement("h4");
    movTitleEl.setAttribute("data-mTitle", mTitle)
    movTitleEl.textContent = mTitle;
    movieCard.appendChild(movTitleEl);

    var movImageEl = document.createElement("img");
    movImageEl.src = mImageURL
    movieCard.appendChild(movImageEl);

    var watchedEl = document.createElement("button");
    watchedEl.textContent = "Watched";
    watchedEl.classList.add("watchedbtn");
    watchedEl.addEventListener("click", saveMovies);
    movieCard.appendChild(watchedEl);
    movieSuggestions.appendChild(movieCard);
}

// event Listeners for Movie Search
searchMoviesBtn.addEventListener("click", function(){
    modalBg.classList.add("bg-active")
    searchMoviesBtn.classList.add("is-active")
    homeBtn.classList.remove("is-active");
    

})

runGenreSearch.addEventListener('click', function(){
    modalBg.classList.remove("bg-active");
    clearDisplay ();
    for ( i = 0; i < checkboxes.length; i++)  {
        if ( checkboxes[i].checked === true ){
            str += checkboxes[i].value + ","
        }
    };
    movieAPI (str);
    resetCheckboxes();
})

//save watched movies
var saveMovies = function (e) {
    //add localstorage
    var movietitle = e.target.previousElementSibling.previousElementSibling.dataset.mtitle;
    var movieimage = e.target.previousElementSibling.src;
 
    watched[x] = {
        title: movietitle,
        image: movieimage
    };
    localStorage.setItem("watched", JSON.stringify(watched));
    x++;
};


// function for YouTube Search
var youtubeAPI = function (keyword) {
    var apiUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + keyword + '&type=video&videoDuration=short&videoEmbeddable=true&key=AIzaSyCqv1-wCJ6ZsvLMDOpmxtMGoR-VPFEhraY'
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                for(i=0; i < 4; i++) {
                var x = data.items[i].id.videoId
                var title = data.items[i].snippet.title
                displayVideos(x, title)
            }       
        })} else {
            window.alert('not valid')
        }
    });
};

var displayVideos = function(youtubeID, vidtitle) {
    var videoCard = document.createElement("div")
    videoCard.classList.add("video-card")

    var vidTitleEl = document.createElement("h3");
    vidTitleEl.textContent = vidtitle;
    videoCard.appendChild(vidTitleEl);

    var addLink = document.createElement("div");
    addLink.innerHTML = "<iframe src='https://www.youtube.com/embed/" + youtubeID + "'" + ' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    videoCard.appendChild(addLink)

    youtubeEL.appendChild(videoCard)
}

// Event Listeners for Youtube
searchYoutubeBtn.addEventListener("click", function() {
    youtubeModalBg.classList.add("bg-active");
    searchMoviesBtn.classList.remove("is-active");
    homeBtn.classList.remove("is-active");
    searchYoutubeBtn.classList.add("is-active");
    promptEl.innerHTML = promptArray[Math.floor(Math.random() * promptArray.length)];
});

runYoutubeSearch.addEventListener("click", function(){
    event.preventDefault();
    clearDisplay ();
    var keyword = inputOne.value.trim();
    youtubeAPI(keyword);
    youtubeModalBg.classList.remove("bg-active");
})

var podcastSearch = function(genre) {
    
    var podcastApi = "https://itunes.apple.com/search?entity=podcast&term=" + genre;
    //"https://itunes.apple.com/search?term=podcast&genreId=" + genreId + "1402&limit=200"

    fetch (podcastApi).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                console.log(response);
                for (i=0; i <4; i++) {
                    var pTitle = data.results[i].collectionCensoredName;
                    var pImageUrl = data.results[i].artworkUrl600;
                    displayPodcasts(pTitle, pImageUrl);
                }
            })
        } else {
            window.alert("Selection not valid");
        }
    });
};

var displayPodcasts = function(pTitle, pImageUrl) {
    
    var podcastCard = document.createElement("div")
    podcastCard.classList.add("podcast-card");
    podcastCard.classList.add("mov-image-width");

    var podcastTitleEl = document.createElement("h4");
    podcastTitleEl.textContent = pTitle;
    podcastCard.appendChild(podcastTitleEl);

    var podcastImageEl = document.createElement("img");
    podcastImageEl.src = pImageUrl;
    podcastCard.appendChild(podcastImageEl);

    podcastSuggestions.appendChild(podcastCard);
}

searchPodcastBtn.addEventListener("click", function() {
    podcastModal.classList.add("bg-active")
    searchYoutubeBtn.classList.remove("is-active");
    searchMoviesBtn.classList.remove("is-active");
    homeBtn.classList.remove("is-active");
    searchPodcastBtn.classList.add("is-active");
});

runPodcastSearch.addEventListener("click", function(){
    clearDisplay();
    podcastModal.classList.remove("bg-active");
    for (i =0; i <checkboxes.length; i++) {
        if (checkboxes[i].checked === true) {
            str += checkboxes[i].value + ","
        }
    };
    podcastSearch (str);
    resetCheckboxes();
})

homeBtn.addEventListener("click", clearDisplay);

// extra in case we want it?//

var searchNews = function() {

    var newsApiUrl = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=IYDpG9xMMIk6UUTyg8wlaTFT4MCtOg7W";
 
    fetch(newsApiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
            for(i=0; i<10; i++) {
                var newsTitle = data.results[i].title;
                var newsURL = data.results[i].url;
                // var newsImage = data.results[0].media[0].media-metadata[2].url;
                displayNews(newsTitle,newsURL);
            }    
            })
        } else {
            window.alert("selection not valid")
        }
    });
};

var displayNews = function(nTitle, nImageUrl) {

    var newsCard = document.createElement("div")
    newsCard.classList.add("news-card");

    var newsTitleEl = document.createElement("h4");
    newsTitleEl.textContent = nTitle;
    newsCard.appendChild(newsTitleEl);

    var newsURLEl = document.createElement("a");
    newsURLEl.textContent = "Read This Article Here";
    newsURLEl.href = nImageUrl;
    newsCard.appendChild(newsURLEl);

    //var newsImageEl = document.createElement("img");
    // newsImageEl.src = nImageUrl;
    // newsImageEl.classList.add("mov-image-width");
    // newsCard.appendChild(newsImageEl);

    movieSuggestions.appendChild(newsCard);
};


// event listeners
searchNewsBtn.addEventListener("click", function(){
    searchNews();
});

