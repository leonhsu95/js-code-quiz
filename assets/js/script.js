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
                quizFinish();
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

// Show score form and replace main content
function quizFinish() {
   quizEndEl = document.createElement("div");
   quizEndEl.setAttribute("class", "quiz-end");    

   var h1El = document.createElement("h1");
   h1El.textContent = "Quiz Over";

   var pEl = document.createElement("p");
   pEl.textContent = "Your final score is " + timer + ".";

   var scoreFormEl = document.createElement("form");
   scoreFormEl.setAttribute("class", "score-form");
   var scoreLabelEl = document.createElement("label");
   scoreLabelEl.textContent = "Enter initials: ";
   var scoreInputEl = document.createElement("input");
   scoreInputEl.setAttribute("type", "text");
   var scoreSubmitEl = document.createElement("input");
   scoreSubmitEl.setAttribute("type", "submit");
   scoreSubmitEl.setAttribute("id", "submit");
   scoreLabelEl.appendChild(scoreInputEl);
   scoreFormEl.appendChild(scoreLabelEl);
   scoreFormEl.appendChild(scoreSubmitEl);

   quizEndEl.appendChild(h1El);
   quizEndEl.appendChild(pEl);
   quizEndEl.appendChild(scoreFormEl);
   mainContent.replaceChild(quizEndEl, quizContentEl);

   scoreSubmitEl.addEventListener("click", function(event) {
       event.preventDefault();

       if (scoreInputEl.value === "") {
           alert("You must enter your initials!");
           return null;
       }

       saveScore(scoreInputEl.value, timer);
       window.location = "highscores.html";
   })
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

// HIGH SCORES

// Saving Scores as Array Object
var scoreList = document.querySelector("#highscore-list");

var highscores = {
    initials : [],
    scores : [],
}

// Save Scores to local storage

function saveScore(newInitials, newScore) {
    getScores();
    
    highscores.initials.push(newInitials);
    highscores.scores.push(newScore);
    
    var highscoresData = JSON.stringify(highscores);
    localStorage.setItem("highscores", highscoresData);
}

// Fetch Scores to local storage and sort them as High Scores
function getScores() {
    var storedHighscoresData = localStorage.getItem("highscores");

    if (storedHighscoresData !== null) {
        var storedHighscoresData = JSON.parse(storedHighscoresData);
        highscores.initials = storedHighscoresData.initials;
        highscores.scores = storedHighscoresData.scores;
        highscores.scores.sort((a,b)=>b - a);
    }
    else {
        highscores.initials = [];
        highscores.scores = [];
    }
}

//Show scores as High Scores
function renderScores() {
    scoreList.innerHTML = "";
    getScores();

    for (let i = 0; i < highscores.initials.length; i++) {
        var scoreListEl = document.createElement("li");
        var pEl = document.createElement("p");
        pEl.setAttribute("class", "highscore");
        
        pEl.textContent = (i + 1) + ". " + highscores.initials[i] + ": " + highscores.scores[i];
        
        scoreListEl.appendChild(pEl);
        scoreList.appendChild(scoreListEl);
    }
}

function clearScores() {
    localStorage.removeItem("highscores");
    renderScores();
}

if (scoreList !== null) {
    renderScores();
}

// Add event listener to generate button
if(startQuizButton){
   startQuizButton.addEventListener("click", function() {
       startTimer();
       startQuiz();
   })
}