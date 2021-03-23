// STARTING GAME VARIABLES
var timeLeft = 10+1;
var score = parseInt(timeLeft);
var startButton = document.querySelector("#start-button");
var homeScreen = document.querySelector("#home-screen");


// QUESTIONS
var questions = [
 {
     title: "Commonly used data types DO NOT include:",
     choices: ["strings", "booleans", "alerts", "numbers"],
     answer: "alerts"
 },

 {
    title: "How do you create a new line within a string?",
    choices: ["\\*", "\\n", "\\b", "\\l"],
    answer: "parenthesis"
 },

 {
     title: "Which of these is used to contain an array?",
     choices: ["[]", "()", "{}", "<>"],
     answer: "[]"
 },

 {
    title: "What is NULL in JavaScript?",
    choices: ["Undeclared value", "Undefined Value", "NaN", "No Value"],
    answer: "No value"
 },

 {
    title: "Which of these deletes data within an array?",
    choices: ["pop()", "remove()", "delete()", "shift()"],
    answer: "alerts"
 },

 {
    title: "What can be expected from a === b?",
    choices: ["The values of a and b are the same", "The datatype of a and b are the same", "Both value and datatypes of of a and b are the same", "a is declared to be equal to b"],
    answer: "Both value and datatypes of of a and b are the same"
 },

];


function startQuiz(){

   homeScreen.innerHTML= "";
   

}

// TIMER

function timer() {
   var timerInterval = setInterval(function(){
      timeLeft--;
      document.querySelector("#seconds").textContent=timeLeft;

      if(timeLeft === 0){
         clearInterval(timerInterval);
         
      }


   }, 1000);









}


// Add event listener to generate button
startButton.addEventListener("click", function(){
   startQuiz();
   timer();
});