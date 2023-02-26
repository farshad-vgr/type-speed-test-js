const themeButton = document.getElementById("theme-btn");
const sampleText = document.getElementById("sample-text");
const textValidator = document.getElementById("text-validator");
const textArea = document.getElementById("text-area");
const showTimer = document.getElementById("timer");
const restartButton = document.getElementById("restart-btn");
const dropButton = document.getElementById("drop-btn");
const dropMenu = document.getElementById("drop-menu");
const dropItem1 = document.getElementById("drop-item1");
const dropItem2 = document.getElementById("drop-item2");
const dropItem3 = document.getElementById("drop-item3");

// This array includes some meanless words to be chosen randomly for sample text
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
	"dasher",
	"Komodo",
	"Ferzi",
	"exercitation",
	"ullamco",
	"laboris",
	"nisi",
	"aliquip",
	"commodo",
	"consequat",
];
const testWordsLength = testWords.length;

const sotrage = window.localStorage;
let isLight = true;
let selectedLevel = 10; // Default value for starting
let timer = [0, 1];// First index is minute's value and second index is second's value
let isTimerRunnig = false;
let showDropMenu = false;
let interval; // Assing return value of the interval

themeButton.addEventListener("click", themeChanger);
textArea.addEventListener("keypress", StartTimer);
textArea.addEventListener("keyup", spellChecker);
restartButton.addEventListener("click", reset);
dropButton.addEventListener("click", () => dropMenu.classList.toggle("hidden"));
dropItem1.addEventListener("click", (e) => dropItemHandler(e.target.innerText, 10));
dropItem2.addEventListener("click", (e) => dropItemHandler(e.target.innerText, 20));
dropItem3.addEventListener("click", (e) => dropItemHandler(e.target.innerText, 30));

// Getting theme status from local storage at the startup
if (sotrage.getItem("isLightState")) {
	if (!(sotrage.getItem("isLightState") === "light" ? true : false)) {
		document.documentElement.classList.add("dark"); // Adding "dark" class name to html tag to have Tailwind dark mode
		themeButton.firstElementChild.setAttribute("src", "./assets/images/dark.png");
		isLight = false;
		sotrage.setItem("isLightState", "dark");
	}
}

// This function evaluates theme status and shows proper icons and colors
function themeChanger() {
	if (isLight) {
		document.documentElement.classList.add("dark"); // Adding "dark" class name to html tag to have Tailwind dark mode
		themeButton.firstElementChild.setAttribute("src", "./assets/images/dark.png");
		isLight = false;
		sotrage.setItem("isLightState", "dark");
	} else {
		document.documentElement.classList.remove("dark"); // Adding "dark" class name to html tag to have Tailwind dark mode
		themeButton.firstElementChild.setAttribute("src", "./assets/images/light.png");
		isLight = true;
		sotrage.setItem("isLightState", "light");
	}
}

// This function chooses words from an array randomly depends on selected level(easy = 10 words will be selected, normal = 20, hard = 30)
function wordSelector() {
	let words = "";
	for (let i = 0; i < selectedLevel; i++) {
		const randomNumber = Math.floor(Math.random() * testWordsLength);
		words += testWords[randomNumber] + " ";
	}
	return words.trim();
}

// This function puts a zero before the number if it is less than 10
function leadingZero(time) {
	if (time < 10) {
		time = `0${time}`;
	}
	return time;
}

// This function updates the second's value and minute's value
function runTimer() {
	showTimer.innerHTML = `${leadingZero(timer[0])}:${leadingZero(timer[1])}`;

  timer[ 1 ]++;
  
	if (timer[1] === 60) {
    timer[ 0 ]++;
    timer[ 1 ] = 0;
	}
}

// This function starts the timer if the text area is empty and the user starts typing
function StartTimer() {
	if (textArea.value.length === 0 && !isTimerRunnig) {
		isTimerRunnig = true;
		interval = setInterval(runTimer, 1000);
	}
}

// This function checks spell of entered text and sample text
function spellChecker() {
	const enteredText = textArea.value.toString().trim();
	const sampleTextMatch = sampleText.innerHTML.substring(0, enteredText.length);

	if (enteredText === "") {
		textValidator.style.borderColor = "grey";
	} else if (enteredText === sampleText.innerHTML) {
		textValidator.style.borderColor = "lightgreen";
		showResult();
		textArea.setAttribute("disabled", "true");
		clearInterval(interval);
	} else {
		if (enteredText === sampleTextMatch) {
			textValidator.style.borderColor = "deepskyblue";
		} else {
			textValidator.style.borderColor = "red";
		}
	}
}

// This function assigns all values to the defaults
function reset() {
	clearInterval(interval);
	interval = null;
	sampleText.innerHTML = wordSelector();
	timer = [0, 1];
	isTimerRunnig = false;
	textArea.value = "";
	textArea.removeAttribute("disabled");
	textArea.focus();
	showTimer.innerHTML = "00:00";
	textValidator.style.borderColor = "grey";
}

// This function determines WPM and shows the proper result to the user
function showResult() {
	const sumTimes = timer[0] * 60 + timer[1];
  const result = Math.round((selectedLevel * 60) / sumTimes);
  
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

// This function handles clicking on each item of the dropdown button
function dropItemHandler(str, num) {
	dropButton.firstChild.nodeValue = str;
	dropMenu.classList.toggle("hidden");
	selectedLevel = num;
	restartButton.click();
}

restartButton.click();
