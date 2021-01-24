// For Polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';
////

import * as Timer from './timer.js';

const timerBtn = document.querySelector('#timer-btn');
const timeDisplay = document.querySelector('#time-display');
const resetBtn = document.querySelector('#reset-btn');
const addTaskBtn = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.task-input');
const taskListDiv = document.querySelector('#task-list-div');

let timerOn = false; // Is timer ON (true) or OFF (false)?

const taskList = [];
let taskId = 0; // a number to indentify individual items

// taskItem = {taskName: , taskID: , currentCompletedTime: , dayStarted: , dayCompleted: , allTimeTracked: [], estimatedCompletionTime: , actualCompletionTime: , project: [area: [sub-area: [sub-sub-area]]]}

//========== ADD TASK ==========\\
const addTask = function() {
  // console.log(taskInput.value);
  taskId++;
  taskList.push({ taskName: taskInput.value, taskId: taskId });
  const html = `
    <div class="task-item">
    <span class="task-name">${taskInput.value}</span>  &nbsp;&nbsp;
    <span id="time-display" class="timer-${taskId}">00m 00s</span> &nbsp;&nbsp;&nbsp;&nbsp;
    


    <i class="fas fa-play-circle" data-task-id=${taskId}></i> &nbsp;&nbsp;

    
    
    
    <i class="fas fa-sync-alt"></i> &nbsp;&nbsp;
    <i class="fas fa-trash"></i> &nbsp;&nbsp;
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

  if (timerOn) {
    Timer.timerPaused(e);
    timerOn = false;
  } else {
    Timer.timerActive(e);
    timerOn = true;
  }
});

////////
// For Parcel hot loading
module.hot && module.hot.accept();
