// isl-inference.js
"use strict";

//import { getSubjectParams, responseFeedback } from "./utils.js";

// initialize jsPsych
const jsPsych = initJsPsych({
  show_progress_bar: true,
  auto_update_progress_bar: true
});

const IS_DEBUG_MODE = false;
const SAVE_DATA_XAMPP = false;  // localhost:5500/inmix-sl-inference/index.html
window.DEBUG = false;


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
  "7006", //String(Math.floor(Math.random() * 9000) + 1000),  // 1000–9999
  //String(Math.floor(Math.random() * 9000) + 1000),  // 1000–9999
  // "0191",
  'session': jsPsych.data.getURLVariable('session') || 
  '001',
  'test': Math.random() < 0.5 ? "2-step" : "1-step", // "2-step",                   // 'test': Math.random() < 0.5 ? "2-step" : "1-step",
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
    expoITI,            // inter-trial interval for exposure trials
    breakDur,           // break duration in seconds
    testStimDur,        // duration of each fractal in test trials
    testITI,            // inter-trial interval for test trials
    testISI;            // inter-stimulus interval for test trials
if (IS_DEBUG_MODE) { 
  // DEBUG parameters for quick testing
  numStim = 24;
  numGrps = 6;
  numReps = 20;
  expoStimDur = 10;             
  expoITI = 10;
  breakDur = 0.5;
  testStimDur = 10; // duration of each fractal in test trials
  testITI = 10;     // inter-trial interval for test trials
  testISI = 10;     // inter-stimulus interval for test trials
} else {
  // real parameters for the full experiment
  numStim = 24;
  numGrps = 6;
  numReps = 40;
  expoStimDur = 500;                        
  expoITI = 500;
  testStimDur = 1000; // duration of each fractal in test trials
  testITI = 1200;     // inter-trial interval for test trials
  testISI = 500;
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
let subTestType = expInfo()["test"];                          // get test type from expInfo()

// seed the random number generator with subject number
Math.seedrandom(subNum);

// generate the stimulus sample, tetrad groups, pairs, and 1-back visual streams
const subParams = getSubjectParams(numImgs, numStim, numGrps, numReps, subCbBlocks, subTestType);

console.log("directTestPairsList: ", subParams.testPairsList);
console.log("indirectTestPairsList: ", subParams.indirectTestPairsList);

const xhrDataUpload = {
  type: jsPsychCallFunction,
  async: true,
  record_data: false,
  func: function (done) {
    const allData = jsPsych.data.get();
    const filtered = allData.filterCustom(row => {
      // Keep only relevant trialTypes: everything except "fixation"
      return row.trialType !== 'fixation';
    });
    const csvData = filtered.csv();
    const props = filtered.values()[0] || {};
    const subj = props.subject || 'unknown';
    const session = props.session || '001';
    const exp = props.expName || 'experiment';
    const testType = props.test || 'unknown';
    const filename = `sub-${subj}_${exp}_${testType}-test`;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'write_data.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(`Data saved: ${filename}`);
        } else {
          console.error(`Failed to save data (${xhr.status})`);
        }
        done(); // always continue
      }
    };

    xhr.send(JSON.stringify({
      filedata: csvData,
      filename: filename
    }));
  }
};

// add subject parameters to jsPsych data
jsPsych.data.addProperties({
  'cbNum': subCbNum + 1, // counterbalancing number (1-6)
  'testOrder': cbCondition,
  'testType': subTestType
});
console.log("rand num: " + Math.random()); // log a random number for debugging
if (window.DEBUG) {
  console.log("rand num: " + Math.random()); // log a random number for debugging
  // log the stimulus sample and pairs
  console.log("subParams: ", subParams);
}
// log the subject parameters with expInfo function
console.log(
  "subject parameters: "
  + "\nsubj num:\t"   + expInfo()["subject"]
  + "\nexpo type:\t"  + expInfo()["exposure"]
  + "\ntest type:\t"  + expInfo()["test"]
  + "\ncb number:\t"  + expInfo()["cbNum"]
  + "\ntest order:\t" + expInfo()["testOrder"]
);

// TIMELINE SETUP

