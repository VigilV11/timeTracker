// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timerReset = exports.timerPaused = exports.timerActive = void 0;
var timerStartTime; // timer start timestamp

var totalTime = 0; // total time elapsed in milliseconds

var intervalTimer; //========== DISPLAY TIME ELAPSED ==========\\
// Convert to hours mins:secs

var displayTime = function displayTime(timeElapsed, e) {
  var timerDisplayText = document.querySelector(".timer-".concat(e.target.dataset.taskId)); // timeElapsed is in milliseconds
  // const ms = Math.round(timeElapsed / 100);

  var timeInSecs = Math.round(timeElapsed / 1000);
  var secs = timeInSecs % 60;
  var timeInMins = (timeInSecs - secs) / 60; // convert to hours and display h mins:secs

  if (timeInMins > 59) {
    var mins = timeInMins % 60;
    var hrs = (timeInMins - mins) / 60;
    timerDisplayText.textContent = "".concat(hrs, "h ").concat(String(mins).padStart(2, '0'), "m ").concat(String(secs).padStart(2, '0'), "s");
  } else {
    // if no hours, display mins:secs
    timerDisplayText.textContent = "".concat(String(timeInMins).padStart(2, '0'), "m ").concat(String(secs).padStart(2, '0'), "s");
  }
}; //========== TIMER IS ACTIVE ==========\\


var timerActive = function timerActive(e) {
  e.target.classList.remove('fa-play-circle');
  e.target.classList.add('fa-pause');
  timerStartTime = Date.now(); // current timestamp

  intervalTimer = setInterval(function () {
    // totalTime is initially 0, current time elapsed is stored into it during "Pause" and then reloaded here
    // this will give correct time elapsed even if the browser is not active
    var timeElapsed = totalTime + Date.now() - timerStartTime;
    displayTime(timeElapsed, e);
  }, 1000);
}; //========== TIMER IS PAUSED ==========\\


exports.timerActive = timerActive;

var timerPaused = function timerPaused(e) {
  totalTime += Date.now() - timerStartTime;
  e.target.classList.remove('fa-pause');
  e.target.classList.add('fa-play-circle');
  clearInterval(intervalTimer);
}; //========== TIMER IS RESET ==========\\


exports.timerPaused = timerPaused;

var timerReset = function timerReset() {
  clearInterval(intervalTimer);
  timerOn = false;
  timerBtn.textContent = 'Start';
  timerBtn.className = ''; // timerBtn.classList.add('btn-off-state');

  totalTime = 0;
  displayTime(totalTime);
};

exports.timerReset = timerReset;
},{}],"script.js":[function(require,module,exports) {
"use strict";

var Timer = _interopRequireWildcard(require("./timer.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var timerBtn = document.querySelector('#timer-btn');
var timeDisplay = document.querySelector('#time-display');
var resetBtn = document.querySelector('#reset-btn');
var addTaskBtn = document.querySelector('.add-task-btn');
var taskInput = document.querySelector('.task-input');
var taskListDiv = document.querySelector('#task-list-div');
var timerOn = false; // Is timer ON (true) or OFF (false)?

var taskList = [];
var taskId = 0; // a number to indentify individual items
// taskItem = {taskName: , taskID: , currentCompletedTime: , dayStarted: , dayCompleted: , allTimeTracked: [], estimatedCompletionTime: , actualCompletionTime: , project: [area: [sub-area: [sub-sub-area]]]}
//========== ADD TASK ==========\\

var addTask = function addTask() {
  // console.log(taskInput.value);
  taskId++;
  taskList.push({
    taskName: taskInput.value,
    taskId: taskId
  });
  var html = "\n    <div class=\"task-item\">\n    <span>".concat(taskInput.value.padEnd(30), "</span>  &nbsp;&nbsp;&nbsp;&nbsp;\n    <span id=\"time-display\" class=\"timer-").concat(taskId, "\">00m 00s</span>\n    \n\n\n    <i class=\"fas fa-play-circle\" data-task-id=").concat(taskId, "></i> &nbsp;\n\n    \n    \n    \n    <i class=\"fas fa-sync-alt\"></i> &nbsp;\n    <i class=\"fas fa-trash\"></i> &nbsp;\n    <i class=\"fas fa-check-circle\"></i> &nbsp;&nbsp;\n\n    <br />\n    <br />\n    </div>\n    \n\n    <!--\n    <i class=\"fas fa-pause\" data-task-id=").concat(taskId, "></i> &nbsp;\n\n    <button class=\"btn\"><i class=\"fa fa-trash\"></i></button>\n    <button class=\"btn\"><i class=\"fas fa-play-circle\"></i></button>\n    <button id=\"timer-btn\" class=\"btn-off-state\">Start</button>\n    <button id=\"reset-btn\" class=\"btn-off-state\">Reset</button>\n    -->\n    ");
  taskListDiv.insertAdjacentHTML('beforeend', html);
}; //========== LOGIC ==========\\
// Add a new task


addTaskBtn.addEventListener('click', function () {
  if (taskInput.value !== '') {
    addTask();
  }

  taskInput.value = '';
  taskInput.focus();
  taskInput.select();
}); // Adding event delegation to handle buttons related to individual tasks

taskListDiv.addEventListener('click', function (e) {
  if (!e.target.classList.contains('fas')) return; // console.log(e.target.dataset.taskId);
  // document.querySelector(`.timer-${e.target.dataset.taskId}`).textContent = '';
  // For now this works only for a single task.

  if (timerOn) {
    Timer.timerPaused(e);
    timerOn = false;
  } else {
    Timer.timerActive(e);
    timerOn = true;
  }
}); ////////
// For Parcel hot loading

module.hot && module.hot.accept();
},{"./timer.js":"timer.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65246" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map