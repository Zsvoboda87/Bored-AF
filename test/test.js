var arrMovies = ["Cars", "Cars 2"];
var containerEl = document.querySelector(".container")

for(i=0; i<arrMovies.length; i++){
    var newP = document.createElement("p");
    newP.textContent = arrMovies[i]
    newP.setAttribute("data-mTitle", arrMovies[i])
    var newBtn = document.createElement("button");
    newBtn.textContent = "Save"
    newBtn.addEventListener("click", saveToLocal)

    containerEl.appendChild(newP)
    containerEl.appendChild(newBtn)
}

function saveToLocal(e) {
    localStorage.setItem(e.target.previousElementSibling.dataset.mtitle)
}