// define welcome message trial
const welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Welcome to the experiment. Press the space bar to begin!",
  choices: [' '], // space bar to continue
  on_load: function() {
    // log the start of the experiment
    console.log("Experiment started for subject " + subNum + " with counterbalancing number " + expInfo()["cbNum"]);
  },
  data: {
    trialType: 'welcome',
    subject: expInfo()["subject"],
    session: expInfo()["session"],
    expName: expInfo()["expName"],
    cbNum: expInfo()["cbNum"],
    testOrder: expInfo()["testOrder"]
  }
};

// define break screen trial with a countdown timer
const breakScreen = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p><strong>Take a short break.</strong><br>
              <span id="countdown">Time remaining: ${breakDur} seconds</span><br>
              Press space to continue.</p>`,
  choices: [' '],
  post_trial_gap: 500,
  on_load: function() {
    let remainingTime = breakDur;
    const countdownEl = document.getElementById('countdown');
    countdownEl.textContent = `Time remaining: ${remainingTime} seconds`;

    const intervalID = setInterval(() => {
      remainingTime -= 1;
      countdownEl.textContent = `Time remaining: ${remainingTime} seconds`;

      if (remainingTime <= 0) {
        clearInterval(intervalID);
        jsPsych.finishTrial();
      }
    }, 1000); // update every second
  },
  data: {
    trialType: 'break',
    subject: expInfo()["subject"],
    session: expInfo()["session"],
    expName: expInfo()["expName"],
    cbNum: expInfo()["cbNum"],
    testOrder: expInfo()["testOrder"]
  },
  on_finish: function() {
    console.log("Break ended for subject " + subNum + " with counterbalancing number " + expInfo()["cbNum"]);
  }
};

// define a finished message screen
const finishedMessage = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>Thank you for participating in the experiment!<br>
             Your data has been saved.</p>
             <p>Press space to finish.</p>`,
  choices: [' '],
  on_load: function() {
    // log the end of the experiment
    console.log("Experiment finished for subject " + subNum + " with counterbalancing number " + expInfo()["cbNum"]);
  }
};  

// define exposure trial for timeline
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
    stimType: 'imageDisplay',
    blockNum: jsPsych.timelineVariable('blockNum'),
    blockTNum: jsPsych.timelineVariable('blockTNum'),
    blockIdn: jsPsych.timelineVariable('pairIdn'),
    pairFid: jsPsych.timelineVariable('pairFid'),
    pairNum: jsPsych.timelineVariable('pairNum'),
    stimFid: jsPsych.timelineVariable('stimFid'),
    img1Fid: jsPsych.timelineVariable('img1Fid'),
    img2Fid: jsPsych.timelineVariable('img2Fid'),
    stimIdn: jsPsych.timelineVariable('stimIdn'),
    img1Idn: jsPsych.timelineVariable('img1Idn'),
    img2Idn: jsPsych.timelineVariable('img2Idn'),
    stimFid: jsPsych.timelineVariable('stimFid'),
    streamIdn: jsPsych.timelineVariable('streamId'),
    streamNum: jsPsych.timelineVariable('streamNum'),
    streamTNum: jsPsych.timelineVariable('streamTNum'),
    oneback: jsPsych.timelineVariable('oneback'),
  },
  on_finish: function(data) {
    const expected = data.oneback ? ' ' : NaN;
    const sum1Back = jsPsych.data.get().filter({trialType: 'exposure', oneback: true}).count();
    data.correctResp = data.oneback ? 'space' : null;
    data.trialAcc = data.response === expected ? 1 : 0;;
    data.responded = data.response !== null;

    // Log the trial data
    if (window.DEBUG) {
      console.log("trial: "       + data.trial_index 
        + ",  1backs: "         + sum1Back
        + ",  (N,T): [block=("   + data.blockNum + ", " + data.blockTNum + "); stream=(" + data.streamNum + ", " + data.streamTNum + ")]"
        + ",  stim idn: "       + data.stimIdn
        + ",  stim: "           + data.stimFid
        + ",  1-back: "         + data.oneback
        + ",  resp: "           + (data.response !== null ? data.response : 'none')
      );
    }
  }
};

