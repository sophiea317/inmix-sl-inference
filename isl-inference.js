// initialize jsPsych
var jsPsych = initJsPsych();

// create timeline
var timeline = [];

// prolific URL
const URLPROLIFIC = "https://app.prolific.co/submissions/complete?cc=YOUR_CODE_HERE";

// experiment parameters
const SUBDATA = {}; //empty data array



// define welcome message trial
var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press any key to begin."
};
timeline.push(welcome);


// start the experiment
jsPsych.run(timeline);


