const url = 'https://api.icndb.com/jokes/random'

//get jokes by button
const button = document.querySelector(".button");
button.addEventListener("click", function () {
    getRandomJokes();
});


// get random jokes from Api
const getRandomJokes = () => {
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function () {
        if (this.status === 200) {
            const value = JSON.parse(this.responseText);

            //create jokes section with random jokes
            const jokesArea = document.querySelector(".jokesArea");
            const jokeSection = document.createElement("div");
            jokeSection.classList.add("random_joke");
            jokesArea.appendChild(jokeSection);
            jokeSection.innerHTML = `<h3> ${value.value.joke} </h3>`

            //create new word section
            const wordSection = document.createElement("section");
            wordSection.classList.add("words");
            jokesArea.appendChild(wordSection);

            //create new div with sort words
            const wordText = document.createElement("div");
            wordText.classList.add("wordText");
            wordSection.appendChild(wordText);
            wordText.classList.add("wordText");
            wordSection.appendChild(wordText);

            const jokeTextMatch = value.value.joke;
            getJokeWordList(jokeTextMatch)
                .sort(byLength)
                .map(e => {
                    return wordText.innerHTML += `<span><li>${e}</li></span>`
                });
        } else {
            showError("We are sorry, but we can not display the content at the moment")
        }
    }
    req.send();
}

//function responsible for sort words
function byLength(e1, e2) {
    e1 = e1.toString().length;
    e2 = e2.toString().length;
    return e1 > e2 ? 1 : (e1 < e2 ? -1 : 0);
}

//function responsible for match words from joke
function getJokeWordList(joke) {
    return joke.match(/[a-z]+/gi);
}

function showError(text) {
    const jokeText = document.querySelectorAll(".jokesArea");
    jokeText.innerHTML = text;
}