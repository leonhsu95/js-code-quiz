// STARTING GAME VARIABLES
var timeLeft = 75+1;
var score = parseInt(timeLeft);
var startButton = document.querySelector("#start-button");
var homeScreen = document.querySelector("#home-screen");
var body = document.body;
var quizContent = document.createElement("div");
var questionTitle = document.createElement("h2");
var questionList = document.createElement("ul");
var feedbackEl = document.createElement("div");
var feedbackResponseEl = document.createElement("p");

quizContent.setAttribute("class","quiz-content");
questionTitle.setAttribute("class","questions-title");
questionList.setAttribute("class","questions-list");
feedbackEl.setAttribute("class", "feedback");
feedbackResponseEl.setAttribute("class", "feedback");


function startQuiz(){

   function isCorrect(){
      questionList.addEventListener("click",function(event){

         var element = event.target;
         quizContent.appendChild(feedbackEl);
         feedbackEl.appendChild(feedbackResponseEl);
             
         if (element.matches(".questions-button")){

            var buttonValue = element.getAttribute("data-value");      
         
            if (buttonValue === sample[currentQuestionIndex].answer) {
               
              feedbackResponseEl.textContent= "Correct!";
            }
            else{
              feedbackResponseEl.textContent= "Wrong!";
              timeLeft= timeLeft-15;
            }
         }
      })
   }

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

            var questionChoiceEl = document.createElement("li");
            var questionButtonEl = document.createElement("button");
            var questionValueEl = sample[currentQuestionIndex].choices[i];
           

            questionChoiceEl.setAttribute("class","questions-choice");
            questionButtonEl.setAttribute("class","questions-button");
            questionButtonEl.setAttribute("data-value", questionValueEl);
            
            questionList.appendChild(questionChoiceEl);
            questionChoiceEl.appendChild(questionButtonEl);
            questionButtonEl.textContent = sample[currentQuestionIndex].choices[i];
                 
          }

       //These buttons need to have an on click handler that does a few things
       // 1) It should check the value of the button and compare it to sample[currentQuestionIndex].answer
       // 2) It should call GetNextQuestion()

    }

   
   
   getNextQuestion();
   isCorrect();
  
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