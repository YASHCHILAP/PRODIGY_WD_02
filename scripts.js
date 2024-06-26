let startTime, updatedTime, difference, tInterval, running = false;
const display = document.getElementById('display');
const laps = document.getElementById('laps');
const body = document.body;

const backgroundImages = [
    'url(image1.jpg)',
    'url(image2.jpg)',
    'url(image3.jpg)',
    'url(image4.jpg)'
];
let currentImageIndex = 0;

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1000);
        running = true;
        document.getElementById('start').disabled = true;
        document.getElementById('pause').disabled = false;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        document.getElementById('start').disabled = false;
        document.getElementById('pause').disabled = true;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = "00:00:00";
    laps.innerHTML = '';
    document.getElementById('start').disabled = false;
    document.getElementById('pause').disabled = true;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = hours + ":" + minutes + ":" + seconds;
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        laps.appendChild(lapElement);
    }
}

function changeBackgroundImage() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    body.style.backgroundImage = backgroundImages[currentImageIndex];
}

setInterval(changeBackgroundImage, 300000); // Change image every 5 minutes (300,000 milliseconds)
