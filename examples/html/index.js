//Counter
const counter = new Watcher(0);

counter.addListener((value) => {
  document.getElementById("counterLabel").innerText = value.toString();
});

function inc() {
  counter.value = counter.value + 1;
}

function dec() {
  counter.value = counter.value - 1;
}

//Form input
const keyStrokeCounter = new Watcher(0);

keyStrokeCounter.addListener((value) => {
  document.getElementById("keyStrokes").innerText = value.toString();
});

keyStrokeCounter.addListener((value) => {
  const div = document.createElement("div");
  div.innerText = counter.value;
  document.getElementById("count-container").appendChild(div);

  const delListener = counter.addListener((value) => {
    div.innerText = value;
  });

  div.onclick = () => {
    delListener();
    div.remove();
  };
});

function onInputUpdate() {
  keyStrokeCounter.value = keyStrokeCounter.value + 1;
}

//Cards with different rules
const conditionallyFormatted = new Watcher(0);

function updateConFormValue(e) {
  conditionallyFormatted.value = parseInt(e.target.value);
}

function addCard() {
  function setCardBg(value) {
    //reset the values
    card.classList.remove("error");
    card.classList.remove("warning");
    card.classList.remove("good");
    const inputValue = parseInt(input.value);

    // if less than, then red
    if (value > inputValue) {
      card.classList.add("error");
    }

    // if equal, then yellow
    if (inputValue === value) {
      card.classList.add("warning");
    }

    // if greater than, then green
    if (value < inputValue) {
      card.classList.add("good");
    }
  }

  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("conditional-card");

  const closeButton = document.createElement("button");
  closeButton.innerText = "X";
  closeButton.classList.add("close-button");
  closeButton.onclick = (e) => {
    // this cleans up the listener on card removal
    conditionallyFormatted.removeListener(setCardBg);
    e.target.parentNode.remove();
  };
  card.appendChild(closeButton);

  const inputContainer = document.createElement("div");
  inputContainer.style.display = "flex";
  inputContainer.style.alignItems = "center";
  inputContainer.style.gap = "8px";

  const minusButton = document.createElement("button");
  minusButton.innerText = "-";
  minusButton.onmousedown = () => {
    input.value = parseInt(input.value) - 1;
    setCardBg(conditionallyFormatted.value);
  };
  inputContainer.appendChild(minusButton);

  const input = document.createElement("input");
  input.type = "text";
  input.value = 0;
  input.onchange = () => setCardBg(conditionallyFormatted.value);
  inputContainer.appendChild(input);

  const plusButton = document.createElement("button");
  plusButton.innerText = "+";
  plusButton.onmousedown = () => {
    input.value = parseInt(input.value) + 1;
    setCardBg(conditionallyFormatted.value);
  };
  inputContainer.appendChild(plusButton);

  card.appendChild(inputContainer);

  setCardBg(conditionallyFormatted.value);

  document.getElementById("card-container").appendChild(card);

  conditionallyFormatted.addListener(setCardBg);
}

addCard();

// Everything below this is for the tutorial

function revealNext(...delays) {
  const displayContainer = document.getElementById("display-container");
  const children = displayContainer.children;
  let revealed = 0;

  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains("reveal")) {
      revealed++;
    }
  }

  delays.forEach((delay, index) => {
    if (revealed + index < children.length) {
      setTimeout(() => {
        children[revealed + index].classList.add("reveal");
      }, delay);
    }
  });
}

revealNext(0);

function n() {
  revealNext(1000, 4500, 5000, 7500, 8000);
}

function revIntro() {
  revealNext(0, 1000);
}

function revealCounter() {
  revealNext(1000);
}

function revealNextInstruction() {
  revealNext(1000, 0);
}

// for tutorial updates
counter.addListener(() => {
  if (keyStrokeCounter.value > 0) {
    runOnce(revealCounter);
  }

  runOnce(n);
});

keyStrokeCounter.addListener((value) => {
  runOnce(revealNextInstruction);
});

const ranFunctions = new Set();

function runOnce(fn) {
  if (ranFunctions.has(fn)) {
    return;
  }
  fn();
  ranFunctions.add(fn);
}
