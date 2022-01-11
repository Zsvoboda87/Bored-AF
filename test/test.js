var arrMovies = ["Cars", "Cars 2"];

if(localStorage.getItem("history")){
    arrMovies = JSON.parse(localStorage.getItem("history"))
}
// var containerEl = document.querySelector(".container")

// for(i=0; i<arrMovies.length; i++){
//     var newP = document.createElement("p");
//     newP.textContent = arrMovies[i]
//     newP.setAttribute("data-mTitle", arrMovies[i])
//     var newBtn = document.createElement("button");
//     newBtn.textContent = "Save"
//     newBtn.addEventListener("click", saveToLocal)

//     containerEl.appendChild(newP)
//     containerEl.appendChild(newBtn)
// }

// function saveToLocal(e) {
//     console.log(e.target.previousElementSibling.dataset.mtitle)
// }

document.getElementById("saveBtn").addEventListener("click", function() {
    arrMovies.push(document.getElementById("idk").value)
    localStorage.setItem("history", JSON.stringify(arrMovies))
})