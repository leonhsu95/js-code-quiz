// STARTING GAME VARIABLES
var timeLeft = 10+1;
var score = parseInt(timeLeft);
var startButton = document.querySelector("#start-button");
var homeScreen = document.querySelector("#home-screen");
var body = document.body;
var quizContent = document.createElement("div");
var questionTitle = document.createElement("h2");
var questionChoices = document.createElement("ul");
questionTitle.setAttribute("class","questions-title");
questionChoices.setAttribute("class","questions-choices");

console.log();

function startQuiz(){

   var index=0

   homeScreen.innerHTML= "";
   body.appendChild(quizContent);
   quizContent.appendChild(questionTitle);
   quizContent.appendChild(questionChoices);

   for (let i = 0; i < sample.length; i++) {

      
      var choiceList = document.createElement("li");
      var choiceButton = document.createElement("button");
      choiceButton.setAttribute("class", "choice-option");
      
      choiceButton.textContent= sample[index].choices[i];
      console.log(sample[0].choices[i]);

      choiceList.appendChild(choiceButton);
      questionChoices.appendChild(choiceList);

      
   }
  
   
    

}

// TIMER

function timer() {
   var timerInterval = setInterval(function(){
      timeLeft--;
      document.querySelector("#seconds").textContent=timeLeft;

      if(timeLeft <= 0){
         clearInterval(timerInterval);
         
      }


   }, 1000);









}


// Add event listener to generate button
startButton.addEventListener("click", function(){
   startQuiz();
   timer();
});