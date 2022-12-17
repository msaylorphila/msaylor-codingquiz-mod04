var startGame = document.getElementById("start-game")
var timerEl = document.getElementById("timer")
var secondsLeft = 60
var questionEl = document.getElementById("question")
var quizEl = document.getElementById("quiz-here")
var questionIndex = 0
var responses = document.querySelectorAll(".response")
var startButton = document.getElementById("start-game")
var score = 0
var resultsMessage = document.getElementById("results-message")
var resultsScore = document.getElementById("results-score")
var saveScore = document.getElementById("initials")
var submit = document.getElementById("submit")
var initialsLoc = localStorage.getItem("initialSet")
var scoreLoc = localStorage.getItem("score")
var initialsVal = document.getElementById("initialsVal")


var questions = [{
    question: "How do you call a function named myFunction?",
    choices: {
        correct: "myFunction()",
        responses: ["myFunction()", "!myfunction", "myFunction", ".myFunction"]
    }
}, {
    question:"How would we write that i is strictly equal to five?",
    choices: {
        correct: "i === 5",
        responses: ["i = 5", "i === 5", "I < 5", "i != 5"]
    }
}, {
    question:"How would we link our JavaScript file to our HTML file?",
    choices: {
        correct: "<script>",
        responses: ["<js>", "<javaScript>", "<script>", "<script href>"]
    }
}, {
    question:"Is JavaScript case sensitive?",
    choices: {
        correct: "Yes",
        responses: ["No", "Yes"]
    }
}]

initialsVal.classList.add('hide')

// WHEN I answer a question 
// THEN I am presented with another question *
// WHEN I answer a question incorrectly 
// THEN time is subtracted from the clock *
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over*
// THEN I can save my initials and my score

function startQuiz() {
    questionIndex = 0;
    score = 0;
    startButton.classList.add("hide")
    quizEl.classList.remove('hide')
    results.classList.add('hide')
    startTimer()
    writeQuestion(questionIndex)
}

function startTimer() {
    var timerInterval = setInterval(function timerFunction() {
        secondsLeft--;
        timerEl.textContent = secondsLeft + " seconds left until end of quiz";

        if(secondsLeft === 0 || questionIndex >= questions.length) {
            clearInterval(timerInterval);
            stopQuiz();

        }
       
}, 1000)}

function writeQuestion(index) {
    var currentQuestion = questions[index];
    questionEl.textContent = currentQuestion.question;
    for (var i = 0; i < responses.length; i++) {
        responses[i].textContent = currentQuestion.choices.responses[i];
        responses[i].value = currentQuestion.choices.responses[i];
        responses[i].onclick = function() { selectOption(this.value, currentQuestion) }
    }
}

function selectOption(value, question) {
    if (value === question.choices.correct){
        score++
        console.log(value)
    } else {
        secondsLeft -= 5
        console.log("hah you dumb bitch")
    }
    console.log("score: " + score.toString())
    questionIndex++;
    if ( questionIndex >= questions.length ) {
        stopQuiz();
        return
    }
    writeQuestion(questionIndex)
    console.log(questionIndex)
    
}

function stopQuiz() {
    quizEl.classList.add('hide')
    startButton.classList.remove('hide')
    results.classList.remove('hide')
    initialsVal.classList.remove('hide')
    timerEl.textContent = "Quiz ended"


    // reset 
   
}


function submitResults() {
    var inputVal = saveScore.value
    localStorage.setItem("initialSet", inputVal);
    localStorage.setItem("score", score)
    displayScores()
    initialsVal.classList.add('hide')
}

function displayScores() { 
    results.classList.remove('hide')
    resultsMessage.textContent = ("Thank you for playing " + initialsLoc + "!")
    resultsScore.textContent = ("You scored " + scoreLoc + "!")
    

}


submit.onclick = submitResults




startButton.onclick = startQuiz