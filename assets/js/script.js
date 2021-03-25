//STARTING GAME VARIABLES

// Time Parameters
var timer = 80;
var timeLeft = document.querySelector("#seconds");
var timerInterval;

// Index Elements
var mainContent = document.querySelector("main");
var quizHome = document.querySelector(".quiz-home");
var startQuizButton = document.querySelector("#start-button");
var quizContentEl;
var quizEndEl;


// START QUIZ FUNCTION WHEN START BUTTON IN CLICKED

function startQuiz() {
    var currentQuestionIndex = 0;
    
    quizContentEl = document.createElement("div");
    quizContentEl.setAttribute("class", "quiz-content");

    var quizQuestionTitleEl = document.createElement("h2");
    quizQuestionTitleEl.setAttribute("class", "quiz-title");

    // Set the text content of an element equal to sample[currentQuestionIndex].title

    quizQuestionTitleEl.textContent = questionSample[currentQuestionIndex].title;

    var quizAnswers = document.createElement("ul");
    quizAnswers.setAttribute("class", "quiz-answers");

    // Create a for loop that creates a button for each element in questionSample[currentQuestionIndex].choices

    for (let i = 0; i < 4; i++) {
        var scoreListEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("class", "quiz-choice");
        buttonEl.setAttribute("data-id", i);
        buttonEl.textContent = (i + 1) + ". " + questionSample[currentQuestionIndex].choices[i];

        scoreListEl.appendChild(buttonEl);
        quizAnswers.appendChild(scoreListEl);
    }

    quizContentEl.appendChild(quizQuestionTitleEl);
    quizContentEl.appendChild(quizAnswers);
    mainContent.replaceChild(quizContentEl, quizHome);

    // Create a for loop that advances the question when any questionSample.choices button is pressed

    var allQuestionsButtons = quizAnswers.querySelectorAll("button");
    
    quizAnswers.addEventListener("click", function(event) {
        var element = event.target;
        if (element.matches("button")) {
            var buttonID = element.getAttribute("data-id");
            checkAnswer(currentQuestionIndex, buttonID);
            currentQuestionIndex++;        
            
            // End quiz when all questions are answered 
            if (currentQuestionIndex === questionSample.length) {
                stopTimer();
                //quizFinish();
                return null;
            }
            quizQuestionTitleEl.textContent = questionSample[currentQuestionIndex].title;
            for (let j = 0; j < 4; j++) {
                allQuestionsButtons[j].textContent = (j + 1) + ". " + questionSample[currentQuestionIndex].choices[j];
            }
        }
    })
}

// ANSWER VALIDATION

// Check if answer if data inside choices buttons match questionSample.choice
function checkAnswer(currentQuestionIndex, buttonID) {    
   var isCorrect = (questionSample[currentQuestionIndex].choices[buttonID] === 
       questionSample[currentQuestionIndex].answer);

   var feedbackEl = document.createElement("div");
   var feedbackReponseEl = document.createElement("p");
   feedbackEl.setAttribute("class", "feedback");

   feedbackEl.appendChild(feedbackReponseEl);
   mainContent.appendChild(feedbackEl);
   
   if (isCorrect) {
       feedbackReponseEl.textContent = "Correct!";
   }
   // Time penalty of -15s when wrong answer is clicked
   else {
       feedbackReponseEl.textContent = "Wrong!";
       if (timer <= 15) {
           timer = 0;
       }
       else {
           timer = timer-15;
       }
   }

   // Show feedback for 0.5s
       setTimeout(function() {
       mainContent.removeChild(feedbackEl);
   }, 500)
}


// TIMER FUNCTION
function startTimer() {
   timeLeft.textContent = timer;

   timerInterval = setInterval(function() {
       if (timer <= 0) {
           stopTimer();
           quizFinish();
           return null;
       }
       timer--;
       timeLeft.textContent = timer;
   }, 1000)
}

function stopTimer() {
   timeLeft.textContent = timer;
   clearInterval(timerInterval);
}


// Add event listener to generate button
if(startQuizButton){
   startQuizButton.addEventListener("click", function() {
       startTimer();
       startQuiz();
   })
}