$(document).foundation();
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


// functions for Movie Search
var movieAPI = function (genre) {
    var apiUrl = "https://imdb-api.com/API/AdvancedSearch/k_0m8x9src/?genres=" + genre + "&count=10"
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                for(i=0; i < 4; i++) {
                var mTitle = data.results[i].title;
                var mImageURL = data.results[i].image
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
    var movTitleEl = document.createElement("h3");
    movTitleEl.textContent = mTitle;
    movieSuggestions.appendChild(movTitleEl);

    var movImageEl = document.createElement("img");
    movImageEl.src = mImageURL
    movImageEl.classList.add("mov-image-width")
    movieSuggestions.appendChild(movImageEl);
}

// event Listeners for Movie Search
searchMoviesBtn.addEventListener("click", function(){
    modalBg.classList.add("bg-active")
})
runGenreSearch.addEventListener('click', function(){
    modalBg.classList.remove("bg-active");
    for ( i = 0; i < checkboxes.length; i++)  {
        if ( checkboxes[i].checked === true ){
            str += checkboxes[i].value + ","
        }
    };
    movieAPI (str);
    resetCheckboxes();
})

// function for YouTube Search
var youtubeAPI = function (keyword) {
    console.log(keyword);
    var apiUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + keyword + '&type=video&videoDuration=short&videoEmbeddable=true&key=AIzaSyCqv1-wCJ6ZsvLMDOpmxtMGoR-VPFEhraY'
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                for(i=0; i < 5; i++) {
                var x = data.items[i].id.videoId
                var title = data.items[i].snippet.title
                addVidLink(x, title)
            }       
        })} else {
            window.alert('not valid')
        }
    });
};

var addVidLink = function(youtubeID, vidtitle) {
    var vidTitleEl = document.createElement("h3");
    vidTitleEl.textContent = vidtitle;
    youtubeEL.appendChild(vidTitleEl);

    var addLink = document.createElement("iframe");
    addLink.src = "https://www.youtube.com/embed/" + youtubeID 
    addLink.allowfullscreen
    youtubeEL.appendChild(addLink)
}

// Event Listeners for Youtube
searchYoutubeBtn.addEventListener("click", function() {
    youtubeModalBg.classList.add("bg-active")
});

runYoutubeSearch.addEventListener("click", function(){
    event.preventDefault();
    var keyword = inputOne.value.trim();
    youtubeAPI(keyword);
    youtubeModalBg.classList.remove("bg-active");
})