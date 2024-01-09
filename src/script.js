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
  const lineOneElement = document.querySelector(".text-1");
  const lineTwoElement = document.querySelector(".text-2");

  // prepare line 1
  const lineOneText = lineOneElement.textContent.trim();

  lineOneElement.textContent = "";
  setTimeout(() => {
    lineOneElement.classList.add("visible");
    setTimeout(() => {
      const wordsToType = ["Kurs", "Event"];
      typeAndDeleteWords(lineOneElement, wordsToType, () => {
        typeTextCharByChar(lineOneElement, lineOneText, 0, () => {
          lineOneElement.classList.remove("visible");
        });
      });
    }, CHAR_VISIBLE_TIMEOUT);
  }, CHAR_INITIAL_DELAY);

  // prepare line 2 and its shadow (to keep the spacing)
  wrapTextInSpans(lineTwoElement);
  const shadowElement = lineTwoElement.parentNode.appendChild(
    lineTwoElement.cloneNode(true)
  );
  shadowElement.classList.add("shadow");

  setTimeout(() => {
    lineTwoElement.classList.add("visible");
    typeTextWordByWord(
      lineTwoElement.children,
      shadowElement.children,
      0,
      () => {
        lineTwoElement.classList.remove("visible");
      }
    );
  }, WORD_INITIAL_DELAY);
});

function typeAndDeleteWords(element, words, callback, index = 0) {
  if (index < words.length) {
    typeTextCharByChar(element, words[index], 0, () => {
      setTimeout(
        () => {
          // Adding a pause before deletion
          deleteTextCharByChar(element, words[index].length, () => {
            typeAndDeleteWords(element, words, callback, index + 1);
          });
        },
        getRandomDelay(MIN_PAUSE, MAX_PAUSE)
      );
    });
  } else if (callback) {
    callback();
  }
}

function typeTextCharByChar(element, text, index, callback = null) {
  if (index < text.length) {
    element.textContent += text.charAt(index);
    setTimeout(
      () => {
        typeTextCharByChar(element, text, index + 1, callback);
      },
      getRandomDelay(MIN_DELAY, MAX_DELAY)
    );
  } else if (callback) {
    callback();
  }
}

function deleteTextCharByChar(element, length, callback) {
  if (length > 0) {
    element.textContent = element.textContent.slice(0, -1);
    setTimeout(
      () => {
        deleteTextCharByChar(element, length - 1, callback);
      },
      getRandomDelay(MIN_DELAY, MAX_DELAY)
    );
  } else if (callback) {
    callback();
  }
}

function wrapTextInSpans(element) {
  const text = element.textContent.trim();
  element.textContent = "";
  const segments = text.split(" ");

  segments.forEach((segment, index) => {
    const span = document.createElement("span");
    span.textContent = index > 0 ? " " + segment : segment;
    span.classList.add("typewriter__element--hidden");

    element.appendChild(span);
  });
}

function typeTextWordByWord(spans, shadowSpan, index, callback = null) {
  if (index < spans.length) {
    spans[index].classList.replace(
      "typewriter__element--hidden",
      "typewriter__element--visible"
    );
    shadowSpan[index].classList.replace(
      "typewriter__element--hidden",
      "typewriter__element--visible"
    );
    setTimeout(
      () => {
        typeTextWordByWord(spans, shadowSpan, index + 1, callback);
      },
      getRandomDelay(MIN_WORD_TYPING_DELAY, MAX_WORD_TYPING_DELAY)
    );
  } else if (callback) {
    callback();
  }
}

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
