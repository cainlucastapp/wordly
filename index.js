//API https://freedictionaryapi.com/api/v1/entries/en/ <wordInput>
const dictionaryApi = "https://freedictionaryapi.com/api/v1/entries/en/";


//Form elements
const wordInput = document.getElementById("word-input");
const word = document.getElementById("word");
const definition = document.getElementById("definition");
const message = document.getElementById("message");
const fetchDefinition = document.getElementById("fetch-definition");


//Submit button
document.addEventListener("DOMContentLoaded", () => {
  fetchDefinition.addEventListener("click", () => fetchWord(wordInput));
});


//Fetch word
async function fetchWord(wordInput) {
    //Waiting message
    message.textContent = "Looking Up Word";  
    //Word
    const word = wordInput.value;
    //fetch
    try {
        //API request
        const response = await fetch(dictionaryApi + word);
        //Convert repsones to JSON
        const data = await response.json();
        //Pass json data to buildElement
        buildElements(data);
    } catch (error) {
       //Null error message
       message.textContent = "Please give me a word to look up.";
    }
}


//buildElements into DOM
function buildElements(data) {
    console.log(data); //for testing
    
    //Clear page of dynamic elements
    wordInput.value = "";
    word.textContent = "";
    definition.textContent = "";
    
    //Display word
    word.textContent = data.word
    
    //LOOPS THOUGH DATA FOR DISPLAYING STUFF (WORK IN PROGRESS) USE INNER HTML

    //Remove waiting message
    message.textContent = "";
}


// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchWord, buildElements };
}

