/**
 * Statistical Learning Experiment Utilities
 * This module provides functions for handling stimulus sampling, randomization,
 * and 1-back trial generation for statistical learning experiments.
 * 
 * @module accessories
 */

/**
 * ========================================================================
 * @function getStimSample
 * ========================================================================
 * Gets a sample of stimuli and generates trial sequences for the experiment
 * @param {number} nImg - Total number of available images
 * @param {number} nStim - Number of stimuli to sample
 * @param {number} grps - Number of groups to create
 * @param {number} rep - Number of repetitions for each stimulus
 * @returns {Object} Object containing stimulus data and trial sequences
 */
export function getStimSample(nImg, nStim, grps, rep) {

  // validate input parameters
  if (nStim > nImg) {
      throw new Error("Cannot sample more stimuli than available images");
  }
  if (nStim % grps !== 0) {
      throw new Error("Number of stimuli must be divisible by number of groups");
  }
  const imgDir = "img/";                                  // directory where images are stored
  const imgPfx = "stim_";                                 // prefix for image filenames
  const imgSfx = ".png";                                  // suffix for image filenames
  const prop1back = 0.10;                                 // prortion of trials that are 1-back trials
  const nBins = 5;                                        // number of bins for distributing 1-back trials
  const stimOneback = rep * prop1back * 2;                // number of 1-back trials for a stimulus
  const nPairsVisStm1 = grps * 2;                         // number of groups in the 1st visual stream
  const nPairsVisStm2 = grps;                             // number of groups in the 2nd visual stream
  const pairRepsVisStm1 = nPairsVisStm1 * rep;            // total number of trials in the 1st visual stream
  const pairRepsVisStm2 = nPairsVisStm2 * rep;            // total number of trials in the 2nd visual stream
  const pairTrlsVisStm1 = pairRepsVisStm1 * 2;            // total number of paired trials in the 1st visual stream
  const pairTrlsVisStm2 = pairRepsVisStm2 * 2;            // total number of paired trials in the 2nd visual stream
  const n1backVisStm1 = pairTrlsVisStm1 * prop1back;      // total number of 1-back trials in the 1st visual stream
  const n1backVisStm2 = pairTrlsVisStm2 * prop1back;      // total number of 1-back trials in the 2nd visual stream
  const nTrialsVisStm1 = pairTrlsVisStm1 + n1backVisStm1; // total number of trials in the 1st visual stream
  const nTrialsVisStm2 = pairTrlsVisStm2 + n1backVisStm2; // total number of trials in the 2nd visual stream
  const binsVisStm1 = getbins(pairRepsVisStm1, nBins);    // bins for distributing 1-backs in AB-CD visual stream
  const binsVisStm2 = getbins(pairRepsVisStm2, nBins);    // bins for distributing 1-backs in BC visual stream
  const pairIdx1 = [1, 0];                                // 1-back trial indices for the 1st image in the pair
  const pairIdx2 = [0, 1];                                // 1-back trial indices for the 2nd image in the pair
  let array = range(nImg + 1, 1);
  let imgid = sample(array, nStim);
  let fractIDs = [];
  let fractObj = {};
  let fractGrps = [];
  const groupSize = Math.floor(nStim / grps);
  // log the number of images and groups


  // initialize output arrays for pairs and trial lists
  const pairsAB = [];
  const pairsBC = [];
  const pairsCD = [];
  const pairsAC = [];
  const pairsBD = [];
  const pairsAD = [];
  const pairsVisStm1 = [];
  const IDsVisStm1 = [];
  const pairsVisStm2 = [];
  const IDsVisStm2 = [];
  let listArrayVisStm1, listIDsVisStm1, listArrayVisStm2, listIDsVisStm2;
  let list1BackVisStm1, list1BackVisStm2;
  let grp1BackVisStm1, grp1BackVisStm2;

  // log the experiment parameters
  console.log(
      "Experiment parameters: \n"
      + "=> " + nImg + "\ttotal number of images available\n"
      + "=> " + nStim + "\timgs sampled from " + nImg + " imgs\n"
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
    + zfill(nTrialsVisStm1, 4) + "\ttrials in stream 1:  " + pairTrlsVisStm1 + " pair trials  +  " + n1backVisStm1 + " 1-back trials\n"
    + zfill(nTrialsVisStm2, 4) + "\ttrials in stream 2:  " + pairTrlsVisStm2 + " pair trials  +  " + n1backVisStm2 + " 1-back trials\n"
  );

  console.log(
    "Bins for 1-back trials in AB-CD stream: \t" + binsVisStm1 + "\n" + 
    "Bins for 1-back trials in BC stream: \t\t" + binsVisStm2
  );

  // create image objects and IDs
  for (let i = 0; i < imgid.length; i++) {
      let num = imgid[i];
      let curr_num = zfill(num, 3);
      fractIDs.push(curr_num);

      let imagePath = `${imgDir}${imgPfx}${curr_num}${imgSfx}`;
      let img = new Image();
      img.src = imagePath;
      img.id = `stim_${curr_num}`;
      fractObj[curr_num] = img;
  }

  // create groups of fractal IDs
  for (const i of range(nStim, 0, groupSize)) {
      fractGrps.push(fractIDs.slice(i, i + groupSize));
  }

  // get pairs of images and pair ids for stimulus groups
  for (let i = 0; i < fractGrps.length; i++) {
      const currGrp = fractGrps[i];
      pairsAB.push([currGrp[0], currGrp[1]]);
      pairsBC.push([currGrp[1], currGrp[2]]);
      pairsCD.push([currGrp[2], currGrp[3]]);
      pairsAC.push([currGrp[0], currGrp[2]]);
      pairsBD.push([currGrp[1], currGrp[3]]);
      pairsAD.push([currGrp[0], currGrp[3]]);
      pairsVisStm1.push([currGrp[0], currGrp[1]]);
      IDsVisStm1.push(["A", "B"]);
      pairsVisStm1.push([currGrp[2], currGrp[3]]);
      IDsVisStm1.push(["C", "D"]);
      pairsVisStm2.push([currGrp[1], currGrp[2]]);
      IDsVisStm2.push(["B", "C"]);
  }

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
  let { trials: trialsVisStm1, onebacks: trials1BackVisStm1, ids: trialIDsVisStm1, trialData: trialDataVisStm1 } = flat1backlist(listArrayVisStm1, list1BackVisStm1, listIDsVisStm1);
  let { trials: trialsVisStm2, onebacks: trials1BackVisStm2, ids: trialIDsVisStm2, trialData: trialDataVisStm2 } = flat1backlist(listArrayVisStm2, list1BackVisStm2, listIDsVisStm2);

  return { 
    fractIDs, fractObj, 
    pairsVisStm1, IDsVisStm1, pairsVisStm2, IDsVisStm2,
    trialsVisStm1, trials1BackVisStm1, trialIDsVisStm1, trialDataVisStm1,
    trialsVisStm2, trials1BackVisStm2, trialIDsVisStm2, trialDataVisStm2,
    listArrayVisStm1, list1BackVisStm1, listArrayVisStm2, list1BackVisStm2, 
  };
}


