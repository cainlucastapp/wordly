/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom');


describe('DOM tests', () => {

  let container;
  let fetchMock;


  beforeEach(() => {

  fetchMock = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      word: "hello",
      source: {
      url: 'https://en.wiktionary.org/wiki/hello',
      license: { name: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0/' }
      },
      entries: [
        {
          language: { code: "en", name: "English" },
          partOfSpeech: "interjection",
          pronunciations: [{ type: "ipa", text: "/həˈləʊ/", tags: ["UK"] }],
          senses: [
            {
              definition:
                "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
              examples: ["Hello, everyone."],
            },
          ],
          synonyms: ["hi", "hey"],
          antonyms: ["goodbye"],
        },
      ],
    }),
  });

    global.fetch = fetchMock;

    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;
    container = document.body;

    jest.resetModules();
    require('../index.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));

  })


  function globalElements() {
    const { getByPlaceholderText, getByText } = require('@testing-library/dom').within(container);

    const input   = getByPlaceholderText('Give me a word...');
    const button  = getByText('Look It Up');
    const message = container.querySelector('#message');

    input.value = 'hello';
    button.click();

    return { input, button, message };
  }


  it('calls fetch once with the correct API URL when button is clicked', async () => {
    const { } = globalElements();
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('https://freedictionaryapi.com/api/v1/entries/en/hello');
  });


  it('waiting message in #message', async () => {
    const { message } = globalElements();
    expect(message.textContent).toBe('Looking Up Word');
  });


  it('shows an error message if the request fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    const { message } = globalElements();

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(message.textContent).toBe('Network error');
  });

  
  it('error is wordInput is blank', async () => {
    const { getByPlaceholderText, getByText } = require('@testing-library/dom').within(container);

    const input   = getByPlaceholderText('Give me a word...');
    const button  = getByText('Look It Up');
    const message = container.querySelector('#message');

    input.value = '';
    button.click();

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(message.textContent).toBe('Please give me a word to look up.');
  });


  it('renders the displayWord "hello" in #word after successful fetch', async () => {
    const {} = globalElements();

    await new Promise(resolve => setTimeout(resolve, 0));

    const wordElement = container.querySelector('#word');
    expect(wordElement.textContent.toLowerCase()).toContain('hello');
  });


  it('renders the first pronunciation (/həˈləʊ/) in #word', async () => {
    const {} = globalElements();
    await new Promise(resolve => setTimeout(resolve, 0));

    const wordEl = container.querySelector('#word');
    expect(wordEl.textContent).toContain('/həˈləʊ/');
  });


  it('displays the primary definition inside #definitions', async () => {
    const {} = globalElements();
    await new Promise(resolve => setTimeout(resolve, 0));

    const definitionEl = container.querySelector('#definitions');
    expect(definitionEl.textContent).toContain('greeting (salutation)');
  });


  it('shows the Speak button after successful word lookup', async () => {
    const {} = globalElements();
    await new Promise(resolve => setTimeout(resolve, 0));

    const speakButton = container.querySelector('#speak');
    expect(speakButton.classList.contains('hidden')).toBe(false);
  });
})