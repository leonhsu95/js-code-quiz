// STARTING GAME
var startButton = document.querySelector("#startGame");


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
    title: "What can be expected from  === ?",
    choices: ["The value is the same", "The datatype is the same", "Both value and datatpe are the same", "one variable is forced to equal another variable"],
    answer: "Both value and datatpe are the same"
 },

];

function startGame(){

}


// Add event listener to generate button
generateBtn.addEventListener("click", startGame);