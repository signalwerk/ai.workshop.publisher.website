const WORD_INITIAL_DELAY = 3000; // Delay in milliseconds before starting the typing process
const CHAR_INITIAL_DELAY = 200; // Delay in milliseconds before starting the typing process
const MIN_DELAY = 50; // Minimum delay in milliseconds for typing/deleting characters
const MAX_DELAY = 100; // Maximum delay in milliseconds for typing/deleting characters
const MIN_PAUSE = 500; // Minimum pause in milliseconds between typing and deleting words
const MAX_PAUSE = 800; // Maximum pause in milliseconds between typing and deleting words
const MIN_WORD_TYPING_DELAY = 300; // Minimum delay in milliseconds for typing words
const MAX_WORD_TYPING_DELAY = 450; // Maximum delay in milliseconds for typing words

const CHAR_VISIBLE_TIMEOUT = 300;
const WORD_VISIBLE_TIMEOUT = 300;

document.addEventListener("DOMContentLoaded", () => {
  // Initial delay before starting the typing process
  const lineOneElement = document.querySelector(".text-1");
  const lineTwoElement = document.querySelector(".text-2");

  const lineOneText = lineOneElement.textContent.trim();
  const lineTwoText = lineTwoElement.textContent.trim().split(" "); // Splitting text into words

  lineOneElement.textContent = "";
  lineTwoElement.textContent = "";

  setTimeout(() => {
    lineOneElement.classList.add("visible"); // Add class when starting to type
    setTimeout(() => {
      const wordsToType = ["W", "Event"]; // Array of words to type and delete
      typeAndDeleteWords(lineOneElement, wordsToType, () => {
        typeTextCharByChar(lineOneElement, lineOneText, 0, () => {
          lineOneElement.classList.remove("visible"); // Remove class when finished typing
        });
      });
    }, CHAR_VISIBLE_TIMEOUT);
  }, CHAR_INITIAL_DELAY);

  setTimeout(() => {
    lineTwoElement.classList.add("visible"); // Add class when starting to type
    setTimeout(() => {
      typeTextWordByWord(lineTwoElement, lineTwoText, 0, () => {
        lineTwoElement.classList.remove("visible"); // Remove class when finished typing
      });
    }, WORD_VISIBLE_TIMEOUT);
  }, WORD_INITIAL_DELAY);
});

function typeAndDeleteWords(element, words, callback, index = 0) {
  if (index < words.length) {
    typeTextCharByChar(element, words[index], 0, () => {
      setTimeout(() => {
        // Adding a pause before deletion
        deleteTextCharByChar(element, words[index].length, () => {
          typeAndDeleteWords(element, words, callback, index + 1);
        });
      }, getRandomDelay(MIN_PAUSE, MAX_PAUSE));
    });
  } else if (callback) {
    callback();
  }
}

function typeTextCharByChar(element, text, index, callback = null) {
  if (index < text.length) {
    element.textContent += text.charAt(index);
    setTimeout(() => {
      typeTextCharByChar(element, text, index + 1, callback);
    }, getRandomDelay(MIN_DELAY, MAX_DELAY));
  } else if (callback) {
    callback();
  }
}

function deleteTextCharByChar(element, length, callback) {
  if (length > 0) {
    element.textContent = element.textContent.slice(0, -1);
    setTimeout(() => {
      deleteTextCharByChar(element, length - 1, callback);
    }, getRandomDelay(MIN_DELAY, MAX_DELAY));
  } else if (callback) {
    callback();
  }
}

function typeTextWordByWord(element, words, index, callback = null) {
  if (index < words.length) {
    element.textContent += (index > 0 ? " " : "") + words[index];
    setTimeout(() => {
      typeTextWordByWord(element, words, index + 1, callback);
    }, getRandomDelay(MIN_WORD_TYPING_DELAY, MAX_WORD_TYPING_DELAY));
  } else if (callback) {
    callback();
  }
}

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
