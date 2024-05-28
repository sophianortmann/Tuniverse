document.addEventListener("DOMContentLoaded", initializeTuniverse);

function initializeTuniverse() {

    const submitButton = document.querySelector("button.submit");

    function checkAnswer(selectedAnswer) {
        if (selectedAnswer.selectedOptions[0].dataset.correctChoice === '') {
            selectedAnswer.classList.add("right-answer");
        } else {
            selectedAnswer.classList.add("wrong-answer");
        }

    }

    function solution(event) {
        const selectedAnswers = document.querySelectorAll("select.challenge");
        selectedAnswers.forEach(checkAnswer);
    }

    submitButton.addEventListener("click", solution);
}