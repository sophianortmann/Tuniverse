//functions in selectChallenge.html

const buttonToFirstChallenge = document.querySelector("div.challenge1");

buttonToFirstChallenge.addEventListener("click", goToFirstChallenge
);

function goToFirstChallenge() {
    open('./firstChallenge.html', '_self');
}