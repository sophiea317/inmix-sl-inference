/**
* Statistical Learning Experiment Utilities
* This module provides functions for handling stimulus sampling, randomization,
* and 1-back trial generation for statistical learning experiments.
* 
* @module utils
*/

/**
* ========================================================================
* @function getSubjectParams
* ========================================================================
* Gets a sample of stimuli and generates trial sequences for the experiment
* @param {number} nImg - Total number of available images
* @param {number} nStim - Number of stimuli to sample
* @param {number} grps - Number of groups to create
* @param {number} rep - Number of repetitions for each stimulus
* @returns {Object} Object containing stimulus data and trial sequences
*/

function getSubjectParams(nImg, nStim, grps, rep, cbBlocks) {
  // validate input parameters
  if (nStim % grps !== 0) {
    throw new Error("Number of stimuli must be divisible by number of groups");
  }
  const imgDir = "img/";                                  // directory where images are stored
  const imgPfx = "stim_";                                 // prefix for image filenames
  const imgSfx = ".png";                                  // suffix for image filenames

  // ** ======================================================================
  // ** defining parameters for the experiment
  const prop1back = 0.10;                                 // prortion of trials that are 1-back trials
  const nBins = 5;                                        // number of bins for distributing 1-back trials
  const stimOneback = rep * prop1back * 2;                // number of 1-back trials for a stimulus
  const nPairsVisStm1 = grps * 2;                         // number of groups in the 1st visual stream
  const nPairsVisStm2 = grps;                             // number of groups in the 2nd visual stream
  const pairRepsVisStm1 = nPairsVisStm1 * rep;            // total number of trials in the 1st visual stream
  const pairRepsVisStm2 = nPairsVisStm2 * rep;            // total number of trials in the 2nd visual stream
  const pairTrlsVisStm1 = pairRepsVisStm1 * 2;            // total number of paired trials in the 1st visual stream
  const pairTrlsVisStm2 = pairRepsVisStm2 * 2;            // total number of paired trials in the 2nd visual stream
  const nStimPerGroup = nStim / grps;                     // number of stimuli per group 
  const pairIdx1 = [1, 0];                                // 1-back trial indices for the 1st image in the pair
  const pairIdx2 = [0, 1];                                // 1-back trial indices for the 2nd image in the pair
  const blockTestPairs = {"AB": 0, "BC": 1, "CD": 2};     // define mapping of condition IDs to block test pairs

  // ** ========================================================================
  // ** calculating parameters for the experiment
  const tNumVisStm1 = pairTrlsVisStm1 + (pairTrlsVisStm1 * prop1back);  // total number of trials in the 1st visual stream
  const tNumVisStm2 = pairTrlsVisStm2 + (pairTrlsVisStm2 * prop1back);  // total number of trials in the 2nd visual stream
  const binsVisStm1 = getbins(pairRepsVisStm1, nBins);    // bins for distributing 1-backs in AB-CD visual stream
  const binsVisStm2 = getbins(pairRepsVisStm2, nBins);    // bins for distributing 1-backs in BC visual stream

  // ** ========================================================================
  // ** initializing variables for the experiment
  const pairsAB = [];
  const pairsBC = [];
  const pairsCD = [];
  const pairsAC = [];
  const pairsBD = [];
  const pairsAD = [];
  const pairNumAB = [];
  const pairNumBC = [];
  const pairNumCD = [];
  const pairsVisStm1 = [];
  const IDsVisStm1 = [];
  const pairsVisStm2 = [];
  const IDsVisStm2 = [];
  const numVisStm1 = [];
  const numVisStm2 = [];
  let fractIDs = [];
  let fractObj = {};
  let fractGrps = [];
  let listArrayVisStm1, listIDsVisStm1, listArrayVisStm2, listIDsVisStm2;
  let list1BackVisStm1, list1BackVisStm2, listNumVisStm1, listNumVisStm2;
  let grp1BackVisStm1, grp1BackVisStm2;
  
  // log the experiment parameters
  console.log(
    "Experiment parameters: \n"
    + "=> " + nImg + "\ttotal number of images available\n"
    + "=> " + nStim + "\timgs sampled\n"
    + "=> " + grps + "\tAB-BC-CD groups\n"
    + "=> " + rep + "\tstimulus reps during exposure\n"
    + "=> " + prop1back * 100 + "%\tof trials will be 1-back trials\n"
    + "=> " + stimOneback + "\t1-back trials for each pair\n"
    + "=> " + nBins + "\tnumber of bins for distributing 1-back trials\n"
  );
  
  console.log(
    "Visual streams parameters: \n"
    + "=> " + nPairsVisStm1 + "\tnumber of pairs in the AB-CD stream\n"
    + "=> " + nPairsVisStm2 + "\tnumber of pairs in the BC stream\n"
    + "=> " + pairRepsVisStm1 + "\ttotal paired trials in the AB-CD stream\n"
    + "=> " + pairRepsVisStm2 + "\ttotal paired trials in the BC stream\n"
    + zfill(tNumVisStm1, 4) + "\ttrials in stream 1:  " + pairTrlsVisStm1 + " pair trials  +  " + (pairTrlsVisStm1 * prop1back) + " 1-back trials\n"
    + zfill(tNumVisStm2, 4) + "\ttrials in stream 2:  " + pairTrlsVisStm2 + " pair trials  +  " + (pairTrlsVisStm2 * prop1back) + " 1-back trials\n"
  );
  
  console.log(
    "Bins for 1-back trials in AB-CD stream: \t" + binsVisStm1 + "\n" + 
    "Bins for 1-back trials in BC stream: \t\t" + binsVisStm2
  );
  
  // sample image IDs from the available images
  let imgIds = range(nImg + 1, 1);
  let sampleImgId = sample(imgIds, nStim);

  // create image objects and IDs
  for (let i = 0; i < sampleImgId.length; i++) {
    let num = sampleImgId[i];
    let imgId = zfill(num, 3);
    fractIDs.push(imgId);
    
    let imagePath = `${imgDir}${imgPfx}${imgId}${imgSfx}`;
    let img = new Image();
    img.src = imagePath;
    img.id = `stim_${imgId}`;
    fractObj[imgId] = img;
  }
  
  // create groups of fractal IDs
  for (const i of range(nStim, 0, nStimPerGroup)) {
    fractGrps.push(fractIDs.slice(i, i + nStimPerGroup));
  }
  
  // get pairs of images and pair ids for stimulus groups
  for (let i = 0; i < fractGrps.length; i++) {
    const currGrp = fractGrps[i];
    pairNumAB.push(i);
    pairNumBC.push(i);
    pairNumCD.push(i);
    pairsAB.push([currGrp[0], currGrp[1]]);
    pairsBC.push([currGrp[1], currGrp[2]]);
    pairsCD.push([currGrp[2], currGrp[3]]);
    pairsAC.push([currGrp[0], currGrp[2]]);
    pairsBD.push([currGrp[1], currGrp[3]]);
    pairsAD.push([currGrp[0], currGrp[3]]);
    pairsVisStm1.push([currGrp[0], currGrp[1]]);
    IDsVisStm1.push(["A", "B"]);
    numVisStm1.push(i);
    pairsVisStm1.push([currGrp[2], currGrp[3]]);
    IDsVisStm1.push(["C", "D"]);
    numVisStm1.push(i);
    pairsVisStm2.push([currGrp[1], currGrp[2]]);
    IDsVisStm2.push(["B", "C"]);
    numVisStm2.push(i);
  }

  // direct test pairs
  let pairIdxAB = sample(range(grps), grps);
  let pairIdxBC = sample(range(grps), grps);
  let pairIdxCD = sample(range(grps), grps);
  let foilIdxAB = generateUniqueOrder(pairIdxAB);
  let foilIdxBC = generateUniqueOrder(pairIdxBC);
  let foilIdxCD = generateUniqueOrder(pairIdxCD);

  // indirect test pairs
  let pairIdxAC = sample(range(grps), grps);
  let pairIdxBD = sample(range(grps), grps);
  let pairIdxAD = sample(range(grps), grps);
  let foilIdxAC = generateUniqueOrder(pairIdxAC);
  let foilIdxBD = generateUniqueOrder(pairIdxBD);
  let foilIdxAD = generateUniqueOrder(pairIdxAD);

  // set up direct test 
  const directTests = [pairsAB, pairsBC, pairsCD];
  const testPairNums = [pairNumAB, pairNumBC, pairNumCD];

  // set up direct test pairs
  const directTestPairIdxs = [pairIdxAB, pairIdxBC, pairIdxCD];

  // set up direct test foils
  const directTestFoilIdxs = [foilIdxAB, foilIdxBC, foilIdxCD];

  // set up direct test pairs
  const testPairsList = generateTargetAndFoilPairs(
    cbBlocks,
    blockTestPairs,
    directTests,
    testPairNums,
    directTestPairIdxs,
    directTestFoilIdxs
  );

  const { trialsTimeline: directTestTrialsTimeline, testTrials: directTestTrials } = generateRepeatedTestTrials(testPairsList, fractObj);

  let excl1backVisStm1, excl1backVisStm2;
  let success = false;
  while (!success) {
    // shuffle the pairs for the visual streams
    const idxVisStm1 = getsequences(nPairsVisStm1, rep);
    const idxVisStm2 = getsequences(nPairsVisStm2, rep);
    
    listArrayVisStm1 = idxVisStm1.map(i => pairsVisStm1[i]);
    listArrayVisStm2 = idxVisStm2.map(i => pairsVisStm2[i]);
    listIDsVisStm1 = idxVisStm1.map(i => IDsVisStm1[i]);
    listIDsVisStm2 = idxVisStm2.map(i => IDsVisStm2[i]);
    listNumVisStm1 = idxVisStm1.map(i => numVisStm1[i]);
    listNumVisStm2 = idxVisStm2.map(i => numVisStm2[i]);
    list1BackVisStm1 = zeroslike(listArrayVisStm1);
    list1BackVisStm2 = zeroslike(listArrayVisStm2);
    
    grp1BackVisStm1 = [];
    grp1BackVisStm2 = [];
    excl1backVisStm1 = [];
    excl1backVisStm2 = [];
    
    try {
      // assign 1-back trials for the first visual stream
      assignOneBacks({
        numPairs: nPairsVisStm1,
        idxByPair: idxVisStm1,
        bins: binsVisStm1,
        excluded: excl1backVisStm1,
        onebackArray: list1BackVisStm1,
        onebackPair: grp1BackVisStm1,
        label: "1st visual stream",
        stimOneback, pairIdx1, pairIdx2
      });
      // assign 1-back trials for the second visual stream
      assignOneBacks({
        numPairs: nPairsVisStm2,
        idxByPair: idxVisStm2,
        bins: binsVisStm2,
        excluded: excl1backVisStm2,
        onebackArray: list1BackVisStm2,
        onebackPair: grp1BackVisStm2,
        label: "2nd visual stream",
        stimOneback, pairIdx1, pairIdx2
      });
      
      success = true;
    } catch (e) {
      console.log("Restarting due to error:", e.message);
    }
  }
  let { trials: trialsVisStm1, onebacks: trials1BackVisStm1, ids: trialIDsVisStm1, trialData: trialDataVisStm1, pairNum: pairNumVisStm1 } = flat1backlist(listArrayVisStm1, list1BackVisStm1, listIDsVisStm1, listNumVisStm1);
  let { trials: trialsVisStm2, onebacks: trials1BackVisStm2, ids: trialIDsVisStm2, trialData: trialDataVisStm2, pairNum: pairNumVisStm2 } = flat1backlist(listArrayVisStm2, list1BackVisStm2, listIDsVisStm2, listNumVisStm2);
  const fractalImgsStream1 = generateFractalStream(fractObj, trialsVisStm1, trialDataVisStm1, pairNumVisStm1, 0, "ABCD");
  const fractalImgsStream2 = generateFractalStream(fractObj, trialsVisStm2, trialDataVisStm2, pairNumVisStm2, 1, "BC");
  const blockedVisualStreams = combineAndBlockStreams(fractalImgsStream1, fractalImgsStream2);
  return {
    fractIDs, fractObj,
    pairsVisStm1, IDsVisStm1, pairsVisStm2, IDsVisStm2,
    blockedVisualStreams, fractalImgsStream1, fractalImgsStream2,
    trialsVisStm1, trials1BackVisStm1, trialIDsVisStm1, trialDataVisStm1,
    trialsVisStm2, trials1BackVisStm2, trialIDsVisStm2, trialDataVisStm2,
    listArrayVisStm1, list1BackVisStm1, listArrayVisStm2, list1BackVisStm2, 
    testPairsList, directTestTrialsTimeline, directTestTrials,
    directTests, directTestPairIdxs, directTestFoilIdxs
  };
}

