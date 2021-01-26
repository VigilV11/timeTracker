// For Polyfilling
import './node_modules/core-js/stable';
import './node_modules/regenerator-runtime/runtime';
////

import * as Timer from './timer.js';

const timerBtn = document.querySelector('#timer-btn');
const timeDisplay = document.querySelector('#time-display');
const resetBtn = document.querySelector('#reset-btn');
const addTaskBtn = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.task-input');
const taskListDiv = document.querySelector('#task-list-div');

let timerOn = false; // Is timer ON (true) or OFF (false)?

let taskList = [];

// TODO: Render tasks on page from taskList

let taskId = -1; // a number to indentify individual items; so that the first task will be 0 after taskId++

let currentTask;

// taskItem = {taskName: , taskID: , totalTime: , dayStarted: , dayCompleted: , allTimeTracked: [], estimatedCompletionTime: , actualCompletionTime: , project: [area: [sub-area: [sub-sub-area]]]}

//========== ADD TASK ==========\\
const addTask = function() {
  taskId++;
  const task = { taskName: taskInput.value, taskId: taskId, totalTime: 0 };
  taskList.push(task);
  const html = generateTaskHTML(task);
  taskListDiv.insertAdjacentHTML('beforeend', html);
};

//========== GENERATE TASK ITEM HTML ==========\\
const generateTaskHTML = function(task) {
  return `
    <div class="task-item">
    <span class="task-name">${task.taskName}</span>  &nbsp;&nbsp;
    <span id="time-display" class="timer-${task.taskId}">00m 00s</span> &nbsp;&nbsp;&nbsp;&nbsp;
    


    <i class="taskBtn timerBtn fas fa-play-circle" data-task-id=${task.taskId}></i> &nbsp;&nbsp;

    
    
    
    <i class="taskBtn fas fa-sync-alt"></i> &nbsp;&nbsp;
    <i class="taskBtn fas fa-trash"></i> &nbsp;&nbsp;
    <i class="taskBtn fas fa-check-circle"></i> &nbsp;&nbsp;

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
};

//========== RENDER TASKS TO WEBPAGE FROM LOCALSTORAGE ==========\\
if (localStorage.taskList) {
  taskList = JSON.parse(localStorage.getItem('taskList'));

  taskList.forEach(task => {
    const html = generateTaskHTML(task);
    taskListDiv.insertAdjacentHTML('beforeend', html);
  });
}

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
  if (!e.target.classList.contains('taskBtn')) return; // It it is not a button return immediately

  if (e.target.classList.contains('timerBtn')) {
    //If it is timer start/pause button

    const taskId = e.target.dataset.taskId;

    if (timerOn) {
      if (taskId === currentTask) {
        Timer.timerPaused(e, taskList[taskId]);
        timerOn = false;
      }
    } else {
      Timer.timerActive(e, taskList[taskId]);
      timerOn = true;
      currentTask = taskId;
    }
  }
});

window.addEventListener('beforeunload', e => {
  e.preventDefault();
  // e.returnValue = '';
  localStorage.setItem('taskList', JSON.stringify(taskList));
});

////////
// For Parcel hot loading
// module.hot && module.hot.accept();
