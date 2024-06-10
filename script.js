document.addEventListener('DOMContentLoaded', initializeTuniverse);
let correctAnswers = 0;
let wrongAnswers = 0;

function initializeTuniverse() {

    const submitButton = document.querySelector('button.submit');

    function checkAnswer(selectedAnswer) {
        let selectedOption = selectedAnswer.selectedOptions[0];
        if ('correctChoice' in selectedOption.dataset) {
            const correctAnswer = selectedAnswer.parentElement.parentElement.querySelector('.hiddenBeforeSolution'); // span mit richtiger Antwort
            selectedAnswer.remove();
            correctAnswer.classList.remove('hiddenBeforeSolution'); // span mit richtiger Antwort sichtbar machen
            correctAnswers += 1;
        } else {
            const showCorrection = selectedAnswer.parentElement.parentElement.querySelector('.buttonHiddenBeforeSolution');
            showCorrection.classList.remove('buttonHiddenBeforeSolution');
            selectedAnswer.parentElement.querySelector('.showSolution').textContent = selectedOption.textContent;
            selectedAnswer.remove();
            wrongAnswers += 1;
        }

    }

    /*//neu
    function initializeTuniverse() {

        const submitButton = document.querySelector('button.submit');
    
        function checkAnswer(selectedAnswer) {
            let selectedOption = selectedAnswer.selectedOptions[0];
            if (selectedOption === selectElement.options[i].innerText) {
                const correctAnswer = selectedAnswer.parentElement.parentElement.querySelector('.hiddenBeforeSolution'); // span mit richtiger Antwort
                selectedAnswer.remove();
                correctAnswer.classList.remove('hiddenBeforeSolution'); // span mit richtiger Antwort sichtbar machen
                correctAnswers += 1;
            } else {
                const showCorrection = selectedAnswer.parentElement.parentElement.querySelector('.buttonHiddenBeforeSolution');
                showCorrection.classList.remove('buttonHiddenBeforeSolution');
                selectedAnswer.parentElement.querySelector('.showSolution').textContent = selectedOption.textContent;
                selectedAnswer.remove();
                wrongAnswers += 1;
            }
    
        } //neu*/



    function solution(event) {
        wrongAnswers = 0;
        const selectedAnswers = document.querySelectorAll('select.challenge');
        selectedAnswers.forEach(checkAnswer);

        document.querySelector('.resultDialogContent').textContent = `Great job! ${Math.round(correctAnswers * 100 / (correctAnswers + wrongAnswers))}% correct.`;
        document.querySelector('.resultDialog').showModal();
    }

    submitButton.addEventListener("click", solution);

    const resultsButton = document.querySelector("button.results");


/*selects styling*/
    /* Look for any elements with the class "custom-select": */
    const customSelect = document.getElementsByClassName("custom-select");
    const customSelectLength = customSelect.length;

    /* In this block the options will be created */

    for (let i = 0; i < customSelectLength; i++) {
        const selElmnt = customSelect[i].querySelector("select");
        const selectOptionsCount = selElmnt.length;
        /* For each element, create a new DIV that will act as the selected item: */
        const styledSelect = document.createElement("DIV");
        styledSelect.classList.add("select-selected");
        customSelect[i].appendChild(styledSelect);
        /* For each element, create a new DIV that will contain the option list: */
        const styledSelectItems = document.createElement("DIV");
        styledSelectItems.classList.add("select-items");
        styledSelectItems.classList.add("select-hide");
        for (let j = 1; j < selectOptionsCount; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            const selectOption = document.createElement("DIV");
            selectOption.innerText = selElmnt.options[j].innerText;
            selectOption.addEventListener("click", function (e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                const selectElement = this.parentNode.parentNode.querySelector("select");
                const selectOptionsCount = selectElement.length;
                const customSelect = this.parentNode.previousSibling;
                for (let i = 0; i < selectOptionsCount; i++) {
                    if (selectElement.options[i].innerText == this.innerText) {
                        customSelect.innerText = this.innerText;
                        const currentlySelected = this.parentNode.querySelector(".same-as-selected");
                        currentlySelected?.classList.remove("same-as-selected");
                        this.classList.add("same-as-selected");
                        break;
                    }
                }
            });
            /* Add the created option to the option box */
            styledSelectItems.appendChild(selectOption);
        }

        /* Add the created options box to the html */
        customSelect[i].appendChild(styledSelectItems);
        styledSelect.addEventListener("click", function (e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        let currentlySelected = document.getElementsByClassName("select-selected");
        xl = x.length;
        let currentlySelectedCount = currentlySelected.length;
        for (i = 0; i < currentlySelectedCount; i++) {
            if (elmnt == currentlySelected[i]) {
                arrNo.push(i)
            } else {
                currentlySelected[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
}