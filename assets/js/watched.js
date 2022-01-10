var watchedmv = JSON.parse(localStorage.getItem("watched"));
var previousmovies = document.querySelector("#wmovies");

var checklocal = function() {
    if (localStorage.getItem("watched")) {
        console.log(watchedmv);
        for (i=0; i<watchedmv.length; i++) {
            var mTitle = watchedmv[i].title;
            var mImageURL = watchedmv[i].image;
            displaywatched(mTitle,mImageURL);
        }
    }
};


 var displaywatched = function(mTitle, mImageURL) {
    //  console.log(mTitle);
    //  console.log(mImageURL);
    
    var movieCard = document.createElement("div")
    movieCard.classList.add("mov-image-width")

    var movTitleEl = document.createElement("h4");
    movTitleEl.setAttribute("data-mTitle", mTitle)
    movTitleEl.textContent = mTitle;
    movieCard.appendChild(movTitleEl);

    var movImageEl = document.createElement("img");
    movImageEl.src = mImageURL
    
    movieCard.appendChild(movImageEl);

    previousmovies.appendChild(movieCard);
}

checklocal();