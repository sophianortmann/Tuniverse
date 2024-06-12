document.addEventListener('DOMContentLoaded', initializeTuniverse);
let correctAnswers = 0;
let wrongAnswers = 0;

function initializeTuniverse() {

    const submitButton = document.querySelector('button.submit');

    function checkAnswer(selectItems) {
        const selectedAnswer = selectItems.querySelector('.same-as-selected');
        if (selectedAnswer === null) {
            wrongAnswers += 1;
        
        } else if ('correctChoice' in selectedAnswer.dataset) {
            const correctAnswer = selectedAnswer.parentElement.parentElement.parentElement.querySelector('.hiddenBeforeSolution'); // span mit richtiger Antwort
            console.log('cc', { correctAnswer });
            selectedAnswer.parentElement.parentElement.querySelector('.select-selected').remove();
            correctAnswer.classList.remove('hiddenBeforeSolution'); // span mit richtiger Antwort sichtbar machen
            correctAnswers += 1;
            
        } else {
            const showCorrection = selectedAnswer.parentElement.parentElement.parentElement.querySelector('.buttonHiddenBeforeSolution');
            showCorrection.classList.remove('buttonHiddenBeforeSolution');
            selectedAnswer.parentElement.parentElement.parentElement.querySelector('.showSolution').textContent = selectedAnswer.textContent;
            selectedAnswer.parentElement.parentElement.querySelector('.select-selected').remove();
            wrongAnswers += 1;
        }
    }

// function to check if the submitted answer is right or wrong and to show pop-up with percentage of correct answers:

    function solution(event) {
        wrongAnswers = 0;
        const selectedAnswers = document.querySelectorAll('.select-items');
        selectedAnswers.forEach(checkAnswer);

        document.querySelector('.resultDialogContent').textContent = `Great job! ${Math.round(correctAnswers * 100 / (correctAnswers + wrongAnswers))}% correct.`;
        document.querySelector('.resultDialog').showModal();
    }

    submitButton.addEventListener("click", solution);

    // function to show solution when button with submitted wrong answer is clicked:
    
    const showSolutionButton = document.querySelector('button.showSolution');

    showSolutionButton.addEventListener('click', showSolution);

    function showSolution () {
        document.querySelector('.showSolutionDialogContent').textContent = `The correct answer is: ${span.correctedAnswer.textContent}`;
        document.querySelector('.showSolutionDialog').showModal();
    }


    /*selects styling*/
    /* Look for any elements with the class "custom-select": */
    const customSelect = document.getElementsByClassName("custom-select");
    const customSelectLength = customSelect.length;

    /* In this block the options will be created */

    for (let i = 0; i < customSelectLength; i++) {
        const selectElement = customSelect[i].querySelector("select");
        const selectOptionsCount = selectElement.length;
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
            const styledSelectOption = document.createElement("DIV");
            styledSelectOption.innerText = selectElement.options[j].innerText;
            if ('correctChoice' in selectElement.options[j].dataset) {
                styledSelectOption.dataset.correctChoice = true;
            }
            styledSelectOption.addEventListener("click", function (e) {
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
            styledSelectItems.appendChild(styledSelectOption);
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
        var x, i, xl, arrNo = [];
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
