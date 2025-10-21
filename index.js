//API https://freedictionaryapi.com/api/v1/entries/en/<wordInput>
const dictionaryApi = "https://freedictionaryapi.com/api/v1/entries/en/";


//Form elements
const wordInput = document.getElementById("word-input");
const wordElement = document.getElementById("word");
const definition = document.getElementById("definitions");
const message = document.getElementById("message");
const fetchDefinition = document.getElementById("word-form");
const speakButton = document.getElementById("speak");
const sourceElement = document.getElementById("source");


//Copyright date
const date = document.getElementById('year')
date.textContent = new Date().getFullYear();


//Submit button
fetchDefinition.addEventListener('submit', (event) => {
  event.preventDefault();
  fetchWord(wordInput);
});


//Delcare speak for audio
let speak;


//Delay helper (skips or shortens delay in tests)
async function delay(ms) {
  const isTest = globalThis.process?.env?.NODE_ENV === "test";
  //Skip delay during tests
  if (isTest) return;
  await new Promise(resolve => setTimeout(resolve, ms));
}



//Fetch word
async function fetchWord(wordInput) {
  //Waiting message
  message.textContent = "Looking Up Word";
  //Apply delay if not testing
  await delay(600);
  //Word
  const word = wordInput.value.toLowerCase();
  //fetch
  try {
      //No word input
      if (!word) {
          throw new Error("Please give me a word to look up.");
      }
      //API request
      const response = await fetch(dictionaryApi + word);
      //Convert repsones to JSON
      const data = await response.json();
      //Check invalid data
      if (!data.entries || data.entries.length === 0) {
        throw new Error("No definition found for that word.");
      }
      //Pass json data to buildElement
      buildElements(data);
  } catch (error) {
    //Clear page of dynamic elements
    clearPage()
    //Error message
    message.textContent = error.message;
  }
}


//buildElements into DOM
function buildElements(data) {
  //Clear page of dynamic elements
  clearPage()

  //Display word & pronunciation
  const displayWord = data.word;
  const pronunciation = data.entries?.[0]?.pronunciations?.[0]?.text || "";
  let wordHTML = `
    <h2>${displayWord} ${pronunciation}</h2>
  `;
  wordElement.innerHTML = wordHTML;
  
  //Elements loop
  (data.entries || []).forEach(entry => {
    const sense = entry.senses[0];
    const partOfSpeech = entry.partOfSpeech || "Unknown";
    const synonyms = entry.synonyms?.length ? entry.synonyms.join(", ") : "None.";
    const antonyms = entry.antonyms?.length ? entry.antonyms.join(", ") : "None.";

    //Display definition, synonyms, antonyms
    let definitionHTML = `
      <div class="definition">
        <p>Definition<span class="capitalize"> (${partOfSpeech})</span>: ${sense?.definition || "No definition available."}</p>
        <p class="capitalize">Synonyms: ${synonyms}</p>
        <p class="capitalize">Antonyms: ${antonyms}</p>
      </div>
    `;
    definition.innerHTML += definitionHTML;
  });

  //Display source
  const source = data.source.url
  const license = data.source.license.name
  let sourceHTML = `
    <p>Source: <a href="${source}" target="_blank" rel="noopener noreferrer">${source}</a></p>
    <p>License: ${license}</p>
  `;
  sourceElement.innerHTML = sourceHTML;

  //Clear message
  message.textContent = "";

  //Show speak button
  speakButton.classList.remove("hidden");

  //Pass word to audio
  speak = displayWord;
}


//Speak word button
speakButton.addEventListener("click", () => speakWord(speak));


//Speak Word
function speakWord(speak) {
  const sayWord = new SpeechSynthesisUtterance(speak);
  speechSynthesis.speak(sayWord);
}


//Clear page of dynamic elements
function clearPage() {
  wordInput.value = "";
  wordElement.textContent = "";
  definition.textContent = "";
  speakButton.classList.add("hidden");  
}


// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchWord, buildElements };
}