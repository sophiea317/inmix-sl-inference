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

jsPsych.data.addProperties({
    'expName': EXP_NAME,
    'subject': jsPsych.data.getURLVariable('participant') || 
        "0191", // default subject number if not provided in URL
        // String(Math.floor(Math.random() * 9000) + 1000),  // 1000–9999
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
// const TEST_BLOCKS_DICT = {"AB": 0, "BC": 1, "CD": 2};
// const EXPO_BLOCKS_DICT = {"retrospective": "AB-CD-BC", "transitive": "AB-BC-CD"};
let numStim,                    // number of stimuli to sample for the experiment
    numGrps,                    // number of tetrad groups in the experiment
    numReps;                    // number of repetitions of each stimulus in the exposure phase    
// set the number of stimuli, groups, and repetitions based on pilot mode
if (pilotMode) {
    numStim = 12;
    numGrps = 3;
    numReps = 20;
} else {
    numStim = 24;
    numGrps = 6;
    numReps = 40;
}

// set subject specific parameters
let subNum = expInfo()["subject"];                              // get subject number from expInfo()
let subCbNum = (Number.parseInt(subNum) % cbPerms);             // set counterbalancing number based on subject number
let subCbBlocks = CbDirectTestSeqs[subCbNum].slice();           // get subject's test blocks based on counterbalancing number
let cbCondition = subCbBlocks.map(item => item[0]).join("-");   // create a string representation of the counterbalancing condition for logging 

// seed the random number generator with subject number
Math.seedrandom(subNum); 
console.log("rand num: " + Math.random()); // log a random number for debugging

// generate the stimulus sample, tetrad groups, pairs, and 1-back visual streams
const subParams = getStimSample(numImgs, numStim, numGrps, numReps);

// log the stimulus sample and pairs
console.log("subParams: ", subParams);

// add subject parameters to jsPsych data
jsPsych.data.addProperties({
    'cbNum': subCbNum + 1, // counterbalancing number (1-6)
    'testOrder': cbCondition,
});

// log the experiment info
console.log("expInfo(): \n" + JSON.stringify(expInfo()));

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
var timeline = [];

// define welcome message trial
var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press the space bar to begin!",
    choices: [' '], // space bar to continue
    on_load: function() {
        // log the start of the experiment
        console.log("Experiment started for subject " + subNum + " with counterbalancing number " + expInfo()["cbTestNumber"]);
    }
};
//timeline.push(welcome);

var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 500,
};

//console.log("stim.onebackListABCD[]: " + subParams.onebackListABCD[1])
var fractImgs1 = subParams.trialsVisStm1.map((trial_id, i) => {
    return {
        stimulus: subParams.fractObj[trial_id].src,
        trial_id: trial_id,
        oneback: subParams.trials1BackVisStm1[i] === 1 || 
                 (Array.isArray(subParams.trials1BackVisStm1[i]) && subParams.trials1BackVisStm1[i].includes(1)),
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
const procedureVisStm1 = {
    timeline: [visualStream1, fixation],
    timeline_variables: fractImgs1,
    data: function() {
        return {
            trial_id: jsPsych.timelineVariable('trial_id'),
            oneback: jsPsych.timelineVariable('oneback'),
        };
    },
};
timeline.push(procedureVisStm1);

// start the experiment
jsPsych.run(timeline);


