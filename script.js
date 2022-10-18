const originText = document.querySelector("#sample-text").textContent;
const testWrapper = document.querySelector("#test-wrapper");
const textArea = document.querySelector("#text-area");
const theTimer = document.querySelector("#timer");
const resetButton = document.querySelector("#reset");

textArea.addEventListener("keypress", Start);
textArea.addEventListener("keyup", spellCheck);
resetButton.addEventListener("click", reset);

var timer = [0, 1];
var isTimerRunnig = false;
var interval;

function runTimer() {
  let currentTime = `${leadingZero(timer[0])}:${leadingZero(timer[1])}`;

  theTimer.innerHTML = currentTime;

  timer[1]++;
  timer[0] = Math.floor(timer[1] / 60);
  timer[1] = Math.floor(timer[1]) - timer[0] * 60;
}

function Start() {
  let textEnteredLength = textArea.value.length;

  if (textEnteredLength == 0 && !isTimerRunnig) {
    isTimerRunnig = true;
    interval = setInterval(runTimer, 1000);
  }
}

function spellCheck() {
  let textEntered = textArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered == "") {
    testWrapper.style.borderColor = "grey";
  } else if (textEntered == originText) {
    testWrapper.style.borderColor = "lightgreen";
    showResult();
    textArea.setAttribute("disabled", "true");
    clearInterval(interval);
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "darkorange";
    } else {
      testWrapper.style.borderColor = "red";
    }
  }
}

function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 1];
  isTimerRunnig = false;
    textArea.value = "";
    textArea.removeAttribute("disabled");
    textArea.focus();
  theTimer.innerHTML = "00:00";
  testWrapper.style.borderColor = "grey";
}

function leadingZero(time) {
  if (time < 10) {
    time = `0${time}`;
  }
  return time;
}

function showResult() {
  let sumWords = originText.split(" ").length;
  let sumTimes = Math.round(timer[0] * 60 + timer[1]);
  let result = Math.round((sumWords * 60) / sumTimes);
  textArea.value = `Your typing speed is ${result} WPM(words per minute)`;
}
