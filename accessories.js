// This javascript file contain the code to handle constraints and randomization of image streams for the experiment.

// Fisher-Yates shuffle function
export function shuffleArray(array) {
    let swapTo = array.length;  // index of position to swap to
    let swapFrom = null;        // index of element randomly selected to swap
    let temp = null;            // holds a value for changing assignment
    // work back to front, swapping with random unswapped (earlier) elements
    while (swapTo > 0) {
        // pick an (unswapped) element from the back
        swapFrom = Math.floor(Math.random() * swapTo--);
        // swap it with the current element
        temp = array[swapTo];
        array[swapTo] = array[swapFrom];
        array[swapFrom] = temp;
    }
}

// function like np.linspace but excluding first and last elements
export function getNBackDistr(end, num) {
    const start = 1;    // start at 1 because we do not want the first trial to be a one-back trial
    const result = [];
    const step = (end - start) / (num - 1);

    for (let i = 0; i < num; i++) {
        const val = start + i * step;
        result.push(Math.floor(val)); // truncate like Python's int()
    }

    // Subtract 2 from the last element
    result[result.length - 1] -= 2;     // subtract 2 because of zero-based indexing and to ensure the last trial is not a one-back trial

    return result;
}


//const { fractIDs, fractObj } = getStimSample(NUM_IMGS, NUM_STIM);
export function getStimSample(n, count, grps, rep) {
    let array = range(n + 1, 1);
    let imgid = sample(array, count);
    let fractIDs = [];
    let fractObj = {};


    const PROP_1BACK = 0.10;                        // prortion of trials that are one-back trials
    const stim_1back = rep * PROP_1BACK;       // number of one-back trials for a stimulus
    //const PAIR_1BACK = STIM_1BACK * 2;              // number of one-back trials for a pair in a group
    const ABCD1backBins = getNBackDistr((grps * count * 2), 5); // bins for distributing one-back trials, 5 bins from 1 to count
    const BC1backBins = getNBackDistr((grps * count), 5); // bins for distributing one-back trials, 5 bins from 1 to count

    for (let i = 0; i < imgid.length; i++) {
        let num = imgid[i];
        let curr_num = zfill(num, 3);
        fractIDs.push(curr_num);

        let imagePath = `img/stim_${curr_num}.png`;
        let img = new Image();
        img.src = imagePath;

        // If you want to save the Image element:
        fractObj[curr_num] = img;
    }

    let fractGroups = [];
    const groupSize = Math.floor(count / grps);
    for (const i of range(count, 0, groupSize)) {
        fractGroups.push(fractIDs.slice(i, i + groupSize));
    }

    //BINS_1BACK = getNBackDistr(NUM_TRLS, 5);  // bins for distributing one-back trials, 5 bins from 1 to NUM_TRLS     
    var imgA1back = [1, 0];
    var imgB1back = [0, 1];

    var grpsABCD = grps * 2; // total number of pairs in a group (AB, BC, CD, AC, BD, AD, ABCD)
    var grpsBC = grps; // number of pairs in a group (BC)
    
    // Now create the pairwise structures
    const ABpairs = [];
    const BCpairs = [];
    const CDpairs = [];
    const ACpairs = [];
    const BDpairs = [];
    const ADpairs = [];
    const ABCDpairs = [];
    let trialListABCD = [];
    let trialListBC = [];
    let onebackListAB = [];
    let onebackListBC = [];

    for (let i = 0; i < fractGroups.length; i++) {
        const currGrp = fractGroups[i];
        ABpairs.push([currGrp[0], currGrp[1]]);
        BCpairs.push([currGrp[1], currGrp[2]]);
        CDpairs.push([currGrp[2], currGrp[3]]);
        ACpairs.push([currGrp[0], currGrp[2]]);
        BDpairs.push([currGrp[1], currGrp[3]]);
        ADpairs.push([currGrp[0], currGrp[3]]);
        ABCDpairs.push([currGrp[0], currGrp[1]]);
        ABCDpairs.push([currGrp[2], currGrp[3]]);
    }

    let success = false;
    while (!success) {
        const indexABCD = shuffleWithoutRepeats(grpsABCD, rep);
        const indexBC = shuffleWithoutRepeats(grpsBC, rep);
   
        trialListABCD = indexABCD.map(i => ABCDpairs[i]);
        trialListBC = indexBC.map(i => BCpairs[i]);

        onebackListAB = zerosLike(trialListABCD);
        onebackListBC = zerosLike(trialListBC);

        const group1backABCD = [];
        const group1backBC = [];

        let exclude1backABCD = [];
        let exclude1backBC = [];



        try {
            for (let i = 0; i < grpsABCD; i++) {
                const idxABCD = where(indexABCD, val => val === i);
                const ABCDbins = randomArraySum(ABCD1backBins.length - 1, ABCD1backBins.length - 1, 0, 2);
                const onebackABCD = [];

                for (let j = 0; j < ABCD1backBins.length - 1; j++) {
                    const ABCDindices = negateBoolArray(isin(idxABCD, exclude1backABCD));
                    const ABCDbinIdx = idxABCD.filter((idx, k) => ABCDindices[k] && ABCD1backBins[j] <= idx && idx < ABCD1backBins[j + 1]);

                    if (ABCDbinIdx.length >= ABCDbins[j]) {
                        onebackABCD.push(...sample(ABCDbinIdx, ABCDbins[j]));
                    } else {
                        throw new Error("No valid samples for ABCD");
                    }
                }

                exclude1backABCD.push(...expandExclusion(onebackABCD));

                shuffle(onebackABCD);

                group1backABCD.push(...onebackABCD);
                for (let k = 0; k < onebackABCD.length; k++) {
                    const idx = onebackABCD[k];
                    onebackListAB[idx] = (k < stim_1back) ? imgA1back : imgB1back;
                }
            }

            for (let i = 0; i < grpsBC; i++) {
                const idxBC = where(indexBC, val => val === i);
                const BCbins = randomArraySum(BC1backBins.length - 1, BC1backBins.length - 1, 0, 2);
                const onebackBC = [];

                for (let j = 0; j < BC1backBins.length - 1; j++) {
                    const BCindices = negateBoolArray(isin(idxBC, exclude1backBC));
                    const BCbinIdx = idxBC.filter((idx, k) => BCindices[k] && BC1backBins[j] <= idx && idx < BC1backBins[j + 1]);

                    if (BCbinIdx.length >= BCbins[j]) {
                        onebackBC.push(...sample(BCbinIdx, BCbins[j]));
                    } else {
                        throw new Error("No valid samples for BC");
                    }
                }        
                exclude1backBC.push(...expandExclusion(onebackBC));
                shuffle(onebackBC);
                group1backBC.push(...onebackBC);
            
                for (let k = 0; k < onebackBC.length; k++) {
                    const idx = onebackBC[k];
                    onebackListBC[idx] = (k < stim_1back) ? imgA1back : imgB1back;
                }
            }

            success = true;
        } catch (e) {
            console.log("Restarting due to error:", e.message);
        }
    }

    return { fractIDs, fractObj, ABpairs, BCpairs, CDpairs, ACpairs, BDpairs, ADpairs, ABCDpairs, trialListABCD, trialListBC, onebackListAB, onebackListBC };
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

// Zero-fill a number to a specified length
function zfill(num, length) {
  return num.toString().padStart(length, "0");
}

// Random int from min (inclusive) to max (exclusive)
function randint(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function zerosLike(arr) {
    return new Array(arr.length).fill(0);
}

function where(arr, predicate) {
    const indices = [];
    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i)) indices.push(i);
    }
    return indices;
}

