const btnSettings = document.querySelector("#settings");

let lbTimmer = document.querySelector("#timmer");
let btnStartStop = document.querySelector("#start-stop");
let btnCheck = document.querySelector("#check");

let timeCounter = 0;

//Options
const chbRestartOnCheck = document.querySelector("#restart-on-check");
let presetTimes = ["00:00:03", "00:00:02", "00:00:01", "00:00:00"];
//Config menu
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


//Chronometer run
let onOff = false;
let time;
let startTimmer = function () {
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
        sec = sec % 60;
    }

    return (`${min}:${sec}:${mil}`);
}

//function to update the display
let displayUpdate = function (timeValue) {
    lbTimmer.innerHTML = timeValue;
}

//function to update the list of times
