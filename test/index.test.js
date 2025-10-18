/**
 * @jest-environment jsdom
 */


// Requirements
const fs = require('fs');
const path = require('path');
const { fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');


//Global DOM
function buildGlobals(htmlOverride) {
  document.body.innerHTML =
    htmlOverride ||
    `
      <h1>Wordly</h1>
      <input type="text" id="word-input" value="hello" placeholder="Give me a word...">
      <button id="fetch-definition">Look It Up</button>
      <div id="word"></div>
      <div id="definition"></div>
      <div id="message"></div>
    `;

  // Expose globals that index.js expects
  global.wordInput = document.getElementById('word-input');
  global.fetchDefinition = document.getElementById('fetch-definition');
  global.word = document.getElementById('word');
  global.definition = document.getElementById('definition');
  global.message = document.getElementById('message');
}


//Build globals
buildGlobals();


//Import functions
const { fetchWord, buildElements } = require('../index.js');


//Attach click handler
document.dispatchEvent(new Event('DOMContentLoaded'));