$(document).foundation();

var searchMoviesBtn = document.querySelector("#search-movies");

var modalBg = document.querySelector(".modal-bg");


searchMoviesBtn.addEventListener("click", function(){
    modalBg.classList.add("bg-active")
    console.log("click")
})