// This javascript file contain the code to handle constraints and randomization of image streams for the experiment.


// Main function to get the stimulus sample
export function getStimSample(nImg, nStim, grps, rep) {
    const imgDir = "img/";                                // directory where images are stored
    const imgPfx = "stim_";                               // prefix for image filenames
    const imgSfx = ".png";                                // suffix for image filenames
    const prop1back = 0.10;                               // prortion of trials that are 1-back trials
    const nBins = 5;                                      // number of bins for distributing 1-back trials
    const stim1back = rep * prop1back;                    // number of 1-back trials for a stimulus
    const grpsVisStm1 = grps * 2;                         // number of groups in the 1st visual stream
    const grpsVisStm2 = grps;                             // number of groups in the 2nd visual stream
    const tNumVisStm1 = grps * nStim * 2;                 // total number of trials in the 1st visual stream 
    const tNumVisStm2 = grps * nStim;                     // total number of trials in the 2nd visual stream 
    const binsVisStm1 = getbins(tNumVisStm1, nBins);   // bins for distributing 1-backs in AB-CD visual stream
    const binsVisStm2 = getbins(tNumVisStm2, nBins);   // bins for distributing 1-backs in BC visual stream
    const onebackIdx1 = [1, 0];                           // 1-back trial indices for the 1st image in the pair
    const onebackIdx2 = [0, 1];                           // 1-back trial indices for the 2nd image in the pair
    let array = range(nImg + 1, 1);
    let imgid = sample(array, nStim);
    let fractIDs = [];
    let fractObj = {};
    let fractGrps = [];
    const groupSize = Math.floor(nStim / grps);
    console.log("imgid: " + imgid);

    // log the experiment parameters
    console.log(
        "Experiment parameters: \n"
        + "=> " + nStim + "\timgs sampled from " + nImg + " imgs\n"
        + "=> " + grps + "\tAB-BC-CD groups\n"
        + "=> " + rep + "\tstimulus reps during exposure\n"
        + "=> " + prop1back * 100 + "%\tof trials will be 1-back trials\n"
        + "=> " + stim1back + "\t1-back trials for each stimulus\n"
        + "=> " + tNumVisStm1 + "\ttotal trials in the AB-CD vis stream\n"
        + "=> " + tNumVisStm2 + "\ttotal trials in the BC vis stream\n"
        + "=> " + binsVisStm1 + "\tbins for distributing 1-back trials in AB-CD vis stream\n"
        + "=> " + binsVisStm2 + "\t\tbins for distributing 1-back trials in BC vis stream\n"
    );

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

    
    

    // range(n, start = 0, step = 1)
    for (const i of range(nStim, 0, groupSize)) {
        fractGrps.push(fractIDs.slice(i, i + groupSize));
    }
    //BINS_1BACK = getNBackDistr(NUM_TRLS, 5);  // bins for distributing 1-back trials, 5 bins from 1 to NUM_TRLS     




    
    // Now create the pairwise structures
    const ABpairs = [];
    const BCpairs = [];
    const CDpairs = [];
    const ACpairs = [];
    const BDpairs = [];
    const ADpairs = [];
    const ABCDpairs = [];
    const ABCDpairID = [];
    let trialListABCD = [];
    let trialListBC = [];
    let onebackListABCD = [];
    let onebackListBC = [];

    for (let i = 0; i < fractGrps.length; i++) {
        const currGrp = fractGrps[i];
        ABpairs.push([currGrp[0], currGrp[1]]);
        BCpairs.push([currGrp[1], currGrp[2]]);
        CDpairs.push([currGrp[2], currGrp[3]]);
        ACpairs.push([currGrp[0], currGrp[2]]);
        BDpairs.push([currGrp[1], currGrp[3]]);
        ADpairs.push([currGrp[0], currGrp[3]]);
        ABCDpairs.push([currGrp[0], currGrp[1]]);
        ABCDpairID.push(["AB"]);
        ABCDpairs.push([currGrp[2], currGrp[3]]);
        ABCDpairID.push(["CD"]);
    }

    let success = false;
    while (!success) {
        const indexABCD = getsequences(grpsVisStm1, rep);
        const indexBC = getsequences(grpsVisStm2, rep);
   
        trialListABCD = indexABCD.map(i => ABCDpairs[i]);
        trialListBC = indexBC.map(i => BCpairs[i]);

        onebackListABCD = zeroslike(trialListABCD);
        onebackListBC = zeroslike(trialListBC);

        const group1backABCD = [];
        const group1backBC = [];

        let exclude1backABCD = [];
        let exclude1backBC = [];



        try {
            for (let i = 0; i < grpsVisStm1; i++) {
                const idxABCD = where(indexABCD, val => val === i);
                const ABCDbins = randarraysum(binsVisStm1.length - 1, binsVisStm1.length - 1, 0, 2);
                const onebackABCD = [];

                for (let j = 0; j < binsVisStm1.length - 1; j++) {
                    const ABCDindices = negbool(isin(idxABCD, exclude1backABCD));
                    const ABCDbinIdx = idxABCD.filter((idx, k) => ABCDindices[k] && binsVisStm1[j] <= idx && idx < binsVisStm1[j + 1]);

                    if (ABCDbinIdx.length >= ABCDbins[j]) {
                        onebackABCD.push(...sample(ABCDbinIdx, ABCDbins[j]));
                    } else {
                        throw new Error("No valid samples for ABCD");
                    }
                }

                exclude1backABCD.push(...expandselct(onebackABCD));

                shuffle(onebackABCD);

                group1backABCD.push(...onebackABCD);
                for (let k = 0; k < onebackABCD.length; k++) {
                    const idx = onebackABCD[k];
                    onebackListABCD[idx] = (k < stim1back) ? onebackIdx1 : onebackIdx2;
                }
            }

            for (let i = 0; i < grpsVisStm2; i++) {
                const idxBC = where(indexBC, val => val === i);
                const BCbins = randarraysum(binsVisStm2.length - 1, binsVisStm2.length - 1, 0, 2);
                const onebackBC = [];

                for (let j = 0; j < binsVisStm2.length - 1; j++) {
                    const BCindices = negbool(isin(idxBC, exclude1backBC));
                    const BCbinIdx = idxBC.filter((idx, k) => BCindices[k] && binsVisStm2[j] <= idx && idx < binsVisStm2[j + 1]);

                    if (BCbinIdx.length >= BCbins[j]) {
                        onebackBC.push(...sample(BCbinIdx, BCbins[j]));
                    } else {
                        throw new Error("No valid samples for BC");
                    }
                }        
                exclude1backBC.push(...expandselct(onebackBC));
                shuffle(onebackBC);
                group1backBC.push(...onebackBC);
            
                for (let k = 0; k < onebackBC.length; k++) {
                    const idx = onebackBC[k];
                    onebackListBC[idx] = (k < stim1back) ? onebackIdx1 : onebackIdx2;
                }
            }

            success = true;
        } catch (e) {
            console.log("Restarting due to error:", e.message);
        }
    }
    let { trialsABCD, boolABCD } = flat1backlist(trialListABCD, onebackListABCD);
    //trialListABCD = flattenTrialList(trialListABCD)

    return { 
      fractIDs, fractObj, 
      ABpairs, BCpairs, CDpairs, ABCDpairs, 
      trialListABCD, trialListBC, 
      onebackListABCD, onebackListBC,
      trialsABCD, boolABCD,
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

// Fisher–Yates shuffle
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = randint(0, i + 1);
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
    // for (let i = array.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [array[i], array[j]] = [array[j], array[i]];
    // }
    // return array;
}

// shuffle an array and return a sample of a specified count
function sample(array, count) {
    return shuffle(array).slice(0, count);
}

// like Python's zfill, pads a number with leading zeros to a specified length
function zfill(num, length) {
  return num.toString().padStart(length, "0");
}

// like np.random.randint, returns a random integer from min (inclusive) to max (exclusive)
function randint(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// like np.zeros_like, returns an array of zeros with the same length as the input array
function zeroslike(arr) {
    return new Array(arr.length).fill(0);
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
        //console.log("prev", prev); console.log("old_weight", old_weight);console.log("out", out);
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
function randarraysum(length, total, minVal, maxVal) {
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

// flattens the trial list and creates a oneback index list
// for the 1-back trials in the format [first, second, second] or [first, first, second]
// for the 1-back idx in the format [0, 1, 0] or [0, 0, 1] (where 1 indicates a repeat of the preceding trial)
function flat1backlist(trialList, onebackList) {
    const flatArr = [];
    const onebackIdx = [];

    for (let i = 0; i < trialList.length; i++) {
        const pair = trialList[i];
        const oneback = onebackList[i];

        const first = pair[0];
        const second = pair[1];

        if (Array.isArray(oneback)) {
            if (oneback[0] === 1) {
                flatArr.push(first, first, second);
                onebackIdx.push(0, 1, 0);
            } else if (oneback[1] === 1) {
                flatArr.push(first, second, second);
                onebackIdx.push(0, 0, 1);
            } else {
                flatArr.push(first, second);
                onebackIdx.push(0, 0);
            }
        } else {
            // No 1-back trial
            flatArr.push(first, second);
            onebackIdx.push(0, 0);
        }
    }

    return { trialsABCD: flatArr, boolABCD: onebackIdx };
}

// generates a unique order of elements in list1 such that no element is in the same position as in list1
// used for generating foil image pairs in the test phase
function generateUniqueOrder(list1) {
  const list2 = [...list1];
  shuffle(list2);

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


