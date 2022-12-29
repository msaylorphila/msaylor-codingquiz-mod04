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
// here I put my questions into an array of objects for each one
var questions = [{
    question: "How do you call a function named myFunction?",
    choices: {
        correct: "myFunction()",
        responses: ["1. myFunction()", "2. !myfunction", "3. myFunction", "4. .myFunction"]
    }
}, {
    question:"How would we write that i is strictly equal to five?",
    choices: {
        correct: "i === 5",
        responses: ["1. i = 5", "2. i === 5", "3. I < 5", "4. i != 5"]
    }
}, {
    question:"How would we link our JavaScript file to our HTML file?",
    choices: {
        correct: "<script>",
        responses: ["1. <js>", "2. <javaScript>", "3. <script>", "4. <script href>"]
    }
}, {
    question:"Is JavaScript case sensitive?",
    choices: {
        correct: "Yes",
        responses: ["1. No", "2. Yes"]
    }
}]
// this is hiding the scoreboard and input for the users initials
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
// the function to both reset and start the quiz. This calls both the timer and write question functions
// this sets the question and score to 0 and fetches the saved scores from local storage
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
// This function starts the timer at 60 seconds setting the dropping interval at 1000ms (1 second)
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
// this function includes a forloop that loops through our questions and responses and has a click event that calls the selectOption function with teh value at currentquestion
function writeQuestion(index) {
    var currentQuestion = questions[index];
    questionEl.textContent = currentQuestion.question;
    for (var i = 0; i < responses.length; i++) {
        responses[i].textContent = currentQuestion.choices.responses[i];
        responses[i].value = currentQuestion.choices.responses[i];
        responses[i].onclick = function() { selectOption(this.value, currentQuestion) }
    }
}
// this function adds to the score if the value is correct or subtracts from the time if the value is incorrect
// as long as the question indead is smaller than the question length if will run otherwise the stopQuiz function runs
function selectOption(value, question) {
    if (value === question.choices.correct){
        score++
    } else {
        secondsLeft -= 5
    }
    questionIndex++;
    if ( questionIndex >= questions.length ) {
        stopQuiz();
        return
    }
    writeQuestion(questionIndex)
    
}
// This function ends the timer and sets the hide class to the quiz variables
function stopQuiz() {
    quizEl.classList.add('hide')
    startButton.classList.remove('hide')
    initialsVal.classList.remove('hide')
    timerEl.textContent = "Quiz ended"
}

// this gives the ability to save the initials and scores to local storage
function submitResults() {
    var initials = saveScore.value
    quizResult = {"initials": initials, "score": score}
    scores.push(quizResult)
    localStorage.setItem("scores", JSON.stringify(scores))
    initialsVal.classList.add('hide')
    displayScores()
}
// this creates a table and displays the initials and scores from the local storage
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
// this adds headers to our to our scoreboard
function addTableHeaders(table, keys) {
    var row = table.insertRow();
    for( var i = 0; i < keys.length; i++ ) {
      var cell = row.insertCell();
      cell.appendChild(document.createTextNode(keys[i]));
    }
}
// these are event listeners added to our buttons
startButton.onclick = startQuiz
submit.onclick = submitResults
