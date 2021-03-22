//Button
var startButton = document.querySelector("#startGame");


// Arrays
var characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "];


// you can turn to string ="abc...89".split("");

function init(){
    getWins();
    getLosses();
}

function startGame(){

}


// Add event listener to generate button
generateBtn.addEventListener("click", startGame);