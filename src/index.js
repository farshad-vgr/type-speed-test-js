let themeBtn = document.querySelector("#theme-btn");
let originText = document.querySelector("#sample-text");
let testWrapper = document.querySelector("#test-wrapper");
let textArea = document.querySelector("#text-area");
let theTimer = document.querySelector("#timer");
let resetButton = document.querySelector("#reset");

themeBtn.addEventListener("click", themeChanger);
textArea.addEventListener("keypress", Start);
textArea.addEventListener("keyup", spellCheck);
resetButton.addEventListener("click", reset);

const testWords = [
  "Lorem",
  "ipsum",
  "dolor",
  "Sit",
  "amet",
  "Consectetur",
  "adipisicing",
  "Elit",
  "sed",
  "eiusmod",
  "Tempor",
  "incididunt",
  "labore",
  "Magna",
  "aliqua",
  "enim",
  "minim",
  "Veniam",
  "Quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "commodo",
  "consequat",
];
originText.innerHTML = wordSelector(testWords);
let timer = [0, 1];
let isTimerRunnig = false;
let interval;
let isLight = true;
let sotrage = window.localStorage;
if (sotrage.getItem("isLightState")) {
  if (!(sotrage.getItem("isLightState") === "light" ? true : false)) {
    document.body.classList.add("dark-mode");
    themeBtn.firstElementChild.setAttribute("src", "./assets/images/dark.png");
    isLight = false;
    sotrage.setItem("isLightState", "dark");
  }
}

function themeChanger() {
  if (isLight) {
    document.body.classList.add("dark-mode");
    themeBtn.firstElementChild.setAttribute("src", "./assets/images/dark.png");
    isLight = false;
    sotrage.setItem("isLightState", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    themeBtn.firstElementChild.setAttribute("src", "./assets/images/light.png");
    isLight = true;
    sotrage.setItem("isLightState", "light");
  }
}

function wordSelector(arr) {
  let words = "";
  for (let i = 0; i < 10; i++) {
    let randomNumber = Math.floor(Math.random() * arr.length);
    words += arr[randomNumber] + " ";
  }
  return words.trim();
}

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
  let originTextMatch = originText.innerHTML.substring(0, textEntered.length);

  if (textEntered == "") {
    testWrapper.style.borderColor = "grey";
  } else if (textEntered == originText.innerHTML) {
    testWrapper.style.borderColor = "lightgreen";
    showResult();
    textArea.setAttribute("disabled", "true");
    clearInterval(interval);
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "deepskyblue";
    } else {
      testWrapper.style.borderColor = "red";
    }
  }
}

function reset() {
  clearInterval(interval);
  interval = null;
  originText.innerHTML = wordSelector(testWords);
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
  let sumWords = originText.innerHTML.split(" ").length;
  let sumTimes = Math.round(timer[0] * 60 + timer[1]);
  let result = Math.round((sumWords * 60) / sumTimes);
  if (result >= 30) {
    textArea.value = `Your typing speed is ${result} WPM(words per minute)
    Your typing speed is "EXCELLENT"!`;
  } else if (result < 30 && result >= 20) {
    textArea.value = `Your typing speed is ${result} WPM(words per minute)
    Your typing speed is "GOOD"!`;
  } else if (result < 20 && result >= 10) {
    textArea.value = `Your typing speed is ${result} WPM(words per minute)
    Your typing speed is "MODERATE"!`;
  } else if (result < 10) {
    textArea.value = `Your typing speed is ${result} WPM(words per minute)
    Your typing speed is "NOT GOOD"!`;
  }
}

resetButton.click();
