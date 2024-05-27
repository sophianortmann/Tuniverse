const submitButton = document.querySelector("button.submit");

function checkAnswer(selectedAnswer) {
    if (selectedAnswer.dataset.answer === selectedAnswer.value) {
        selectedAnswer.classList.add("right-answer");
    } else {
        selectedAnswer.classList.add("wrong-answer");
    }

}

function solution(event) {
    const selectedAnswers = document.querySelectorAll("select.challenge")
    selectedAnswers.forEach(checkAnswer);
}

function colorChange(buttonChange) {buttonChange.classList.add("button-pressed");
    ;
}

submitButton.addEventListener("click", solution, colorChange);
