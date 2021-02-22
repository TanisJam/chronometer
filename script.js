let btnSettings = document.querySelector("#settings");
let lbTimmer = document.querySelector("#timmer");
let btnStartStop = document.querySelector("#start-stop");
let btnCheck = document.querySelector("#check");
let timeList = document.querySelector("#time-list");


//Getting options
const chbRestartOnCheck = document.querySelector("#restart-on-check");

let presetTimes = ["00:00:03", "00:00:02", "00:00:01", "00:00:00"];
let previousTimes = [];

const getOption = function (checkButton) {
    return checkButton.checked;
}
let optRestartOnCheck = getOption(chbRestartOnCheck);


//Setting options
chbRestartOnCheck.addEventListener("change", () => optRestartOnCheck = getOption(chbRestartOnCheck));


//Config menu open and close
let open = false;
btnSettings.addEventListener("click", () => {
    let window = document.getElementById("config-pop").style;
    if (!open) {
        window.display = "block";
        open = !open;
    } else {
        window.display = "none";
        open = !open;
    }
});


//Chronometer Start / Stop

let timeCounter = 0;

let onOff = false;
let time;
let startTimmer = function () {
    if (onOff && timeCounter) { 
        checkTime();
    }

    onOff = !onOff;

    if (onOff) {
        time = setInterval(() => {
            timeCounter++;
            displayUpdate(milliToHuman(timeCounter));

        }, 10);
    } else {
        clearInterval(time);
        timeCounter = 0;
    }
}
btnStartStop.addEventListener("click", startTimmer);


//function to convert from millisecons to MIN:SEC:MIL
let milliToHuman = function (millisecons = 0) {
    let min = 0;
    let sec = 0;
    let mil = millisecons;

    if (mil > 99) {
        sec = Math.floor(mil / 100);
        mil = mil % 100;
    }

    if (sec > 59) {
        min = Math.floor(sec / 60);
        sec = (sec % 60);

    }

    if (mil.toString().length < 2) {
        mil = "0" + mil;
    }

    if (sec.toString().length < 2) {
        sec = "0" + sec;
    }

    if (min.toString().length < 2) {
        min = "0" + min;
    }

    return (`${min}:${sec}:${mil}`);
}

//function to update the display
let displayUpdate = function (timeValue) {
    lbTimmer.innerHTML = timeValue;
}

//function to update the time list
let updateTimeList = function (givenTimes) {
    let timeElapsed = Date.now();
    let today = new Date(timeElapsed);
    let hour = today.getHours();
    let minute = today.getMinutes();
    let seconds = today.getSeconds();

    if (minute.toString().length < 2) {
        minute = "0" + minute;
    }
    if (seconds.toString().length < 2) {
        seconds = "0" + seconds;
    }

    let timeStamp = `<sup>${hour}:${minute}:${seconds} hs</sup>`;



    if (givenTimes) {
        timeList.innerHTML = "";

        givenTimes.forEach((time) => {
            timeList.innerHTML += `<li>${time}</li> ${timeStamp}`;
        });
    }

}
//Chronometer Check
let checkTime = function () {

    if (onOff) {

        currentTime = milliToHuman(timeCounter);
        if (optRestartOnCheck) {
            timeCounter = 0;
        }

        previousTimes.unshift(currentTime);

        updateTimeList(previousTimes);
    }
}
btnCheck.addEventListener("click", checkTime);