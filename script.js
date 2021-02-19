let lbTimmer = document.querySelector("#timmer");
let btnStartStop = document.querySelector("#start-stop");



let btnCheck = document.querySelector("#check");

let timeCounter = 0;

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

