// isl-inference.js
"use strict";

//import { getSubjectParams, responseFeedback } from "./utils.js";

// initialize jsPsych
const jsPsych = initJsPsych({
  show_progress_bar: true,
  auto_update_progress_bar: true
});

const IS_DEBUG_MODE = true;
const SAVE_DATA_XAMPP = true;
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
  String(Math.floor(Math.random() * 9000) + 1000),  // 1000–9999
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

// const xhrDataUpload = {
//   type: jsPsychCallFunction,
//   async: true,
//   record_data: false,
//   func: function (done) {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           const response = JSON.parse(xhr.responseText);
//           done(); // Continue experiment
//         } else {
//           console.error("Upload failed. Status:", xhr.status);
//           done(); // Still continue
//         }
//       }
//     };
//     xhr.open('POST', 'write_data.php', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     const csvData = jsPsych.data.get().csv();
//     const filename = `sub-${jsPsych.data.dataProperties['subject']}_${jsPsych.data.dataProperties['expName']}_data`;
//     xhr.send(JSON.stringify({ filedata: csvData, filename: filename }));
//   }
// };

const xhrDataUpload = {
  type: jsPsychCallFunction,
  async: true,
  record_data: false,
  func: function (done) {
    const allData = jsPsych.data.get();
    const filtered = allData.filterCustom(row => {
      // Keep only relevant trialTypes: test_combined and exposure trials
      return row.trialType === "test" || row.trialType === "exposure";
    });
    const csvData = filtered.csv();
    const props = filtered.values()[0] || {};
    const subj = props.subject || 'unknown';
    const session = props.session || '001';
    const exp = props.expName || 'experiment';
    const testType = props.test || 'unknown';
    const filename = `sub-${subj}_${exp}_${testType}-test`;



    console.log(`Uploading final data as: ${filename}`);
    console.log(`Trial count: ${jsPsych.data.get().count()}`);

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

if (SAVE_DATA_XAMPP) {
  console.log("Saving data to XAMPP server at the end of the experiment.");
  // add a trial to upload data to XAMPP server at the end of the experiment
}


/*
TO DO (EXPOSURE):
- combine visual streams into a single stream with 2 breaks and attention checks
- allow multiple responses per trial
*/

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
    pairFid: jsPsych.timelineVariable('pairFid'),
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
        trialType: "pair1Img1",
        stimFid: jsPsych.timelineVariable('pair1Fids')[0]
      }
    },
    // Fixation between first and second image
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testISI,
      stimulus: `<div class="stimulus-container"><div class="fixation"></div></div>`,
      data: {
        trialType: "isi1"
      }
    },
    // Second image of first pair
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testStimDur,
      stimulus: jsPsych.timelineVariable('pair1Img2'),
      data: {
        trialType: "pair1Img2",
        stimFid: jsPsych.timelineVariable('pair1Fids')[1]
      }
    },
    // Fixation between pairs
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testITI,
      stimulus: `<div class="stimulus-container"><div class="fixation"></div></div>`,
      data: {
        trialType: "iti"
      }
    },
    // First image of second pair
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testStimDur,
      stimulus: jsPsych.timelineVariable('pair2Img1'),
      data: {
        trialType: "pair2Img1",
        stimFid: jsPsych.timelineVariable('pair2Fids')[0],
      }
    },
    // Fixation between second and final image
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testISI,
      stimulus: `<div class="stimulus-container"><div class="fixation"></div></div>`,
      data: {
        trialType: "isi2"
      }
    },
    // Second image of second pair
    {
      type: jsPsychHtmlKeyboardResponse,
      choices: "NO_KEYS",
      trial_duration: testStimDur,
      stimulus: jsPsych.timelineVariable('pair2Img2'),
      data: {
        trialType: "pair2Img2",
        stimFid: jsPsych.timelineVariable('pair2Fids')[1],
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
        trialType: 'response',
        blockIdn: jsPsych.timelineVariable('blockIdn'),
        blockNum: jsPsych.timelineVariable('blockNum'),
        blockTNum: jsPsych.timelineVariable('blockTNum'),
        pairFid: jsPsych.timelineVariable('pair1Type') === 'target' ? jsPsych.timelineVariable('pair1Fids') : jsPsych.timelineVariable('pair2Fids'),
        pairNum: jsPsych.timelineVariable('pair1Type') === 'target' ? jsPsych.timelineVariable('pair1Num') : jsPsych.timelineVariable('pair2Num'),
        blockRepNum: jsPsych.timelineVariable('blockRepNum'),
        pair1Type: jsPsych.timelineVariable('pair1Type'),
        pair2Type: jsPsych.timelineVariable('pair2Type'),
        pair1Fid: jsPsych.timelineVariable('pair1Fids'),
        pair2Fid: jsPsych.timelineVariable('pair2Fids'),
        correctResp: jsPsych.timelineVariable('correctResp'),
      },
      on_finish: function(data) {
        data.trialAcc = data.response === data.correctResp ? 1 : 0;
        data.responded = data.response !== null;

        // Extract all trials in this blockTNum + blockNum group
        const trialData = jsPsych.data.get().filter({
          blockTNum: data.blockTNum,
          blockNum: data.blockNum
        }).values();

        const imageFids = {
          pair1Img1: trialData.find(d => d.trialType === "pair1Img1")?.stimFid ?? "NA",
          pair1Img2: trialData.find(d => d.trialType === "pair1Img2")?.stimFid ?? "NA",
          pair2Img1: trialData.find(d => d.trialType === "pair2Img1")?.stimFid ?? "NA",
          pair2Img2: trialData.find(d => d.trialType === "pair2Img2")?.stimFid ?? "NA"
        };

        // Add a clean, flat row summarizing this entire trial sequence
        jsPsych.data.addDataToLastTrial({
          trialType: "test",
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
          pair1Fids: JSON.stringify(data.pair1Fids ?? []),
          pair2Fids: JSON.stringify(data.pair2Fids ?? []),
          pair1Fid_1: imageFids.pair1Img1,
          pair1Fid_2: imageFids.pair1Img2,
          pair2Fid_1: imageFids.pair2Img1,
          pair2Fid_2: imageFids.pair2Img2,
          blockRepNum: data.blockRepNum,
          correctResp: data.correctResp,
          response: data.response,
          rt: data.rt,
          trialAcc: data.trialAcc,
          responded: data.responded
        });

        if (IS_DEBUG_MODE) {
          console.log(
            "trial:", data.trial_index,
            "block:", data.blockNum,
            "pair1:", data.pair1Fids, "(", imageFids.pair1Img1, "+", imageFids.pair1Img2, ")",
            "pair2:", data.pair2Fids, "(", imageFids.pair2Img1, "+", imageFids.pair2Img2, ")",
            "resp:", data.response, "acc:", data.trialAcc
          );
        }
      }
    }
  ],
  timeline_variables: [] // to be filled dynamically when added to the timeline
};

// define the indirect test trials
const indirectTestTrials = subParams.indirectTestTrials;
console.log("indirectTestTrials: ", indirectTestTrials);
Object.keys(indirectTestTrials).forEach((testBlock, t) => {
  const currentBlockTrials = indirectTestTrials[testBlock];
  console.log(`Processing indirect test block: ${testBlock}`, currentBlockTrials);

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
console.log("directTestTrials: ", directTestTrials);
Object.keys(directTestTrials).forEach((testBlock, t) => {
  const currentBlockTrials = directTestTrials[testBlock];
  console.log(`Processing test block: ${testBlock}`, currentBlockTrials);

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

// at the end of experiment, add the finished message
timeline.push(finishedMessage);


// start the experiment
jsPsych.run(timeline);