/**
* ========================================================================
* functions described below are the main helpers for the main function 
* ========================================================================
* in order of called
* @function assignOneBacks
* @function generateFractalStream
* @function generateRepeatedTestTrials
*/

function generateFractalStream(fractObj, trialIDs, trialData, trialPairNums, streamNum, streamId) {
  return trialIDs.map((stimID, tNum) => {
    const data = trialData[tNum];
    const pairNum = trialPairNums[tNum];
    return {
      blockNum: NaN,
      blockTNum: NaN,
      streamNum,
      streamId,
      streamTNum: tNum,
      trialPair: data.pairTrlId,
      condIdn: data.condIdn,
      condFid: data.condFid,
      oneback: data.oneback,
      stimFid: stimID,
      stimIdn: data.stimIdn,
      img1Fid: data.img1Fid,
      img2Fid: data.img2Fid,
      img1Idn: data.img1Idn,
      img2Idn: data.img2Idn,
      pairIdn: data.pairIdn,
      pairFid: data.pairFid,
      pairNum: pairNum,
      stimulus: stimulus(fractObj, stimID),
    };
  });
}

function generateRepeatedTestTrials(testPairs, fractObj) {
  // Group foils by keyIdn
  const targsCondGrped = {};
  const foilsCondGrped = {};

  testPairs.forEach(p => {
    if (p.pairType === 'foil') {
      if (!foilsCondGrped[p.keyIdn]) foilsCondGrped[p.keyIdn] = [];
      foilsCondGrped[p.keyIdn].push(p);
    }
    else if (p.pairType === 'target') {
      if (!targsCondGrped[p.keyIdn]) targsCondGrped[p.keyIdn] = [];
      let order = [0, 1];
      const rep1SeqNum = shuffle(order)
      // add sequence order side for both repetitions
      p.repSequenceNum = [rep1SeqNum];
      // define rep2 as opposite of rep1
      p.repSequenceNum.push([
        rep1SeqNum[0] === 0 ? 1 : 0,
        rep1SeqNum[1] === 0 ? 1 : 0
      ]);
      targsCondGrped[p.keyIdn].push(p);
    }
  });

  const numReps = 2; // number of repetitions for each foil set
  const testTrials = {};

  // get test trials by looping over the condIdn keys
  Object.keys(targsCondGrped).forEach((key, b) => {
    testTrials[key] = [];
    console.log("key:", key, "b:", b);
    // loop over number of reps
    let tNum = 0;
    for (let rep = 0; rep < numReps; rep++) {
      const foils = shuffle(foilsCondGrped[key].slice());
      const targets = shuffle(targsCondGrped[key].slice());
      const trial = targets.map((target, t) => {
        const foil = foils[t];
        const blockTNum = tNum++;
        const blockNum = b;
        const blockRepNum = rep;
        const blockRepTNum = t;
        const targFid = target.pairFid;
        const foilFid = foil.pairFid;
        const pairOne = target.repSequenceNum[rep][0] === 0 ? target : foils[t];
        const pairTwo = target.repSequenceNum[rep][0] === 0 ? foils[t] : target;
        const pair1Num = pairOne.pairNum;
        const pair2Num = pairTwo.pairNum;
        const pair1Type = pairOne.pairType;
        const pair2Type = pairTwo.pairType;
        const trlInfo = {
          blockIdn: String(target.blockIdn),
          blockNum: blockNum,
          blockTNum: blockTNum,
          pair1Num: pair1Num,
          pair2Num: pair2Num,
          pair1Fids: pairOne.pairFid,
          pair2Fids: pairTwo.pairFid,
          pair1Type: pair1Type,
          pair2Type: pair2Type,
          pair1Img1: stimulus(fractObj,pairOne.img1Fid),
          pair1Img2: stimulus(fractObj,pairOne.img2Fid),
          pair2Img1: stimulus(fractObj,pairTwo.img1Fid),
          pair2Img2: stimulus(fractObj,pairTwo.img2Fid),
          targFid: targFid,
          foilFid: foilFid,
          pairFids: [pairOne.pairFid, pairTwo.pairFid],
          blockRepNum: blockRepNum,
          blockRepTNum: blockRepTNum,
          pairOne: pairOne,
          pairTwo: pairTwo,
          correctResp: pair1Type === 'target' ? 'f' : 'j',
        };
        return trlInfo;
      });

      testTrials[key].push(...trial);
    };
  });
  //stimulus: stimulus(fractObj, stimID),
  const trialsTimeline = {};

  Object.keys(testTrials).forEach((key, i) => {
    trialsTimeline[key] = [];

    testTrials[key].forEach((trial, tNum) => {
      const trialBlock = createTestTrials(trial, fractObj);
      trialsTimeline[key].push(...trialBlock);
    });
  });

  console.log("trialsTimeline", trialsTimeline);
  return { trialsTimeline, testTrials };

  function createTestTrials(testTrial, fractObj) {
    const tNum = testTrial.blockTNum;
    const pairOne = testTrial.pairOne;
    const pairTwo = testTrial.pairTwo;

    return [
      // Initial fixation before first image
      makeFixationTrial(500, tNum),

      // First pair
      makeImageTrial(pairOne.img1Fid, fractObj, pairOne, tNum, "pair1-img1"),
      makeFixationTrial(500, tNum),
      makeImageTrial(pairOne.img2Fid, fractObj, pairOne, tNum, "pair1-img2"),

      // Between-pair fixation
      makeFixationTrial(1200, tNum),

      // Second pair
      makeImageTrial(pairTwo.img1Fid, fractObj, pairTwo, tNum, "pair2-img1"),
      makeFixationTrial(500, tNum),
      makeImageTrial(pairTwo.img2Fid, fractObj, pairTwo, tNum, "pair2-img2"),

      // Response screen
      {
        blockTNum: tNum,
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
          <div class='prompt'>
            Which pair was familiar?<br><br>
            Press <strong>F</strong> for the <em>first</em> pair<br>
            Press <strong>J</strong> for the <em>second</em> pair
          </div>
        `,
        choices: ['f', 'j'],
        trial_duration: window.DEBUG ? 10 : null,
        data: {
          ...testTrial,
          trialType: "test",
          firstPair: testTrial.firstPairType,
          secondPair: testTrial.secondPairType,
          correctResp: testTrial.correctResp,
        },
        on_finish: function(data) {
          data.trialAcc = (data.response === data.correctResp);
          data.responded = data.response !== null;
          if (window.DEBUG) {
            console.log("trial: "       + data.trial_index
              + " blockTNum: " + data.blockTNum
              + " blockNum: " + data.blockNum
              + " blockIdn: " + data.blockIdn
              + " pairType: " + data.pairType
            );
          }
        }
      }
    ];
  }

  // Helper to render the stimulus image
  function makeImageTrial(stimID, fractObj, data, tNum, trialType, duration = 1000) {
    if (window.DEBUG) {
      duration = 50;
    }
    return {
      blockTNum: tNum,
      pairIdn: String(data.pairIdn),
      pairType: data.pairType,
      stimFid: stimID,
      blockNum: data.blockNum,
      choices: "NO_KEYS",
      trial_duration: duration,
      record_data: false,
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `
        <div class="stimulus-container">
          <img src="${fractObj[stimID].src}" id="stim-img" />
          <div class="fixation"></div>
        </div>
      `,
      data: {
        trialType: trialType,
        ...data
      }
    };
  }

  // Helper to render a fixation cross
  function makeFixationTrial(duration = 500, tNum) {
    if (window.DEBUG) {
      duration = 50;
    }
    return {
      blockTNum: tNum,
      stimFid: "fix",
      choices: "NO_KEYS",
      trial_duration: duration,
      record_data: false,
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="stimulus-container"><div class="fixation"></div></div>`,
      data: {
        trialType: "fixation",
      }
    };
  }


}

function stimulus(fractalObj, stimID) {
  return `
      <div class="stimulus-container">
          <img src="${fractalObj[stimID].src}" id="stim-img" />
          <div class="fixation"></div>
      </div>
  `;
}

function responseFeedback(duration = 150) {
  return function responseListener(e) {
    if (e.code === 'Space') {
      const fix = document.querySelector(".fixation");
      if (fix) {
        fix.style.backgroundColor = 'white';
        fix.style.color = 'black';
        fix.style.transition = 'background-color 0s, color 0s';
        setTimeout(() => {
          fix.style.backgroundColor = 'black';
          fix.style.color = 'white';
        }, duration);
      }
    }
  };
}

function combineAndBlockStreams(fractalImgsStream1, fractalImgsStream2) {
  const numTrialsStream1 = fractalImgsStream1.length;
  const halfway = numTrialsStream1 / 2;
  
  // Clone and tag original trials with a tentative blockNum
  const block1 = fractalImgsStream1.slice(0, halfway).map(trial => ({ ...trial, blockNum: 0 }));
  const block2 = fractalImgsStream1.slice(halfway).map(trial => ({ ...trial, blockNum: 1 }));
  const block3 = fractalImgsStream2.map(trial => ({ ...trial, blockNum: 2 }));
  
  const lastTrial = block1[block1.length - 1];
  const [pairIdx, pairEnd] = lastTrial.trialPair.split("/").map(Number);
  
  if (window.DEBUG) {
    console.log("=== Separating Stream 1 ===");
    console.log("block 1 last trial and block 2 first trial:\n", lastTrial,"\n", block2[0],
      "\nblock 1 size = ", block1.length, ", block 2 size = ", block2.length);
  }
    
  const moveFirstToBlock1 = () => {
    if (block2.length > 0) {
      const moved = block2.shift();
      moved.blockNum = 0; // update blockNum
      block1.push(moved);
    }
  };
    
  const moveLastToBlock2 = () => {
    if (block1.length > 0) {
      const moved = block1.pop();
      moved.blockNum = 1; // update blockNum
      block2.unshift(moved);
    }
  };
    
  // Adjust for pair boundaries
  if (pairIdx !== pairEnd) {
    if (pairIdx === 2 && pairEnd === 3) {
      moveFirstToBlock1(); // 2/3 = complete the pair
    } else if (pairIdx === 1 && pairEnd === 3) {
      moveLastToBlock2();  // 1/3 = move pair to block2
    } else if (pairIdx === 1 && pairEnd === 2) {
      moveFirstToBlock1(); // 1/2 = complete the pair
    }
    if (window.DEBUG) {
      console.log("\n=== Adjustment Needed ===\n\n");
      console.log("block 1 last trial and block 2 first trial:\n", block1[block1.length - 1], "\n", block2[0],
        "\nblock 1 size = ", block1.length, ", block 2 size = ", block2.length);
      console.log("=== Adjustment Complete ===\n");
    }
  }
  // Concatenate the blocks with the second stream
  const allVisualStreams = block1.concat(block2, block3).map((trial, index) => {
    trial.blockNum = index < block1.length ? 0 : index < block1.length + block2.length ? 1 : 2;
        // set the trial number based on the blockNum
        trial.blockTNum = index < block1.length ? index : 
        index < block1.length + block2.length ? index - block1.length : 
        index - (block1.length + block2.length);
        return trial;
  });
  if (window.DEBUG) {
    console.log(block1.length + " trials in block 1. First and last trials:\n", allVisualStreams[0], "\n", allVisualStreams[block1.length - 1]);
    console.log(block2.length + " trials in block 2. First and last trials:\n", allVisualStreams[block1.length], "\n", allVisualStreams[block1.length + block2.length - 1]);
    console.log(block3.length + " trials in block 3. First and last trials:\n", allVisualStreams[block1.length + block2.length], "\n", allVisualStreams[allVisualStreams.length - 1]);
    // log the total number of trials in each block
    console.log("Total trials in all blocks: ", allVisualStreams.length);
  }
  // Group trials by block number
  const blockedVisualStreams = {};
  for (const trial of allVisualStreams) {
    if (!blockedVisualStreams[trial.blockNum]) {
      blockedVisualStreams[trial.blockNum] = [];
    }
    blockedVisualStreams[trial.blockNum].push(trial);
  }
  // Sort by block number to ensure order
  return Object.keys(blockedVisualStreams).sort().map(key => blockedVisualStreams[key]);
}
    
function responseFeedback(duration = 150) {
  return function responseListener(e) {
    if (e.code === 'Space') {
      const fix = document.querySelector(".fixation");
      if (fix) {
        fix.style.backgroundColor = 'white';
        fix.style.color = 'black';
        fix.style.transition = 'background-color 0s, color 0s';
        setTimeout(() => {
          fix.style.backgroundColor = 'black';
          fix.style.color = 'white';
        }, duration);
      }
    }
  };
}
    
function generateTargetAndFoilPairs(cbBlocks, blockTestPairs, directTests, directTestPairNums, directTestPairIdxs, directTestFoilIdxs) {
  const testPairsList = [];

  cbBlocks.forEach((condIdn, blockNum) => {
    const condIdx = blockTestPairs[condIdn];
    const currCondDirectTests = directTests[condIdx];
    const currCondPairs = directTestPairNums[condIdx];
    const currCondPairIdxs = directTestPairIdxs[condIdx];
    const currCondFoilIdxs = directTestFoilIdxs[condIdx];

    currCondPairIdxs.forEach((blockPairNum, blockTNum) => {
      const pairFid = currCondDirectTests[blockPairNum];
      const pairNum = currCondPairs[blockPairNum];
      const foilNum = currCondFoilIdxs[blockTNum];
      const foilFid = [pairFid[0], currCondDirectTests[foilNum][1]];
      const foilPairNum = currCondPairs[foilNum];

      testPairsList.push({
        blockNum: blockNum,
        blockTNum: NaN,
        blockRepNum: NaN,
        blockIdn: condIdn,
        keyIdn: String(condIdn),
        blockPairNum: blockPairNum,
        pairNum: [pairNum,pairNum],
        pairFid: pairFid,
        pairType: "target",
        img1Fid: pairFid[0],
        img2Fid: pairFid[1],
        img1Num: blockPairNum,
        img2Num: blockPairNum,

      });

      testPairsList.push({
        blockNum: blockNum,
        blockTNum: NaN,
        blockRepNum: NaN,
        blockIdn: condIdn,
        keyIdn: String(condIdn),
        blockPairNum: foilNum,
        pairNum: [pairNum, foilPairNum],
        pairFid: foilFid,
        pairType: "foil",
        img1Fid: foilFid[0],
        img2Fid: foilFid[1],
        img1Num: blockPairNum,
        img2Num: foilNum,
      });
    });
  });

  return testPairsList;
}

    
    
  // All the following functions are helper functions for the main function above
  
  // function like np.linspace but excluding first and last elements
  function getbins(end, num) {
    const start = 1;  // start at 1 because we do not want the first trial to be a 1-back trial
    const result = [];
    const step = (end - start) / (num - 1);
    
    for (let i = 0; i < num; i++) {
      const val = start + i * step;
      result.push(Math.floor(val)); // truncate like Python's int()
    }
    
    // Subtract 2 from the last element
    result[result.length - 1] -= 2;     // subtract 2 because of zero-based indexing and to ensure the last trial is not a 1-back trial
    
    return result;
  }
  
  // Create an array of integers from start (inclusive) to end (exclusive)
  function range(n, start = 0, step = 1) {
    const output = [];
    for (let i = start; i < n; i += step) {
      output.push(i);
    }
    return output;
  }
  
  // shuffle an array and return a sample of a specified count
  function sample(array, count) {
    return shuffle(array).slice(0, count);
  }
  
  // Fisher–Yates shuffle
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = randint(0, i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  // like np.random.randint, returns a random integer from min (inclusive) to max (exclusive)
  function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  // like Python's zfill, pads a number with leading zeros to a specified length
  function zfill(num, length) {
    return num.toString().padStart(length, "0");
  }
  
  // like np.zeros_like, returns an array of zeros with the same length as the input array
  function zeroslike(arr) {
    if (Array.isArray(arr[0])) {
      // 2D array
      return arr.map(row => row.map(() => 0));
    } else {
      // 1D array
      return arr.map(() => 0);
    }
  }
  
  // like np.where, returns indices where the predicate is true
  function where(arr, predicate) {
    const indices = [];
    for (let i = 0; i < arr.length; i++) {
      if (predicate(arr[i], i)) indices.push(i);
    }
    return indices;
  }
  
  // like np.isin, returns a bool array indicating whether each element of the 1st array is in the 2nd array
  function isin(array, values) {
    const valueSet = new Set(values);
    return array.map(x => valueSet.has(x));
  }
  
  // returns a boolean array where each element is negated
  function negbool(boolArr) {
    return boolArr.map(b => !b);
  }
  
  // expands the indices by a specified amount (default is 1) and returns an array of indices 
  function expandselct(indices, by = 1) {
    const result = [];
    indices.forEach(i => result.push(i - by, i, i + by));
    return result;
  }
  
  // this function randomly selects an element from a population based on weights
  // if weights are zero, it will throw an error
  function weightedchoice(population, weights) {
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    if (totalWeight <= 0) throw new Error("No weights > 0");
    
    let r = Math.random() * totalWeight;
    for (let i = 0; i < population.length; i++) {
      if (weights[i] > 0) {
        if (r < weights[i]) return population[i];
        r -= weights[i];
      }
    }
    throw new Error("Choice error");
  }
  
  // takes a value and a number, and inserts the value into the list at the specified number of times
  // ensuring that the value does not repeat in the last two positions
  function sendback(value, number, lst) {
    let idx = lst.length - 2;
    for (let i = 0; i < number; i++) {
      while (lst[idx] === value || lst[idx - 1] === value) {
        idx -= 1;
      }
      lst.splice(idx, 0, value);
    }
  }
  
  // this function shuffles a population of values with a specified number of repeats
  function getsequences(nbvalues, repeats) {
    const population = range(nbvalues);
    const weights = Array(nbvalues).fill(repeats);
    const out = [];
    let prev = null;
    let oldweight;
    
    for (let i = 0; i < nbvalues * repeats; i++) {
      if (prev !== null) {
        oldweight = weights[prev];
        weights[prev] = 0;
      }
      
      let chosen;
      try {
        chosen = weightedchoice(population, weights);
      } catch (e) {
        if (e.message.includes("No weights > 0")) {
          if (window.DEBUG) {
            console.log("prev", prev);
            console.log("oldweight", oldweight);
            console.log("out", out);
          }
          //
          sendback(prev, oldweight, out);
          break;
        } else {
          throw e;
        }
      }
      
      out.push(chosen);
      weights[chosen] -= 1;
      
      if (prev !== null) {
        weights[prev] = oldweight;
      }
      prev = chosen;
    }
    
    return out;
  }
  
  // this function generates a random array of a specified length that sums to a given total
  function randarraysum(length, total, err = 1) {
    if (!Number.isInteger(length) || !Number.isInteger(total)) {
      throw new TypeError("length and total must be integers");
    }
    if (length <= 0) {
      throw new Error("Length must be positive");
    }
    
    const numPerBin = Math.floor(total / length);
    const maxVal = numPerBin + err; // maximum value for each bin
    const minVal = numPerBin - err; // minimum value for each bin
    
    if (
      length <= 0 ||
      total < length * minVal ||
      total > length * maxVal
    ) {
      return null;
    }
    
    const values = [];
    let remainingTotal = total;
    
    for (let i = 0; i < length - 1; i++) {
      let maxForThisVal = remainingTotal - ((length - 1 - i) * minVal);
      let minForThisVal = remainingTotal - ((length - 1 - i) * maxVal);
      
      minForThisVal = Math.max(minVal, minForThisVal);
      maxForThisVal = Math.min(maxVal, maxForThisVal);
      
      const val = randint(minForThisVal, maxForThisVal + 1); // +1 to make max inclusive
      values.push(val);
      remainingTotal -= val;
    }
    
    values.push(remainingTotal);
    return values;
  }
  
  function assignOneBacks({
    numPairs,
    idxByPair,
    bins,
    excluded,
    onebackArray,
    onebackPair,
    label,
    stimOneback, pairIdx1, pairIdx2,
  }) {
    for (let i = 0; i < numPairs; i++) {
      const idxPair = where(idxByPair, val => val === i);
      const binCounts = randarraysum(bins.length - 1, stimOneback);
      const onebackIdxs = [];
      
      
      for (let j = 0; j < bins.length - 1; j++) {
        const validIdx = negbool(isin(idxPair, excluded));
        const binFiltered = idxPair.filter((idx, k) => 
          validIdx[k] && bins[j] <= idx && idx < bins[j + 1]
      );
      
      if (binFiltered.length >= binCounts[j]) {
        onebackIdxs.push(...sample(binFiltered, binCounts[j]));
      } else {
        throw new Error(`No valid samples for ${label}`);
      }
    }
    
    excluded.push(...expandselct(onebackIdxs));
    const onebackIdxsShuff = shuffle(onebackIdxs);
    onebackPair.push(...onebackIdxsShuff);
    
    for (let k = 0; k < onebackIdxsShuff.length; k++) {
      onebackArray[onebackIdxsShuff[k]] = (k < stimOneback/2) ? pairIdx1 : pairIdx2;
    }
  }
  // log the number of 1-back trials per bin
  if (window.DEBUG) {
    console.log(`1-back trials assigned in ${label}:`);
    let onebackCount = [];
    bins.forEach((bin, idx) => {
      const countP1 = onebackArray.filter((val, i) => val[0] === 1 && i >= bin && i < bins[idx + 1]);
      const countP2 = onebackArray.filter((val, i) => val[1] === 1 && i >= bin && i < bins[idx + 1]);
      const count = countP1.length + countP2.length;
      onebackCount.push(count);  // store number of 1-back trials in each bin
      // store number of trials in each bin
      console.log(`Bin ${bin} (${bins[idx + 1]}): ${count} trials. 1-back P1: ${countP1.length}, 1-back P2: ${countP2.length}`);
    });
    console.log("1-back trials per bin in " + label + ": ", onebackCount);
    console.log("Total 1-back trials in " + label + ": ", onebackCount.reduce((a, b) => a + b, 0));
  }
}

// flattens the trial list and creates a oneback index list
// for the 1-back trials in the format [first, second, second] or [first, first, second]
// for the 1-back idx in the format [0, 1, 0] or [0, 0, 1] (where 1 indicates a repeat of the preceding trial)
function flat1backlist(trialList, onebackList, idList, numList) {
  const flatArr = [];
  const onebackIdx = [];
  const flatID = [];
  const flatNum = [];
  const trialData = {};
  let tCount = 0;
  let onebackCount = 0;
  
  // Helper to construct a trialData object
  function makeTrial(tId, pairTrlId, oneback, pairNum, stimFid, stimIdn, img1Fid, img2Fid, img1Idn, img2Idn, pairFid, pairIdn) {
    return {
      tId,
      pairTrlId,
      oneback,
      pairNum,
      stimFid,
      stimIdn,
      img1Fid,
      img2Fid,
      img1Idn,
      img2Idn,
      pairFid,
      pairIdn,

    };
  }
  
  for (let i = 0; i < trialList.length; i++) {
    const pairNum = numList[i];
    const pairFid = trialList[i];
    const img1Fid = pairFid[0];
    const img2Fid = pairFid[1];
    const pairIdn = idList[i].join("");
    const img1Idn = pairIdn[0];
    const img2Idn = pairIdn[1];
    const oneback = onebackList[i];
    const onebackImg1 = oneback[0];
    const onebackImg2 = oneback[1];
    
    if (window.DEBUG) {
      console.log(`${zfill(i+1,3)}) ${pairIdn} pair:\t ${img1Idn}: stim=${img1Fid}, 1-back=${onebackImg1}\t ${img2Idn}: stim=${img2Fid}, 1-back=${onebackImg2}`);
    }
    if (onebackImg1 === 1) {
      onebackCount++;
      flatArr.push(img1Fid, img1Fid, img2Fid);
      onebackIdx.push(0, 1, 0);
      flatID.push(img1Idn, img1Idn, img2Idn);
      flatNum.push(pairNum, pairNum, pairNum);
      trialData[tCount++] = makeTrial(tCount, "1/3", false, pairNum, img1Fid, img1Idn, img1Fid, img2Fid, img1Idn, img2Idn, pairFid, pairIdn);
      trialData[tCount++] = makeTrial(tCount, "2/3", true,  pairNum, img1Fid, img1Idn, img1Fid, img2Fid, img1Idn, img2Idn, pairFid, pairIdn);
      trialData[tCount++] = makeTrial(tCount, "3/3", false, pairNum, img2Fid, img2Idn, img1Fid, img2Fid, img1Idn, img2Idn, pairFid, pairIdn);
    } 
    else if (onebackImg2 === 1) {
      onebackCount++;
      flatArr.push(img1Fid, img2Fid, img2Fid);
      onebackIdx.push(0, 0, 1);
      flatID.push(img1Idn, img2Idn, img2Idn);
      flatNum.push(pairNum, pairNum, pairNum);
      trialData[tCount++] = makeTrial(tCount, "1/3", false, pairNum, img1Fid, img1Idn, img1Fid, img2Fid, img1Idn, img2Idn, pairFid, pairIdn);
      trialData[tCount++] = makeTrial(tCount, "2/3", false, pairNum, img2Fid, img2Idn, img1Fid, img2Fid, img1Idn, img2Idn, pairFid, pairIdn);
      trialData[tCount++] = makeTrial(tCount, "3/3", true,  pairNum, img2Fid, img2Idn, img1Fid, img2Fid, img1Idn, img2Idn, pairFid, pairIdn);
    } 
    else {
      flatArr.push(img1Fid, img2Fid);
      onebackIdx.push(0, 0);
      flatNum.push(pairNum, pairNum);
      flatID.push(img1Idn, img2Idn);
      trialData[tCount++] = makeTrial(tCount, "1/2", false, pairNum, img1Fid, img1Idn, img1Fid, img2Fid, img1Idn, img2Idn, pairFid, pairIdn);
      trialData[tCount++] = makeTrial(tCount, "2/2", false, pairNum, img2Fid, img2Idn, img1Fid, img2Fid, img1Idn, img2Idn, pairFid, pairIdn);
    }
  }
  return { trials: flatArr, onebacks: onebackIdx, ids: flatID, trialData, pairNum: flatNum };
}


// generates a unique order of elements in list1 such that no element is in the same position as in list1
// used for generating foil image pairs in the test phase
function generateUniqueOrder(list1) {
  const list2 = shuffle(list1);
  for (let i = 0; i < list2.length; i++) {
    if (list2[i] === list1[i]) {
      for (let j = 0; j < list2.length; j++) {
        if (
          j !== i &&
          list2[j] !== list1[i] &&
          list2[i] !== list1[j]
        ) {
          [list2[i], list2[j]] = [list2[j], list2[i]];
          break;
        }
      }
    }
  }
  return list2;
}