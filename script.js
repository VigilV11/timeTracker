const timerBtn = document.querySelector('#timer-btn');
const timeDisplay = document.querySelector('#time-display');
const resetBtn = document.querySelector('#reset-btn');
const addTaskBtn = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.task-input');
const taskListDiv = document.querySelector('#task-list-div');

let timerOn = false; // Is timer ON (true) or OFF (false)?
let totalTime = 0; // total time elapsed in milliseconds
let timerStartTime; // timer start timestamp
let intervalTimer;
const taskList = [];
let taskId = 0; // a number to indentify individual items

// taskItem = {taskName: , taskID: , currentCompletedTime: , dayStarted: , dayCompleted: , allTimeTracked: [], estimatedCompletionTime: , actualCompletionTime: , project: [area: [sub-area: [sub-sub-area]]]}

//========== DISPLAY TIME ELAPSED ==========\\
// Convert to hours mins:secs
const displayTime = function(timeElapsed, e) {
  timerDisplayText = document.querySelector(
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
    mins = timeInMins;
    timerDisplayText.textContent = `${String(mins).padStart(2, '0')}m ${String(
      secs
    ).padStart(2, '0')}s`;
  }
};

//========== TIMER IS ACTIVE ==========\\
const timerActive = function(e) {
  if (timerOn) return; // if another timer is running don't do anything

  timerOn = true;

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
  timerOn = false;

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

//========== ADD TASK ==========\\
const addTask = function() {
  // console.log(taskInput.value);
  taskId++;
  taskList.push({ taskName: taskInput.value, taskId: taskId });
  const html = `
    <div class="task-item">
    <span>${taskInput.value.padEnd(30)}</span>  &nbsp;&nbsp;&nbsp;&nbsp;
    <span id="time-display" class="timer-${taskId}">00m 00s</span>
    


    <i class="fas fa-play-circle" data-task-id=${taskId}></i> &nbsp;

    
    
    
    <i class="fas fa-sync-alt"></i> &nbsp;
    <i class="fas fa-trash"></i> &nbsp;
    <i class="fas fa-check-circle"></i> &nbsp;&nbsp;

    <br />
    <br />
    </div>
    

    <!--
    <i class="fas fa-pause" data-task-id=${taskId}></i> &nbsp;

    <button class="btn"><i class="fa fa-trash"></i></button>
    <button class="btn"><i class="fas fa-play-circle"></i></button>
    <button id="timer-btn" class="btn-off-state">Start</button>
    <button id="reset-btn" class="btn-off-state">Reset</button>
    -->
    `;
  taskListDiv.insertAdjacentHTML('beforeend', html);
};

//========== LOGIC ==========\\

// Add a new task
addTaskBtn.addEventListener('click', () => {
  if (taskInput.value !== '') {
    addTask();
  }

  taskInput.value = '';
  taskInput.focus();
  taskInput.select();
});

// Adding event delegation to handle buttons related to individual tasks
taskListDiv.addEventListener('click', function(e) {
  if (!e.target.classList.contains('fas')) return;

  // console.log(e.target.dataset.taskId);
  // document.querySelector(`.timer-${e.target.dataset.taskId}`).textContent = '';

  // For now this works only for a single task.
  timerOn ? timerPaused(e) : timerActive(e);
});
