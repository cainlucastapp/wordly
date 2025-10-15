//API: https://api.dictionaryapi.dev/api/v2/entries/en/<word>
//As an example, to get definition of English word hello, you can send request to
//https://api.dictionaryapi.dev/api/v2/entries/en/hello 
//const dictionaryApi = "https://api.dictionaryapi.dev/api/v2/entries/en/";


const dictionaryApi = "https://freedictionaryapi.com/api/v1/entries/en/";

//Form elements
const wordInput = document.getElementById("word-input");
const word = document.getElementById("word");
//const definition = document.getElementById("definition");
const message = document.getElementById("message");
//Submit Button
const fetchDefinition = document.getElementById("fetch-definition");


document.addEventListener("DOMContentLoaded", () => {
    //Submit form
    fetchDefinition.addEventListener("click", (event) => {
        //Prevent reload
        event.preventDefault();
        //Get form value
        const word = wordInput.value;
        //Fetch weather alerts
        fetchWord(word);
        //Clear the input field after submit
        wordInput.value = "";
        //Waiting message
        message.textContent = "Looking Up Word";
    });
})


//Fetch word
async function fetchWord(wordInput) {
    //fetch
    try {
        //API request
        const response = await fetch(dictionaryApi + wordInput);
        const data = await response.json();
        //Pass json data to buildElement
        buildElements(data);
       
        //Return word from data
        const word = data.word; 
        console.log(word); //for testing
        //return word.word;
    } catch (error) {
       //console.error('Error fetching post data:', error); //for testing
       //Show error in #message
       // message.textContent = "Word Not In Dictionary";
    }
}


//buildElements into DOM
function buildElements(data) {
    console.log(data); //for testing
    //Clear message
    message.textContent = "";
    //Display word
    word.textContent = data.word
    //LOOP FOR STUFF (WORK IN PROGRESS)
}


// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchWord,buildElements };
}
