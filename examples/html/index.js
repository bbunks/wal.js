//Counter
const counter = new window.Watcher(0);

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
const keyStrokeCounter = new window.Watcher(0);

keyStrokeCounter.addListener((value) => {
  document.getElementById("keyStrokes").innerText = value.toString();
});

function onInputUpdate() {
  keyStrokeCounter.value = keyStrokeCounter.value + 1;
}

//Cards with different rules
const conditionallyFormatted = new window.Watcher(0);

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

  const input = document.createElement("input");
  input.type = "number";
  input.value = 0;
  input.onchange = () => setCardBg(conditionallyFormatted.value);
  card.appendChild(input);

  setCardBg(conditionallyFormatted.value);

  document.getElementById("card-container").appendChild(card);

  conditionallyFormatted.addListener(setCardBg);
}

addCard();
