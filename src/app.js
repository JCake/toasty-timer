const elfie = new Elfie();

document.querySelector('.connect').addEventListener('click', () => elfie.start());

let dancePartyIntervalId = 0;
document.querySelector('.danceParty').addEventListener('click', () => {
    dancePartyIntervalId = window.setInterval(() => {
        elfie.writeColors(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    }, 1000);
});
document.querySelector('.stopDanceParty').addEventListener('click', () => {
    window.clearInterval(dancePartyIntervalId);
});

let seconds = 0;
let intervalID = 0;

displayStopwatchTime = () => {
    document.querySelector('.minutes').innerHTML = Math.floor(seconds / 60);
    document.querySelector('.seconds').innerHTML = seconds % 60;
}

getNumericValueFromInput = (inputSelector) => {
    return parseInt(document.querySelector(inputSelector).value) || 0;
}

document.querySelector('.start').addEventListener('click', () => {
    elfie.writeColors(0,0,0);

    const greenSeconds = getNumericValueFromInput('.greenMinutes') * 60 + getNumericValueFromInput('.greenSeconds');
    const yellowSeconds = getNumericValueFromInput('.yellowMinutes') * 60 + getNumericValueFromInput('.yellowSeconds');
    const redSeconds = getNumericValueFromInput('.redMinutes') * 60 + getNumericValueFromInput('.redSeconds');

    if(greenSeconds < 1) {
        alert('Must enter at least 1 second for all thresholds.');
    } else if(greenSeconds >= yellowSeconds) {
        alert('Yellow threshold must be greater than green threshold');
    } else if(yellowSeconds >= redSeconds) {
        alert('Red threshold must be greater than yellow threshold');
    } else {
        intervalID = window.setInterval(() => {
            seconds++;
            if(seconds === greenSeconds){
                elfie.writeColors(0, 255, 0);
            } else if(seconds === yellowSeconds){
                elfie.writeColors(255, 255, 0);
            } else if(seconds === redSeconds){
                elfie.writeColors(255, 0, 0);
            }
            displayStopwatchTime();
        }, 1000);
    }

    // TODO disable buttons and inputs to change time limits??
    
});

document.querySelector('.stop').addEventListener('click', () => {
    window.clearInterval(intervalID);
    intervalID = 0;
    console.info('Time in seconds: ' + seconds);

    // TODO enable buttons and inputs to change time limits if disabled.
});

document.querySelector('.reset').addEventListener('click', () => {
    if(intervalID){
        window.clearInterval(intervalID);
    } 
    seconds = 0;
    displayStopwatchTime();
    elfie.writeColors(0,0,0);
    // TODO enable buttons and inputs to change time limits if disabled.
});

setTimingLimits = (gM,gS,yM,yS,rM,rS) => {
    document.querySelector('.greenMinutes').value = gM;
    document.querySelector('.greenSeconds').value = gS;
    document.querySelector('.yellowMinutes').value = yM;
    document.querySelector('.yellowSeconds').value = yS;
    document.querySelector('.redMinutes').value = rM;
    document.querySelector('.redSeconds').value = rS;
};

document.querySelector('.fiveToSeven').addEventListener('click', () => {
    setTimingLimits(5,0,6,0,7,0);
});

document.querySelector('.oneToTwo').addEventListener('click', () => {
    setTimingLimits(1,0,1,30,2,0);
});

document.querySelector('.twoToThree').addEventListener('click', () => {
    setTimingLimits(2,0,2,30,3,0);
});

document.querySelector('.threeToFive').addEventListener('click', () => {
    setTimingLimits(3,0,4,0,5,0);
});

document.querySelector('.fourToSix').addEventListener('click', () => {
    setTimingLimits(4,0,5,0,6,0);
});

document.querySelector('.eightToTen').addEventListener('click', () => {
    setTimingLimits(8,0,9,0,10,0);
});


if ('serviceWorker' in navigator) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('SW not supported');
}