// define the test trial for timeline
const testTrial = {
  timeline: [
    // Fixation before first image
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testISI,
      stimulus: `<div class="stimulus-container"><div class="fixation"></div></div>`,
      data: {
        trialType: "fixation"
      }
    },
    // First image of first pair
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testStimDur,
      stimulus: jsPsych.timelineVariable('pair1Img1'),
      data: {
        trialType: "test",
        stimType: "pair1Img1",
        testCond: jsPsych.timelineVariable('testCond'),
        blockNum: jsPsych.timelineVariable('blockNum'),
        blockTNum: jsPsych.timelineVariable('blockTNum'),
        blockIdn: jsPsych.timelineVariable('blockIdn'),
        pairFid: jsPsych.timelineVariable('pair1Fids'),
        pairNum: jsPsych.timelineVariable('pair1Img1Num'),
        stimFid: jsPsych.timelineVariable('pair1Img1Fid'),
        img1Fid: jsPsych.timelineVariable('pair1Img1Fid'),
        img2Fid: jsPsych.timelineVariable('pair1Img2Fid'),
        stimIdn: jsPsych.timelineVariable('pair1Img1Idn'),
        img1Idn: jsPsych.timelineVariable('pair1Img1Idn'),
        img2Idn: jsPsych.timelineVariable('pair1Img2Idn'),
      }
    },
    // Fixation between first and second image
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testISI,
      stimulus: `<div class="stimulus-container"><div class="fixation"></div></div>`,
      data: {
        trialType: "fixation"
      }
    },
    // Second image of first pair
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testStimDur,
      stimulus: jsPsych.timelineVariable('pair1Img2'),
      data: {
        trialType: "test",
        stimType: "pair1Img2",
        testCond: jsPsych.timelineVariable('testCond'),
        blockNum: jsPsych.timelineVariable('blockNum'),
        blockTNum: jsPsych.timelineVariable('blockTNum'),
        blockIdn: jsPsych.timelineVariable('blockIdn'),
        pairFid: jsPsych.timelineVariable('pair1Fids'),
        pairNum: jsPsych.timelineVariable('pair1Img2Num'),
        stimFid: jsPsych.timelineVariable('pair1Img2Fid'),
        img1Fid: jsPsych.timelineVariable('pair1Img1Fid'),
        img2Fid: jsPsych.timelineVariable('pair1Img2Fid'),
        stimIdn: jsPsych.timelineVariable('pair1Img2Idn'),
        img1Idn: jsPsych.timelineVariable('pair1Img1Idn'),
        img2Idn: jsPsych.timelineVariable('pair1Img2Idn'),
      }
    },
    // Fixation between pairs
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testITI,
      stimulus: `<div class="stimulus-container"><div class="fixation"></div></div>`,
      data: {
        trialType: "fixation"
      }
    },
    // First image of second pair
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testStimDur,
      stimulus: jsPsych.timelineVariable('pair2Img1'),
      data: {
        trialType: "test",
        stimType: "pair2Img1",
        testCond: jsPsych.timelineVariable('testCond'),
        blockNum: jsPsych.timelineVariable('blockNum'),
        blockTNum: jsPsych.timelineVariable('blockTNum'),
        blockIdn: jsPsych.timelineVariable('blockIdn'),
        pairFid: jsPsych.timelineVariable('pair2Fids'),
        pairNum: jsPsych.timelineVariable('pair2Img1Num'),
        stimFid: jsPsych.timelineVariable('pair2Img1Fid'),
        img1Fid: jsPsych.timelineVariable('pair2Img1Fid'),
        img2Fid: jsPsych.timelineVariable('pair2Img2Fid'),
        stimIdn: jsPsych.timelineVariable('pair2Img1Idn'),
        img1Idn: jsPsych.timelineVariable('pair2Img1Idn'),
        img2Idn: jsPsych.timelineVariable('pair2Img2Idn'),
      }
    },
    // Fixation between second and final image
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testISI,
      stimulus: `<div class="stimulus-container"><div class="fixation"></div></div>`,
      data: {
        trialType: "fixation"
      }
    },
    // Second image of second pair
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testStimDur,
      stimulus: jsPsych.timelineVariable('pair2Img2'),
      data: {
        trialType: "test",
        stimType: "pair2Img2",
        testCond: jsPsych.timelineVariable('testCond'),
        blockNum: jsPsych.timelineVariable('blockNum'),
        blockTNum: jsPsych.timelineVariable('blockTNum'),
        blockIdn: jsPsych.timelineVariable('blockIdn'),
        pairFid: jsPsych.timelineVariable('pair2Fids'),
        pairNum: jsPsych.timelineVariable('pair2Img2Num'),
        stimFid: jsPsych.timelineVariable('pair2Img2Fid'),
        img1Fid: jsPsych.timelineVariable('pair2Img1Fid'),
        img2Fid: jsPsych.timelineVariable('pair2Img2Fid'),
        stimIdn: jsPsych.timelineVariable('pair2Img2Idn'),
        img1Idn: jsPsych.timelineVariable('pair2Img1Idn'),
        img2Idn: jsPsych.timelineVariable('pair2Img2Idn'),
      }
    },
    // Response screen
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `
        <div class='prompt'>
          Which sequence of images was more familiar?<br><br>
          Press <strong>F</strong> for the <em>first</em> sequence<br>
          Press <strong>J</strong> for the <em>second</em> sequence
        </div>
      `,
      choices: ['f', 'j'],
      trial_duration: IS_DEBUG_MODE ? 10 : null,
      data: {
        trialType: 'test',
        stimType: 'response',
        testCond: jsPsych.timelineVariable('testCond'),
        blockIdn: jsPsych.timelineVariable('blockIdn'),
        blockNum: jsPsych.timelineVariable('blockNum'),
        blockTNum: jsPsych.timelineVariable('blockTNum'),
        pairFid: jsPsych.timelineVariable('pairFid'),
        pairNum: jsPsych.timelineVariable('pairNum'),
        blockRepNum: jsPsych.timelineVariable('blockRepNum'),
        pair1Type: jsPsych.timelineVariable('pair1Type'),
        pair2Type: jsPsych.timelineVariable('pair2Type'),
        pair1Num: jsPsych.timelineVariable('pair1Num'),
        pair2Num: jsPsych.timelineVariable('pair2Num'),
        pair1Fid: jsPsych.timelineVariable('pair1Fids'),
        pair2Fid: jsPsych.timelineVariable('pair2Fids'),
        pair1Idn: jsPsych.timelineVariable('pair1Idn'),
        pair2Idn: jsPsych.timelineVariable('pair2Idn'),
        pair1Img1Num: jsPsych.timelineVariable('pair1Img1Num'),
        pair1Img2Num: jsPsych.timelineVariable('pair1Img2Num'),
        pair2Img1Num: jsPsych.timelineVariable('pair2Img1Num'),
        pair2Img2Num: jsPsych.timelineVariable('pair2Img2Num'),
        pair1Img1Fid: jsPsych.timelineVariable('pair1Img1Fid'),
        pair1Img2Fid: jsPsych.timelineVariable('pair1Img2Fid'),
        pair2Img1Fid: jsPsych.timelineVariable('pair2Img1Fid'),
        pair2Img2Fid: jsPsych.timelineVariable('pair2Img2Fid'),
        pair1Img1Idn: jsPsych.timelineVariable('pair1Img1Idn'),
        pair1Img2Idn: jsPsych.timelineVariable('pair1Img2Idn'),
        pair2Img1Idn: jsPsych.timelineVariable('pair2Img1Idn'),
        pair2Img2Idn: jsPsych.timelineVariable('pair2Img2Idn'),
        correctResp: jsPsych.timelineVariable('correctResp'),
      },
      on_finish: function(data) {
        data.trialAcc = data.response === data.correctResp ? 1 : 0;
        data.responded = data.response !== null;

        console.log(
          "data:", data
        )

        // Add a clean, flat row summarizing this entire trial sequence
        jsPsych.data.addDataToLastTrial({
          blockTNum: data.blockTNum,
          blockNum: data.blockNum,
          blockIdn: data.blockIdn,
          subject: jsPsych.data.get().last(1).values()[0]?.subject ?? "NA",
          session: jsPsych.data.get().last(1).values()[0]?.session ?? "NA",
          test: jsPsych.data.get().last(1).values()[0]?.test ?? "NA",
          exposure: jsPsych.data.get().last(1).values()[0]?.exposure ?? "NA",
          cbNum: jsPsych.data.get().last(1).values()[0]?.cbNum ?? "NA",
          testOrder: jsPsych.data.get().last(1).values()[0]?.testOrder ?? "NA",
          testType: jsPsych.data.get().last(1).values()[0]?.testType ?? "NA",
          expName: jsPsych.data.get().last(1).values()[0]?.expName ?? "NA",
          pair1Type: data.pair1Type,
          pair2Type: data.pair2Type,
          pair1Num: data.pair1Num,
          pair2Num: data.pair2Num,
          blockRepNum: data.blockRepNum,
          correctResp: data.correctResp,
          response: data.response,
          rt: data.rt,
          trialAcc: data.trialAcc,
          responded: data.responded
        });

        if (IS_DEBUG_MODE) {
          console.log(
            "trial:", data.blockTNum,
            "\nblock:", data.blockNum,
            "\npair1:", data.pair1Fid, "(", data.pair1Img1Fid, "+", data.pair1Img2Fid, ")",
            "\npair2:", data.pair2Fid, "(", data.pair2Img1Fid, "+", data.pair2Img2Fid, ")",
            "\nresp:", data.response, "\nacc:", data.trialAcc
          );
        }
      }
    }
  ],
  timeline_variables: [] // to be filled dynamically when added to the timeline
};

