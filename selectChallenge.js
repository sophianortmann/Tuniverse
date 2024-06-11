//functions in selectChallenge.html

const buttonToFirstChallenge = document.querySelector("div.challenge1");

buttonToFirstChallenge.addEventListener("click", goToFirstChallenge
);

function goToFirstChallenge() {
    open('https://laughing-space-goggles-x59w9x7r7qjg36j4p-3000.app.github.dev/firstChallenge.html', '_self');
}