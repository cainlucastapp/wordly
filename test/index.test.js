/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom');
const { fetchWord,buildElements } = require('../index.js');

//Global variables 
const wordInput = "hello"

//Global fetch mock
beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ([
            {
                word: wordInput,
                phonetics: [],
                meanings: [],
                license: {},
                sourceUrls: [],
            },
        ]),
    });
});


afterAll(() => {
      jest.restoreAllMocks();
});


//fetchWord
describe('fetchWord', () => {
    it('returns "hello" when API responds with word "hello"', async () => {
        const result = await fetchWord(wordInput);
        expect(result).toBe('hello');
    });
});