/* JSPSYCH TIMELINE DEFINITIONS */

// init timeline
const timeline = [];

// init connection with pavlovia.org
const pavlovia_init = {
    type: "pavlovia",
    command: "init"
};
timeline.push(pavlovia_init);

// welcome screen
timeline.push(welcome);

const exposureBlocks = subParams.blockedVisualStreams
console.log("exposureBlocks: ", exposureBlocks);
exposureBlocks.forEach((blockTrial, t) => {
  // if saving data to XAMPP, add a data upload trial at the end of each block
  if (SAVE_DATA_XAMPP) {
    timeline.push({
      timeline: [exposureTrial, xhrDataUpload],
      timeline_variables: blockTrial
    });
  } else {
    //console.log("exposureTrial", exposureTrial);
    //console.log("blockTrial", blockTrial);
    timeline.push({
      timeline: [exposureTrial],
      timeline_variables: blockTrial
    });
  }
  // Add a break after each block, except the last one
  if (t < exposureBlocks.length - 1) {
    timeline.push(breakScreen);
  }
});


// define the indirect test trials
const indirectTestTrials = subParams.indirectTestTrials;
Object.keys(indirectTestTrials).forEach((testBlock, t) => {
  const currentBlockTrials = indirectTestTrials[testBlock];
  if (SAVE_DATA_XAMPP) {
    // Data upload trial
    timeline.push({
      timeline: [testTrial.timeline, xhrDataUpload],
      timeline_variables: currentBlockTrials
    });
  } else {
    timeline.push({
      timeline: [testTrial.timeline],
      timeline_variables: currentBlockTrials
    });
  }

});

// define the direct test trials  
const directTestTrials = subParams.directTestTrials;
Object.keys(directTestTrials).forEach((testBlock, t) => {
  const currentBlockTrials = directTestTrials[testBlock];
  if (SAVE_DATA_XAMPP) {
    // Data upload trial
    timeline.push({
      timeline: [testTrial.timeline, xhrDataUpload],
      timeline_variables: currentBlockTrials
    });
  } else {
    timeline.push({
      timeline: [testTrial.timeline],
      timeline_variables: currentBlockTrials
    });
  }

});

// finish connection with pavlovia.org
var pavlovia_finish = {
    type: "pavlovia",
    command: "finish",
    participantId: "JSPSYCH-DEMO"
};
timeline.push(pavlovia_finish);

// at the end of experiment, add the finished message
timeline.push(finishedMessage);


// start the experiment
jsPsych.run(timeline);


