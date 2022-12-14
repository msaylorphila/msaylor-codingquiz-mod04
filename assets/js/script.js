var startGame = document.querySelector("#start-game")
var timerEl = document.querySelector("#timer")
var secondsLeft = 60

var questions = [{
    question: "How do you call a function named myFunction?",
    choices: {
        correct: "myFunction()",
        wrong: ["!myfunction", "myFunction", ".myFunction"]
    }
}, {
    question:"How would we write that i is strictly equal to five?",
    choices: {
        correct: "i === 5",
        wrong: ["i = 5", "I < 5", "i != 5"]
    }
}, {
    question:"How would we link our JavaScript file to our HTML file?",
    choices: {
        correct: "<script>",
        wrong: ["<js>", "<javaScript>", "<script href>"]
    }
}, {
    question:"Is JavaScript case sensitive?",
    choices: {
        correct: "Yes",
        wrong: "No",
    }
}]

function jsquiz() {
    var timerInterval = setInterval(function timerFunction() {
        secondsLeft--;
        timerEl.textContent = secondsLeft + " seconds left until end of game!";

        if(secondsleft === 0) {
            clearInterval(timerInterval);

        }

    }, 1000);

   
}


startGame.addEventListener("click", jsquiz())


