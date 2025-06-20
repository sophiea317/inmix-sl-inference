// isl-inference.js
"use strict";

import { getStimSample } from "./accessories.js";

// initialize jsPsych
const jsPsych = initJsPsych();

// prolific URL
// const PROLIFIC_URL = "https://app.prolific.co/submissions/complete?cc=YOUR_CODE_HERE";

// get subject number and session number from URL parameters
//const subNum = jsPsych.data.getURLVariable('participant') || 1000;
//const sesNum = jsPsych.data.getURLVariable('session') || 1;

// set up the experiment info
const EXP_NAME = 'inmix-sl-inference';
const expInfo = () => jsPsych.data.dataProperties;

// function updateExpInfo(newProps) {
//   jsPsych.data.addProperties(newProps);
//   expInfo = jsPsych.data.dataProperties;
// }

jsPsych.data.addProperties({
    'expName': EXP_NAME,
    'subject': jsPsych.data.getURLVariable('participant') || 
        String(Math.floor(Math.random() * 9000) + 1000),  // 1000–9999
    'session': jsPsych.data.getURLVariable('session') || 
        '001',
    'exposure': "retrospective",        // ["retrospective", "transitive"],
    'test': "2-step",                   // ["2-step", "1-step"],
});

// define the experiment parameters
const NUM_IMGS = 109;                           // number of fractal images to choose from
const NUM_STIM = 24;                            // number of stimuli in the experiment
const NUM_GRPS = 6;                             // number of tetrad groups
const NUM_BLKS = 3;                             // number of exposure blocks
const NUM_REPS = 40;                            // number of repetitions for each pair in a group for a block
//const NUM_TRLS = (NUM_REPS * NUM_GRPS);         // number of trials in a block
const PROP_1BACK = 0.10;                        // prortion of trials that are one-back trials
const STIM_1BACK = NUM_REPS * PROP_1BACK;       // number of one-back trials for a stimulus
const PAIR_1BACK = STIM_1BACK * 2;              // number of one-back trials for a pair in a group
//const BINS_1BACK = getNBackDistr(NUM_TRLS, 5);  // bins for distributing one-back trials, 5 bins from 1 to NUM_TRLS     
var imgA1back = [1, 0];
var imgB1back = [0, 1];
const stim = getStimSample(NUM_IMGS, NUM_STIM, NUM_GRPS, NUM_REPS);
console.log("stim sample: ", stim); //{ fractIDs, fractObj }
console.log("AB pairs: " + stim.ABpairs + "\nBC pairs: " + stim.BCpairs + "\nCD pairs: " + stim.CDpairs);
console.log(stim.ABCDpairs) //{ ABpairs, BCpairs, CDpairs, ACpairs, BDpairs, ADpairs }
//{ fractIDs, fractObj }
console.log(
    "NUM_IMGS: " + NUM_IMGS + ", NUM_STIM: " + NUM_STIM + ", NUM_GRPS: " + NUM_GRPS 
    + ", NUM_BLKS: " + NUM_BLKS + ", NUM_REPS: " + NUM_REPS
    + ", STIM_1BACK: " + STIM_1BACK + ", PAIR_1BACK: " + PAIR_1BACK);
console.log(stim.fractIDs);       // e.g., ["007", "054", "103", ...]

// define experiment counterbalancing variables
const CB_DIR_TEST_BLOCKS = [[["AB"], ["BC"], ["CD"]], [["AB"], ["CD"], ["BC"]], [["BC"], ["AB"], ["CD"]], [["BC"], ["CD"], ["AB"]], [["CD"], ["AB"], ["BC"]], [["CD"], ["BC"], ["AB"]]];
const TEST_BLOCKS_DICT = {"AB": 0, "BC": 1, "CD": 2};
const EXPO_BLOCKS_DICT = {"retrospective": "AB-CD-BC", "transitive": "AB-BC-CD"};

// set subject specific parameters
let subNum = expInfo()["subject"];                              // get subject number from expInfo()
let subCbNum = (Number.parseInt(expInfo()["subject"]) % 6);     // set counterbalancing number based on subject number

// get subject's counterbalancing variables
var subTestBlocks = CB_DIR_TEST_BLOCKS[subCbNum].slice();       // get subject's test blocks based on counterbalancing number
var cbCondition = subTestBlocks.map(item => item[0]).join("-"); // create a string representation of the counterbalancing condition for logging 


jsPsych.data.addProperties({
    'cbTestNumber': subCbNum + 1, // counterbalancing number (1-6)
    'cbTestBlocks': cbCondition,
});
console.log("expinfo(): \n" + JSON.stringify(expInfo()));
console.log("counterbalance number: " + expInfo()["cbTestNumber"]);
console.log("subject's test blocks: " + expInfo()["cbTestBlocks"]);


// create timeline
var timeline = [];

// define welcome message trial
var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press the space bar to begin!",
    choices: [' '], // space bar to continue
    on_load: function() {
        // log the start of the experiment
        console.log("Experiment started for subject " + expInfo()["subject"] + " with counterbalancing number " + expInfo()["cbTestNumber"]);
    }
};
//timeline.push(welcome);


// define welcome message trial
const visualStream1 = {
    type: jsPsychImageKeyboardResponse,
    prompt: '<p>Press space bar when an image repeats itself</p>',
    timeline: [
        {stimulus: stim.fractObj[stim.fractIDs[0]].src},
        {stimulus: stim.fractObj[stim.fractIDs[1]].src},
        {stimulus: stim.fractObj[stim.fractIDs[2]].src},
        {stimulus: stim.fractObj[stim.fractIDs[3]].src},
        {stimulus: stim.fractObj[stim.fractIDs[4]].src},      
    ],
    // space bar to continue
    choices: [' '],
};
timeline.push(visualStream1);

// start the experiment
jsPsych.run(timeline);


