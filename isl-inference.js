// initialize jsPsych
var jsPsych = initJsPsych();

// create timeline
var timeline = [];

// prolific URL
// const URLPROLIFIC = "https://app.prolific.co/submissions/complete?cc=YOUR_CODE_HERE";

// experiment parameters
let expName = 'inmix-sl-inference';  // from the Builder filename that created this script
const SUBDATA = {}; //empty data array 

// define welcome message trial
var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press the space bar to begin!",
    choices: ['space'] 
};
timeline.push(welcome);
 

// start the experimentswitching between 
jsPsych.run(timeline);


