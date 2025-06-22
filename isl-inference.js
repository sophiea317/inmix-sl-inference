// isl-inference.js
"use strict";

import { getStimSample } from "./accessories.js";

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
window.DEBUG = DEBUG;

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
if (DEBUG) {
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
- keep fixation on screen throughout entire trial
- make the fixation cross smaller
- make the fixation cross react to when the space bar is pressed
- combine visual streams into a single stream with 2 breaks and attention checks
*/


const fractImgs1 = subParams.trialsVisStm1.map((stimID, tNum) => {
    const imgSrc = subParams.fractObj[stimID].src;

    return {
        stimulus: `
        <div class="stimulus-container">
            <img src="${imgSrc}" />
            <div class="fixation" ></div>
        </div>
        `,
        stim_id: stimID,
        pair_id: subParams.trialIDsVisStm1[tNum],
        is_oneback: subParams.trials1BackVisStm1[tNum] === 1,
        prompt: subParams.trials1BackVisStm1[tNum] === 1
        ? "<div class='top-prompt'>1-back</div>"
        : "<div class='top-prompt'>Press space to continue</div>",
    };
    });

// const fractImgs2 = subParams.trialsVisStm2.map((stimID, tNum) => {
//     return {
//         stimulus: subParams.fractObj[stimID].src,
//         stim_id: stimID,
//         pair_id: subParams.trialIDsVisStm2[tNum],
//         is_oneback: subParams.trials1BackVisStm2[tNum] === 1,
//     };
// });

const VisualStream = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    prompt: jsPsych.timelineVariable('prompt'),
    trial_duration: 1000,
    response_ends_trial: false,
    choices: [' '],
    data: function() {
        return {
            is_oneback: jsPsych.timelineVariable('is_oneback'),
            stim_id: jsPsych.timelineVariable('stim_id'),
            pair_id: jsPsych.timelineVariable('pair_id')
        };
    },
    on_load: function() {
        // Change fixation color on response
        const listener = (e) => {
            console.log("Key pressed: " + e.code);
            if (e.code === ' ') {
                const fix = document.querySelector(".fixation");
                if (fix) fix.classList.add("active");
            }
        };
        document.addEventListener("keydown", listener, { once: true });

        // Clean up listener on trial end
        jsPsych.pluginAPI.setTimeout(() => {
            document.removeEventListener("keydown", listener);
        }, 1000);
    },
    on_finish: function(data) {
        const expectedResponse = data.is_oneback ? ' ' : null;
        data.correct = data.response === expectedResponse;
        data.responded = data.response !== null;

        jsPsych.data.addProperties({
            responded: data.responded,
            correct: data.correct
        });

        console.log("trial " + data.trial_index
            + ": \tstim=" + data.stim_id
            + "\tpair=" + data.pair_id
            + "\t1-back=" + Number(data.is_oneback)
            + "\tcorrect=" + Number(data.correct));
    }
};

const itiFixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        const lastTrial = jsPsych.data.get().last(1).values()[0];
        const color = lastTrial.responded ? "green" : "black";
        return `
            <div class="stimulus-container">
                <div class="fixation" ></div>
            </div>
        `;
    },
    choices: [' '], // space bar to continue
    response_ends_trial: false,
    trial_duration: 500,  // or whatever delay you want
};



// define visual stream trials
const procedureVisStm1 = {
    timeline: [
        VisualStream, 
        itiFixation
    ],
    timeline_variables: fractImgs1
};
timeline.push(procedureVisStm1);

// const procedureVisStm2 = {
//     timeline: [VisualStream, itiFixation],
//     timeline_variables: fractImgs2
// };
// timeline.push(procedureVisStm2);

// start the experiment
jsPsych.run(timeline);


