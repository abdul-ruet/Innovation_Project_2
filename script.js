const paragraph = document.getElementById("paragraph");
const inputField = document.getElementById("input");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const timerDisplay = document.getElementById("timer");
const results = document.getElementById("results");

const totalWordsEl = document.getElementById("total-words");
const correctWordsEl = document.getElementById("correct-words");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

const referenceText = "And once the storm is over, you won’t remember how you made it through, how you managed to survive. You won’t even be sure, whether the storm is really over. But one thing is certain. When you come out of the storm, you won’t be the same person who walked in.";
let countdown;
let timeLeft = 60;
let startTime = null;


const renderParagraph = () => {
  paragraph.innerHTML = referenceText
    .split(" ")
    .map(word => `<span>${word}</span>`)
    .join(" ");
};


const startTest = () => {
  renderParagraph();
  paragraph.classList.remove("hidden");
  inputField.disabled = false;
  inputField.value = "";
  inputField.focus();
  results.classList.add("hidden");
  startBtn.disabled = true;
  timeLeft = 60;
  timerDisplay.innerText = timeLeft;

  startTime = new Date().getTime();

  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if (timeLeft <= 0) {
      endTest();
    }
  }, 1000);
};


const endTest = () => {
  clearInterval(countdown);
  inputField.disabled = true;
  startBtn.disabled = false;
  updateLiveStats();
};


resetBtn.addEventListener("click", () => {
  clearInterval(countdown);
  inputField.disabled = true;
  inputField.value = "";
  timerDisplay.innerText = "60";
  totalWordsEl.innerText = "0";
  correctWordsEl.innerText = "0";
  wpmEl.innerText = "0";
  accuracyEl.innerText = "0";
  paragraph.classList.add("hidden");
  results.classList.add("hidden");
  startBtn.disabled = false;
});


const updateLiveStats = () => {
  const typedText = inputField.value.trim();
  const typedWords = typedText.split(" ").filter(w => w !== "");
  const referenceWords = referenceText.split(" ");
  const correctWords = typedWords.filter((word, i) => word === referenceWords[i]);

  const totalTyped = typedWords.length;
  const correctTyped = correctWords.length;
  const elapsedSeconds = (new Date().getTime() - startTime) / 1000;
  const elapsedTimeInMinutes = elapsedSeconds / 60;

  const wpm = elapsedTimeInMinutes > 0 ? Math.round(totalTyped / elapsedTimeInMinutes) : 0;
  const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 0;

  
  totalWordsEl.innerText = totalTyped;
  correctWordsEl.innerText = correctTyped;
  wpmEl.innerText = wpm;
  accuracyEl.innerText = accuracy;

  
  const spans = paragraph.querySelectorAll("span");
  spans.forEach((span, i) => {
    const typedWord = typedWords[i] || "";
    span.style.backgroundColor = typedWord === "" 
      ? "transparent" 
      : typedWord === span.innerText 
        ? "#c8e6c9" // green
        : "#ffcdd2"; // red
  });

  results.classList.remove("hidden");
};


startBtn.addEventListener("click", startTest);
inputField.addEventListener("input", () => {
  if (!inputField.disabled) updateLiveStats();
});
