let timerStartTime; // timer start timestamp
let totalTime = 0; // total time elapsed in milliseconds
let intervalTimer;

//========== DISPLAY TIME ELAPSED ==========\\
// Convert to hours mins:secs
const displayTime = function(timeElapsed, e) {
  const timerDisplayText = document.querySelector(
    `.timer-${e.target.dataset.taskId}`
  );
  // timeElapsed is in milliseconds

  // const ms = Math.round(timeElapsed / 100);
  const timeInSecs = Math.round(timeElapsed / 1000);
  const secs = timeInSecs % 60;
  const timeInMins = (timeInSecs - secs) / 60;

  // convert to hours and display h mins:secs
  if (timeInMins > 59) {
    const mins = timeInMins % 60;
    const hrs = (timeInMins - mins) / 60;
    timerDisplayText.textContent = `${hrs}h ${String(mins).padStart(
      2,
      '0'
    )}m ${String(secs).padStart(2, '0')}s`;
  } else {
    // if no hours, display mins:secs
    timerDisplayText.textContent = `${String(timeInMins).padStart(
      2,
      '0'
    )}m ${String(secs).padStart(2, '0')}s`;
  }
};

//========== TIMER IS ACTIVE ==========\\
const timerActive = function(e) {
  e.target.classList.remove('fa-play-circle');
  e.target.classList.add('fa-pause');

  timerStartTime = Date.now(); // current timestamp

  intervalTimer = setInterval(() => {
    // totalTime is initially 0, current time elapsed is stored into it during "Pause" and then reloaded here
    // this will give correct time elapsed even if the browser is not active
    const timeElapsed = totalTime + Date.now() - timerStartTime;

    displayTime(timeElapsed, e);
  }, 1000);
};

//========== TIMER IS PAUSED ==========\\
const timerPaused = function(e) {
  totalTime += Date.now() - timerStartTime;

  e.target.classList.remove('fa-pause');
  e.target.classList.add('fa-play-circle');

  clearInterval(intervalTimer);
};

//========== TIMER IS RESET ==========\\

const timerReset = function() {
  clearInterval(intervalTimer);
  timerOn = false;
  timerBtn.textContent = 'Start';
  timerBtn.className = '';
  // timerBtn.classList.add('btn-off-state');
  totalTime = 0;
  displayTime(totalTime);
};

export { timerActive, timerPaused, timerReset };
