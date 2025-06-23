// isl-inference.js
"use strict";

import { getStimSample, responseFeedback, zfill } from "./accessories.js";

// initialize jsPsych
const jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.displayData();
    // Consider adding data saving functionality
  },
  show_progress_bar: true,
  auto_update_progress_bar: true
});

const DEBUG = true;
window.DEBUG = false;

// 
// prolific URL
// const PROLIFIC_URL = "https://app.prolific.co/submissions/complete?cc=YOUR_CODE_HERE";

// get subject number and session number from URL parameters
//const subNum = jsPsych.data.getURLVariable('participant') || 1000;
//const sesNum = jsPsych.data.getURLVariable('session') || 1;

// set up the experiment info
const EXP_NAME = 'inmix-sl-inference';
const expInfo = () => jsPsych.data.dataProperties;

jsPsych.data.addProperties({
  'expName': EXP_NAME,
  'subject': jsPsych.data.getURLVariable('participant') || 
  //"0191", // default subject number if not provided in URL
  String(Math.floor(Math.random() * 9000) + 1000),  // 1000–9999
  'session': jsPsych.data.getURLVariable('session') || 
  '001',
  'test': "2-step",                   // ["2-step", "1-step"],
  'exposure': "retrospective",        // ["retrospective", "transitive"],
});

// define experiment parameters
const numImgs = 109;            // number of fractal images available
const CbDirectTestSeqs = [      // order of direct test blocks for each counterbalancing number
  ["AB", "BC", "CD"],
  ["AB", "CD", "BC"],
  ["BC", "AB", "CD"],
  ["BC", "CD", "AB"],
  ["CD", "AB", "BC"],
  ["CD", "BC", "AB"]
].map(order => order.map(pair => [pair]));
const cbPerms = CbDirectTestSeqs.length;      // number of counterbalancing test sequences (6 in this case)
// define number of stimuli, groups, repetitions, and timing parameters based on DEBUG mode
let numStim,            // number of stimuli to sample for the experiment
numGrps,            // number of tetrad groups in the experiment
numReps,            // number of repetitions of each stimulus in the exposure phase
expoStimDur,        // duration of each fractal in exposure trials
expoITI;            // inter-trial interval for exposure trials
if (DEBUG) { 
  // DEBUG parameters for quick testing
  numStim = 24;
  numGrps = 6;
  numReps = 20;
  expoStimDur = 75;             
  expoITI = 75;                 
} else {
  // real parameters for the full experiment
  numStim = 24;
  numGrps = 6;
  numReps = 40;
  expoStimDur = 1000;                        
  expoITI = 1000;                            
}
// const TEST_BLOCKS_DICT = {"AB": 0, "BC": 1, "CD": 2};
// TIMING PARAMETERS
let expoTrlDur = expoStimDur + expoITI;      // total duration of each exposure trials with fixation
let expoISI = expoTrlDur*2;                  // inter-stimulus interval for exposure trials

// set subject specific parameters
let subNum = expInfo()["subject"];                              // get subject number from expInfo()
let subCbNum = (Number.parseInt(subNum) % cbPerms);             // set counterbalancing number based on subject number
let subCbBlocks = CbDirectTestSeqs[subCbNum].slice();           // get subject's test blocks based on counterbalancing number
let cbCondition = subCbBlocks.map(item => item[0]).join("-");   // create a string representation of the counterbalancing condition for logging 

// seed the random number generator with subject number
Math.seedrandom(subNum); 
if (DEBUG) {
  console.log("rand num: " + Math.random()); // log a random number for debugging
}
// generate the stimulus sample, tetrad groups, pairs, and 1-back visual streams
const subParams = getStimSample(numImgs, numStim, numGrps, numReps);

// log the stimulus sample and pairs
console.log("subParams: ", subParams);

// add subject parameters to jsPsych data
jsPsych.data.addProperties({
  'cbNum': subCbNum + 1, // counterbalancing number (1-6)
  'testOrder': cbCondition,
});

// log the subject parameters with expInfo function
console.log(
  "subject parameters: "
  + "\nexp name:\t"   + expInfo()["expName"]
  + "\nsubj num:\t"   + expInfo()["subject"]
  + "\nexpo type:\t"  + expInfo()["exposure"]
  + "\ntest type:\t"  + expInfo()["test"]
  + "\ncb number:\t"  + expInfo()["cbNum"]
  + "\ntest order:\t" + expInfo()["testOrder"]
);

// MAIN EXPERIMENTAL TIMELINE

// create timeline
const timeline = [];

