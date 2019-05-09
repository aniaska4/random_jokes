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

            //create new letter's section
            const lettersSection = document.createElement("section");
            lettersSection.classList.add("letters");
            jokesArea.appendChild(lettersSection);

            //create new div with sort words
            const wordText = document.createElement("div");
            wordText.classList.add("wordText");
            lettersSection.appendChild(wordText);
            wordText.classList.add("wordText");
            lettersSection.appendChild(wordText);

            const jokeTextMatch = value.value.joke.match(/[a-z]+/gi);;
            console.log(jokeTextMatch)
            
            const jokeTextSort = jokeTextMatch.sort(byLength);
            for (let el of jokeTextSort) {
                    wordText.innerHTML += `<span><li>${el}</li></span>`
                }
        } else {
            const jokeText = document.querySelectorAll(".jokesArea");
            jokeText.innerHTML = "We are sorry, but we can not display the content at the moment"
        }
    }
    req.send();
}

//function responsive for sort words
function byLength(e1, e2) {
    e1 = e1.toString().length;
    e2 = e2.toString().length;
    return e1 > e2 ? 1 : (e1 < e2 ? -1 : 0);
}