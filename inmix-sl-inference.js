/*************************** 
 * Inmix-Sl-Inference *
 ***************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2024.1.5.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'inmix-sl-inference';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
    'exposure': [1, 2],
    'test': [1, 2],
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from setup_code
import * as random from 'random';

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true,
  backgroundImage: '',
  backgroundFit: 'none',
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(instructionsRoutineBegin());
flowScheduler.add(instructionsRoutineEachFrame());
flowScheduler.add(instructionsRoutineEnd());
const exposure_loopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(exposure_loopLoopBegin(exposure_loopLoopScheduler));
flowScheduler.add(exposure_loopLoopScheduler);
flowScheduler.add(exposure_loopLoopEnd);










flowScheduler.add(test_instructionsRoutineBegin());
flowScheduler.add(test_instructionsRoutineEachFrame());
flowScheduler.add(test_instructionsRoutineEnd());
const testing_blocksLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(testing_blocksLoopBegin(testing_blocksLoopScheduler));
flowScheduler.add(testing_blocksLoopScheduler);
flowScheduler.add(testing_blocksLoopEnd);









flowScheduler.add(finishedRoutineBegin());
flowScheduler.add(finishedRoutineEachFrame());
flowScheduler.add(finishedRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'default.png', 'path': 'https://pavlovia.org/assets/default/default.png'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.WARNING);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2024.1.5';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var instructionsClock;
var instruct_resp;
var instruct_text;
var setup_blockClock;
var index_AB;
var index_BC;
var index_CD;
var index_AB_array;
var index_BC_array;
var index_CD_array;
var trial_list_AB;
var trial_list_BC;
var trial_list_CD;
var oneback_list_AB;
var oneback_list_BC;
var oneback_list_CD;
var trial_list;
var trial_list_1back;
var init_fix;
var setup_trialsClock;
var pair1_dispClock;
var pair1_image;
var pair1_resp;
var pair1_fix;
var pair1_1backClock;
var pair1_1back_image;
var pair1_1back_resp;
var pair1_1back_fix;
var pair2_dispClock;
var pair2_image;
var pair2_resp;
var pair2_fix;
var pair2_1backClock;
var pair2_1back_image;
var pair2_1back_resp;
var pair2_1back_fix;
var between_blocks_breakClock;
var text_countdown;
var test_instructionsClock;
var test_instruct;
var test_resp;
var testing_block_setupClock;
var test_trialClock;
var target_1;
var ISI_load_images;
var target_2;
var foil_1;
var foil_2;
var key_resp_2afc;
var fixation_2afc;
var fixClock;
var fixation_fb;
var finishedClock;
var thank_you;
var end_key_resp;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "instructions"
  instructionsClock = new util.Clock();
  // Run 'Begin Experiment' code from setup_code
  /* Syntax Error: Fix Python code */
  instruct_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  instruct_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'instruct_text',
    text: 'Welcome!\nIn this experiment you will see a sequence of images.\nYou will see one image at a time.\nFor each image, please judge whether it is the same as the previous image you just saw.\nIf the image is the SAME as the previous one, press "space".\nIf the colour is DIFFERENT from the previous one, press "z".\nExample: A--B("z")--B("/")--C("z")\nPlease respond as ACCURATELY and as FAST as possible.\nPress space bar to start.\'',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "setup_block"
  setup_blockClock = new util.Clock();
  // Run 'Begin Experiment' code from block_code
  index_AB = shuffle_without_doubles(num_groups, num_rep);
  index_BC = shuffle_without_doubles(num_groups, num_rep);
  index_CD = shuffle_without_doubles(num_groups, num_rep);
  index_AB_array = np.array(index_AB);
  index_BC_array = np.array(index_BC);
  index_CD_array = np.array(index_CD);
  trial_list_AB = function () {
      var _pj_a = [], _pj_b = index_AB;
      for (var _pj_c = 0, _pj_d = _pj_b.length; (_pj_c < _pj_d); _pj_c += 1) {
          var i = _pj_b[_pj_c];
          _pj_a.push(AB_pairs[i]);
      }
      return _pj_a;
  }
  .call(this);
  trial_list_BC = function () {
      var _pj_a = [], _pj_b = index_BC;
      for (var _pj_c = 0, _pj_d = _pj_b.length; (_pj_c < _pj_d); _pj_c += 1) {
          var i = _pj_b[_pj_c];
          _pj_a.push(BC_pairs[i]);
      }
      return _pj_a;
  }
  .call(this);
  trial_list_CD = function () {
      var _pj_a = [], _pj_b = index_CD;
      for (var _pj_c = 0, _pj_d = _pj_b.length; (_pj_c < _pj_d); _pj_c += 1) {
          var i = _pj_b[_pj_c];
          _pj_a.push(CD_pairs[i]);
      }
      return _pj_a;
  }
  .call(this);
  oneback_list_AB = np.zeros_like(trial_list_AB);
  oneback_list_BC = np.zeros_like(trial_list_BC);
  oneback_list_CD = np.zeros_like(trial_list_CD);
  for (var i, _pj_c = 0, _pj_a = util.range(num_groups), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
      i = _pj_a[_pj_c];
      bool_AB = (index_AB_array === i);
      bool_BC = (index_BC_array === i);
      bool_CD = (index_CD_array === i);
      idx_AB = np.where(bool_AB)[0];
      idx_BC = np.where(bool_BC)[0];
      idx_CD = np.where(bool_CD)[0];
      oneback_list_AB[idx_AB] = [0, 0];
      oneback_list_BC[idx_BC] = [0, 0];
      oneback_list_CD[idx_CD] = [0, 0];
      oneback_AB = Math.random.sample(idx_AB.tolist(), num_1backs_each_pair);
      oneback_BC = Math.random.sample(idx_BC.tolist(), num_1backs_each_pair);
      oneback_CD = Math.random.sample(idx_CD.tolist(), num_1backs_each_pair);
      oneback_pair_idx = Number.parseInt((num_1backs_each_pair / 2));
      oneback_list_AB[oneback_AB.slice(0, oneback_pair_idx)] = p1_1back;
      oneback_list_AB[oneback_AB.slice(oneback_pair_idx)] = p2_1back;
      oneback_list_BC[oneback_BC.slice(0, oneback_pair_idx)] = p1_1back;
      oneback_list_BC[oneback_BC.slice(oneback_pair_idx)] = p2_1back;
      oneback_list_CD[oneback_CD.slice(0, oneback_pair_idx)] = p1_1back;
      oneback_list_CD[oneback_CD.slice(oneback_pair_idx)] = p2_1back;
  }
  if ((exposure_cond === 1)) {
      trial_list = [trial_list_AB, trial_list_BC, trial_list_CD];
      trial_list_1back = [oneback_list_AB, oneback_list_BC, oneback_list_CD];
  } else {
      if ((exposure_cond === 2)) {
          trial_list = [trial_list_AB, trial_list_CD, trial_list_BC];
          trial_list_1back = [oneback_list_AB, oneback_list_CD, oneback_list_BC];
      }
  }
  
  init_fix = new visual.Polygon({
    win: psychoJS.window, name: 'init_fix', 
    edges: 100, size:fix_size,
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: fix_line_width, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('black'),
    fillColor: 'black',
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  // Initialize components for Routine "setup_trials"
  setup_trialsClock = new util.Clock();
  // Initialize components for Routine "pair1_disp"
  pair1_dispClock = new util.Clock();
  pair1_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pair1_image', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : image_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  pair1_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  pair1_fix = new visual.Polygon({
    win: psychoJS.window, name: 'pair1_fix', 
    edges: 100, size:fix_size,
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: fix_line_width, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    fillColor: 'white',
    opacity: undefined, depth: -3, interpolate: true,
  });
  
  // Initialize components for Routine "pair1_1back"
  pair1_1backClock = new util.Clock();
  pair1_1back_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pair1_1back_image', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : image_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  pair1_1back_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  pair1_1back_fix = new visual.Polygon({
    win: psychoJS.window, name: 'pair1_1back_fix', 
    edges: 100, size:fix_size,
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: fix_line_width, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    fillColor: 'white',
    opacity: undefined, depth: -3, interpolate: true,
  });
  
  // Initialize components for Routine "pair2_disp"
  pair2_dispClock = new util.Clock();
  pair2_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pair2_image', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : image_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  pair2_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  pair2_fix = new visual.Polygon({
    win: psychoJS.window, name: 'pair2_fix', 
    edges: 100, size:fix_size,
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: fix_line_width, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    fillColor: 'white',
    opacity: undefined, depth: -3, interpolate: true,
  });
  
  // Initialize components for Routine "pair2_1back"
  pair2_1backClock = new util.Clock();
  pair2_1back_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pair2_1back_image', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : image_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  pair2_1back_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  pair2_1back_fix = new visual.Polygon({
    win: psychoJS.window, name: 'pair2_1back_fix', 
    edges: 100, size:fix_size,
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: fix_line_width, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    fillColor: 'white',
    opacity: undefined, depth: -3, interpolate: true,
  });
  
  // Initialize components for Routine "between_blocks_break"
  between_blocks_breakClock = new util.Clock();
  text_countdown = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_countdown',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "test_instructions"
  test_instructionsClock = new util.Clock();
  test_instruct = new visual.TextStim({
    win: psychoJS.window,
    name: 'test_instruct',
    text: 'In this part of experiment you will see two pairs of images presented on the screen for a short period of time.\nAfter seeing the 2 pairs, please judge which pair looks more familiar to you.\nBy familiar it means which pair you have seen more often in the first part of the experiment.\nIf the first pair looks more familiar, press the left arrow key.\nIf the second pair looks more familiar, press the right arrow key.\nYou must make a decision for the next pairs to appear.\nPress space bar to start.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  test_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "testing_block_setup"
  testing_block_setupClock = new util.Clock();
  // Initialize components for Routine "test_trial"
  test_trialClock = new util.Clock();
  target_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'target_1', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : image_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  ISI_load_images = new core.MinimalStim({
    name: "ISI_load_images", 
    win: psychoJS.window,
    autoDraw: false, 
    autoLog: true, 
  });
  target_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'target_2', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : image_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  foil_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'foil_1', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : image_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  foil_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'foil_2', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : image_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  key_resp_2afc = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  fixation_2afc = new visual.Polygon({
    win: psychoJS.window, name: 'fixation_2afc', units : 'height', 
    edges: 100, size:fix_size,
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: fix_line_width, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('black'),
    fillColor: 'black',
    opacity: undefined, depth: -7, interpolate: true,
  });
  
  // Initialize components for Routine "fix"
  fixClock = new util.Clock();
  fixation_fb = new visual.Polygon({
    win: psychoJS.window, name: 'fixation_fb', units : 'height', 
    edges: 100, size:fix_size,
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: fix_line_width, 
    colorSpace: 'rgb',
    lineColor: new util.Color('black'),
    fillColor: new util.Color('white'),
    fillColor: 'white',
    opacity: undefined, depth: 0, interpolate: true,
  });
  
  // Initialize components for Routine "finished"
  finishedClock = new util.Clock();
  thank_you = new visual.TextStim({
    win: psychoJS.window,
    name: 'thank_you',
    text: 'Thank you for your participation!',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  end_key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var _instruct_resp_allKeys;
var instructionsComponents;
function instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('instructions.started', globalClock.getTime());
    instruct_resp.keys = undefined;
    instruct_resp.rt = undefined;
    _instruct_resp_allKeys = [];
    // keep track of which components have finished
    instructionsComponents = [];
    instructionsComponents.push(instruct_resp);
    instructionsComponents.push(instruct_text);
    
    for (const thisComponent of instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instruct_resp* updates
    if (t >= 0.0 && instruct_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruct_resp.tStart = t;  // (not accounting for frame time here)
      instruct_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { instruct_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { instruct_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { instruct_resp.clearEvents(); });
    }
    
    if (instruct_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = instruct_resp.getKeys({keyList: ['space'], waitRelease: false});
      _instruct_resp_allKeys = _instruct_resp_allKeys.concat(theseKeys);
      if (_instruct_resp_allKeys.length > 0) {
        instruct_resp.keys = _instruct_resp_allKeys[_instruct_resp_allKeys.length - 1].name;  // just the last key pressed
        instruct_resp.rt = _instruct_resp_allKeys[_instruct_resp_allKeys.length - 1].rt;
        instruct_resp.duration = _instruct_resp_allKeys[_instruct_resp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *instruct_text* updates
    if (t >= 0.0 && instruct_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruct_text.tStart = t;  // (not accounting for frame time here)
      instruct_text.frameNStart = frameN;  // exact frame index
      
      instruct_text.setAutoDraw(true);
    }
    
    if (instruct_text.status === PsychoJS.Status.STARTED && Boolean(instruct_resp)) {
      instruct_text.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of instructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('instructions.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(instruct_resp.corr, level);
    }
    psychoJS.experiment.addData('instruct_resp.keys', instruct_resp.keys);
    if (typeof instruct_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('instruct_resp.rt', instruct_resp.rt);
        psychoJS.experiment.addData('instruct_resp.duration', instruct_resp.duration);
        routineTimer.reset();
        }
    
    instruct_resp.stop();
    // the Routine "instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var exposure_loop;
function exposure_loopLoopBegin(exposure_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    exposure_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 3, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'exposure_loop'
    });
    psychoJS.experiment.addLoop(exposure_loop); // add the loop to the experiment
    currentLoop = exposure_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisExposure_loop of exposure_loop) {
      snapshot = exposure_loop.getSnapshot();
      exposure_loopLoopScheduler.add(importConditions(snapshot));
      exposure_loopLoopScheduler.add(setup_blockRoutineBegin(snapshot));
      exposure_loopLoopScheduler.add(setup_blockRoutineEachFrame());
      exposure_loopLoopScheduler.add(setup_blockRoutineEnd(snapshot));
      const blocksLoopScheduler = new Scheduler(psychoJS);
      exposure_loopLoopScheduler.add(blocksLoopBegin(blocksLoopScheduler, snapshot));
      exposure_loopLoopScheduler.add(blocksLoopScheduler);
      exposure_loopLoopScheduler.add(blocksLoopEnd);
      exposure_loopLoopScheduler.add(between_blocks_breakRoutineBegin(snapshot));
      exposure_loopLoopScheduler.add(between_blocks_breakRoutineEachFrame());
      exposure_loopLoopScheduler.add(between_blocks_breakRoutineEnd(snapshot));
      exposure_loopLoopScheduler.add(exposure_loopLoopEndIteration(exposure_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var blocks;
function blocksLoopBegin(blocksLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    blocks = new TrialHandler({
      psychoJS: psychoJS,
      nReps: num_loop_rep, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'blocks'
    });
    psychoJS.experiment.addLoop(blocks); // add the loop to the experiment
    currentLoop = blocks;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisBlock of blocks) {
      snapshot = blocks.getSnapshot();
      blocksLoopScheduler.add(importConditions(snapshot));
      blocksLoopScheduler.add(setup_trialsRoutineBegin(snapshot));
      blocksLoopScheduler.add(setup_trialsRoutineEachFrame());
      blocksLoopScheduler.add(setup_trialsRoutineEnd(snapshot));
      blocksLoopScheduler.add(pair1_dispRoutineBegin(snapshot));
      blocksLoopScheduler.add(pair1_dispRoutineEachFrame());
      blocksLoopScheduler.add(pair1_dispRoutineEnd(snapshot));
      blocksLoopScheduler.add(pair1_1backRoutineBegin(snapshot));
      blocksLoopScheduler.add(pair1_1backRoutineEachFrame());
      blocksLoopScheduler.add(pair1_1backRoutineEnd(snapshot));
      blocksLoopScheduler.add(pair2_dispRoutineBegin(snapshot));
      blocksLoopScheduler.add(pair2_dispRoutineEachFrame());
      blocksLoopScheduler.add(pair2_dispRoutineEnd(snapshot));
      blocksLoopScheduler.add(pair2_1backRoutineBegin(snapshot));
      blocksLoopScheduler.add(pair2_1backRoutineEachFrame());
      blocksLoopScheduler.add(pair2_1backRoutineEnd(snapshot));
      blocksLoopScheduler.add(blocksLoopEndIteration(blocksLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function blocksLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(blocks);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function blocksLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function exposure_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(exposure_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function exposure_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var testing_blocks;
function testing_blocksLoopBegin(testing_blocksLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    testing_blocks = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 2, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'testing_blocks'
    });
    psychoJS.experiment.addLoop(testing_blocks); // add the loop to the experiment
    currentLoop = testing_blocks;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTesting_block of testing_blocks) {
      snapshot = testing_blocks.getSnapshot();
      testing_blocksLoopScheduler.add(importConditions(snapshot));
      const testing_loop_repLoopScheduler = new Scheduler(psychoJS);
      testing_blocksLoopScheduler.add(testing_loop_repLoopBegin(testing_loop_repLoopScheduler, snapshot));
      testing_blocksLoopScheduler.add(testing_loop_repLoopScheduler);
      testing_blocksLoopScheduler.add(testing_loop_repLoopEnd);
      testing_blocksLoopScheduler.add(between_blocks_breakRoutineBegin(snapshot));
      testing_blocksLoopScheduler.add(between_blocks_breakRoutineEachFrame());
      testing_blocksLoopScheduler.add(between_blocks_breakRoutineEnd(snapshot));
      testing_blocksLoopScheduler.add(testing_blocksLoopEndIteration(testing_blocksLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var testing_loop_rep;
function testing_loop_repLoopBegin(testing_loop_repLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    testing_loop_rep = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 2, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'testing_loop_rep'
    });
    psychoJS.experiment.addLoop(testing_loop_rep); // add the loop to the experiment
    currentLoop = testing_loop_rep;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTesting_loop_rep of testing_loop_rep) {
      snapshot = testing_loop_rep.getSnapshot();
      testing_loop_repLoopScheduler.add(importConditions(snapshot));
      testing_loop_repLoopScheduler.add(testing_block_setupRoutineBegin(snapshot));
      testing_loop_repLoopScheduler.add(testing_block_setupRoutineEachFrame());
      testing_loop_repLoopScheduler.add(testing_block_setupRoutineEnd(snapshot));
      const testing_loopLoopScheduler = new Scheduler(psychoJS);
      testing_loop_repLoopScheduler.add(testing_loopLoopBegin(testing_loopLoopScheduler, snapshot));
      testing_loop_repLoopScheduler.add(testing_loopLoopScheduler);
      testing_loop_repLoopScheduler.add(testing_loopLoopEnd);
      testing_loop_repLoopScheduler.add(testing_loop_repLoopEndIteration(testing_loop_repLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var testing_loop;
function testing_loopLoopBegin(testing_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    testing_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 999, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'testing_loop'
    });
    psychoJS.experiment.addLoop(testing_loop); // add the loop to the experiment
    currentLoop = testing_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTesting_loop of testing_loop) {
      snapshot = testing_loop.getSnapshot();
      testing_loopLoopScheduler.add(importConditions(snapshot));
      testing_loopLoopScheduler.add(test_trialRoutineBegin(snapshot));
      testing_loopLoopScheduler.add(test_trialRoutineEachFrame());
      testing_loopLoopScheduler.add(test_trialRoutineEnd(snapshot));
      testing_loopLoopScheduler.add(fixRoutineBegin(snapshot));
      testing_loopLoopScheduler.add(fixRoutineEachFrame());
      testing_loopLoopScheduler.add(fixRoutineEnd(snapshot));
      testing_loopLoopScheduler.add(testing_loopLoopEndIteration(testing_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function testing_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(testing_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function testing_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function testing_loop_repLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(testing_loop_rep);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function testing_loop_repLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function testing_blocksLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(testing_blocks);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function testing_blocksLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var curr_trial_list;
var curr_1back_list;
var trial_count;
var trial_num;
var trial_count_1back;
var setup_blockComponents;
function setup_blockRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'setup_block' ---
    t = 0;
    setup_blockClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.500000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('setup_block.started', globalClock.getTime());
    // Run 'Begin Routine' code from block_code
    curr_trial_list = trial_list[exposure_loop.thisN];
    curr_1back_list = trial_list_1back[exposure_loop.thisN];
    trial_count = 0;
    trial_num = 0;
    trial_count_1back = 0;
    
    // keep track of which components have finished
    setup_blockComponents = [];
    setup_blockComponents.push(init_fix);
    
    for (const thisComponent of setup_blockComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function setup_blockRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'setup_block' ---
    // get current time
    t = setup_blockClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *init_fix* updates
    if (t >= 0.0 && init_fix.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      init_fix.tStart = t;  // (not accounting for frame time here)
      init_fix.frameNStart = frameN;  // exact frame index
      
      init_fix.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (init_fix.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      init_fix.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of setup_blockComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function setup_blockRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'setup_block' ---
    for (const thisComponent of setup_blockComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('setup_block.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var chosen_pair;
var chosen_1back;
var pair1_stim;
var pair1_1back;
var pair2_stim;
var pair2_1back;
var setup_trialsComponents;
function setup_trialsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'setup_trials' ---
    t = 0;
    setup_trialsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('setup_trials.started', globalClock.getTime());
    // Run 'Begin Routine' code from trial_code
    chosen_pair = curr_trial_list[trial_num];
    chosen_1back = curr_1back_list[trial_num];
    pair1_stim = chosen_pair[0];
    pair1_1back = chosen_1back[0];
    pair2_stim = chosen_pair[1];
    pair2_1back = chosen_1back[1];
    
    // keep track of which components have finished
    setup_trialsComponents = [];
    
    for (const thisComponent of setup_trialsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function setup_trialsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'setup_trials' ---
    // get current time
    t = setup_trialsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of setup_trialsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function setup_trialsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'setup_trials' ---
    for (const thisComponent of setup_trialsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('setup_trials.stopped', globalClock.getTime());
    // Run 'End Routine' code from trial_code
    psychoJS.experiment.addData("trial_num", trial_num);
    trial_num = (trial_num + 1);
    
    // the Routine "setup_trials" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var space_press;
var _pair1_resp_allKeys;
var pair1_dispComponents;
function pair1_dispRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pair1_disp' ---
    t = 0;
    pair1_dispClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('pair1_disp.started', globalClock.getTime());
    // Run 'Begin Routine' code from pair1_trial_code
    space_press = false;
    
    pair1_image.setImage((("images/stim_" + pair1_stim) + ".png"));
    pair1_resp.keys = undefined;
    pair1_resp.rt = undefined;
    _pair1_resp_allKeys = [];
    pair1_fix.setFillColor(new util.Color('black'));
    pair1_fix.setLineColor(new util.Color('white'));
    // keep track of which components have finished
    pair1_dispComponents = [];
    pair1_dispComponents.push(pair1_image);
    pair1_dispComponents.push(pair1_resp);
    pair1_dispComponents.push(pair1_fix);
    
    for (const thisComponent of pair1_dispComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function pair1_dispRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pair1_disp' ---
    // get current time
    t = pair1_dispClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Run 'Each Frame' code from pair1_trial_code
    if (((pair1_resp.keys === "space") & (pair1_resp.status === PsychoJS.Status.STARTED))) {
        if ((! space_press)) {
            space_press = true;
            space_press = t;
            pair1_fix.fillColor = "white";
            pair1_fix.lineColor = "black";
        } else {
            space_press = t;
        }
    }
    if ((space_press && ((t - space_press) > 0.15))) {
        space_press = false;
        pair1_fix.fillColor = "black";
        pair1_fix.lineColor = "white";
    }
    
    
    // *pair1_image* updates
    if (t >= 0.0 && pair1_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair1_image.tStart = t;  // (not accounting for frame time here)
      pair1_image.frameNStart = frameN;  // exact frame index
      
      pair1_image.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair1_image.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair1_image.setAutoDraw(false);
    }
    
    
    // *pair1_resp* updates
    if (t >= 0 && pair1_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair1_resp.tStart = t;  // (not accounting for frame time here)
      pair1_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pair1_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pair1_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pair1_resp.clearEvents(); });
    }
    
    frameRemains = 0 + 0.75 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair1_resp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair1_resp.status = PsychoJS.Status.FINISHED;
        }
      
    if (pair1_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pair1_resp.getKeys({keyList: ['space', 'None'], waitRelease: false});
      _pair1_resp_allKeys = _pair1_resp_allKeys.concat(theseKeys);
      if (_pair1_resp_allKeys.length > 0) {
        pair1_resp.keys = _pair1_resp_allKeys[_pair1_resp_allKeys.length - 1].name;  // just the last key pressed
        pair1_resp.rt = _pair1_resp_allKeys[_pair1_resp_allKeys.length - 1].rt;
        pair1_resp.duration = _pair1_resp_allKeys[_pair1_resp_allKeys.length - 1].duration;
        // was this correct?
        if (pair1_resp.keys == "'None'") {
            pair1_resp.corr = 1;
        } else {
            pair1_resp.corr = 0;
        }
      }
    }
    
    
    // *pair1_fix* updates
    if (t >= 0.0 && pair1_fix.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair1_fix.tStart = t;  // (not accounting for frame time here)
      pair1_fix.frameNStart = frameN;  // exact frame index
      
      pair1_fix.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair1_fix.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair1_fix.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of pair1_dispComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pair1_dispRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pair1_disp' ---
    for (const thisComponent of pair1_dispComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pair1_disp.stopped', globalClock.getTime());
    // Run 'End Routine' code from pair1_trial_code
    psychoJS.experiment.addData("pair1", ("stim_" + pair1_stim));
    psychoJS.experiment.addData("trial_count_pair1", trial_count);
    psychoJS.experiment.addData("trial_1backcount_pair1", trial_count_1back);
    trial_count += 1;
    trial_count_1back += 1;
    
    // was no response the correct answer?!
    if (pair1_resp.keys === undefined) {
      if (['None','none',undefined].includes("'None'")) {
         pair1_resp.corr = 1;  // correct non-response
      } else {
         pair1_resp.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pair1_resp.corr, level);
    }
    psychoJS.experiment.addData('pair1_resp.keys', pair1_resp.keys);
    psychoJS.experiment.addData('pair1_resp.corr', pair1_resp.corr);
    if (typeof pair1_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pair1_resp.rt', pair1_resp.rt);
        psychoJS.experiment.addData('pair1_resp.duration', pair1_resp.duration);
        }
    
    pair1_resp.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var is_nback_trial_A;
var correct_ans_p1;
var _pair1_1back_resp_allKeys;
var pair1_1backComponents;
function pair1_1backRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pair1_1back' ---
    t = 0;
    pair1_1backClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('pair1_1back.started', globalClock.getTime());
    // Run 'Begin Routine' code from pair1_1back_code
    is_nback_trial_A = (pair1_1back === "1");
    if (is_nback_trial_A) {
        correct_ans_p1 = "space";
    } else {
        correct_ans_p1 = "None";
        continueRoutine = false;
    }
    
    pair1_1back_image.setImage((("images/stim_" + pair1_stim) + ".png"));
    pair1_1back_resp.keys = undefined;
    pair1_1back_resp.rt = undefined;
    _pair1_1back_resp_allKeys = [];
    pair1_1back_fix.setFillColor(new util.Color('black'));
    pair1_1back_fix.setLineColor(new util.Color('white'));
    // keep track of which components have finished
    pair1_1backComponents = [];
    pair1_1backComponents.push(pair1_1back_image);
    pair1_1backComponents.push(pair1_1back_resp);
    pair1_1backComponents.push(pair1_1back_fix);
    
    for (const thisComponent of pair1_1backComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function pair1_1backRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pair1_1back' ---
    // get current time
    t = pair1_1backClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Run 'Each Frame' code from pair1_1back_code
    if (((pair1_1back_resp.keys === "space") & (pair1_1back_image.status === "STARTED"))) {
        pair1_1back_fix.fillColor = "green";
        pair1_1back_fix.color = "black";
    } else {
        if (((pair1_1back_resp.keys === "None") & (pair1_1back_image.status === "FINISHED"))) {
            pair1_1back_fix.fillColor = "red";
            pair1_1back_fix.color = "black";
        }
    }
    if (((pair2_1back_resp.keys === "space") & (pair2_1back_image.status === PsychoJS.Status.STARTED))) {
        pair2_1back_fix.fillColor = "green";
        pair2_1back_fix.color = "green";
    } else {
        if (((pair2_1back_resp.keys === "None") & (pair2_1back_image.status === PsychoJS.Status.FINISHED))) {
            pair2_1back_fix.fillColor = "red";
            pair2_1back_fix.color = "red";
        }
    }
    
    
    // *pair1_1back_image* updates
    if (t >= 0.0 && pair1_1back_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair1_1back_image.tStart = t;  // (not accounting for frame time here)
      pair1_1back_image.frameNStart = frameN;  // exact frame index
      
      pair1_1back_image.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair1_1back_image.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair1_1back_image.setAutoDraw(false);
    }
    
    
    // *pair1_1back_resp* updates
    if (t >= 0 && pair1_1back_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair1_1back_resp.tStart = t;  // (not accounting for frame time here)
      pair1_1back_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pair1_1back_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pair1_1back_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pair1_1back_resp.clearEvents(); });
    }
    
    frameRemains = 0 + 0.75 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair1_1back_resp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair1_1back_resp.status = PsychoJS.Status.FINISHED;
        }
      
    if (pair1_1back_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pair1_1back_resp.getKeys({keyList: ['space', 'None'], waitRelease: false});
      _pair1_1back_resp_allKeys = _pair1_1back_resp_allKeys.concat(theseKeys);
      if (_pair1_1back_resp_allKeys.length > 0) {
        pair1_1back_resp.keys = _pair1_1back_resp_allKeys[_pair1_1back_resp_allKeys.length - 1].name;  // just the last key pressed
        pair1_1back_resp.rt = _pair1_1back_resp_allKeys[_pair1_1back_resp_allKeys.length - 1].rt;
        pair1_1back_resp.duration = _pair1_1back_resp_allKeys[_pair1_1back_resp_allKeys.length - 1].duration;
        // was this correct?
        if (pair1_1back_resp.keys == correct_ans_p1) {
            pair1_1back_resp.corr = 1;
        } else {
            pair1_1back_resp.corr = 0;
        }
      }
    }
    
    
    // *pair1_1back_fix* updates
    if (t >= 0.0 && pair1_1back_fix.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair1_1back_fix.tStart = t;  // (not accounting for frame time here)
      pair1_1back_fix.frameNStart = frameN;  // exact frame index
      
      pair1_1back_fix.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair1_1back_fix.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair1_1back_fix.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of pair1_1backComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pair1_1backRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pair1_1back' ---
    for (const thisComponent of pair1_1backComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pair1_1back.stopped', globalClock.getTime());
    // Run 'End Routine' code from pair1_1back_code
    if ((((pair1_1back_resp.keys === "space") && (correct_ans_p1 === "space")) || ((pair1_1back_resp.keys === null) && (correct_ans_p1 === "None")))) {
        psychoJS.experiment.addData("1back_accuracy", 1);
        psychoJS.experiment.addData("pair1_1back", ("stim_" + pair1_stim));
        psychoJS.experiment.addData("trial_1backcount_pair1_1back", trial_count_1back);
        trial_count_1back += 1;
    } else {
        psychoJS.experiment.addData("1back_accuracy", 0);
    }
    
    // was no response the correct answer?!
    if (pair1_1back_resp.keys === undefined) {
      if (['None','none',undefined].includes(correct_ans_p1)) {
         pair1_1back_resp.corr = 1;  // correct non-response
      } else {
         pair1_1back_resp.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pair1_1back_resp.corr, level);
    }
    psychoJS.experiment.addData('pair1_1back_resp.keys', pair1_1back_resp.keys);
    psychoJS.experiment.addData('pair1_1back_resp.corr', pair1_1back_resp.corr);
    if (typeof pair1_1back_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pair1_1back_resp.rt', pair1_1back_resp.rt);
        psychoJS.experiment.addData('pair1_1back_resp.duration', pair1_1back_resp.duration);
        }
    
    pair1_1back_resp.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _pair2_resp_allKeys;
var pair2_dispComponents;
function pair2_dispRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pair2_disp' ---
    t = 0;
    pair2_dispClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('pair2_disp.started', globalClock.getTime());
    // Run 'Begin Routine' code from pair2_trial_code
    space_press = false;
    
    pair2_image.setImage((("images/stim_" + pair2_stim) + ".png"));
    pair2_resp.keys = undefined;
    pair2_resp.rt = undefined;
    _pair2_resp_allKeys = [];
    pair2_fix.setFillColor(new util.Color('black'));
    pair2_fix.setLineColor(new util.Color('white'));
    // keep track of which components have finished
    pair2_dispComponents = [];
    pair2_dispComponents.push(pair2_image);
    pair2_dispComponents.push(pair2_resp);
    pair2_dispComponents.push(pair2_fix);
    
    for (const thisComponent of pair2_dispComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function pair2_dispRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pair2_disp' ---
    // get current time
    t = pair2_dispClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Run 'Each Frame' code from pair2_trial_code
    if (((pair2_resp.keys === "space") & (pair2_resp.status === PsychoJS.Status.STARTED))) {
        if ((! space_press)) {
            space_press = true;
            space_press = t;
            pair2_fix.fillColor = "white";
            pair2_fix.lineColor = "black";
        } else {
            space_press = t;
        }
    }
    if ((space_press && ((t - space_press) > 0.15))) {
        space_press = false;
        pair2_fix.fillColor = "black";
        pair2_fix.lineColor = "white";
    }
    
    
    // *pair2_image* updates
    if (t >= 0 && pair2_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair2_image.tStart = t;  // (not accounting for frame time here)
      pair2_image.frameNStart = frameN;  // exact frame index
      
      pair2_image.setAutoDraw(true);
    }
    
    frameRemains = 0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair2_image.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair2_image.setAutoDraw(false);
    }
    
    
    // *pair2_resp* updates
    if (t >= 0 && pair2_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair2_resp.tStart = t;  // (not accounting for frame time here)
      pair2_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pair2_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pair2_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pair2_resp.clearEvents(); });
    }
    
    frameRemains = 0 + 0.75 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair2_resp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair2_resp.status = PsychoJS.Status.FINISHED;
        }
      
    if (pair2_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pair2_resp.getKeys({keyList: ['space', 'None'], waitRelease: false});
      _pair2_resp_allKeys = _pair2_resp_allKeys.concat(theseKeys);
      if (_pair2_resp_allKeys.length > 0) {
        pair2_resp.keys = _pair2_resp_allKeys[_pair2_resp_allKeys.length - 1].name;  // just the last key pressed
        pair2_resp.rt = _pair2_resp_allKeys[_pair2_resp_allKeys.length - 1].rt;
        pair2_resp.duration = _pair2_resp_allKeys[_pair2_resp_allKeys.length - 1].duration;
        // was this correct?
        if (pair2_resp.keys == "'None'") {
            pair2_resp.corr = 1;
        } else {
            pair2_resp.corr = 0;
        }
      }
    }
    
    
    // *pair2_fix* updates
    if (t >= 0.0 && pair2_fix.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair2_fix.tStart = t;  // (not accounting for frame time here)
      pair2_fix.frameNStart = frameN;  // exact frame index
      
      pair2_fix.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair2_fix.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair2_fix.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of pair2_dispComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pair2_dispRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pair2_disp' ---
    for (const thisComponent of pair2_dispComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pair2_disp.stopped', globalClock.getTime());
    // Run 'End Routine' code from pair2_trial_code
    psychoJS.experiment.addData("pair2", ("stim_" + pair2_stim));
    psychoJS.experiment.addData("trial_count_pair2", trial_count);
    psychoJS.experiment.addData("trial_1backcount_pair2", trial_count_1back);
    trial_count += 1;
    trial_count_1back += 1;
    
    // was no response the correct answer?!
    if (pair2_resp.keys === undefined) {
      if (['None','none',undefined].includes("'None'")) {
         pair2_resp.corr = 1;  // correct non-response
      } else {
         pair2_resp.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pair2_resp.corr, level);
    }
    psychoJS.experiment.addData('pair2_resp.keys', pair2_resp.keys);
    psychoJS.experiment.addData('pair2_resp.corr', pair2_resp.corr);
    if (typeof pair2_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pair2_resp.rt', pair2_resp.rt);
        psychoJS.experiment.addData('pair2_resp.duration', pair2_resp.duration);
        }
    
    pair2_resp.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var is_nback_trial_B;
var correct_ans_p2;
var _pair2_1back_resp_allKeys;
var pair2_1backComponents;
function pair2_1backRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pair2_1back' ---
    t = 0;
    pair2_1backClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('pair2_1back.started', globalClock.getTime());
    // Run 'Begin Routine' code from pair2_1back_code
    is_nback_trial_B = (pair2_1back === "1");
    space_press = false;
    if (is_nback_trial_B) {
        correct_ans_p2 = "space";
    } else {
        correct_ans_p2 = "None";
        continueRoutine = false;
    }
    
    pair2_1back_image.setImage((("images/stim_" + pair2_stim) + ".png"));
    pair2_1back_resp.keys = undefined;
    pair2_1back_resp.rt = undefined;
    _pair2_1back_resp_allKeys = [];
    pair2_1back_fix.setFillColor(new util.Color('black'));
    pair2_1back_fix.setLineColor(new util.Color('white'));
    // keep track of which components have finished
    pair2_1backComponents = [];
    pair2_1backComponents.push(pair2_1back_image);
    pair2_1backComponents.push(pair2_1back_resp);
    pair2_1backComponents.push(pair2_1back_fix);
    
    for (const thisComponent of pair2_1backComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function pair2_1backRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pair2_1back' ---
    // get current time
    t = pair2_1backClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Run 'Each Frame' code from pair2_1back_code
    if (((pair2_1back_resp.keys === "space") & (pair2_1back_resp.status === PsychoJS.Status.STARTED))) {
        if ((! space_press)) {
            space_press = true;
            space_press = t;
            pair2_1back_fix.fillColor = "white";
            pair2_1back_fix.lineColor = "black";
        } else {
            space_press = t;
        }
    } else {
        if (((pair2_1back_resp.keys === []) & (pair2_1back_resp.status === PsychoJS.Status.FINISHED))) {
            pair2_1back_fix.fillColor = "red";
            pair2_1back_fix.lineColor = "white";
        }
    }
    if ((space_press && ((t - space_press) > 0.15))) {
        space_press = false;
        pair2_1back_fix.fillColor = "black";
        pair2_1back_fix.lineColor = "white";
    }
    
    
    // *pair2_1back_image* updates
    if (t >= 0.0 && pair2_1back_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair2_1back_image.tStart = t;  // (not accounting for frame time here)
      pair2_1back_image.frameNStart = frameN;  // exact frame index
      
      pair2_1back_image.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair2_1back_image.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair2_1back_image.setAutoDraw(false);
    }
    
    
    // *pair2_1back_resp* updates
    if (t >= 0 && pair2_1back_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair2_1back_resp.tStart = t;  // (not accounting for frame time here)
      pair2_1back_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pair2_1back_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pair2_1back_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pair2_1back_resp.clearEvents(); });
    }
    
    frameRemains = 0 + 0.75 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair2_1back_resp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair2_1back_resp.status = PsychoJS.Status.FINISHED;
        }
      
    if (pair2_1back_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pair2_1back_resp.getKeys({keyList: ['space', 'None'], waitRelease: false});
      _pair2_1back_resp_allKeys = _pair2_1back_resp_allKeys.concat(theseKeys);
      if (_pair2_1back_resp_allKeys.length > 0) {
        pair2_1back_resp.keys = _pair2_1back_resp_allKeys[_pair2_1back_resp_allKeys.length - 1].name;  // just the last key pressed
        pair2_1back_resp.rt = _pair2_1back_resp_allKeys[_pair2_1back_resp_allKeys.length - 1].rt;
        pair2_1back_resp.duration = _pair2_1back_resp_allKeys[_pair2_1back_resp_allKeys.length - 1].duration;
        // was this correct?
        if (pair2_1back_resp.keys == correct_ans_p1) {
            pair2_1back_resp.corr = 1;
        } else {
            pair2_1back_resp.corr = 0;
        }
      }
    }
    
    
    // *pair2_1back_fix* updates
    if (t >= 0.0 && pair2_1back_fix.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pair2_1back_fix.tStart = t;  // (not accounting for frame time here)
      pair2_1back_fix.frameNStart = frameN;  // exact frame index
      
      pair2_1back_fix.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pair2_1back_fix.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pair2_1back_fix.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of pair2_1backComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pair2_1backRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pair2_1back' ---
    for (const thisComponent of pair2_1backComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pair2_1back.stopped', globalClock.getTime());
    // Run 'End Routine' code from pair2_1back_code
    if ((correct_ans_p2 === "space")) {
        psychoJS.experiment.addData("1back", ("stim_" + pair2_stim));
        psychoJS.experiment.addData("trial_1backcount_pair2_1back", trial_count_1back);
        trial_count_1back += 1;
        if ((pair2_1back_resp.keys === "space")) {
            psychoJS.experiment.addData("1back_accuracy", 1);
        } else {
            if ((pair2_1back_resp.keys === [])) {
                psychoJS.experiment.addData("1back_accuracy", 0);
            }
        }
    }
    
    // was no response the correct answer?!
    if (pair2_1back_resp.keys === undefined) {
      if (['None','none',undefined].includes(correct_ans_p1)) {
         pair2_1back_resp.corr = 1;  // correct non-response
      } else {
         pair2_1back_resp.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pair2_1back_resp.corr, level);
    }
    psychoJS.experiment.addData('pair2_1back_resp.keys', pair2_1back_resp.keys);
    psychoJS.experiment.addData('pair2_1back_resp.corr', pair2_1back_resp.corr);
    if (typeof pair2_1back_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pair2_1back_resp.rt', pair2_1back_resp.rt);
        psychoJS.experiment.addData('pair2_1back_resp.duration', pair2_1back_resp.duration);
        }
    
    pair2_1back_resp.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var between_blocks_breakComponents;
function between_blocks_breakRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'between_blocks_break' ---
    t = 0;
    between_blocks_breakClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(10.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('between_blocks_break.started', globalClock.getTime());
    // keep track of which components have finished
    between_blocks_breakComponents = [];
    between_blocks_breakComponents.push(text_countdown);
    
    for (const thisComponent of between_blocks_breakComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function between_blocks_breakRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'between_blocks_break' ---
    // get current time
    t = between_blocks_breakClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    if (text_countdown.status === PsychoJS.Status.STARTED){ // only update if being drawn
      text_countdown.setText((10 - Number.parseInt(t)).toString(), false);
    }
    
    // *text_countdown* updates
    if (t >= 0.0 && text_countdown.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_countdown.tStart = t;  // (not accounting for frame time here)
      text_countdown.frameNStart = frameN;  // exact frame index
      
      text_countdown.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_countdown.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_countdown.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of between_blocks_breakComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function between_blocks_breakRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'between_blocks_break' ---
    for (const thisComponent of between_blocks_breakComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('between_blocks_break.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var view_time;
var test_size;
var time_names;
var time_idx;
var times;
var num_group_pairs;
var num_tests;
var _test_resp_allKeys;
var test_instructionsComponents;
function test_instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'test_instructions' ---
    t = 0;
    test_instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('test_instructions.started', globalClock.getTime());
    // Run 'Begin Routine' code from test_inst_code
    view_time = 0.5;
    test_size = [0.2, 0.2];
    time_names = ["left", "right"];
    time_idx = [0, 1];
    times = [[0.5, 1.5], [3, 4]];
    num_group_pairs = [];
    num_tests = (num_groups * 2);
    
    test_resp.keys = undefined;
    test_resp.rt = undefined;
    _test_resp_allKeys = [];
    // keep track of which components have finished
    test_instructionsComponents = [];
    test_instructionsComponents.push(test_instruct);
    test_instructionsComponents.push(test_resp);
    
    for (const thisComponent of test_instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function test_instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'test_instructions' ---
    // get current time
    t = test_instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *test_instruct* updates
    if (t >= 0.0 && test_instruct.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      test_instruct.tStart = t;  // (not accounting for frame time here)
      test_instruct.frameNStart = frameN;  // exact frame index
      
      test_instruct.setAutoDraw(true);
    }
    
    
    // *test_resp* updates
    if (t >= 0.0 && test_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      test_resp.tStart = t;  // (not accounting for frame time here)
      test_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { test_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { test_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { test_resp.clearEvents(); });
    }
    
    if (test_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = test_resp.getKeys({keyList: ['space'], waitRelease: false});
      _test_resp_allKeys = _test_resp_allKeys.concat(theseKeys);
      if (_test_resp_allKeys.length > 0) {
        test_resp.keys = _test_resp_allKeys[_test_resp_allKeys.length - 1].name;  // just the last key pressed
        test_resp.rt = _test_resp_allKeys[_test_resp_allKeys.length - 1].rt;
        test_resp.duration = _test_resp_allKeys[_test_resp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of test_instructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function test_instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'test_instructions' ---
    for (const thisComponent of test_instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('test_instructions.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(test_resp.corr, level);
    }
    psychoJS.experiment.addData('test_resp.keys', test_resp.keys);
    if (typeof test_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('test_resp.rt', test_resp.rt);
        psychoJS.experiment.addData('test_resp.duration', test_resp.duration);
        routineTimer.reset();
        }
    
    test_resp.stop();
    // the Routine "test_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var testing_block_setupComponents;
function testing_block_setupRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'testing_block_setup' ---
    t = 0;
    testing_block_setupClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('testing_block_setup.started', globalClock.getTime());
    // Run 'Begin Routine' code from test_code_2
    /* Syntax Error: Fix Python code */
    // keep track of which components have finished
    testing_block_setupComponents = [];
    
    for (const thisComponent of testing_block_setupComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function testing_block_setupRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'testing_block_setup' ---
    // get current time
    t = testing_block_setupClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of testing_block_setupComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function testing_block_setupRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'testing_block_setup' ---
    for (const thisComponent of testing_block_setupComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('testing_block_setup.stopped', globalClock.getTime());
    // the Routine "testing_block_setup" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var key_press;
var framefinish;
var target_time_data;
var target_times;
var targ1_time;
var targ2_time;
var foil_time_data;
var foil_times;
var foil1_time;
var foil2_time;
var group_index;
var trial_index;
var targ_pair_list;
var foil_pair_list;
var targ_pair_idx;
var foil_pair_idx;
var group_stim_list;
var group_name;
var target_stims;
var foil_stims;
var targ_pair1;
var targ_pair2;
var foil_pair1;
var foil_pair2;
var _key_resp_2afc_allKeys;
var test_trialComponents;
function test_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'test_trial' ---
    t = 0;
    test_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('test_trial.started', globalClock.getTime());
    // Run 'Begin Routine' code from testing_code
    psychoJS.window.mouseVisible = false;
    key_press = false;
    framefinish = np.nan;
    Math.random.shuffle(time_idx);
    target_time_data = time_names[time_idx[0]];
    target_times = times[time_idx[0]];
    targ1_time = target_times[0];
    targ2_time = target_times[1];
    foil_time_data = time_names[time_idx[1]];
    foil_times = times[time_idx[1]];
    foil1_time = foil_times[0];
    foil2_time = foil_times[1];
    console.log("testing_loop.thisN:", testing_loop.thisN);
    console.log("index_pair_test", index_pair_test);
    group_index = index_pair_test[testing_loop.thisN];
    console.log("group_index:", group_index);
    trial_index = test_trial_count[group_index];
    console.log("trial_index:", trial_index);
    targ_pair_list = test_pair_index[group_index];
    foil_pair_list = test_foil_index[group_index];
    console.log("targ_pair_list:", targ_pair_list);
    targ_pair_idx = targ_pair_list[trial_index];
    foil_pair_idx = foil_pair_list[trial_index];
    group_stim_list = stim_pair_list[group_index];
    group_name = stim_list_names[group_index];
    target_stims = group_stim_list[targ_pair_idx];
    foil_stims = group_stim_list[foil_pair_idx];
    targ_pair1 = target_stims[0];
    targ_pair2 = target_stims[1];
    foil_pair1 = target_stims[0];
    foil_pair2 = foil_stims[1];
    
    key_resp_2afc.keys = undefined;
    key_resp_2afc.rt = undefined;
    _key_resp_2afc_allKeys = [];
    // keep track of which components have finished
    test_trialComponents = [];
    test_trialComponents.push(target_1);
    test_trialComponents.push(ISI_load_images);
    test_trialComponents.push(target_2);
    test_trialComponents.push(foil_1);
    test_trialComponents.push(foil_2);
    test_trialComponents.push(key_resp_2afc);
    test_trialComponents.push(fixation_2afc);
    
    for (const thisComponent of test_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function test_trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'test_trial' ---
    // get current time
    t = test_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *target_1* updates
    if (t >= targ1_time && target_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      target_1.tStart = t;  // (not accounting for frame time here)
      target_1.frameNStart = frameN;  // exact frame index
      
      target_1.setAutoDraw(true);
    }
    
    frameRemains = targ1_time + view_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (target_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      target_1.setAutoDraw(false);
    }
    
    
    // *target_2* updates
    if (t >= targ2_time && target_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      target_2.tStart = t;  // (not accounting for frame time here)
      target_2.frameNStart = frameN;  // exact frame index
      
      target_2.setAutoDraw(true);
    }
    
    frameRemains = targ2_time + view_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (target_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      target_2.setAutoDraw(false);
    }
    
    
    // *foil_1* updates
    if (t >= foil1_time && foil_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      foil_1.tStart = t;  // (not accounting for frame time here)
      foil_1.frameNStart = frameN;  // exact frame index
      
      foil_1.setAutoDraw(true);
    }
    
    frameRemains = foil1_time + view_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (foil_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      foil_1.setAutoDraw(false);
    }
    
    
    // *foil_2* updates
    if (t >= foil2_time && foil_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      foil_2.tStart = t;  // (not accounting for frame time here)
      foil_2.frameNStart = frameN;  // exact frame index
      
      foil_2.setAutoDraw(true);
    }
    
    frameRemains = foil2_time + view_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (foil_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      foil_2.setAutoDraw(false);
    }
    
    
    // *key_resp_2afc* updates
    if (t >= 4.5 && key_resp_2afc.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_2afc.tStart = t;  // (not accounting for frame time here)
      key_resp_2afc.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_2afc.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2afc.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2afc.clearEvents(); });
    }
    
    if (key_resp_2afc.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_2afc.getKeys({keyList: ['left', 'right'], waitRelease: false});
      _key_resp_2afc_allKeys = _key_resp_2afc_allKeys.concat(theseKeys);
      if (_key_resp_2afc_allKeys.length > 0) {
        key_resp_2afc.keys = _key_resp_2afc_allKeys[_key_resp_2afc_allKeys.length - 1].name;  // just the last key pressed
        key_resp_2afc.rt = _key_resp_2afc_allKeys[_key_resp_2afc_allKeys.length - 1].rt;
        key_resp_2afc.duration = _key_resp_2afc_allKeys[_key_resp_2afc_allKeys.length - 1].duration;
        // was this correct?
        if (key_resp_2afc.keys == target_time_data) {
            key_resp_2afc.corr = 1;
        } else {
            key_resp_2afc.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *fixation_2afc* updates
    if (t >= 0.0 && fixation_2afc.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation_2afc.tStart = t;  // (not accounting for frame time here)
      fixation_2afc.frameNStart = frameN;  // exact frame index
      
      fixation_2afc.setAutoDraw(true);
    }
    
    if (t >= 0 && ISI_load_images.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ISI_load_images.tStart = t;  // (not accounting for frame time here)
      ISI_load_images.frameNStart = frameN;  // exact frame index
      
      ISI_load_images.status = PsychoJS.Status.STARTED;
      // Updating other components during *ISI_load_images*
      console.log('register and start downloading resources specified by component target_1');
      await psychoJS.serverManager.prepareResources((("images/stim_" + targ_pair1) + ".png"));
      ISI_load_images.status = PsychoJS.Status.STARTED;
      target_1.setImage((("images/stim_" + targ_pair1) + ".png"))
      console.log('register and start downloading resources specified by component target_2');
      await psychoJS.serverManager.prepareResources((("images/stim_" + targ_pair2) + ".png"));
      ISI_load_images.status = PsychoJS.Status.STARTED;
      target_2.setImage((("images/stim_" + targ_pair2) + ".png"))
      console.log('register and start downloading resources specified by component foil_1');
      await psychoJS.serverManager.prepareResources((("images/stim_" + foil_pair1) + ".png"));
      ISI_load_images.status = PsychoJS.Status.STARTED;
      foil_1.setImage((("images/stim_" + foil_pair1) + ".png"))
      console.log('register and start downloading resources specified by component foil_2');
      await psychoJS.serverManager.prepareResources((("images/stim_" + foil_pair2) + ".png"));
      ISI_load_images.status = PsychoJS.Status.STARTED;
      foil_2.setImage((("images/stim_" + foil_pair2) + ".png"))
      // Component updates done
    }
    frameRemains = 0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (ISI_load_images.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (psychoJS.serverManager.getResourceStatus((("images/stim_" + targ_pair1) + ".png")) === core.ServerManager.ResourceStatus.DOWNLOADED) {
        console.log('finished downloading resources specified by component ISI_load_images');
      } else {
        console.log('resource specified in ISI_load_images took longer than expected to download');
        await waitForResources(resources = (("images/stim_" + targ_pair1) + ".png"))
      }
      if (psychoJS.serverManager.getResourceStatus((("images/stim_" + targ_pair2) + ".png")) === core.ServerManager.ResourceStatus.DOWNLOADED) {
        console.log('finished downloading resources specified by component ISI_load_images');
      } else {
        console.log('resource specified in ISI_load_images took longer than expected to download');
        await waitForResources(resources = (("images/stim_" + targ_pair2) + ".png"))
      }
      if (psychoJS.serverManager.getResourceStatus((("images/stim_" + foil_pair1) + ".png")) === core.ServerManager.ResourceStatus.DOWNLOADED) {
        console.log('finished downloading resources specified by component ISI_load_images');
      } else {
        console.log('resource specified in ISI_load_images took longer than expected to download');
        await waitForResources(resources = (("images/stim_" + foil_pair1) + ".png"))
      }
      if (psychoJS.serverManager.getResourceStatus((("images/stim_" + foil_pair2) + ".png")) === core.ServerManager.ResourceStatus.DOWNLOADED) {
        console.log('finished downloading resources specified by component ISI_load_images');
      } else {
        console.log('resource specified in ISI_load_images took longer than expected to download');
        await waitForResources(resources = (("images/stim_" + foil_pair2) + ".png"))
      }
      ISI_load_images.status = PsychoJS.Status.FINISHED;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of test_trialComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var corr_ans;
function test_trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'test_trial' ---
    for (const thisComponent of test_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('test_trial.stopped', globalClock.getTime());
    // Run 'End Routine' code from testing_code
    if ((key_resp_2afc.keys === target_time_data)) {
        console.log("target");
        corr_ans = 1;
    } else {
        console.log("foil");
        corr_ans = 0;
    }
    psychoJS.experiment.addData("group_kind", group_name);
    psychoJS.experiment.addData("targ_pos", target_time_data);
    psychoJS.experiment.addData("foil_pos", foil_time_data);
    psychoJS.experiment.addData("targ_pair1", ("stim_" + targ_pair1));
    psychoJS.experiment.addData("targ_pair2", ("stim_" + targ_pair2));
    psychoJS.experiment.addData("foil_pair1", ("stim_" + foil_pair1));
    psychoJS.experiment.addData("foil_pair2", ("stim_" + foil_pair2));
    psychoJS.experiment.addData("test_acc", corr_ans);
    test_trial_count[group_index] += 1;
    psychoJS.window.mouseVisible = false;
    console.log("testing_loop.thisN == loopN - 1", (testing_loop.thisN === (loopN - 1)));
    console.log("loopN - 1", (loopN - 1));
    if ((testing_loop.thisN === (loopN - 1))) {
        testing_loop.finished = true;
    }
    
    // was no response the correct answer?!
    if (key_resp_2afc.keys === undefined) {
      if (['None','none',undefined].includes(target_time_data)) {
         key_resp_2afc.corr = 1;  // correct non-response
      } else {
         key_resp_2afc.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp_2afc.corr, level);
    }
    psychoJS.experiment.addData('key_resp_2afc.keys', key_resp_2afc.keys);
    psychoJS.experiment.addData('key_resp_2afc.corr', key_resp_2afc.corr);
    if (typeof key_resp_2afc.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_2afc.rt', key_resp_2afc.rt);
        psychoJS.experiment.addData('key_resp_2afc.duration', key_resp_2afc.duration);
        routineTimer.reset();
        }
    
    key_resp_2afc.stop();
    // the Routine "test_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var fixComponents;
function fixRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'fix' ---
    t = 0;
    fixClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.150000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('fix.started', globalClock.getTime());
    // keep track of which components have finished
    fixComponents = [];
    fixComponents.push(fixation_fb);
    
    for (const thisComponent of fixComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function fixRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'fix' ---
    // get current time
    t = fixClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *fixation_fb* updates
    if (t >= 0.0 && fixation_fb.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation_fb.tStart = t;  // (not accounting for frame time here)
      fixation_fb.frameNStart = frameN;  // exact frame index
      
      fixation_fb.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0.15 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (fixation_fb.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      fixation_fb.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of fixComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function fixRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'fix' ---
    for (const thisComponent of fixComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('fix.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _end_key_resp_allKeys;
var finishedComponents;
function finishedRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'finished' ---
    t = 0;
    finishedClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('finished.started', globalClock.getTime());
    end_key_resp.keys = undefined;
    end_key_resp.rt = undefined;
    _end_key_resp_allKeys = [];
    // keep track of which components have finished
    finishedComponents = [];
    finishedComponents.push(thank_you);
    finishedComponents.push(end_key_resp);
    
    for (const thisComponent of finishedComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function finishedRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'finished' ---
    // get current time
    t = finishedClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *thank_you* updates
    if (t >= 0.0 && thank_you.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thank_you.tStart = t;  // (not accounting for frame time here)
      thank_you.frameNStart = frameN;  // exact frame index
      
      thank_you.setAutoDraw(true);
    }
    
    
    // *end_key_resp* updates
    if (t >= 0.0 && end_key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      end_key_resp.tStart = t;  // (not accounting for frame time here)
      end_key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { end_key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { end_key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { end_key_resp.clearEvents(); });
    }
    
    if (end_key_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = end_key_resp.getKeys({keyList: ['space'], waitRelease: false});
      _end_key_resp_allKeys = _end_key_resp_allKeys.concat(theseKeys);
      if (_end_key_resp_allKeys.length > 0) {
        end_key_resp.keys = _end_key_resp_allKeys[_end_key_resp_allKeys.length - 1].name;  // just the last key pressed
        end_key_resp.rt = _end_key_resp_allKeys[_end_key_resp_allKeys.length - 1].rt;
        end_key_resp.duration = _end_key_resp_allKeys[_end_key_resp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of finishedComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function finishedRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'finished' ---
    for (const thisComponent of finishedComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('finished.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(end_key_resp.corr, level);
    }
    psychoJS.experiment.addData('end_key_resp.keys', end_key_resp.keys);
    if (typeof end_key_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('end_key_resp.rt', end_key_resp.rt);
        psychoJS.experiment.addData('end_key_resp.duration', end_key_resp.duration);
        routineTimer.reset();
        }
    
    end_key_resp.stop();
    // the Routine "finished" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
