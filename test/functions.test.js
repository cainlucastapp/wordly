/**
 * @jest-environment jsdom
 */


//DOM
document.body.innerHTML = `
  <input id="word-input" />
  <div id="word"></div>
  <div id="definitions"></div>
  <div id="message"></div>
  <button id="fetch-definition"></button>
  <button id="speak" class="hidden"></button>
`;

const { fetchWord, buildElements } = require('../index.js');


describe('function tests', () => {
  beforeEach(() => {
    //Reset elements
    document.querySelector('#word').textContent = '';
    document.querySelector('#definitions').textContent = '';
    document.querySelector('#message').textContent = '';
    const speakBtn = document.querySelector('#speak');
    if (!speakBtn.classList.contains('hidden')) speakBtn.classList.add('hidden');

    //Clears mock
    global.fetch = jest.fn();
  });


  it('buildElements renders elements and shows speak word button', () => {
    const data = {
      word: 'hello',
      entries: [
        {
          partOfSpeech: 'interjection',
          pronunciations: [{ text: '/həˈləʊ/' }],
          senses: [{ definition: 'Used to greet someone.' }],
          synonyms: ['hi', 'hey'],
          antonyms: ['bye'],
        },
      ],
    };

    buildElements(data);

    const wordElement = document.querySelector('#word');
    const definitionElement = document.querySelector('#definitions')

    expect(wordElement.textContent).toContain('hello');
    expect(wordElement.textContent).toContain('/həˈləʊ/');
    expect(definitionElement.textContent).toContain('Used to greet someone.');
    expect(definitionElement.textContent).toContain('hi');
    expect(definitionElement.textContent).toContain('bye');
    expect(document.querySelector('#message').textContent).toBe('');
    expect(document.querySelector('#speak').classList.contains('hidden')).toBe(false);
  });


  it('fetchWord calls API URL on success', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        word: 'hello',
        entries: [
          {
            partOfSpeech: 'interjection',
            pronunciations: [{ text: '/həˈləʊ/' }],
            senses: [{ definition: 'Used to greet someone.' }],
          },
        ],
      }),
    });

    const input = document.querySelector('#word-input');
    input.value = 'hello';

    await fetchWord(input);
    expect(global.fetch).toHaveBeenCalledWith('https://freedictionaryapi.com/api/v1/entries/en/hello');
  });


  it('fetchWord shows error when input is empty', async () => {
    const input = document.querySelector('#word-input');
    input.value = '';

    await fetchWord(input);
    expect(document.querySelector('#message').textContent).toBe('Please give me a word to look up.');
  });
});