// define welcome message trial
const welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Welcome to the experiment. Press the space bar to begin!",
  choices: [' '], // space bar to continue
  on_load: function() {
    // log the start of the experiment
    console.log("Experiment started for subject " + subNum + " with counterbalancing number " + expInfo()["cbNum"]);
  }
};
/*
TO DO (EXPOSURE):
- combine visual streams into a single stream with 2 breaks and attention checks
- allow multiple responses per trial
*/

const breakScreen = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p><strong>Take a short break.</strong><br>Press space to continue.</p>",
  choices: [' '],
  post_trial_gap: 500
};

const numTrialsStream1 = Object.keys(subParams.trialDataVisStm1).length;
const numTrialsStream2 = Object.keys(subParams.trialDataVisStm2).length;
console.log("number of trials in stream 1 = " + zfill(numTrialsStream1, 4) + ". should be = " + ((numReps * (numGrps * 2) * 2) + (numReps * (numGrps * 2) * 2 * 0.1)));
console.log("number of trials in stream 2 = " + zfill(numTrialsStream2, 4) + ". should be = " + ((numReps * numGrps * 2) + (numReps * numGrps * 2 * 0.1)));



const exposureTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  prompt: `<div class='top-prompt'>Press space when an image repeats twice in a row.</div>`,
  trial_duration: expoTrlDur,
  response_ends_trial: false,
  choices: [' '],
  on_load: function() {
    // Hide image after EXPO_STIM_DUR
    jsPsych.pluginAPI.setTimeout(() => {
      const imgEl = document.getElementById('stim-img');
      if (imgEl) imgEl.style.visibility = 'hidden';
    }, expoStimDur);
    
    // Allow response throughout the trial
    const responseListener = responseFeedback();
    
    // Add event listener for keydown events
    document.addEventListener('keydown', responseListener);
    
    // expoISI for 1-back trials, expoTrlDur for other trials
    const timeListening = jsPsych.timelineVariable('is1Back') ? expoISI : expoTrlDur;
    
    // Remove the event listener after the specified time
    jsPsych.pluginAPI.setTimeout(() => {
      document.removeEventListener('keydown', responseListener);
    }, timeListening);
  },
  data: {
    trialType: 'exposure',
    blockNum: jsPsych.timelineVariable('blockNum'),
    blockTNum: jsPsych.timelineVariable('blockTNum'),
    streamNum: jsPsych.timelineVariable('streamNum'),
    streamTNum: jsPsych.timelineVariable('streamTNum'),
    condIdn: jsPsych.timelineVariable('condIdn'),
    condFid: jsPsych.timelineVariable('condFid'),
    is1Back: jsPsych.timelineVariable('is1Back'),
    stimFid: jsPsych.timelineVariable('stimFid'),
    stimIdn: jsPsych.timelineVariable('stimIdn'),
    pairIdn: jsPsych.timelineVariable('pairIdn'),
    pairFid: jsPsych.timelineVariable('pairFid'),
  },
  on_finish: function(data) {
    const expected = data.is1Back ? ' ' : null;
    const sum1Back = jsPsych.data.get().filter({trialType: 'exposure', is1Back: true}).count();
    
    data.correct = data.response === expected;
    data.responded = data.response !== null;
    // Log the trial data
    if (!window.DEBUG) {
      console.log("trial: "       + data.trial_index 
        + ",  1backs: "         + sum1Back
        + ",  (N,T): [block=("   + data.blockNum + ", " + data.blockTNum + "); stream=(" + data.streamNum + ", " + data.streamTNum + ")]"
        + ",  cond: "           + data.condIdn
        + ",  stim pair: "      + data.condFid
        + ",  stim idn: "       + data.stimIdn
        + ",  stim: "           + data.stimFid
        + ",  1-back: "         + data.is1Back
        + ",  resp: "           + (data.response !== null ? data.response : 'none')
      );
    }
  }
};
const exposureBlocks = subParams.blockedVisualStreams
console.log("exposure blocks: ", exposureBlocks);

exposureBlocks.forEach((blockTrial, t) => {
  timeline.push({
    timeline: [exposureTrial],
    timeline_variables: blockTrial
  });
  // Add a break after each block, except the last one
  if (t < exposureBlocks.length - 1) {
    timeline.push(breakScreen);
  }
});


// const experimentProcedure = {            
//     timeline: [exposureTrial],
//     timeline_variables: subParams.blockedVisualStreams
// };
// timeline.push(experimentProcedure);

// start the experiment
jsPsych.run(timeline);


