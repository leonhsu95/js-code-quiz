// STARTING GAME VARIABLES
var timeLeft = 10+1;
var score = parseInt(timeLeft);
var startButton = document.querySelector("#start-button");
var homeScreen = document.querySelector("#home-screen");
var body = document.body;
var quizContent = document.createElement("div");
var questionTitle = document.createElement("h2");
var questionList = document.createElement("ul");

quizContent.setAttribute("class","quiz-content");
questionTitle.setAttribute("class","questions-title");
questionList.setAttribute("class","questions-list");

function test(){
   console.log("hi");
}

function startQuiz(){

   homeScreen.innerHTML= "";

   body.appendChild(quizContent);
   quizContent.appendChild(questionTitle);
   quizContent.appendChild(questionList);

   var currentQuestionIndex = -1;

   function getNextQuestion() {
       
      currentQuestionIndex += 1;

       //Set the text content of an element equal to sample[currentQuestionIndex].title
       questionTitle.textContent = sample[currentQuestionIndex].title;

       //Create a for loop that creates a button for each element in sample[currentQuestionIndex].choices
          for (let i = 0; i < 4; i++) {

            var questionChoice = document.createElement("li");
            var questionButton = document.createElement("button");
            var questionValue = sample[currentQuestionIndex].choices[i];
            var allButtons = document.querySelectorAll(".questions-button");

            questionChoice.setAttribute("class","questions-choice");
            questionButton.setAttribute("class","questions-button");
            questionButton.setAttribute("data-value", questionValue);
            
            questionList.appendChild(questionChoice);
            questionChoice.appendChild(questionButton);
            questionButton.textContent = sample[currentQuestionIndex].choices[i];
                 
          }

         allButtons.forEach(function(event) {
            event.addEventListener("click", test);
         } 

       //These buttons need to have an on click handler that does a few things
       // 1) It should check the value of the button and compare it to sample[currentQuestionIndex].answer
       // 2) It should call GetNextQuestion()

    )}

   function checkAnswer(){
      var isCorrect= (allButtons===sample[currentQuestionIndex].answer);
      var feedback = document.createElement("div");
      var feedbackResponse = document.createElement("p");
      feedback.setAttribute("class", "feedback");
      feedbackResponse.setAttribute("class", "feedback");
      
      quizContent.appendChild(feedback);
      feedback.appendChild(feedbackResponse);

   }

   getNextQuestion();
  
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