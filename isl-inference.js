// isl-inference.js
"use strict";

import { getStimSample, zfill } from "./accessories.js";

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
- combine visual streams into a single stream with 2 breaks and attention checks
- allow multiple responses per trial
*/

const fractalImgsStream1 = subParams.trialsVisStm1.map((stimID, tNum) => {
    const trialData = subParams.trialDataVisStm1[tNum];
    return {
        stimulus: `
            <div class="stimulus-container">
                <img id="stim-img" src="${subParams.fractObj[stimID].src}" />
                <div class="fixation"></div>
            </div>
        `,
        trialId: tNum,
        expoCond: trialData.expoCond,
        isOneBack: trialData.isOneBack,
        stimIdn: trialData.stimIdn,
        stimFid: stimID,
        pairFid: trialData.pairFid,
        pairIdn: trialData.pairIdn,
        prompt: trialData.isOneBack
            ? "<div class='top-prompt'>1-back</div>"
            : "<div class='top-prompt'>Press space to continue</div>",
    };
});


const fractalImgsStream2 = subParams.trialsVisStm2.map((stimID, tNum) => {
    const trialData = subParams.trialDataVisStm2[tNum];
    return {
        stimulus: `
            <div class="stimulus-container">
                <img id="stim-img" src="${subParams.fractObj[stimID].src}" />
                <div class="fixation"></div>
            </div>
        `,
        trialId: tNum,
        expoCond: trialData.expoCond,
        isOneBack: trialData.isOneBack,
        stimIdn: trialData.stimIdn,
        stimFid: stimID,
        pairIdn: trialData.pairIdn, 
        pairFid: trialData.img2,
        prompt: trialData.isOneBack
            ? "<div class='top-prompt'>1-back</div>"
            : "<div class='top-prompt'>Press space to continue</div>",
    };
});

const allFractalStimuli = fractalImgsStream1.concat(fractalImgsStream2);
console.log("number of trials in stream 1 = " + zfill(Object.keys(subParams.trialDataVisStm1).length, 4) + ". should be = " + ((numReps * (numGrps * 2) * 2) + (numReps * (numGrps * 2) * 2 * 0.1)));
console.log("number of trials in stream 2 = " + zfill(Object.keys(subParams.trialDataVisStm2).length, 4) + ". should be = " + ((numReps * numGrps * 2) + (numReps * numGrps * 2 * 0.1)));

const visualTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    prompt: jsPsych.timelineVariable('prompt'),
    trial_duration: 1500,
    response_ends_trial: false,
    choices: [' '],
    on_load: function() {
        // Hide image after 1000ms
        jsPsych.pluginAPI.setTimeout(() => {
            const imgEl = document.getElementById('stim-img');
            if (imgEl) imgEl.style.visibility = 'hidden';
        }, 1000);

        // Allow response throughout the trial
        const responseListener = (e) => {
            if (e.code === 'Space') {
                const fix = document.querySelector(".fixation");
                // make the fixation turn white with black background for 150 ms then return to black
                if (fix) {
                    fix.style.backgroundColor = 'white';
                    fix.style.color = 'black';
                    fix.style.transition = 'background-color 0s, color 0s';
                    setTimeout(() => {
                        fix.style.backgroundColor = 'black';
                        fix.style.color = 'white';
                    }, 150);
                }
            }
        };
        document.addEventListener('keydown', responseListener);
        const isOneBack = jsPsych.timelineVariable('isOneBack') 
            ? 3000      // 3000 ms for 1-back trials
            : 1500;     // 1500 ms for other trials
        jsPsych.pluginAPI.setTimeout(() => {
            document.removeEventListener('keydown', responseListener);
        }, isOneBack);
    },
    data: {
        isOneBack: jsPsych.timelineVariable('isOneBack'),
        stimFid: jsPsych.timelineVariable('stimFid'),
        stimIdn: jsPsych.timelineVariable('stimIdn'),
        pairIdn: jsPsych.timelineVariable('pairIdn'),
        pairFid: jsPsych.timelineVariable('pairFid'),
        expoCond: jsPsych.timelineVariable('expoCond'),
    },
    on_finish: function(data) {
        const expected = data.isOneBack ? ' ' : null;
        data.correct = data.response === expected;
        data.responded = data.response !== null;
        // Log the trial data
        if (window.DEBUG) {
            console.log("Trial " + data.trial_index + ": "
                + "\tStimulus: " + data.stimFid
                + "\tPair type: " + data.stimIdn
                + "\t1-back: " + data.isOneBack
                + "\tresponse: " + data.responded
                + "\t rt time: " + data.rt
                + "\t time: " + data.time_elapsed
            );
        }
    }
};

const experimentProcedure = {
    timeline: [visualTrial],
    timeline_variables: fractalImgsStream1
};
timeline.push(experimentProcedure);

// start the experiment
jsPsych.run(timeline);