// All the following functions are helper functions for the main function above

// function like np.linspace but excluding first and last elements
function getbins(end, num) {
  const start = 1;    // start at 1 because we do not want the first trial to be a 1-back trial
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
export function zfill(num, length) {
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
// exam
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
}

// flattens the trial list and creates a oneback index list
// for the 1-back trials in the format [first, second, second] or [first, first, second]
// for the 1-back idx in the format [0, 1, 0] or [0, 0, 1] (where 1 indicates a repeat of the preceding trial)
function flat1backlist(trialList, onebackList, idList) {
  const flatArr = [];
  const onebackIdx = [];
  const flatID = [];
  const trialData = {};
  let tCount = 0;


  for (let i = 0; i < trialList.length; i++) {
      const pair = trialList[i];
      const first = pair[0];
      const second = pair[1];
      const pairID = idList[i].join("");
      const firstID = pairID[0];
      const secondID = pairID[1];
      const oneback = onebackList[i];
      const first1back = oneback[0];
      const second1back = oneback[1];

      if (window.DEBUG) {
        console.log(`${zfill(i+1,3)}) ${pairID} pair:\t ${firstID}: stim=${first}, 1-back=${first1back}\t ${secondID}: stim=${second}, 1-back=${second1back}`);
      }

      if (first1back === 1) {
          flatArr.push(first, first, second);
          onebackIdx.push(0, 1, 0);
          flatID.push(firstID, firstID, secondID);
          trialData[tCount] = {
              tId: tCount+1,
              is1Back: false,
              expoCond: pairID,
              stimFid: first,
              stimIdn: firstID,
              pairFid: second,
              pairIdn: secondID,
          };
          tCount++;
          trialData[tCount] = {
              tId: tCount+1,
              is1Back: true,
              expoCond: pairID,
              stimFid: first,
              stimIdn: firstID,
              pairFid: second,
              pairIdn: secondID,
            };
            tCount++;
            trialData[tCount] = {
              tId: tCount+1,
              is1Back: false,
              expoCond: pairID,
              stimFid: second,
              stimIdn: secondID,
              pairFid: first,
              pairIdn: firstID,
            };
            tCount++;
      } else if (second1back === 1) {
          flatArr.push(first, second, second);
          onebackIdx.push(0, 0, 1);
          flatID.push(firstID, secondID, secondID);
          trialData[tCount] = {
            tId: tCount+1,
            is1Back: false,
            expoCond: pairID,
            stimFid: first,
            stimIdn: firstID,
            pairFid: second,
            pairIdn: secondID,
          };
          tCount++;
          trialData[tCount] = {
            tId: tCount+1,
            is1Back: false,
            expoCond: pairID,
            stimFid: second,
            stimIdn: secondID,
            pairFid: first,
            pairIdn: firstID,
          };
          tCount++;
          trialData[tCount] = {
            tId: tCount+1,
            is1Back: true,
            expoCond: pairID,
            stimFid: second,
            stimIdn: secondID,
            pairFid: first,
            pairIdn: firstID,
          };
          tCount++;
      } else {
      // No 1-back trial
      flatArr.push(first, second);
      onebackIdx.push(0, 0);
      flatID.push(firstID, secondID);
      trialData[tCount] = {
        tId: tCount+1,
        is1Back: false,
        expoCond: pairID,
        stimFid: first,
        stimIdn: firstID,
        pairFid: second,
        pairIdn: secondID,
      };
      tCount++;
      trialData[tCount] = {
        tId: tCount+1,
        is1Back: false,
        expoCond: pairID,
        stimFid: second,
        stimIdn: secondID,
        pairFid: first,
        pairIdn: firstID,
      };
      tCount++;
    }
  }
  return { trials: flatArr, onebacks: onebackIdx, ids: flatID, trialData };
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



// Fisher-Yates shuffle function
// function shuffleArray(array) {
//     let swapTo = array.length;  // index of position to swap to
//     let swapFrom = null;        // index of element randomly selected to swap
//     let temp = null;            // holds a value for changing assignment
//     // work back to front, swapping with random unswapped (earlier) elements
//     while (swapTo > 0) {
//         // pick an (unswapped) element from the back
//         swapFrom = Math.floor(Math.random() * swapTo--);
//         // swap it with the current element
//         temp = array[swapTo];
//         array[swapTo] = array[swapFrom];
//         array[swapFrom] = temp;
//     }
// }