function isin(array, values) {
    const valueSet = new Set(values);
    return array.map(x => valueSet.has(x));
}

function negateBoolArray(boolArr) {
    return boolArr.map(b => !b);
}

function sample(array, count) {
    return shuffle(array).slice(0, count);
}

function expandExclusion(indices) {
    const result = [];
    indices.forEach(i => result.push(i - 1, i, i + 1));
    return result;
}

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

function sendback(value, number, lst) {
  let idx = lst.length - 2;
  for (let i = 0; i < number; i++) {
    while (lst[idx] === value || lst[idx - 1] === value) {
      idx -= 1;
    }
    lst.splice(idx, 0, value);
  }
}


export function shuffleWithoutRepeats(nb_values, repeats) {
  const population = range(nb_values);
  const weights = Array(nb_values).fill(repeats);
  const out = [];
  let prev = null;
  let old_weight;

  for (let i = 0; i < nb_values * repeats; i++) {
    if (prev !== null) {
      old_weight = weights[prev];
      weights[prev] = 0;
    }

    let chosen;
    try {
      chosen = weightedchoice(population, weights);
    } catch (e) {
      if (e.message.includes("No weights > 0")) {
        console.log("prev", prev);
        console.log("old_weight", old_weight);
        console.log("out", out);
        sendback(prev, old_weight, out);
        break;
      } else {
        throw e;
      }
    }

    out.push(chosen);
    weights[chosen] -= 1;

    if (prev !== null) {
      weights[prev] = old_weight;
    }
    prev = chosen;
  }

  return out;
}

function makeUniqueList(list1) {
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


function randomArraySum(length, total, minVal, maxVal) {
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


