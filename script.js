document.addEventListener("DOMContentLoaded", initializeTuniverse);
let correctAnswers = 0;
let wrongAnswers = 0;

function initializeTuniverse() {

    const submitButton = document.querySelector("button.submit");

    function checkAnswer(selectedAnswer) {
        if (selectedAnswer.selectedOptions[0].dataset.correctChoice === '') {
            const correctAnswer = selectedAnswer.parentElement.querySelector('.hiddenBeforeSolution'); // span mit richtiger Antwort
            selectedAnswer.remove();
            correctAnswer.classList.remove('hiddenBeforeSolution'); // span mit richtiger Antwort sichtbar machen
            correctAnswers += 1;
        } else {
            selectedAnswer.classList.add("wrong-answer");
            wrongAnswers += 1;
        }

    }

    function solution(event) {
        wrongAnswers = 0;
        const selectedAnswers = document.querySelectorAll("select.challenge");
        selectedAnswers.forEach(checkAnswer);

        document.querySelector('.resultDialogContent').innerText = `Great job! ${Math.round(correctAnswers * 100 / (correctAnswers + wrongAnswers))}% correct.`;
        document.querySelector('.resultDialog').showModal();
    }

    //add spans (with removed class) to correct answers

    /*const correctAnswersAdded = document.querySelector(span);
    console.log("span");*/

    submitButton.addEventListener("click", solution);

    const resultsButton = document.querySelector("button.results");

    resultsButton.addEventListener("click", results);

    function results() {

    }

}