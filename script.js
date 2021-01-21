const timerBtn = document.querySelector('#timer-btn');
const timeDisplay = document.querySelector('#time-display');
const resetBtn = document.querySelector('#reset-btn');
const addTask = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.task-input');
const taskListDiv = document.querySelector('#task-list-div');

let timerOn = false; // Is timer ON (true) or OFF (false)?
let totalTime = 0; // total time elapsed in milliseconds
let timerStartTime; // timer start timestamp
let intervalTimer;
const taskList = [];

//========== DISPLAY TIME ELAPSED ==========\\
// Convert to hours mins:secs
const displayTime = function(timeElapsed) {
  // timeElapsed is in milliseconds

  const ms = Math.round(timeElapsed / 100);
  const timeInSecs = Math.round(timeElapsed / 1000);
  const secs = timeInSecs % 60;
  const timeInMins = (timeInSecs - secs) / 60;

  // convert to hours and display h mins:secs
  if (timeInMins > 59) {
    const mins = timeInMins % 60;
    const hrs = (timeInMins - mins) / 60;
    timeDisplay.textContent = `${hrs}h ${String(mins).padStart(
      2,
      '0'
    )}m ${String(secs).padStart(2, '0')}s`;
  } else {
    // if no hours, display mins:secs
    mins = timeInMins;
    timeDisplay.textContent = `${String(mins).padStart(2, '0')}m ${String(
      secs
    ).padStart(2, '0')}s`;
  }
};

//========== TIMER IS ACTIVE ==========\\
const timerActive = function() {
  timerOn = true;
  timerBtn.textContent = 'Pause';

  timerBtn.className = '';
  timerBtn.classList.add('timer-btn-active-state');
  timerStartTime = Date.now(); // current timestamp
  intervalTimer = setInterval(() => {
    // totalTime is initially 0, current time elapsed is stored into it during "Pause" and then reloaded here
    // this will give correct time elapsed even if the browser is not active
    const timeElapsed = totalTime + Date.now() - timerStartTime;

    displayTime(timeElapsed);
  }, 1000);
};

//========== TIMER IS PAUSED ==========\\
const timerPaused = function() {
  totalTime += Date.now() - timerStartTime;
  timerOn = false;
  timerBtn.textContent = 'Resume';
  timerBtn.className = '';
  timerBtn.classList.add('timer-btn-paused-state');
  clearInterval(intervalTimer);
};

//========== TIMER IS RESET ==========\\

const timerReset = function() {
  clearInterval(intervalTimer);
  timerOn = false;
  timerBtn.textContent = 'Start';
  timerBtn.className = '';
  timerBtn.classList.add('btn-off-state');
  totalTime = 0;
  displayTime(totalTime);
};

//========== LOGIC ==========\\
// Start/Pause the timer
timerBtn.addEventListener('click', () => {
  !timerOn ? timerActive() : timerPaused();
});

// Reset the timer
resetBtn.addEventListener('click', timerReset);

addTask.addEventListener('click', () => {
  if (taskInput.value !== '') {
    console.log(taskInput.value);
    const html = `
    <div>
    <span>${taskInput.value}</span>  &nbsp;&nbsp;&nbsp;&nbsp;
    <span id="time-display">00m 00s</span>
    


    <i class="fas fa-play-circle"></i> &nbsp;
    <i class="fas fa-pause"></i> &nbsp;
    <i class="fas fa-sync-alt"></i> &nbsp;
    <i class="fas fa-trash"></i> &nbsp;
    <i class="fas fa-check-circle"></i> &nbsp;&nbsp;

    <br />
    <br />
    </div>
    

    <!--
    <button class="btn"><i class="fa fa-trash"></i></button>
    <button class="btn"><i class="fas fa-play-circle"></i></button>
    <button id="timer-btn" class="btn-off-state">Start</button>
    <button id="reset-btn" class="btn-off-state">Reset</button>
    -->
    `;
    taskListDiv.insertAdjacentHTML('beforeend', html);
  }

  taskInput.value = '';
  taskInput.focus();
  taskInput.select();
});

// Adding event delegation to handle buttons related to individual tasks
taskListDiv.addEventListener('click', function(e) {
  // some logic here
});
