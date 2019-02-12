const tellTime = () => {
    let date = new Date(); //date objects are created with new Date();
    let hour = date.getHours(); //returns the hour (0-23)
    let minute = date.getMinutes(); //returns the minutes (0-59)
    let amPM = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;

    if (hour < 10) {
        hour = '0' + hour; //2 digit time at all times
    }
    if (minute < 10) {
        minute = '0' + minute; //2 digit minutes at all times
    }

    let time = hour + ":" + minute + " " + amPM;
    document.querySelector('.time-dock').textContent = time;
    setTimeout(tellTime, 1000); //tellTime is called every 1000 milliseconds
}

const startButton = document.querySelector('.start-button');
const startMenu = document.querySelector('.start-menu');

const bsod = document.querySelector('.bsod-window');
const folders = document.getElementsByClassName('folder-desktop')
const desktop = document.querySelector('.desktop');
const closeButtons = document.getElementsByClassName('close');


const startButtonPressed = () => {
    startButton.classList.toggle('pressed');
    startMenu.classList.toggle('displayed');
}

const startButtonMouseOut = () => {
    startButton.classList.remove('pressed');
}

const startMenuMouseOut = (event) => {
    event.preventDefault();
    let ancestor = event.target.parentNode.parentNode; //using this for readability. Slight hack.

    if (event.target !== startMenu && event.target.parentNode !== startMenu) {
        if (ancestor !== startMenu && ancestor.parentNode !== startMenu) {
            startMenu.classList.remove('displayed');
        }
    }
}

const openWindow = (event) => {
    event.preventDefault();
    let divIDName = event.target.classList[2] + '-window';
    document.getElementById(divIDName).style.display = 'block';
}

const bsodActivate = () => {
    bsod.innerHTML = '<p> A problem has been detected and windows has been shutdown to prevent damage to your computer.</p><br><p>If this is the first time you\'ve seen this stop error screen, restart your computer, If this screen appears again, follow these steps:</p><br>Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any windows updates you might need.</p><p>Don\'t panic, this is just a silly gimmick, click anywhere on the screen to go back. I did say don\'t click.</p>';
    desktop.style.display = 'none';
}

const bsodUnmount = () => {
    bsod.style.display = 'none';
    bsod.innerHTML = '';
    desktop.style.display = 'flex';
}

const closeWindow = (event) => {
    event.preventDefault();
    event.target.parentElement.parentElement.style.display = 'none';
}

for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', closeWindow, false);
}

for (let i = 0; i < folders.length; i++) {
    folders[i].addEventListener('click', openWindow, false);
    folders[3].addEventListener('click', bsodActivate, false);
}


startButton.addEventListener('mouseout', startButtonMouseOut, false);
window.addEventListener('mouseup', startMenuMouseOut, false);
startButton.addEventListener('click', startButtonPressed, false)
bsod.addEventListener('click', bsodUnmount, false);


tellTime();



const dragElement = (elmnt) => {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    }
    const elementDrag = (event) => {
        event = event || window.event;
        event.preventDefault();
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    }
    const dragMouseDown = (event) => {
        event = event || window.event;
        event.preventDefault();
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    if (document.getElementById(elmnt.id + "-title")) {
        document.getElementById(elmnt.id + "-title").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

}


const windows = document.querySelectorAll(".window");
for (let i = 0; i < windows.length; i++) {
    dragElement(windows[i])
}