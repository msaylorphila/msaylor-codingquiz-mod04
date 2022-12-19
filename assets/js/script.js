var startGame = document.getElementById("start-game")
var timerEl = document.getElementById("timer")
var secondsLeft = 60
var questionEl = document.getElementById("question")
var quizEl = document.getElementById("quiz-here")
var questionIndex = 0
var responses = document.querySelectorAll(".response")
var startButton = document.getElementById("start-game")
var score = 0
var saveScore = document.getElementById("initials")
var submit = document.getElementById("submit")
var initialsVal = document.getElementById("initialsVal")
var scoresTable = document.getElementById('results')
var scores = fetchScores()

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
scoresTable.classList.add('hide')

// Initialize or fetch scores
function fetchScores() {
    if ( localStorage.getItem('scores') === null ) {
        return []
    } else {
        return JSON.parse(localStorage.getItem("scores"))
    }
}

function startQuiz() {
    // Reset the quiz
    questionIndex = 0;
    score = 0;
    saveScore.value = "";
    scoresTable.textContent = ''
    scores = fetchScores();

    startButton.classList.add("hide")
    quizEl.classList.remove('hide')
    scoresTable.classList.add('hide')
    initialsVal.classList.add('hide')

    startTimer()
    writeQuestion(questionIndex)
}

function startTimer() {
    secondsLeft = 60;
    timerEl.textContent = secondsLeft + " seconds left until end of quiz";
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
    } else {
        secondsLeft -= 5
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
    initialsVal.classList.remove('hide')
    timerEl.textContent = "Quiz ended"
}


function submitResults() {
    var initials = saveScore.value
    quizResult = {"initials": initials, "score": score}
    scores.push(quizResult)
    localStorage.setItem("scores", JSON.stringify(scores))
    initialsVal.classList.add('hide')
    displayScores()
}

function displayScores() { 
    var quizScores = JSON.parse(localStorage.getItem('scores'))
    scoresTable.classList.remove('hide')
    var table = document.createElement('table');
    for( var i = 0; i < quizScores.length; i++ ) {
        var score = quizScores[i];
        if(i === 0 ) {
            addTableHeaders(table, Object.keys(score));
        }
        var row = table.insertRow();
        Object.keys(score).forEach(function(k) {
            console.log(k);
            var cell = row.insertCell();
            cell.appendChild(document.createTextNode(score[k]));
        })
    }
    scoresTable.appendChild(table);
}

function addTableHeaders(table, keys) {
    var row = table.insertRow();
    for( var i = 0; i < keys.length; i++ ) {
      var cell = row.insertCell();
      cell.appendChild(document.createTextNode(keys[i]));
    }
}
startButton.onclick = startQuiz
submit.onclick = submitResults
