const questions = [
    {
        question : "What is the correct way to declare a variable in JavaScript?",
        answer:[
            {text: "A) var = myVariable;", correct :false},
            {text: "B) variable myVariable;", correct :false},
            {text: "C) let myVariable;", correct :true},
            {text: "D) const myVariable;", correct :false},
        ]
    },
    {
        question : "Which of the following methods is used to add an element to the end of an array in JavaScript?",
        answer:[
            {text: "A) array.push()", correct :true},
            {text: "B) array.pop()", correct :false},
            {text: "C) array.shift()", correct :false},
            {text: "D) array.unshift()", correct :false},
        ]
    }
    ,
    {
        question : "What is the purpose of the `addEventListener` method in JavaScript?",
        answer:[
            {text: "A) To create a new element in the DOM.", correct :false},
            {text: "B) To add a CSS class to an element.", correct :false},
            {text: "C) To bind a function to be executed when an event occurs.", correct :true},
            {text: "D) To change the style of an element dynamically.", correct :false},
        ]
    }
    ,
    {
        question : "Which of the following statements is true about closures in JavaScript?",
        answer:[
            {text: "A) Closures are used for defining global variables.", correct :false},
            {text: "B) Closures can only be created within loops.", correct :false},
            {text: "C) Closures allow a function to access variables from its outer function even after the outer  function has completed.", correct :true},
            {text: "D) Closures can only be created using the `var` keyword.", correct :false},
        ]
    }
    ,
    {
        question : "What is the purpose of the `fetch` API in JavaScript?",
        answer:[
            {text: "A) To fetch a random number from the server.", correct :false},
            {text: "B) To fetch user input from a form.", correct :false},
            {text: "C) To fetch external resources like JSON data or HTML content asynchronously.", correct :true},
            {text: "D) To fetch the current date and time from the client's computer.", correct :false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-button");
const nextbutton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function starQuiz(){
    
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion  = questions[currentQuestionIndex];
    let questionNo  = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}

function resetState(){
    nextbutton.style.display = "none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}

function showScore(){
    resetState();
    
    if(score == questions.length){
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}. Congratulations😊,You are a 🤗Winner!!!`;
        nextbutton.innerHTML ="Play Again";
        nextbutton.style.display = "block";
    }else{
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}! better luck next time!`;
        nextbutton.innerHTML = "Play Again";
        nextbutton.style.display = "block";
    }
    
}

function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextbutton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextbutton();
    }else{
        starQuiz();
    }
});

starQuiz();