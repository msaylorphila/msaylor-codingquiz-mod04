var startGame = document.getElementById("start-game")
var timerEl = document.getElementById("timer")
var secondsLeft = 60
var questionEl = document.getElementById("quiz-here")
var questionIndex = 0
var responses = document.querySelectorAll(".response")

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



function writeQuestion() {
    console.log(questionIndex)
    var currentQuestion = questions[questionIndex];
    console.log(currentQuestion)
    questionEl.textContent = currentQuestion.question;
    // console.log(responses.length);
    for (var i = 0; i < responses.length; i++) {
        responses[i].textContent = currentQuestion.choices.responses[i];
        responses[i].value = currentQuestion.choices.responses[i];
    }
    questionIndex++;
}

startGame.addEventListener("click", function jsquiz(event) {
    event.preventDefault
    var timerInterval = setInterval(function timerFunction() {
        secondsLeft--;
        timerEl.textContent = secondsLeft + " seconds left until end of game!";

        if(secondsLeft === 0) {
            clearInterval(timerInterval);

        }
        responses.forEach(function item() {
            item.addEventListener('click',function(event) {
                var selected = event.target;
                console.log(selected.value)
                if (selected.value != questions[questionIndex].choices.correct) {
                 secondsLeft-=5;  
                }
                writeQuestion()
        
            })
        }) 

    }, 1000);
    writeQuestion()

    // if (choice===rightChoice) {
    //     nextQuestion()
    // } else {
    //     secondsLeft-
    // }
    
}
)

// for (var i = 0; i < responses.length; i++) { 
//     responses[i].addEventListener("click", function(){
//         if (i = questions[questionIndex].choices.correct) {
//             writeQuestion()
//         } else {
           
//         }

//     })
// }








