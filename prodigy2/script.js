let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 100);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps = [];
    renderLaps();
    isRunning = false;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 100);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

    return `${minutes}:${seconds}:${milliseconds}`;
}

function addLap() {
    if (isRunning) {
        laps.push(elapsedTime);
        renderLaps();
    }
}

function renderLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsContainer.appendChild(lapElement);
    });
}
