// isl-inference.js
"use strict";

import { getStimSample } from "./accessories.js";

// initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
    jsPsych.data.displayData();
  }
});

const pilotMode = true;

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
        "0191", // default subject number if not provided in URL
        // String(Math.floor(Math.random() * 9000) + 1000),  // 1000–9999
    'session': jsPsych.data.getURLVariable('session') || 
        '001',
    'exposure': "retrospective",        // ["retrospective", "transitive"],
    'test': "2-step",                   // ["2-step", "1-step"],
});

Math.seedrandom(expInfo()["subject"]); // seed the random number generator with subject and session
console.log("rand num: " + Math.random()); // log a random number for debugging

// Declare variables in outer scope
let NUM_STIM, NUM_GRPS, NUM_REPS;

if (pilotMode) {
    NUM_STIM = 12;
    NUM_GRPS = 3;
    NUM_REPS = 20;
} else {
    NUM_STIM = 24;
    NUM_GRPS = 6;
    NUM_REPS = 40;
}                       
const NUM_IMGS = 109;                           // number of fractal images to choose from
const NUM_BLKS = 2;                             // number of exposure blocks

const stim = getStimSample(NUM_IMGS, NUM_STIM, NUM_GRPS, NUM_REPS);
console.log("stim sample: ", stim); //{ fractIDs, fractObj }
console.log("AB pairs: " + stim.ABpairs + "\nBC pairs: " + stim.BCpairs + "\nCD pairs: " + stim.CDpairs);
//console.log(stim.ABCDpairs) //{ ABpairs, BCpairs, CDpairs, ACpairs, BDpairs, ADpairs }
//{ fractIDs, fractObj }
console.log("NUM_IMGS: " + NUM_IMGS + ", NUM_STIM: " + NUM_STIM + ", NUM_GRPS: " + NUM_GRPS + ", NUM_REPS: " + NUM_REPS);

console.log("trials for ABCD: " + stim.trialsABCD)
//console.log(stim.fractObj[stim.trialsABCD[0]].src)

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

var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 500,
};

console.log("stim.onebackListABCD[]: " + stim.onebackListABCD[1])
var fractImgs1 = stim.trialsABCD.map((trial_id, i) => {
    return {
        stimulus: stim.fractObj[trial_id].src,
        trial_id: trial_id,
        oneback: stim.onebackListABCD[i] === 1 || 
                 (Array.isArray(stim.onebackListABCD[i]) && stim.onebackListABCD[i].includes(1)),
    };
});


var visualStream1 = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    trial_duration: 1000,
    response_ends_trial: false,
    choices: [' '],
    prompt: jsPsych.timelineVariable('oneback') 
        ? "<p><strong>1-back!</strong> Press space</p>" 
        : "<p>Press space if the image repeats</p>",
    on_finish: function(data) {
        data.correct = data.oneback 
            ? data.response === ' '
            : data.response === null;
        data.responded = data.response !== null;
    }
};

var postFixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        const lastTrial = jsPsych.data.get().last(1).values()[0];
        const color = lastTrial.responded ? "green" : "gray";
        return `<div style="font-size: 60px; color: ${color};">+</div>`;
    },
    choices: "NO_KEYS",
    trial_duration: 150,
};



// define visual stream trials
const stream1_procedure = {
    timeline: [visualStream1, fixation],
    timeline_variables: fractImgs1,
    data: function() {
        return {
            trial_id: jsPsych.timelineVariable('trial_id'),
            oneback: jsPsych.timelineVariable('oneback'),
        };
    },
};
timeline.push(stream1_procedure);

// start the experiment
jsPsych.run(timeline);


