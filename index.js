//API https://freedictionaryapi.com/api/v1/entries/en/ <wordInput>
const dictionaryApi = "https://freedictionaryapi.com/api/v1/entries/en/";


//Form elements
const wordInput = document.getElementById("word-input");
const word = document.getElementById("word");
const definition = document.getElementById("definition");
const message = document.getElementById("message");


//Submit Button
const fetchDefinition = document.getElementById("fetch-definition");

document.addEventListener("DOMContentLoaded", () => {
    //Submit form
    fetchDefinition.addEventListener("click", (event) => {
        //Clear page
        clearPage()
        //Get form value
        const word = wordInput.value;
        //Fetch weather alerts
        fetchWord(word);
        //Clear the input field after submit
        wordInput.value = "";
        //Waiting message
        word.textContent = "Looking Up Word";
    });
})


//Clear page of dynamic elements
function clearPage() {
    //Clear #message
    message.textContent = "";
    word.textContent = "";
    definition.textContent = "";
}


//Fetch word
async function fetchWord(wordInput) {
    //fetch
    try {
        //API request
        const responses = await fetch(dictionaryApi + wordInput);
        //Convert repsones to JSON
        const data = await responses.json();
        //Pass json data to buildElement
        buildElements(data);
    } catch (error) {
       //Show error in #message
       message.textContent = "Please give me a word to look up.";
    }
}


//buildElements into DOM
function buildElements(data) {
    //console.log(data); //for testing
    //Display word
    word.textContent = data.word
    //LOOP FOR DISPLAYING STUFF (WORK IN PROGRESS)
}


// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchWord,buildElements };
}
