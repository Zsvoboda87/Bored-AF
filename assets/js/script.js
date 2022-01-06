$(document).foundation();

var searchMoviesBtn = document.querySelector("#search-movies");
var runGenreSearch= document.querySelector("#search-genre");
var modalBg = document.querySelector(".modal-bg");
var checkboxes = document.querySelectorAll(".checkbox");
var movieSuggestions = document.querySelector(".movie-suggestion")

var str = "";


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
    // console.log(mTitle)
    // console.log(mImageURL)

    var movTitleEl = document.createElement("h3");
    movTitleEl.textContent = mTitle;
    movieSuggestions.appendChild(movTitleEl);

    var movImageEl = document.createElement("img");
    movImageEl.src = mImageURL
    movImageEl.classList.add("mov-image-width")
    movieSuggestions.appendChild(movImageEl);
}
