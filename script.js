const timerBtn = document.querySelector('#timer-btn');
const timeDisplay = document.querySelector('#time-display');
const resetBtn = document.querySelector('#reset-btn');

let timerOn = false;
let totalTime = 0; // total time spent in milliseconds
let intervalTimer;

// convert to hours, mins, secs
const displayTime = function(totalTime) {
  const secs = totalTime % 60;
  const totalMins = (totalTime - secs) / 60;

  if (totalMins > 59) {
    const mins = totalMins % 60;
    const hrs = (totalMins - mins) / 60;
    timeDisplay.textContent = `${hrs}h ${String(mins).padStart(
      2,
      '0'
    )}:${String(secs).padStart(2, '0')}`;
  } else {
    timeDisplay.textContent = `${String(totalMins).padStart(2, '0')}:${String(
      secs
    ).padStart(2, '0')}`;
  }
};

timerBtn.addEventListener('click', () => {
  if (!timerOn) {
    timerOn = true;
    timerBtn.textContent = 'Pause';
    intervalTimer = setInterval(() => {
      totalTime += 1;
      displayTime(totalTime);
    }, 1000);
  } else {
    timerOn = false;
    timerBtn.textContent = 'Start';
    clearInterval(intervalTimer);
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(intervalTimer);
  timerOn = false;
  timerBtn.textContent = 'Start';
  totalTime = 0;
  displayTime(totalTime);
});
