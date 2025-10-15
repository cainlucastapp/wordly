//API: https://api.dictionaryapi.dev/api/v2/entries/en/<word>
//As an example, to get definition of English word hello, you can send request to
//https://api.dictionaryapi.dev/api/v2/entries/en/hello 
const dictionaryApi = "https://api.dictionaryapi.dev/api/v2/entries/en/";


//Form elements
const wordInput = document.getElementById("word-input");
//Submit Button
const fetchDefinition = document.getElementById("fetch-definition");


//Submit form
fetchDefinition.addEventListener("click", () => {
    //Get form value
    const word = wordInput.value;
    //Fetch weather alerts
    fetchWord(word);
    //Clear the input field after submit
    wordInput.value = "";
});


//Fetch word
async function fetchWord(wordInput) {
    //API Request
    const request = dictionaryApi + wordInput

    //fetch
    try {
        //API request
        const response = await fetch(dictionaryApi + wordInput);
        const data = await response.json();
        console.log(data); 
        const entry = data[0]; 
        console.log(entry.word); 
        return entry.word;
    } catch (error) {
        console.error('Error fetching post data:', error);
    }

}



// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchWord };
}