#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2024.1.5),
    on Wed Jun 18 13:14:02 2025
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
from psychopy import plugins
plugins.activatePlugins()
prefs.hardware['audioLib'] = 'ptb'
prefs.hardware['audioLatencyMode'] = '3'
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout, hardware
from psychopy.tools import environmenttools
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER, priority)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

import psychopy.iohub as io
from psychopy.hardware import keyboard

# Run 'Before Experiment' code from setup_code
import random
# --- Setup global variables (available in all functions) ---
# create a device manager to handle hardware (keyboards, mice, mirophones, speakers, etc.)
deviceManager = hardware.DeviceManager()
# ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
# store info about the experiment session
psychopyVersion = '2024.1.5'
expName = 'inmix-sl-inference'  # from the Builder filename that created this script
# information about this experiment
expInfo = {
    'participant': f"{randint(0, 999999):06.0f}",
    'session': '001',
    'exposure': [1, 2],
    'test': [1, 2],
    'date|hid': data.getDateStr(),
    'expName|hid': expName,
    'psychopyVersion|hid': psychopyVersion,
}

# --- Define some variables which will change depending on pilot mode ---
'''
To run in pilot mode, either use the run/pilot toggle in Builder, Coder and Runner, 
or run the experiment with `--pilot` as an argument. To change what pilot 
#mode does, check out the 'Pilot mode' tab in preferences.
'''
# work out from system args whether we are running in pilot mode
PILOTING = core.setPilotModeFromArgs()
# start off with values from experiment settings
_fullScr = True
_winSize = [1920, 1080]
_loggingLevel = logging.getLevel('warning')
# if in pilot mode, apply overrides according to preferences
if PILOTING:
    # force windowed mode
    if prefs.piloting['forceWindowed']:
        _fullScr = False
        # set window size
        _winSize = prefs.piloting['forcedWindowSize']
    # override logging level
    _loggingLevel = logging.getLevel(
        prefs.piloting['pilotLoggingLevel']
    )

def showExpInfoDlg(expInfo):
    """
    Show participant info dialog.
    Parameters
    ==========
    expInfo : dict
        Information about this experiment.
    
    Returns
    ==========
    dict
        Information about this experiment.
    """
    # show participant info dialog
    dlg = gui.DlgFromDict(
        dictionary=expInfo, sortKeys=False, title=expName, alwaysOnTop=True
    )
    if dlg.OK == False:
        core.quit()  # user pressed cancel
    # return expInfo
    return expInfo


def setupData(expInfo, dataDir=None):
    """
    Make an ExperimentHandler to handle trials and saving.
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    dataDir : Path, str or None
        Folder to save the data to, leave as None to create a folder in the current directory.    
    Returns
    ==========
    psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    """
    # remove dialog-specific syntax from expInfo
    for key, val in expInfo.copy().items():
        newKey, _ = data.utils.parsePipeSyntax(key)
        expInfo[newKey] = expInfo.pop(key)
    
    # data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
    if dataDir is None:
        dataDir = _thisDir
    filename = u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])
    # make sure filename is relative to dataDir
    if os.path.isabs(filename):
        dataDir = os.path.commonprefix([dataDir, filename])
        filename = os.path.relpath(filename, dataDir)
    
    # an ExperimentHandler isn't essential but helps with data saving
    thisExp = data.ExperimentHandler(
        name=expName, version='',
        extraInfo=expInfo, runtimeInfo=None,
        originPath='/Users/sophieallen/repos/inmix-sl-inference/inmix-sl-inference.py',
        savePickle=True, saveWideText=True,
        dataFileName=dataDir + os.sep + filename, sortColumns='time'
    )
    thisExp.setPriority('thisRow.t', priority.CRITICAL)
    thisExp.setPriority('expName', priority.LOW)
    # return experiment handler
    return thisExp


def setupLogging(filename):
    """
    Setup a log file and tell it what level to log at.
    
    Parameters
    ==========
    filename : str or pathlib.Path
        Filename to save log file and data files as, doesn't need an extension.
    
    Returns
    ==========
    psychopy.logging.LogFile
        Text stream to receive inputs from the logging system.
    """
    # this outputs to the screen, not a file
    logging.console.setLevel(_loggingLevel)
    # save a log file for detail verbose info
    logFile = logging.LogFile(filename+'.log', level=_loggingLevel)
    
    return logFile


def setupWindow(expInfo=None, win=None):
    """
    Setup the Window
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    win : psychopy.visual.Window
        Window to setup - leave as None to create a new window.
    
    Returns
    ==========
    psychopy.visual.Window
        Window in which to run this experiment.
    """
    if PILOTING:
        logging.debug('Fullscreen settings ignored as running in pilot mode.')
    
    if win is None:
        # if not given a window to setup, make one
        win = visual.Window(
            size=_winSize, fullscr=_fullScr, screen=0,
            winType='pyglet', allowStencil=False,
            monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
            backgroundImage='', backgroundFit='none',
            blendMode='avg', useFBO=True,
            units='height', 
            checkTiming=False  # we're going to do this ourselves in a moment
        )
    else:
        # if we have a window, just set the attributes which are safe to set
        win.color = [0,0,0]
        win.colorSpace = 'rgb'
        win.backgroundImage = ''
        win.backgroundFit = 'none'
        win.units = 'height'
    if expInfo is not None:
        # get/measure frame rate if not already in expInfo
        if win._monitorFrameRate is None:
            win.getActualFrameRate(infoMsg='Attempting to measure frame rate of screen, please wait...')
        expInfo['frameRate'] = win._monitorFrameRate
    win.mouseVisible = False
    win.hideMessage()
    # show a visual indicator if we're in piloting mode
    if PILOTING and prefs.piloting['showPilotingIndicator']:
        win.showPilotingIndicator()
    
    return win


def setupDevices(expInfo, thisExp, win):
    """
    Setup whatever devices are available (mouse, keyboard, speaker, eyetracker, etc.) and add them to 
    the device manager (deviceManager)
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    win : psychopy.visual.Window
        Window in which to run this experiment.
    Returns
    ==========
    bool
        True if completed successfully.
    """
    # --- Setup input devices ---
    ioConfig = {}
    
    # Setup iohub keyboard
    ioConfig['Keyboard'] = dict(use_keymap='psychopy')
    
    ioSession = '1'
    if 'session' in expInfo:
        ioSession = str(expInfo['session'])
    ioServer = io.launchHubServer(window=win, **ioConfig)
    # store ioServer object in the device manager
    deviceManager.ioServer = ioServer
    
    # create a default keyboard (e.g. to check for escape)
    if deviceManager.getDevice('defaultKeyboard') is None:
        deviceManager.addDevice(
            deviceClass='keyboard', deviceName='defaultKeyboard', backend='iohub'
        )
    if deviceManager.getDevice('instruct_resp') is None:
        # initialise instruct_resp
        instruct_resp = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='instruct_resp',
        )
    if deviceManager.getDevice('pair1_resp') is None:
        # initialise pair1_resp
        pair1_resp = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='pair1_resp',
        )
    if deviceManager.getDevice('pair1_1back_resp') is None:
        # initialise pair1_1back_resp
        pair1_1back_resp = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='pair1_1back_resp',
        )
    if deviceManager.getDevice('pair2_resp') is None:
        # initialise pair2_resp
        pair2_resp = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='pair2_resp',
        )
    if deviceManager.getDevice('pair2_1back_resp') is None:
        # initialise pair2_1back_resp
        pair2_1back_resp = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='pair2_1back_resp',
        )
    if deviceManager.getDevice('test_resp') is None:
        # initialise test_resp
        test_resp = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='test_resp',
        )
    if deviceManager.getDevice('key_resp_2afc') is None:
        # initialise key_resp_2afc
        key_resp_2afc = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='key_resp_2afc',
        )
    if deviceManager.getDevice('end_key_resp') is None:
        # initialise end_key_resp
        end_key_resp = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='end_key_resp',
        )
    # return True if completed successfully
    return True

def pauseExperiment(thisExp, win=None, timers=[], playbackComponents=[]):
    """
    Pause this experiment, preventing the flow from advancing to the next routine until resumed.
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    win : psychopy.visual.Window
        Window for this experiment.
    timers : list, tuple
        List of timers to reset once pausing is finished.
    playbackComponents : list, tuple
        List of any components with a `pause` method which need to be paused.
    """
    # if we are not paused, do nothing
    if thisExp.status != PAUSED:
        return
    
    # pause any playback components
    for comp in playbackComponents:
        comp.pause()
    # prevent components from auto-drawing
    win.stashAutoDraw()
    # make sure we have a keyboard
    defaultKeyboard = deviceManager.getDevice('defaultKeyboard')
    if defaultKeyboard is None:
        defaultKeyboard = deviceManager.addKeyboard(
            deviceClass='keyboard',
            deviceName='defaultKeyboard',
            backend='ioHub',
        )
    # run a while loop while we wait to unpause
    while thisExp.status == PAUSED:
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=['escape']):
            endExperiment(thisExp, win=win)
        # flip the screen
        win.flip()
    # if stop was requested while paused, quit
    if thisExp.status == FINISHED:
        endExperiment(thisExp, win=win)
    # resume any playback components
    for comp in playbackComponents:
        comp.play()
    # restore auto-drawn components
    win.retrieveAutoDraw()
    # reset any timers
    for timer in timers:
        timer.reset()


def run(expInfo, thisExp, win, globalClock=None, thisSession=None):
    """
    Run the experiment flow.
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    psychopy.visual.Window
        Window in which to run this experiment.
    globalClock : psychopy.core.clock.Clock or None
        Clock to get global time from - supply None to make a new one.
    thisSession : psychopy.session.Session or None
        Handle of the Session object this experiment is being run from, if any.
    """
    # mark experiment as started
    thisExp.status = STARTED
    # make sure variables created by exec are available globally
    exec = environmenttools.setExecEnvironment(globals())
    # get device handles from dict of input devices
    ioServer = deviceManager.ioServer
    # get/create a default keyboard (e.g. to check for escape)
    defaultKeyboard = deviceManager.getDevice('defaultKeyboard')
    if defaultKeyboard is None:
        deviceManager.addDevice(
            deviceClass='keyboard', deviceName='defaultKeyboard', backend='ioHub'
        )
    eyetracker = deviceManager.getDevice('eyetracker')
    # make sure we're running in the directory for this experiment
    os.chdir(_thisDir)
    # get filename from ExperimentHandler for convenience
    filename = thisExp.dataFileName
    frameTolerance = 0.001  # how close to onset before 'same' frame
    endExpNow = False  # flag for 'escape' or other condition => quit the exp
    # get frame duration from frame rate in expInfo
    if 'frameRate' in expInfo and expInfo['frameRate'] is not None:
        frameDur = 1.0 / round(expInfo['frameRate'])
    else:
        frameDur = 1.0 / 60.0  # could not measure, so guess
    
    # Start Code - component code to be run after the window creation
    
    # --- Initialize components for Routine "instructions" ---
    # Run 'Begin Experiment' code from setup_code
    # random seed
    random.seed(45)
    
    # get current conditions
    exposure_cond = expInfo['exposure']
    test_cond = expInfo['test']
    
    # set up experiment params
    num_images = 109        # number of images to choose from
    num_stim = 24           # number of images to call in
    num_groups = 6          # number of tetrads
    num_blocks = 3          # number of blocks
    num_rep = 20 #50            # number of repetitions for each group
    num_loop_rep = num_rep * num_groups 
    percent_1back = 0.1     # probability of 1 back
    num_1backs_each_pair = int(num_rep*percent_1back*2)
    print(num_1backs_each_pair)
    p1_1back = [1,0]
    p2_1back = [0,1]
    
    # define stimuli parameters
    image_size = [0.25, 0.25]
    fix_size = [0.01,0.01]
    fix_line_width = 2
    
    
    # randomize fractal options
    fract_opts = random.sample(list(range(1, num_images+1)), num_images)
    
    chosen_fract = []
    
    # choose the first 24 
    for num in (fract_opts[0:num_stim]):
        chosen_fract.append(f"{num:03}")
        
    print(chosen_fract)
    fract_groups = []
    
    for i in range(0, num_stim, num_stim//num_groups):
        inter = num_stim//num_groups
        fract_groups.append(chosen_fract[i:(i + inter)])
        
    print(fract_groups)
    
    AB_pairs = []
    BC_pairs = []
    CD_pairs = []
    AC_pairs = []
    BD_pairs = []
    AD_pairs = []
    
    for i in range(len(fract_groups)):
        curr_group = fract_groups[i]
    for i in range(len(fract_groups)):
        curr_group = fract_groups[i]
        AB_pairs.append([curr_group[0], curr_group[1]])
        BC_pairs.append([curr_group[1], curr_group[2]])
        CD_pairs.append([curr_group[2], curr_group[3]])
        AC_pairs.append([curr_group[0], curr_group[2]]) 
        BD_pairs.append([curr_group[1], curr_group[3]]) 
        AD_pairs.append([curr_group[0], curr_group[3]]) 
        
        
    def send_back(value, number, lst):
        idx = len(lst)-2
        for _ in range(number):
            while lst[idx] == value or lst[idx-1] == value:
                idx -= 1
            lst.insert(idx, value)
    
    
    def shuffle_without_doubles(nb_values, repeats):
        population = list(range(nb_values))
        weights = [repeats] * nb_values
        out = []
        prev = None
        for i in range(nb_values * repeats):
            if prev is not None:
                # remove prev from the list of possible choices
                # by turning its weight temporarily to zero
                old_weight = weights[prev]
                weights[prev] = 0    
    
            try:
                chosen = random.choices(population, weights)[0]
            except ValueError:
                # We are here because all of our weights are 0,
                # which means that all is left to choose from
                # is old_weight times the previous value
                print("prev", prev)
                print("old_weight", old_weight)
                print("out", out)
                send_back(prev, old_weight, out)
                break
    
            out.append(chosen)
            weights[chosen] -= 1
            if prev is not None:
                # restore weight
                weights[prev] = old_weight
            prev = chosen
        return out
    
    def make_unique_list(list1):
        list2 = list1[:]
        random.shuffle(list2)
        
        for i in range(len(list2)):
            if list2[i] == list1[i]:
                # Find a position to swap where there's no conflict
                for j in range(len(list2)):
                    if j != i and list2[j] != list1[i] and list2[i] != list1[j]:
                        list2[i], list2[j] = list2[j], list2[i]
                        break
        return list2
    instruct_resp = keyboard.Keyboard(deviceName='instruct_resp')
    instruct_text = visual.TextStim(win=win, name='instruct_text',
        text='Welcome!\nIn this experiment you will see a sequence of images.\nYou will see one image at a time.\nFor each image, please judge whether it is the same as the previous image you just saw.\nIf the image is the SAME as the previous one, press "space".\nIf the colour is DIFFERENT from the previous one, press "z".\nExample: A--B("z")--B("/")--C("z")\nPlease respond as ACCURATELY and as FAST as possible.\nPress space bar to start.\'',
        font='Arial',
        pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-2.0);
    
    # --- Initialize components for Routine "setup_block" ---
    # Run 'Begin Experiment' code from block_code
    index_AB = shuffle_without_doubles(num_groups, num_rep) 
    index_BC = shuffle_without_doubles(num_groups, num_rep)  
    index_CD = shuffle_without_doubles(num_groups, num_rep) 
    
    index_AB_array = np.array(index_AB)
    index_BC_array = np.array(index_BC)
    index_CD_array = np.array(index_CD)
    
    trial_list_AB = [AB_pairs[i] for i in index_AB]
    trial_list_BC = [BC_pairs[i] for i in index_BC]
    trial_list_CD = [CD_pairs[i] for i in index_CD]
    
    oneback_list_AB = np.zeros_like(trial_list_AB)
    oneback_list_BC = np.zeros_like(trial_list_BC)
    oneback_list_CD = np.zeros_like(trial_list_CD)
    for i in range(num_groups):
      bool_AB = index_AB_array == i
      bool_BC = index_BC_array == i
      bool_CD = index_CD_array == i
      
      idx_AB = np.where(bool_AB)[0]
      idx_BC = np.where(bool_BC)[0]
      idx_CD = np.where(bool_CD)[0]
      
      oneback_list_AB[idx_AB] = [0,0]
      oneback_list_BC[idx_BC] = [0,0]
      oneback_list_CD[idx_CD] = [0,0]
      
      oneback_AB = random.sample(idx_AB.tolist(), num_1backs_each_pair)
      oneback_BC = random.sample(idx_BC.tolist(), num_1backs_each_pair)
      oneback_CD = random.sample(idx_CD.tolist(), num_1backs_each_pair)
      
      oneback_pair_idx = int(num_1backs_each_pair/2)
      oneback_list_AB[oneback_AB[0:oneback_pair_idx]] = p1_1back
      oneback_list_AB[oneback_AB[oneback_pair_idx:]] = p2_1back
      oneback_list_BC[oneback_BC[0:oneback_pair_idx]] = p1_1back
      oneback_list_BC[oneback_BC[oneback_pair_idx:]] = p2_1back
      oneback_list_CD[oneback_CD[0:oneback_pair_idx]] = p1_1back
      oneback_list_CD[oneback_CD[oneback_pair_idx:]] = p2_1back
    
    
    if exposure_cond == 1:
        trial_list = [trial_list_AB, trial_list_BC, trial_list_CD]
        trial_list_1back = [oneback_list_AB, oneback_list_BC, oneback_list_CD]
    elif exposure_cond == 2:
        trial_list = [trial_list_AB, trial_list_CD, trial_list_BC]
        trial_list_1back = [oneback_list_AB, oneback_list_CD, oneback_list_BC]
    
    init_fix = visual.ShapeStim(
        win=win, name='init_fix',
        size=fix_size, vertices='circle',
        ori=0.0, pos=(0, 0), anchor='center',
        lineWidth=fix_line_width,     colorSpace='rgb',  lineColor='white', fillColor='black',
        opacity=None, depth=-1.0, interpolate=True)
    
    # --- Initialize components for Routine "setup_trials" ---
    
    # --- Initialize components for Routine "pair1_disp" ---
    pair1_image = visual.ImageStim(
        win=win,
        name='pair1_image', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=image_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    pair1_resp = keyboard.Keyboard(deviceName='pair1_resp')
    pair1_fix = visual.ShapeStim(
        win=win, name='pair1_fix',
        size=fix_size, vertices='circle',
        ori=0.0, pos=(0, 0), anchor='center',
        lineWidth=fix_line_width,     colorSpace='rgb',  lineColor='white', fillColor='white',
        opacity=None, depth=-3.0, interpolate=True)
    
    # --- Initialize components for Routine "pair1_1back" ---
    pair1_1back_image = visual.ImageStim(
        win=win,
        name='pair1_1back_image', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=image_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    pair1_1back_resp = keyboard.Keyboard(deviceName='pair1_1back_resp')
    pair1_1back_fix = visual.ShapeStim(
        win=win, name='pair1_1back_fix',
        size=fix_size, vertices='circle',
        ori=0.0, pos=(0, 0), anchor='center',
        lineWidth=fix_line_width,     colorSpace='rgb',  lineColor='white', fillColor='white',
        opacity=None, depth=-3.0, interpolate=True)
    
    # --- Initialize components for Routine "pair2_disp" ---
    pair2_image = visual.ImageStim(
        win=win,
        name='pair2_image', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=image_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    pair2_resp = keyboard.Keyboard(deviceName='pair2_resp')
    pair2_fix = visual.ShapeStim(
        win=win, name='pair2_fix',
        size=fix_size, vertices='circle',
        ori=0.0, pos=(0, 0), anchor='center',
        lineWidth=fix_line_width,     colorSpace='rgb',  lineColor='white', fillColor='white',
        opacity=None, depth=-3.0, interpolate=True)
    
    # --- Initialize components for Routine "pair2_1back" ---
    pair2_1back_image = visual.ImageStim(
        win=win,
        name='pair2_1back_image', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=image_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    pair2_1back_resp = keyboard.Keyboard(deviceName='pair2_1back_resp')
    pair2_1back_fix = visual.ShapeStim(
        win=win, name='pair2_1back_fix',
        size=fix_size, vertices='circle',
        ori=0.0, pos=(0, 0), anchor='center',
        lineWidth=fix_line_width,     colorSpace='rgb',  lineColor='white', fillColor='white',
        opacity=None, depth=-3.0, interpolate=True)
    
    # --- Initialize components for Routine "between_blocks_break" ---
    text_countdown = visual.TextStim(win=win, name='text_countdown',
        text='',
        font='Open Sans',
        pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    
    # --- Initialize components for Routine "test_instructions" ---
    test_instruct = visual.TextStim(win=win, name='test_instruct',
        text='In this part of experiment you will see two pairs of images presented on the screen for a short period of time.\nAfter seeing the 2 pairs, please judge which pair looks more familiar to you.\nBy familiar it means which pair you have seen more often in the first part of the experiment.\nIf the first pair looks more familiar, press the left arrow key.\nIf the second pair looks more familiar, press the right arrow key.\nYou must make a decision for the next pairs to appear.\nPress space bar to start.',
        font='Arial',
        pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-1.0);
    test_resp = keyboard.Keyboard(deviceName='test_resp')
    
    # --- Initialize components for Routine "testing_block_setup" ---
    
    # --- Initialize components for Routine "test_trial" ---
    target_1 = visual.ImageStim(
        win=win,
        name='target_1', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0,0), size=image_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    ISI_load_images = clock.StaticPeriod(win=win, screenHz=expInfo['frameRate'], name='ISI_load_images')
    target_2 = visual.ImageStim(
        win=win,
        name='target_2', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0,0), size=image_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-3.0)
    foil_1 = visual.ImageStim(
        win=win,
        name='foil_1', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0,0), size=image_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-4.0)
    foil_2 = visual.ImageStim(
        win=win,
        name='foil_2', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0,0), size=image_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-5.0)
    key_resp_2afc = keyboard.Keyboard(deviceName='key_resp_2afc')
    fixation_2afc = visual.ShapeStim(
        win=win, name='fixation_2afc',units='height', 
        size=fix_size, vertices='circle',
        ori=0.0, pos=(0, 0), anchor='center',
        lineWidth=fix_line_width,     colorSpace='rgb',  lineColor='white', fillColor='black',
        opacity=None, depth=-7.0, interpolate=True)
    
    # --- Initialize components for Routine "fix" ---
    fixation_fb = visual.ShapeStim(
        win=win, name='fixation_fb',units='height', 
        size=fix_size, vertices='circle',
        ori=0.0, pos=(0, 0), anchor='center',
        lineWidth=fix_line_width,     colorSpace='rgb',  lineColor='black', fillColor='white',
        opacity=None, depth=0.0, interpolate=True)
    
    # --- Initialize components for Routine "between_blocks_break" ---
    text_countdown = visual.TextStim(win=win, name='text_countdown',
        text='',
        font='Open Sans',
        pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    
    # --- Initialize components for Routine "finished" ---
    thank_you = visual.TextStim(win=win, name='thank_you',
        text='Thank you for your participation!',
        font='Arial',
        pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    end_key_resp = keyboard.Keyboard(deviceName='end_key_resp')
    
    # create some handy timers
    
    # global clock to track the time since experiment started
    if globalClock is None:
        # create a clock if not given one
        globalClock = core.Clock()
    if isinstance(globalClock, str):
        # if given a string, make a clock accoridng to it
        if globalClock == 'float':
            # get timestamps as a simple value
            globalClock = core.Clock(format='float')
        elif globalClock == 'iso':
            # get timestamps in ISO format
            globalClock = core.Clock(format='%Y-%m-%d_%H:%M:%S.%f%z')
        else:
            # get timestamps in a custom format
            globalClock = core.Clock(format=globalClock)
    if ioServer is not None:
        ioServer.syncClock(globalClock)
    logging.setDefaultClock(globalClock)
    # routine timer to track time remaining of each (possibly non-slip) routine
    routineTimer = core.Clock()
    win.flip()  # flip window to reset last flip timer
    # store the exact time the global clock started
    expInfo['expStart'] = data.getDateStr(
        format='%Y-%m-%d %Hh%M.%S.%f %z', fractionalSecondDigits=6
    )
    
    # --- Prepare to start Routine "instructions" ---
    continueRoutine = True
    # update component parameters for each repeat
    thisExp.addData('instructions.started', globalClock.getTime(format='float'))
    # create starting attributes for instruct_resp
    instruct_resp.keys = []
    instruct_resp.rt = []
    _instruct_resp_allKeys = []
    # keep track of which components have finished
    instructionsComponents = [instruct_resp, instruct_text]
    for thisComponent in instructionsComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "instructions" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *instruct_resp* updates
        waitOnFlip = False
        
        # if instruct_resp is starting this frame...
        if instruct_resp.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            instruct_resp.frameNStart = frameN  # exact frame index
            instruct_resp.tStart = t  # local t and not account for scr refresh
            instruct_resp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(instruct_resp, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'instruct_resp.started')
            # update status
            instruct_resp.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(instruct_resp.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(instruct_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if instruct_resp.status == STARTED and not waitOnFlip:
            theseKeys = instruct_resp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
            _instruct_resp_allKeys.extend(theseKeys)
            if len(_instruct_resp_allKeys):
                instruct_resp.keys = _instruct_resp_allKeys[-1].name  # just the last key pressed
                instruct_resp.rt = _instruct_resp_allKeys[-1].rt
                instruct_resp.duration = _instruct_resp_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # *instruct_text* updates
        
        # if instruct_text is starting this frame...
        if instruct_text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            instruct_text.frameNStart = frameN  # exact frame index
            instruct_text.tStart = t  # local t and not account for scr refresh
            instruct_text.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(instruct_text, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'instruct_text.started')
            # update status
            instruct_text.status = STARTED
            instruct_text.setAutoDraw(True)
        
        # if instruct_text is active this frame...
        if instruct_text.status == STARTED:
            # update params
            pass
        
        # if instruct_text is stopping this frame...
        if instruct_text.status == STARTED:
            if bool(instruct_resp):
                # keep track of stop time/frame for later
                instruct_text.tStop = t  # not accounting for scr refresh
                instruct_text.tStopRefresh = tThisFlipGlobal  # on global time
                instruct_text.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'instruct_text.stopped')
                # update status
                instruct_text.status = FINISHED
                instruct_text.setAutoDraw(False)
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in instructionsComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "instructions" ---
    for thisComponent in instructionsComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    thisExp.addData('instructions.stopped', globalClock.getTime(format='float'))
    # check responses
    if instruct_resp.keys in ['', [], None]:  # No response was made
        instruct_resp.keys = None
    thisExp.addData('instruct_resp.keys',instruct_resp.keys)
    if instruct_resp.keys != None:  # we had a response
        thisExp.addData('instruct_resp.rt', instruct_resp.rt)
        thisExp.addData('instruct_resp.duration', instruct_resp.duration)
    thisExp.nextEntry()
    # the Routine "instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    exposure_loop = data.TrialHandler(nReps=3.0, method='sequential', 
        extraInfo=expInfo, originPath=-1,
        trialList=[None],
        seed=None, name='exposure_loop')
    thisExp.addLoop(exposure_loop)  # add the loop to the experiment
    thisExposure_loop = exposure_loop.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisExposure_loop.rgb)
    if thisExposure_loop != None:
        for paramName in thisExposure_loop:
            globals()[paramName] = thisExposure_loop[paramName]
    
    for thisExposure_loop in exposure_loop:
        currentLoop = exposure_loop
        thisExp.timestampOnFlip(win, 'thisRow.t', format=globalClock.format)
        # pause experiment here if requested
        if thisExp.status == PAUSED:
            pauseExperiment(
                thisExp=thisExp, 
                win=win, 
                timers=[routineTimer], 
                playbackComponents=[]
        )
        # abbreviate parameter names if possible (e.g. rgb = thisExposure_loop.rgb)
        if thisExposure_loop != None:
            for paramName in thisExposure_loop:
                globals()[paramName] = thisExposure_loop[paramName]
        
        # --- Prepare to start Routine "setup_block" ---
        continueRoutine = True
        # update component parameters for each repeat
        thisExp.addData('setup_block.started', globalClock.getTime(format='float'))
        # Run 'Begin Routine' code from block_code
        curr_trial_list = trial_list[exposure_loop.thisN]
        curr_1back_list = trial_list_1back[exposure_loop.thisN]
        
        trial_count = 0
        trial_num = 0
        trial_count_1back = 0
        # keep track of which components have finished
        setup_blockComponents = [init_fix]
        for thisComponent in setup_blockComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "setup_block" ---
        routineForceEnded = not continueRoutine
        while continueRoutine and routineTimer.getTime() < 0.5:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *init_fix* updates
            
            # if init_fix is starting this frame...
            if init_fix.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                init_fix.frameNStart = frameN  # exact frame index
                init_fix.tStart = t  # local t and not account for scr refresh
                init_fix.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(init_fix, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'init_fix.started')
                # update status
                init_fix.status = STARTED
                init_fix.setAutoDraw(True)
            
            # if init_fix is active this frame...
            if init_fix.status == STARTED:
                # update params
                pass
            
            # if init_fix is stopping this frame...
            if init_fix.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > init_fix.tStartRefresh + 0.5-frameTolerance:
                    # keep track of stop time/frame for later
                    init_fix.tStop = t  # not accounting for scr refresh
                    init_fix.tStopRefresh = tThisFlipGlobal  # on global time
                    init_fix.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'init_fix.stopped')
                    # update status
                    init_fix.status = FINISHED
                    init_fix.setAutoDraw(False)
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in setup_blockComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "setup_block" ---
        for thisComponent in setup_blockComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        thisExp.addData('setup_block.stopped', globalClock.getTime(format='float'))
        # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
        if routineForceEnded:
            routineTimer.reset()
        else:
            routineTimer.addTime(-0.500000)
        
        # set up handler to look after randomisation of conditions etc
        blocks = data.TrialHandler(nReps=num_loop_rep, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='blocks')
        thisExp.addLoop(blocks)  # add the loop to the experiment
        thisBlock = blocks.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisBlock.rgb)
        if thisBlock != None:
            for paramName in thisBlock:
                globals()[paramName] = thisBlock[paramName]
        
        for thisBlock in blocks:
            currentLoop = blocks
            thisExp.timestampOnFlip(win, 'thisRow.t', format=globalClock.format)
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    win=win, 
                    timers=[routineTimer], 
                    playbackComponents=[]
            )
            # abbreviate parameter names if possible (e.g. rgb = thisBlock.rgb)
            if thisBlock != None:
                for paramName in thisBlock:
                    globals()[paramName] = thisBlock[paramName]
            
            # --- Prepare to start Routine "setup_trials" ---
            continueRoutine = True
            # update component parameters for each repeat
            thisExp.addData('setup_trials.started', globalClock.getTime(format='float'))
            # Run 'Begin Routine' code from trial_code
            chosen_pair = curr_trial_list[trial_num]
            chosen_1back = curr_1back_list[trial_num]
            
            # get pair 1 and pair 2 fractals
            pair1_stim = chosen_pair[0]
            pair1_1back = chosen_1back[0]
            pair2_stim = chosen_pair[1]
            pair2_1back = chosen_1back[1]
            # keep track of which components have finished
            setup_trialsComponents = []
            for thisComponent in setup_trialsComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "setup_trials" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in setup_trialsComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "setup_trials" ---
            for thisComponent in setup_trialsComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            thisExp.addData('setup_trials.stopped', globalClock.getTime(format='float'))
            # Run 'End Routine' code from trial_code
            thisExp.addData('trial_num', trial_num)
            trial_num = trial_num + 1
            # the Routine "setup_trials" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
            
            # --- Prepare to start Routine "pair1_disp" ---
            continueRoutine = True
            # update component parameters for each repeat
            thisExp.addData('pair1_disp.started', globalClock.getTime(format='float'))
            # Run 'Begin Routine' code from pair1_trial_code
            space_press = False
            pair1_image.setImage('images/stim_' + pair1_stim + '.png')
            # create starting attributes for pair1_resp
            pair1_resp.keys = []
            pair1_resp.rt = []
            _pair1_resp_allKeys = []
            pair1_fix.setFillColor('black')
            pair1_fix.setLineColor('white')
            # keep track of which components have finished
            pair1_dispComponents = [pair1_image, pair1_resp, pair1_fix]
            for thisComponent in pair1_dispComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "pair1_disp" ---
            routineForceEnded = not continueRoutine
            while continueRoutine and routineTimer.getTime() < 1.0:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # Run 'Each Frame' code from pair1_trial_code
                if (pair1_resp.keys == "space") & (pair1_resp.status == STARTED):
                    if not space_press:
                        space_press = True
                        space_press = t
                        pair1_fix.fillColor = "white"
                        pair1_fix.lineColor = "black"
                    else:
                        space_press = t
                if space_press and t - space_press > .15:
                    space_press = False
                    pair1_fix.fillColor = "black"
                    pair1_fix.lineColor = "white"
                
                # *pair1_image* updates
                
                # if pair1_image is starting this frame...
                if pair1_image.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    pair1_image.frameNStart = frameN  # exact frame index
                    pair1_image.tStart = t  # local t and not account for scr refresh
                    pair1_image.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair1_image, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair1_image.started')
                    # update status
                    pair1_image.status = STARTED
                    pair1_image.setAutoDraw(True)
                
                # if pair1_image is active this frame...
                if pair1_image.status == STARTED:
                    # update params
                    pass
                
                # if pair1_image is stopping this frame...
                if pair1_image.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair1_image.tStartRefresh + 0.5-frameTolerance:
                        # keep track of stop time/frame for later
                        pair1_image.tStop = t  # not accounting for scr refresh
                        pair1_image.tStopRefresh = tThisFlipGlobal  # on global time
                        pair1_image.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair1_image.stopped')
                        # update status
                        pair1_image.status = FINISHED
                        pair1_image.setAutoDraw(False)
                
                # *pair1_resp* updates
                waitOnFlip = False
                
                # if pair1_resp is starting this frame...
                if pair1_resp.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    pair1_resp.frameNStart = frameN  # exact frame index
                    pair1_resp.tStart = t  # local t and not account for scr refresh
                    pair1_resp.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair1_resp, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair1_resp.started')
                    # update status
                    pair1_resp.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(pair1_resp.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(pair1_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
                
                # if pair1_resp is stopping this frame...
                if pair1_resp.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair1_resp.tStartRefresh + 0.75-frameTolerance:
                        # keep track of stop time/frame for later
                        pair1_resp.tStop = t  # not accounting for scr refresh
                        pair1_resp.tStopRefresh = tThisFlipGlobal  # on global time
                        pair1_resp.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair1_resp.stopped')
                        # update status
                        pair1_resp.status = FINISHED
                        pair1_resp.status = FINISHED
                if pair1_resp.status == STARTED and not waitOnFlip:
                    theseKeys = pair1_resp.getKeys(keyList=['space','None'], ignoreKeys=["escape"], waitRelease=False)
                    _pair1_resp_allKeys.extend(theseKeys)
                    if len(_pair1_resp_allKeys):
                        pair1_resp.keys = _pair1_resp_allKeys[-1].name  # just the last key pressed
                        pair1_resp.rt = _pair1_resp_allKeys[-1].rt
                        pair1_resp.duration = _pair1_resp_allKeys[-1].duration
                        # was this correct?
                        if (pair1_resp.keys == str("'None'")) or (pair1_resp.keys == "'None'"):
                            pair1_resp.corr = 1
                        else:
                            pair1_resp.corr = 0
                
                # *pair1_fix* updates
                
                # if pair1_fix is starting this frame...
                if pair1_fix.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    pair1_fix.frameNStart = frameN  # exact frame index
                    pair1_fix.tStart = t  # local t and not account for scr refresh
                    pair1_fix.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair1_fix, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair1_fix.started')
                    # update status
                    pair1_fix.status = STARTED
                    pair1_fix.setAutoDraw(True)
                
                # if pair1_fix is active this frame...
                if pair1_fix.status == STARTED:
                    # update params
                    pass
                
                # if pair1_fix is stopping this frame...
                if pair1_fix.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair1_fix.tStartRefresh + 1.0-frameTolerance:
                        # keep track of stop time/frame for later
                        pair1_fix.tStop = t  # not accounting for scr refresh
                        pair1_fix.tStopRefresh = tThisFlipGlobal  # on global time
                        pair1_fix.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair1_fix.stopped')
                        # update status
                        pair1_fix.status = FINISHED
                        pair1_fix.setAutoDraw(False)
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in pair1_dispComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "pair1_disp" ---
            for thisComponent in pair1_dispComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            thisExp.addData('pair1_disp.stopped', globalClock.getTime(format='float'))
            # Run 'End Routine' code from pair1_trial_code
            thisExp.addData('pair1', ('stim_' + pair1_stim))
            thisExp.addData('trial_count_pair1', trial_count)
            thisExp.addData('trial_1backcount_pair1', trial_count_1back)
            trial_count += 1
            trial_count_1back += 1
            # check responses
            if pair1_resp.keys in ['', [], None]:  # No response was made
                pair1_resp.keys = None
                # was no response the correct answer?!
                if str("'None'").lower() == 'none':
                   pair1_resp.corr = 1;  # correct non-response
                else:
                   pair1_resp.corr = 0;  # failed to respond (incorrectly)
            # store data for blocks (TrialHandler)
            blocks.addData('pair1_resp.keys',pair1_resp.keys)
            blocks.addData('pair1_resp.corr', pair1_resp.corr)
            if pair1_resp.keys != None:  # we had a response
                blocks.addData('pair1_resp.rt', pair1_resp.rt)
                blocks.addData('pair1_resp.duration', pair1_resp.duration)
            # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
            if routineForceEnded:
                routineTimer.reset()
            else:
                routineTimer.addTime(-1.000000)
            
            # --- Prepare to start Routine "pair1_1back" ---
            continueRoutine = True
            # update component parameters for each repeat
            thisExp.addData('pair1_1back.started', globalClock.getTime(format='float'))
            # Run 'Begin Routine' code from pair1_1back_code
            # Generate a random value (0 or 1) based on the probability
            is_nback_trial_A = pair1_1back == '1'
            space_press = False
            if is_nback_trial_A:
               correct_ans_p1 = "space"
            else:
               correct_ans_p1 = "None"
               continueRoutine=False
            pair1_1back_image.setImage('images/stim_' + pair1_stim + '.png')
            # create starting attributes for pair1_1back_resp
            pair1_1back_resp.keys = []
            pair1_1back_resp.rt = []
            _pair1_1back_resp_allKeys = []
            pair1_1back_fix.setFillColor('black')
            pair1_1back_fix.setLineColor('white')
            # keep track of which components have finished
            pair1_1backComponents = [pair1_1back_image, pair1_1back_resp, pair1_1back_fix]
            for thisComponent in pair1_1backComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "pair1_1back" ---
            routineForceEnded = not continueRoutine
            while continueRoutine and routineTimer.getTime() < 1.0:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # Run 'Each Frame' code from pair1_1back_code
                if (pair1_1back_resp.keys == "space") & (pair1_1back_resp.status == STARTED):
                    if not space_press:
                        space_press = True
                        space_press = t
                        pair1_1back_fix.fillColor = "white"
                        pair1_1back_fix.lineColor = "black"
                    else:
                        space_press = t
                elif (pair1_1back_resp.keys == []) & (pair1_1back_resp.status == FINISHED):
                    pair1_1back_fix.fillColor = "red"
                    pair1_1back_fix.lineColor = "white"
                    
                if space_press and t - space_press > .15:
                    space_press = False
                    pair1_1back_fix.fillColor = "black"
                    pair1_1back_fix.lineColor = "white"
                
                # *pair1_1back_image* updates
                
                # if pair1_1back_image is starting this frame...
                if pair1_1back_image.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    pair1_1back_image.frameNStart = frameN  # exact frame index
                    pair1_1back_image.tStart = t  # local t and not account for scr refresh
                    pair1_1back_image.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair1_1back_image, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair1_1back_image.started')
                    # update status
                    pair1_1back_image.status = STARTED
                    pair1_1back_image.setAutoDraw(True)
                
                # if pair1_1back_image is active this frame...
                if pair1_1back_image.status == STARTED:
                    # update params
                    pass
                
                # if pair1_1back_image is stopping this frame...
                if pair1_1back_image.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair1_1back_image.tStartRefresh + 0.5-frameTolerance:
                        # keep track of stop time/frame for later
                        pair1_1back_image.tStop = t  # not accounting for scr refresh
                        pair1_1back_image.tStopRefresh = tThisFlipGlobal  # on global time
                        pair1_1back_image.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair1_1back_image.stopped')
                        # update status
                        pair1_1back_image.status = FINISHED
                        pair1_1back_image.setAutoDraw(False)
                
                # *pair1_1back_resp* updates
                waitOnFlip = False
                
                # if pair1_1back_resp is starting this frame...
                if pair1_1back_resp.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    pair1_1back_resp.frameNStart = frameN  # exact frame index
                    pair1_1back_resp.tStart = t  # local t and not account for scr refresh
                    pair1_1back_resp.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair1_1back_resp, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair1_1back_resp.started')
                    # update status
                    pair1_1back_resp.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(pair1_1back_resp.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(pair1_1back_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
                
                # if pair1_1back_resp is stopping this frame...
                if pair1_1back_resp.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair1_1back_resp.tStartRefresh + 0.75-frameTolerance:
                        # keep track of stop time/frame for later
                        pair1_1back_resp.tStop = t  # not accounting for scr refresh
                        pair1_1back_resp.tStopRefresh = tThisFlipGlobal  # on global time
                        pair1_1back_resp.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair1_1back_resp.stopped')
                        # update status
                        pair1_1back_resp.status = FINISHED
                        pair1_1back_resp.status = FINISHED
                if pair1_1back_resp.status == STARTED and not waitOnFlip:
                    theseKeys = pair1_1back_resp.getKeys(keyList=['space','None'], ignoreKeys=["escape"], waitRelease=False)
                    _pair1_1back_resp_allKeys.extend(theseKeys)
                    if len(_pair1_1back_resp_allKeys):
                        pair1_1back_resp.keys = _pair1_1back_resp_allKeys[-1].name  # just the last key pressed
                        pair1_1back_resp.rt = _pair1_1back_resp_allKeys[-1].rt
                        pair1_1back_resp.duration = _pair1_1back_resp_allKeys[-1].duration
                        # was this correct?
                        if (pair1_1back_resp.keys == str(correct_ans_p1)) or (pair1_1back_resp.keys == correct_ans_p1):
                            pair1_1back_resp.corr = 1
                        else:
                            pair1_1back_resp.corr = 0
                
                # *pair1_1back_fix* updates
                
                # if pair1_1back_fix is starting this frame...
                if pair1_1back_fix.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    pair1_1back_fix.frameNStart = frameN  # exact frame index
                    pair1_1back_fix.tStart = t  # local t and not account for scr refresh
                    pair1_1back_fix.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair1_1back_fix, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair1_1back_fix.started')
                    # update status
                    pair1_1back_fix.status = STARTED
                    pair1_1back_fix.setAutoDraw(True)
                
                # if pair1_1back_fix is active this frame...
                if pair1_1back_fix.status == STARTED:
                    # update params
                    pass
                
                # if pair1_1back_fix is stopping this frame...
                if pair1_1back_fix.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair1_1back_fix.tStartRefresh + 1.0-frameTolerance:
                        # keep track of stop time/frame for later
                        pair1_1back_fix.tStop = t  # not accounting for scr refresh
                        pair1_1back_fix.tStopRefresh = tThisFlipGlobal  # on global time
                        pair1_1back_fix.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair1_1back_fix.stopped')
                        # update status
                        pair1_1back_fix.status = FINISHED
                        pair1_1back_fix.setAutoDraw(False)
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in pair1_1backComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "pair1_1back" ---
            for thisComponent in pair1_1backComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            thisExp.addData('pair1_1back.stopped', globalClock.getTime(format='float'))
            # Run 'End Routine' code from pair1_1back_code
            if correct_ans_p1 == "space":
                thisExp.addData('1back', ('stim_' + pair1_stim))
                thisExp.addData('trial_1backcount_pair1_1back', trial_count_1back)
                trial_count_1back += 1
                if pair1_1back_resp.keys == "space":
                    thisExp.addData("1back_accuracy", 1)
                elif pair1_1back_resp.keys == []:
                    thisExp.addData("1back_accuracy", 0)
            
            
            
            
            # check responses
            if pair1_1back_resp.keys in ['', [], None]:  # No response was made
                pair1_1back_resp.keys = None
                # was no response the correct answer?!
                if str(correct_ans_p1).lower() == 'none':
                   pair1_1back_resp.corr = 1;  # correct non-response
                else:
                   pair1_1back_resp.corr = 0;  # failed to respond (incorrectly)
            # store data for blocks (TrialHandler)
            blocks.addData('pair1_1back_resp.keys',pair1_1back_resp.keys)
            blocks.addData('pair1_1back_resp.corr', pair1_1back_resp.corr)
            if pair1_1back_resp.keys != None:  # we had a response
                blocks.addData('pair1_1back_resp.rt', pair1_1back_resp.rt)
                blocks.addData('pair1_1back_resp.duration', pair1_1back_resp.duration)
            # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
            if routineForceEnded:
                routineTimer.reset()
            else:
                routineTimer.addTime(-1.000000)
            
            # --- Prepare to start Routine "pair2_disp" ---
            continueRoutine = True
            # update component parameters for each repeat
            thisExp.addData('pair2_disp.started', globalClock.getTime(format='float'))
            # Run 'Begin Routine' code from pair2_trial_code
            space_press = False
            pair2_image.setImage('images/stim_' + pair2_stim + '.png')
            # create starting attributes for pair2_resp
            pair2_resp.keys = []
            pair2_resp.rt = []
            _pair2_resp_allKeys = []
            pair2_fix.setFillColor('black')
            pair2_fix.setLineColor('white')
            # keep track of which components have finished
            pair2_dispComponents = [pair2_image, pair2_resp, pair2_fix]
            for thisComponent in pair2_dispComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "pair2_disp" ---
            routineForceEnded = not continueRoutine
            while continueRoutine and routineTimer.getTime() < 1.0:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # Run 'Each Frame' code from pair2_trial_code
                if (pair2_resp.keys == "space") & (pair2_resp.status == STARTED):
                    if not space_press:
                        space_press = True
                        space_press = t
                        pair2_fix.fillColor = "white"
                        pair2_fix.lineColor = "black"
                    else:
                        space_press = t
                if space_press and t - space_press > .15:
                    space_press = False
                    pair2_fix.fillColor = "black"
                    pair2_fix.lineColor = "white"
                
                
                # *pair2_image* updates
                
                # if pair2_image is starting this frame...
                if pair2_image.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    pair2_image.frameNStart = frameN  # exact frame index
                    pair2_image.tStart = t  # local t and not account for scr refresh
                    pair2_image.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair2_image, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair2_image.started')
                    # update status
                    pair2_image.status = STARTED
                    pair2_image.setAutoDraw(True)
                
                # if pair2_image is active this frame...
                if pair2_image.status == STARTED:
                    # update params
                    pass
                
                # if pair2_image is stopping this frame...
                if pair2_image.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair2_image.tStartRefresh + 0.5-frameTolerance:
                        # keep track of stop time/frame for later
                        pair2_image.tStop = t  # not accounting for scr refresh
                        pair2_image.tStopRefresh = tThisFlipGlobal  # on global time
                        pair2_image.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair2_image.stopped')
                        # update status
                        pair2_image.status = FINISHED
                        pair2_image.setAutoDraw(False)
                
                # *pair2_resp* updates
                waitOnFlip = False
                
                # if pair2_resp is starting this frame...
                if pair2_resp.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    pair2_resp.frameNStart = frameN  # exact frame index
                    pair2_resp.tStart = t  # local t and not account for scr refresh
                    pair2_resp.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair2_resp, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair2_resp.started')
                    # update status
                    pair2_resp.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(pair2_resp.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(pair2_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
                
                # if pair2_resp is stopping this frame...
                if pair2_resp.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair2_resp.tStartRefresh + 0.75-frameTolerance:
                        # keep track of stop time/frame for later
                        pair2_resp.tStop = t  # not accounting for scr refresh
                        pair2_resp.tStopRefresh = tThisFlipGlobal  # on global time
                        pair2_resp.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair2_resp.stopped')
                        # update status
                        pair2_resp.status = FINISHED
                        pair2_resp.status = FINISHED
                if pair2_resp.status == STARTED and not waitOnFlip:
                    theseKeys = pair2_resp.getKeys(keyList=['space','None'], ignoreKeys=["escape"], waitRelease=False)
                    _pair2_resp_allKeys.extend(theseKeys)
                    if len(_pair2_resp_allKeys):
                        pair2_resp.keys = _pair2_resp_allKeys[-1].name  # just the last key pressed
                        pair2_resp.rt = _pair2_resp_allKeys[-1].rt
                        pair2_resp.duration = _pair2_resp_allKeys[-1].duration
                        # was this correct?
                        if (pair2_resp.keys == str("'None'")) or (pair2_resp.keys == "'None'"):
                            pair2_resp.corr = 1
                        else:
                            pair2_resp.corr = 0
                
                # *pair2_fix* updates
                
                # if pair2_fix is starting this frame...
                if pair2_fix.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    pair2_fix.frameNStart = frameN  # exact frame index
                    pair2_fix.tStart = t  # local t and not account for scr refresh
                    pair2_fix.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair2_fix, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair2_fix.started')
                    # update status
                    pair2_fix.status = STARTED
                    pair2_fix.setAutoDraw(True)
                
                # if pair2_fix is active this frame...
                if pair2_fix.status == STARTED:
                    # update params
                    pass
                
                # if pair2_fix is stopping this frame...
                if pair2_fix.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair2_fix.tStartRefresh + 1.0-frameTolerance:
                        # keep track of stop time/frame for later
                        pair2_fix.tStop = t  # not accounting for scr refresh
                        pair2_fix.tStopRefresh = tThisFlipGlobal  # on global time
                        pair2_fix.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair2_fix.stopped')
                        # update status
                        pair2_fix.status = FINISHED
                        pair2_fix.setAutoDraw(False)
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in pair2_dispComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "pair2_disp" ---
            for thisComponent in pair2_dispComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            thisExp.addData('pair2_disp.stopped', globalClock.getTime(format='float'))
            # Run 'End Routine' code from pair2_trial_code
            thisExp.addData('pair2', ('stim_' + pair2_stim))
            thisExp.addData('trial_count_pair2', trial_count)
            thisExp.addData('trial_1backcount_pair2', trial_count_1back)
            trial_count += 1
            trial_count_1back += 1
            # check responses
            if pair2_resp.keys in ['', [], None]:  # No response was made
                pair2_resp.keys = None
                # was no response the correct answer?!
                if str("'None'").lower() == 'none':
                   pair2_resp.corr = 1;  # correct non-response
                else:
                   pair2_resp.corr = 0;  # failed to respond (incorrectly)
            # store data for blocks (TrialHandler)
            blocks.addData('pair2_resp.keys',pair2_resp.keys)
            blocks.addData('pair2_resp.corr', pair2_resp.corr)
            if pair2_resp.keys != None:  # we had a response
                blocks.addData('pair2_resp.rt', pair2_resp.rt)
                blocks.addData('pair2_resp.duration', pair2_resp.duration)
            # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
            if routineForceEnded:
                routineTimer.reset()
            else:
                routineTimer.addTime(-1.000000)
            
            # --- Prepare to start Routine "pair2_1back" ---
            continueRoutine = True
            # update component parameters for each repeat
            thisExp.addData('pair2_1back.started', globalClock.getTime(format='float'))
            # Run 'Begin Routine' code from pair2_1back_code
            # Generate a random value (0 or 1) based on the probability
            is_nback_trial_B = pair2_1back == '1'
            space_press = False 
            if is_nback_trial_B:
                correct_ans_p2 = "space"
            else:
               correct_ans_p2 = "None"
               continueRoutine=False
            pair2_1back_image.setImage('images/stim_' + pair2_stim + '.png')
            # create starting attributes for pair2_1back_resp
            pair2_1back_resp.keys = []
            pair2_1back_resp.rt = []
            _pair2_1back_resp_allKeys = []
            pair2_1back_fix.setFillColor('black')
            pair2_1back_fix.setLineColor('white')
            # keep track of which components have finished
            pair2_1backComponents = [pair2_1back_image, pair2_1back_resp, pair2_1back_fix]
            for thisComponent in pair2_1backComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "pair2_1back" ---
            routineForceEnded = not continueRoutine
            while continueRoutine and routineTimer.getTime() < 1.0:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # Run 'Each Frame' code from pair2_1back_code
                if (pair2_1back_resp.keys == "space") & (pair2_1back_resp.status == STARTED):
                    if not space_press:
                        space_press = True
                        space_press = t
                        pair2_1back_fix.fillColor = "white"
                        pair2_1back_fix.lineColor = "black"
                    else:
                        space_press = t
                elif (pair2_1back_resp.keys == []) & (pair2_1back_resp.status == FINISHED):
                    pair2_1back_fix.fillColor = "red"
                    pair2_1back_fix.lineColor = "white"
                    
                if space_press and t - space_press > .15:
                    space_press = False
                    pair2_1back_fix.fillColor = "black"
                    pair2_1back_fix.lineColor = "white"
                    
                
                # *pair2_1back_image* updates
                
                # if pair2_1back_image is starting this frame...
                if pair2_1back_image.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    pair2_1back_image.frameNStart = frameN  # exact frame index
                    pair2_1back_image.tStart = t  # local t and not account for scr refresh
                    pair2_1back_image.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair2_1back_image, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair2_1back_image.started')
                    # update status
                    pair2_1back_image.status = STARTED
                    pair2_1back_image.setAutoDraw(True)
                
                # if pair2_1back_image is active this frame...
                if pair2_1back_image.status == STARTED:
                    # update params
                    pass
                
                # if pair2_1back_image is stopping this frame...
                if pair2_1back_image.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair2_1back_image.tStartRefresh + 0.5-frameTolerance:
                        # keep track of stop time/frame for later
                        pair2_1back_image.tStop = t  # not accounting for scr refresh
                        pair2_1back_image.tStopRefresh = tThisFlipGlobal  # on global time
                        pair2_1back_image.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair2_1back_image.stopped')
                        # update status
                        pair2_1back_image.status = FINISHED
                        pair2_1back_image.setAutoDraw(False)
                
                # *pair2_1back_resp* updates
                waitOnFlip = False
                
                # if pair2_1back_resp is starting this frame...
                if pair2_1back_resp.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    pair2_1back_resp.frameNStart = frameN  # exact frame index
                    pair2_1back_resp.tStart = t  # local t and not account for scr refresh
                    pair2_1back_resp.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair2_1back_resp, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair2_1back_resp.started')
                    # update status
                    pair2_1back_resp.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(pair2_1back_resp.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(pair2_1back_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
                
                # if pair2_1back_resp is stopping this frame...
                if pair2_1back_resp.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair2_1back_resp.tStartRefresh + 0.75-frameTolerance:
                        # keep track of stop time/frame for later
                        pair2_1back_resp.tStop = t  # not accounting for scr refresh
                        pair2_1back_resp.tStopRefresh = tThisFlipGlobal  # on global time
                        pair2_1back_resp.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair2_1back_resp.stopped')
                        # update status
                        pair2_1back_resp.status = FINISHED
                        pair2_1back_resp.status = FINISHED
                if pair2_1back_resp.status == STARTED and not waitOnFlip:
                    theseKeys = pair2_1back_resp.getKeys(keyList=['space','None'], ignoreKeys=["escape"], waitRelease=False)
                    _pair2_1back_resp_allKeys.extend(theseKeys)
                    if len(_pair2_1back_resp_allKeys):
                        pair2_1back_resp.keys = _pair2_1back_resp_allKeys[-1].name  # just the last key pressed
                        pair2_1back_resp.rt = _pair2_1back_resp_allKeys[-1].rt
                        pair2_1back_resp.duration = _pair2_1back_resp_allKeys[-1].duration
                        # was this correct?
                        if (pair2_1back_resp.keys == str(correct_ans_p1)) or (pair2_1back_resp.keys == correct_ans_p1):
                            pair2_1back_resp.corr = 1
                        else:
                            pair2_1back_resp.corr = 0
                
                # *pair2_1back_fix* updates
                
                # if pair2_1back_fix is starting this frame...
                if pair2_1back_fix.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    pair2_1back_fix.frameNStart = frameN  # exact frame index
                    pair2_1back_fix.tStart = t  # local t and not account for scr refresh
                    pair2_1back_fix.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(pair2_1back_fix, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'pair2_1back_fix.started')
                    # update status
                    pair2_1back_fix.status = STARTED
                    pair2_1back_fix.setAutoDraw(True)
                
                # if pair2_1back_fix is active this frame...
                if pair2_1back_fix.status == STARTED:
                    # update params
                    pass
                
                # if pair2_1back_fix is stopping this frame...
                if pair2_1back_fix.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > pair2_1back_fix.tStartRefresh + 1.0-frameTolerance:
                        # keep track of stop time/frame for later
                        pair2_1back_fix.tStop = t  # not accounting for scr refresh
                        pair2_1back_fix.tStopRefresh = tThisFlipGlobal  # on global time
                        pair2_1back_fix.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'pair2_1back_fix.stopped')
                        # update status
                        pair2_1back_fix.status = FINISHED
                        pair2_1back_fix.setAutoDraw(False)
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in pair2_1backComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "pair2_1back" ---
            for thisComponent in pair2_1backComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            thisExp.addData('pair2_1back.stopped', globalClock.getTime(format='float'))
            # Run 'End Routine' code from pair2_1back_code
            #if (pair2_1back_resp.keys == "space" and correct_ans_p2 == "space") or (pair2_1back_resp.keys == [] and correct_ans_p2 == "None"):
            #    #thisExp.addData("1back_accuracy", 1)
            #    thisExp.addData('pair2_1back', ('stim_' + pair2_stim))
            #    thisExp.addData('trial_1backcount_pair2_1back', trial_count_1back)
            #    trial_count_1back += 1
            #else:
            #    thisExp.addData("1back_accuracy", 0)
            if correct_ans_p2 == "space":
                thisExp.addData('1back', ('stim_' + pair2_stim))
                thisExp.addData('trial_1backcount_pair2_1back', trial_count_1back)
                trial_count_1back += 1
                if pair2_1back_resp.keys == "space":
                    thisExp.addData("1back_accuracy", 1)
                elif pair2_1back_resp.keys == []:
                    thisExp.addData("1back_accuracy", 0)
            # check responses
            if pair2_1back_resp.keys in ['', [], None]:  # No response was made
                pair2_1back_resp.keys = None
                # was no response the correct answer?!
                if str(correct_ans_p1).lower() == 'none':
                   pair2_1back_resp.corr = 1;  # correct non-response
                else:
                   pair2_1back_resp.corr = 0;  # failed to respond (incorrectly)
            # store data for blocks (TrialHandler)
            blocks.addData('pair2_1back_resp.keys',pair2_1back_resp.keys)
            blocks.addData('pair2_1back_resp.corr', pair2_1back_resp.corr)
            if pair2_1back_resp.keys != None:  # we had a response
                blocks.addData('pair2_1back_resp.rt', pair2_1back_resp.rt)
                blocks.addData('pair2_1back_resp.duration', pair2_1back_resp.duration)
            # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
            if routineForceEnded:
                routineTimer.reset()
            else:
                routineTimer.addTime(-1.000000)
            thisExp.nextEntry()
            
            if thisSession is not None:
                # if running in a Session with a Liaison client, send data up to now
                thisSession.sendExperimentData()
        # completed num_loop_rep repeats of 'blocks'
        
        
        # --- Prepare to start Routine "between_blocks_break" ---
        continueRoutine = True
        # update component parameters for each repeat
        thisExp.addData('between_blocks_break.started', globalClock.getTime(format='float'))
        # keep track of which components have finished
        between_blocks_breakComponents = [text_countdown]
        for thisComponent in between_blocks_breakComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "between_blocks_break" ---
        routineForceEnded = not continueRoutine
        while continueRoutine and routineTimer.getTime() < 10.0:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *text_countdown* updates
            
            # if text_countdown is starting this frame...
            if text_countdown.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                text_countdown.frameNStart = frameN  # exact frame index
                text_countdown.tStart = t  # local t and not account for scr refresh
                text_countdown.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(text_countdown, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'text_countdown.started')
                # update status
                text_countdown.status = STARTED
                text_countdown.setAutoDraw(True)
            
            # if text_countdown is active this frame...
            if text_countdown.status == STARTED:
                # update params
                text_countdown.setText(str(10-int(t)), log=False)
            
            # if text_countdown is stopping this frame...
            if text_countdown.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > text_countdown.tStartRefresh + 10-frameTolerance:
                    # keep track of stop time/frame for later
                    text_countdown.tStop = t  # not accounting for scr refresh
                    text_countdown.tStopRefresh = tThisFlipGlobal  # on global time
                    text_countdown.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'text_countdown.stopped')
                    # update status
                    text_countdown.status = FINISHED
                    text_countdown.setAutoDraw(False)
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in between_blocks_breakComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "between_blocks_break" ---
        for thisComponent in between_blocks_breakComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        thisExp.addData('between_blocks_break.stopped', globalClock.getTime(format='float'))
        # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
        if routineForceEnded:
            routineTimer.reset()
        else:
            routineTimer.addTime(-10.000000)
        thisExp.nextEntry()
        
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
    # completed 3.0 repeats of 'exposure_loop'
    
    
    # --- Prepare to start Routine "test_instructions" ---
    continueRoutine = True
    # update component parameters for each repeat
    thisExp.addData('test_instructions.started', globalClock.getTime(format='float'))
    # Run 'Begin Routine' code from test_inst_code
    # define testing parameters
    view_time = .5
    test_size = [0.2, 0.2]
    time_names = ["left","right"] 
    time_idx = [0,1]
    times = [[0.5,1.5],[3,4]]
    num_group_pairs = []
    num_tests = num_groups*2
    # create starting attributes for test_resp
    test_resp.keys = []
    test_resp.rt = []
    _test_resp_allKeys = []
    # keep track of which components have finished
    test_instructionsComponents = [test_instruct, test_resp]
    for thisComponent in test_instructionsComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "test_instructions" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *test_instruct* updates
        
        # if test_instruct is starting this frame...
        if test_instruct.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            test_instruct.frameNStart = frameN  # exact frame index
            test_instruct.tStart = t  # local t and not account for scr refresh
            test_instruct.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(test_instruct, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'test_instruct.started')
            # update status
            test_instruct.status = STARTED
            test_instruct.setAutoDraw(True)
        
        # if test_instruct is active this frame...
        if test_instruct.status == STARTED:
            # update params
            pass
        
        # *test_resp* updates
        waitOnFlip = False
        
        # if test_resp is starting this frame...
        if test_resp.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            test_resp.frameNStart = frameN  # exact frame index
            test_resp.tStart = t  # local t and not account for scr refresh
            test_resp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(test_resp, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'test_resp.started')
            # update status
            test_resp.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(test_resp.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(test_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if test_resp.status == STARTED and not waitOnFlip:
            theseKeys = test_resp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
            _test_resp_allKeys.extend(theseKeys)
            if len(_test_resp_allKeys):
                test_resp.keys = _test_resp_allKeys[-1].name  # just the last key pressed
                test_resp.rt = _test_resp_allKeys[-1].rt
                test_resp.duration = _test_resp_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in test_instructionsComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "test_instructions" ---
    for thisComponent in test_instructionsComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    thisExp.addData('test_instructions.stopped', globalClock.getTime(format='float'))
    # check responses
    if test_resp.keys in ['', [], None]:  # No response was made
        test_resp.keys = None
    thisExp.addData('test_resp.keys',test_resp.keys)
    if test_resp.keys != None:  # we had a response
        thisExp.addData('test_resp.rt', test_resp.rt)
        thisExp.addData('test_resp.duration', test_resp.duration)
    thisExp.nextEntry()
    # the Routine "test_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    testing_blocks = data.TrialHandler(nReps=2.0, method='sequential', 
        extraInfo=expInfo, originPath=-1,
        trialList=[None],
        seed=None, name='testing_blocks')
    thisExp.addLoop(testing_blocks)  # add the loop to the experiment
    thisTesting_block = testing_blocks.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisTesting_block.rgb)
    if thisTesting_block != None:
        for paramName in thisTesting_block:
            globals()[paramName] = thisTesting_block[paramName]
    
    for thisTesting_block in testing_blocks:
        currentLoop = testing_blocks
        thisExp.timestampOnFlip(win, 'thisRow.t', format=globalClock.format)
        # pause experiment here if requested
        if thisExp.status == PAUSED:
            pauseExperiment(
                thisExp=thisExp, 
                win=win, 
                timers=[routineTimer], 
                playbackComponents=[]
        )
        # abbreviate parameter names if possible (e.g. rgb = thisTesting_block.rgb)
        if thisTesting_block != None:
            for paramName in thisTesting_block:
                globals()[paramName] = thisTesting_block[paramName]
        
        # set up handler to look after randomisation of conditions etc
        testing_loop_rep = data.TrialHandler(nReps=2.0, method='sequential', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='testing_loop_rep')
        thisExp.addLoop(testing_loop_rep)  # add the loop to the experiment
        thisTesting_loop_rep = testing_loop_rep.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisTesting_loop_rep.rgb)
        if thisTesting_loop_rep != None:
            for paramName in thisTesting_loop_rep:
                globals()[paramName] = thisTesting_loop_rep[paramName]
        
        for thisTesting_loop_rep in testing_loop_rep:
            currentLoop = testing_loop_rep
            thisExp.timestampOnFlip(win, 'thisRow.t', format=globalClock.format)
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    win=win, 
                    timers=[routineTimer], 
                    playbackComponents=[]
            )
            # abbreviate parameter names if possible (e.g. rgb = thisTesting_loop_rep.rgb)
            if thisTesting_loop_rep != None:
                for paramName in thisTesting_loop_rep:
                    globals()[paramName] = thisTesting_loop_rep[paramName]
            
            # --- Prepare to start Routine "testing_block_setup" ---
            continueRoutine = True
            # update component parameters for each repeat
            thisExp.addData('testing_block_setup.started', globalClock.getTime(format='float'))
            # Run 'Begin Routine' code from test_code_2
            # if current iteration is the second block, test direct pairs
            if testing_blocks.thisN == 1:
                stim_pair_list = [AB_pairs, BC_pairs, CD_pairs]
                stim_list_names = ["AB","BC","CD"]
                
                AB_pair_idx = random.sample(list(range(num_groups)),num_groups)
                BC_pair_idx = random.sample(list(range(num_groups)),num_groups)
                CD_pair_idx = random.sample(list(range(num_groups)),num_groups)
                
                AB_foil_idx = make_unique_list(AB_pair_idx)
                BC_foil_idx = make_unique_list(BC_pair_idx)
                CD_foil_idx = make_unique_list(CD_pair_idx)
            
                test_pair_index = [AB_pair_idx, BC_pair_idx, CD_pair_idx]
                test_foil_index = [AB_foil_idx, BC_foil_idx, CD_foil_idx]
                
                num_group_pairs = [num_groups,num_groups,num_groups]
                loopN = sum(num_group_pairs)
                test_trial_count = [0,0,0]
            elif testing_blocks.thisN == 0:
                print("testing_blocks.thisN == 1")
                print("test_cond == 1:", test_cond == 1)
                print("test_cond == 2:", test_cond == 2)
                if test_cond == 1:
                    print("test_cond == 1")
                    stim_pair_list = [AC_pairs, BD_pairs]
                    stim_list_names = ["AC","BD"]
                    AC_pair_idx = random.sample(list(range(num_groups)),num_groups)
                    BD_pair_idx = random.sample(list(range(num_groups)),num_groups)
            
                    AC_foil_idx = make_unique_list(AC_pair_idx)
                    BD_foil_idx = make_unique_list(BD_pair_idx)
            
                    test_pair_index = [AC_pair_idx, BD_pair_idx]
                    test_foil_index = [AC_foil_idx, BD_foil_idx]
            
                    num_group_pairs = [num_groups,num_groups]
                    loopN = sum(num_group_pairs)
                    test_trial_count = [0,0]
                
                elif test_cond == 2:
                    print("test_cond == 2")
                    stim_pair_list = [AD_pairs]
                    stim_list_names = ["AD"]
                    
                    AD_pair_idx = random.sample(list(range(num_groups)),num_groups)
            
                    AD_foil_idx = make_unique_list(AD_pair_idx)
            
                    test_pair_index = [AD_pair_idx]
                    test_foil_index = [AD_foil_idx]
            
                    num_group_pairs = [num_groups]
                    loopN = sum(num_group_pairs)
                    test_trial_count = [0]
            
            
            # Create the indices based on counts
            index_pair_test = [i for i, count in enumerate(num_group_pairs) for _ in range(count)]
            
            # Shuffle the indices to randomize
            random.shuffle(index_pair_test)
            print("index_pair_test", index_pair_test)
            
            # keep track of which components have finished
            testing_block_setupComponents = []
            for thisComponent in testing_block_setupComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "testing_block_setup" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in testing_block_setupComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "testing_block_setup" ---
            for thisComponent in testing_block_setupComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            thisExp.addData('testing_block_setup.stopped', globalClock.getTime(format='float'))
            # the Routine "testing_block_setup" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
            
            # set up handler to look after randomisation of conditions etc
            testing_loop = data.TrialHandler(nReps=999.0, method='sequential', 
                extraInfo=expInfo, originPath=-1,
                trialList=[None],
                seed=None, name='testing_loop')
            thisExp.addLoop(testing_loop)  # add the loop to the experiment
            thisTesting_loop = testing_loop.trialList[0]  # so we can initialise stimuli with some values
            # abbreviate parameter names if possible (e.g. rgb = thisTesting_loop.rgb)
            if thisTesting_loop != None:
                for paramName in thisTesting_loop:
                    globals()[paramName] = thisTesting_loop[paramName]
            
            for thisTesting_loop in testing_loop:
                currentLoop = testing_loop
                thisExp.timestampOnFlip(win, 'thisRow.t', format=globalClock.format)
                # pause experiment here if requested
                if thisExp.status == PAUSED:
                    pauseExperiment(
                        thisExp=thisExp, 
                        win=win, 
                        timers=[routineTimer], 
                        playbackComponents=[]
                )
                # abbreviate parameter names if possible (e.g. rgb = thisTesting_loop.rgb)
                if thisTesting_loop != None:
                    for paramName in thisTesting_loop:
                        globals()[paramName] = thisTesting_loop[paramName]
                
                # --- Prepare to start Routine "test_trial" ---
                continueRoutine = True
                # update component parameters for each repeat
                thisExp.addData('test_trial.started', globalClock.getTime(format='float'))
                # Run 'Begin Routine' code from testing_code
                win.mouseVisible = False
                key_press = False
                framefinish = np.nan
                random.shuffle(time_idx)
                
                target_time_data = time_names[time_idx[0]]
                target_times = times[time_idx[0]]
                targ1_time = target_times[0]
                targ2_time = target_times[1]
                
                
                foil_time_data = time_names[time_idx[1]]
                foil_times = times[time_idx[1]]
                foil1_time = foil_times[0]
                foil2_time = foil_times[1]
                print('testing_loop.thisN:', testing_loop.thisN)
                
                print("index_pair_test",index_pair_test)
                # get current group index (0, 1, or 2) for A-B, B-C, or C-D testing
                group_index = index_pair_test[testing_loop.thisN]
                print('group_index:', group_index)
                # current trial for given group (range from 0 to 5)
                trial_index = test_trial_count[group_index]
                print('trial_index:', trial_index)
                # 
                targ_pair_list = test_pair_index[group_index]
                foil_pair_list = test_foil_index[group_index]
                print('targ_pair_list:', targ_pair_list)
                # get the pairs for the current trial 
                targ_pair_idx = targ_pair_list[trial_index]
                foil_pair_idx = foil_pair_list[trial_index]
                
                # 
                group_stim_list = stim_pair_list[group_index]
                group_name = stim_list_names[group_index]
                target_stims = group_stim_list[targ_pair_idx]
                foil_stims = group_stim_list[foil_pair_idx]
                
                targ_pair1 = target_stims[0]
                targ_pair2 = target_stims[1]
                
                foil_pair1 = target_stims[0]
                foil_pair2 = foil_stims[1]
                
                # create starting attributes for key_resp_2afc
                key_resp_2afc.keys = []
                key_resp_2afc.rt = []
                _key_resp_2afc_allKeys = []
                # keep track of which components have finished
                test_trialComponents = [target_1, ISI_load_images, target_2, foil_1, foil_2, key_resp_2afc, fixation_2afc]
                for thisComponent in test_trialComponents:
                    thisComponent.tStart = None
                    thisComponent.tStop = None
                    thisComponent.tStartRefresh = None
                    thisComponent.tStopRefresh = None
                    if hasattr(thisComponent, 'status'):
                        thisComponent.status = NOT_STARTED
                # reset timers
                t = 0
                _timeToFirstFrame = win.getFutureFlipTime(clock="now")
                frameN = -1
                
                # --- Run Routine "test_trial" ---
                routineForceEnded = not continueRoutine
                while continueRoutine:
                    # get current time
                    t = routineTimer.getTime()
                    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                    # update/draw components on each frame
                    
                    # *target_1* updates
                    
                    # if target_1 is starting this frame...
                    if target_1.status == NOT_STARTED and tThisFlip >= targ1_time-frameTolerance:
                        # keep track of start time/frame for later
                        target_1.frameNStart = frameN  # exact frame index
                        target_1.tStart = t  # local t and not account for scr refresh
                        target_1.tStartRefresh = tThisFlipGlobal  # on global time
                        win.timeOnFlip(target_1, 'tStartRefresh')  # time at next scr refresh
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'target_1.started')
                        # update status
                        target_1.status = STARTED
                        target_1.setAutoDraw(True)
                    
                    # if target_1 is active this frame...
                    if target_1.status == STARTED:
                        # update params
                        pass
                    
                    # if target_1 is stopping this frame...
                    if target_1.status == STARTED:
                        # is it time to stop? (based on global clock, using actual start)
                        if tThisFlipGlobal > target_1.tStartRefresh + view_time-frameTolerance:
                            # keep track of stop time/frame for later
                            target_1.tStop = t  # not accounting for scr refresh
                            target_1.tStopRefresh = tThisFlipGlobal  # on global time
                            target_1.frameNStop = frameN  # exact frame index
                            # add timestamp to datafile
                            thisExp.timestampOnFlip(win, 'target_1.stopped')
                            # update status
                            target_1.status = FINISHED
                            target_1.setAutoDraw(False)
                    
                    # *target_2* updates
                    
                    # if target_2 is starting this frame...
                    if target_2.status == NOT_STARTED and tThisFlip >= targ2_time-frameTolerance:
                        # keep track of start time/frame for later
                        target_2.frameNStart = frameN  # exact frame index
                        target_2.tStart = t  # local t and not account for scr refresh
                        target_2.tStartRefresh = tThisFlipGlobal  # on global time
                        win.timeOnFlip(target_2, 'tStartRefresh')  # time at next scr refresh
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'target_2.started')
                        # update status
                        target_2.status = STARTED
                        target_2.setAutoDraw(True)
                    
                    # if target_2 is active this frame...
                    if target_2.status == STARTED:
                        # update params
                        pass
                    
                    # if target_2 is stopping this frame...
                    if target_2.status == STARTED:
                        # is it time to stop? (based on global clock, using actual start)
                        if tThisFlipGlobal > target_2.tStartRefresh + view_time-frameTolerance:
                            # keep track of stop time/frame for later
                            target_2.tStop = t  # not accounting for scr refresh
                            target_2.tStopRefresh = tThisFlipGlobal  # on global time
                            target_2.frameNStop = frameN  # exact frame index
                            # add timestamp to datafile
                            thisExp.timestampOnFlip(win, 'target_2.stopped')
                            # update status
                            target_2.status = FINISHED
                            target_2.setAutoDraw(False)
                    
                    # *foil_1* updates
                    
                    # if foil_1 is starting this frame...
                    if foil_1.status == NOT_STARTED and tThisFlip >= foil1_time-frameTolerance:
                        # keep track of start time/frame for later
                        foil_1.frameNStart = frameN  # exact frame index
                        foil_1.tStart = t  # local t and not account for scr refresh
                        foil_1.tStartRefresh = tThisFlipGlobal  # on global time
                        win.timeOnFlip(foil_1, 'tStartRefresh')  # time at next scr refresh
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'foil_1.started')
                        # update status
                        foil_1.status = STARTED
                        foil_1.setAutoDraw(True)
                    
                    # if foil_1 is active this frame...
                    if foil_1.status == STARTED:
                        # update params
                        pass
                    
                    # if foil_1 is stopping this frame...
                    if foil_1.status == STARTED:
                        # is it time to stop? (based on global clock, using actual start)
                        if tThisFlipGlobal > foil_1.tStartRefresh + view_time-frameTolerance:
                            # keep track of stop time/frame for later
                            foil_1.tStop = t  # not accounting for scr refresh
                            foil_1.tStopRefresh = tThisFlipGlobal  # on global time
                            foil_1.frameNStop = frameN  # exact frame index
                            # add timestamp to datafile
                            thisExp.timestampOnFlip(win, 'foil_1.stopped')
                            # update status
                            foil_1.status = FINISHED
                            foil_1.setAutoDraw(False)
                    
                    # *foil_2* updates
                    
                    # if foil_2 is starting this frame...
                    if foil_2.status == NOT_STARTED and tThisFlip >= foil2_time-frameTolerance:
                        # keep track of start time/frame for later
                        foil_2.frameNStart = frameN  # exact frame index
                        foil_2.tStart = t  # local t and not account for scr refresh
                        foil_2.tStartRefresh = tThisFlipGlobal  # on global time
                        win.timeOnFlip(foil_2, 'tStartRefresh')  # time at next scr refresh
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'foil_2.started')
                        # update status
                        foil_2.status = STARTED
                        foil_2.setAutoDraw(True)
                    
                    # if foil_2 is active this frame...
                    if foil_2.status == STARTED:
                        # update params
                        pass
                    
                    # if foil_2 is stopping this frame...
                    if foil_2.status == STARTED:
                        # is it time to stop? (based on global clock, using actual start)
                        if tThisFlipGlobal > foil_2.tStartRefresh + view_time-frameTolerance:
                            # keep track of stop time/frame for later
                            foil_2.tStop = t  # not accounting for scr refresh
                            foil_2.tStopRefresh = tThisFlipGlobal  # on global time
                            foil_2.frameNStop = frameN  # exact frame index
                            # add timestamp to datafile
                            thisExp.timestampOnFlip(win, 'foil_2.stopped')
                            # update status
                            foil_2.status = FINISHED
                            foil_2.setAutoDraw(False)
                    
                    # *key_resp_2afc* updates
                    waitOnFlip = False
                    
                    # if key_resp_2afc is starting this frame...
                    if key_resp_2afc.status == NOT_STARTED and tThisFlip >= 4.5-frameTolerance:
                        # keep track of start time/frame for later
                        key_resp_2afc.frameNStart = frameN  # exact frame index
                        key_resp_2afc.tStart = t  # local t and not account for scr refresh
                        key_resp_2afc.tStartRefresh = tThisFlipGlobal  # on global time
                        win.timeOnFlip(key_resp_2afc, 'tStartRefresh')  # time at next scr refresh
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'key_resp_2afc.started')
                        # update status
                        key_resp_2afc.status = STARTED
                        # keyboard checking is just starting
                        waitOnFlip = True
                        win.callOnFlip(key_resp_2afc.clock.reset)  # t=0 on next screen flip
                        win.callOnFlip(key_resp_2afc.clearEvents, eventType='keyboard')  # clear events on next screen flip
                    if key_resp_2afc.status == STARTED and not waitOnFlip:
                        theseKeys = key_resp_2afc.getKeys(keyList=['left','right'], ignoreKeys=["escape"], waitRelease=False)
                        _key_resp_2afc_allKeys.extend(theseKeys)
                        if len(_key_resp_2afc_allKeys):
                            key_resp_2afc.keys = _key_resp_2afc_allKeys[-1].name  # just the last key pressed
                            key_resp_2afc.rt = _key_resp_2afc_allKeys[-1].rt
                            key_resp_2afc.duration = _key_resp_2afc_allKeys[-1].duration
                            # was this correct?
                            if (key_resp_2afc.keys == str(target_time_data)) or (key_resp_2afc.keys == target_time_data):
                                key_resp_2afc.corr = 1
                            else:
                                key_resp_2afc.corr = 0
                            # a response ends the routine
                            continueRoutine = False
                    
                    # *fixation_2afc* updates
                    
                    # if fixation_2afc is starting this frame...
                    if fixation_2afc.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                        # keep track of start time/frame for later
                        fixation_2afc.frameNStart = frameN  # exact frame index
                        fixation_2afc.tStart = t  # local t and not account for scr refresh
                        fixation_2afc.tStartRefresh = tThisFlipGlobal  # on global time
                        win.timeOnFlip(fixation_2afc, 'tStartRefresh')  # time at next scr refresh
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'fixation_2afc.started')
                        # update status
                        fixation_2afc.status = STARTED
                        fixation_2afc.setAutoDraw(True)
                    
                    # if fixation_2afc is active this frame...
                    if fixation_2afc.status == STARTED:
                        # update params
                        pass
                    # *ISI_load_images* period
                    
                    # if ISI_load_images is starting this frame...
                    if ISI_load_images.status == NOT_STARTED and t >= 0-frameTolerance:
                        # keep track of start time/frame for later
                        ISI_load_images.frameNStart = frameN  # exact frame index
                        ISI_load_images.tStart = t  # local t and not account for scr refresh
                        ISI_load_images.tStartRefresh = tThisFlipGlobal  # on global time
                        win.timeOnFlip(ISI_load_images, 'tStartRefresh')  # time at next scr refresh
                        # add timestamp to datafile
                        thisExp.addData('ISI_load_images.started', t)
                        # update status
                        ISI_load_images.status = STARTED
                        ISI_load_images.start(0.5)
                    elif ISI_load_images.status == STARTED:  # one frame should pass before updating params and completing
                        # Updating other components during *ISI_load_images*
                        target_1.setImage('images/stim_' + targ_pair1 + '.png')
                        target_2.setImage('images/stim_' + targ_pair2 + '.png')
                        foil_1.setImage('images/stim_' + foil_pair1 + '.png')
                        foil_2.setImage('images/stim_' + foil_pair2 + '.png')
                        # Component updates done
                        ISI_load_images.complete()  # finish the static period
                        ISI_load_images.tStop = ISI_load_images.tStart + 0.5  # record stop time
                    
                    # check for quit (typically the Esc key)
                    if defaultKeyboard.getKeys(keyList=["escape"]):
                        thisExp.status = FINISHED
                    if thisExp.status == FINISHED or endExpNow:
                        endExperiment(thisExp, win=win)
                        return
                    
                    # check if all components have finished
                    if not continueRoutine:  # a component has requested a forced-end of Routine
                        routineForceEnded = True
                        break
                    continueRoutine = False  # will revert to True if at least one component still running
                    for thisComponent in test_trialComponents:
                        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                            continueRoutine = True
                            break  # at least one component has not yet finished
                    
                    # refresh the screen
                    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                        win.flip()
                
                # --- Ending Routine "test_trial" ---
                for thisComponent in test_trialComponents:
                    if hasattr(thisComponent, "setAutoDraw"):
                        thisComponent.setAutoDraw(False)
                thisExp.addData('test_trial.stopped', globalClock.getTime(format='float'))
                # Run 'End Routine' code from testing_code
                # store correct answer
                if key_resp_2afc.keys == target_time_data:
                    print("target")
                    corr_ans = 1
                else:
                    print("foil")
                    corr_ans = 0
                thisExp.addData('group_kind',group_name)
                thisExp.addData('targ_pos',target_time_data)
                thisExp.addData('foil_pos',foil_time_data)
                thisExp.addData('targ_pair1',('stim_' + targ_pair1))
                thisExp.addData('targ_pair2',('stim_' + targ_pair2))
                thisExp.addData('foil_pair1',('stim_' + foil_pair1))
                thisExp.addData('foil_pair2',('stim_' + foil_pair2))
                thisExp.addData('test_acc',corr_ans)
                #print(key_resp_2afc.keys)
                test_trial_count[group_index] += 1
                win.mouseVisible = False
                print("testing_loop.thisN == loopN - 1",testing_loop.thisN == loopN - 1)
                print("loopN - 1",loopN - 1)
                
                if testing_loop.thisN == loopN - 1:
                    testing_loop.finished = True
                # check responses
                if key_resp_2afc.keys in ['', [], None]:  # No response was made
                    key_resp_2afc.keys = None
                    # was no response the correct answer?!
                    if str(target_time_data).lower() == 'none':
                       key_resp_2afc.corr = 1;  # correct non-response
                    else:
                       key_resp_2afc.corr = 0;  # failed to respond (incorrectly)
                # store data for testing_loop (TrialHandler)
                testing_loop.addData('key_resp_2afc.keys',key_resp_2afc.keys)
                testing_loop.addData('key_resp_2afc.corr', key_resp_2afc.corr)
                if key_resp_2afc.keys != None:  # we had a response
                    testing_loop.addData('key_resp_2afc.rt', key_resp_2afc.rt)
                    testing_loop.addData('key_resp_2afc.duration', key_resp_2afc.duration)
                # the Routine "test_trial" was not non-slip safe, so reset the non-slip timer
                routineTimer.reset()
                
                # --- Prepare to start Routine "fix" ---
                continueRoutine = True
                # update component parameters for each repeat
                thisExp.addData('fix.started', globalClock.getTime(format='float'))
                # keep track of which components have finished
                fixComponents = [fixation_fb]
                for thisComponent in fixComponents:
                    thisComponent.tStart = None
                    thisComponent.tStop = None
                    thisComponent.tStartRefresh = None
                    thisComponent.tStopRefresh = None
                    if hasattr(thisComponent, 'status'):
                        thisComponent.status = NOT_STARTED
                # reset timers
                t = 0
                _timeToFirstFrame = win.getFutureFlipTime(clock="now")
                frameN = -1
                
                # --- Run Routine "fix" ---
                routineForceEnded = not continueRoutine
                while continueRoutine and routineTimer.getTime() < 0.15:
                    # get current time
                    t = routineTimer.getTime()
                    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                    # update/draw components on each frame
                    
                    # *fixation_fb* updates
                    
                    # if fixation_fb is starting this frame...
                    if fixation_fb.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                        # keep track of start time/frame for later
                        fixation_fb.frameNStart = frameN  # exact frame index
                        fixation_fb.tStart = t  # local t and not account for scr refresh
                        fixation_fb.tStartRefresh = tThisFlipGlobal  # on global time
                        win.timeOnFlip(fixation_fb, 'tStartRefresh')  # time at next scr refresh
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'fixation_fb.started')
                        # update status
                        fixation_fb.status = STARTED
                        fixation_fb.setAutoDraw(True)
                    
                    # if fixation_fb is active this frame...
                    if fixation_fb.status == STARTED:
                        # update params
                        pass
                    
                    # if fixation_fb is stopping this frame...
                    if fixation_fb.status == STARTED:
                        # is it time to stop? (based on global clock, using actual start)
                        if tThisFlipGlobal > fixation_fb.tStartRefresh + 0.15-frameTolerance:
                            # keep track of stop time/frame for later
                            fixation_fb.tStop = t  # not accounting for scr refresh
                            fixation_fb.tStopRefresh = tThisFlipGlobal  # on global time
                            fixation_fb.frameNStop = frameN  # exact frame index
                            # add timestamp to datafile
                            thisExp.timestampOnFlip(win, 'fixation_fb.stopped')
                            # update status
                            fixation_fb.status = FINISHED
                            fixation_fb.setAutoDraw(False)
                    
                    # check for quit (typically the Esc key)
                    if defaultKeyboard.getKeys(keyList=["escape"]):
                        thisExp.status = FINISHED
                    if thisExp.status == FINISHED or endExpNow:
                        endExperiment(thisExp, win=win)
                        return
                    
                    # check if all components have finished
                    if not continueRoutine:  # a component has requested a forced-end of Routine
                        routineForceEnded = True
                        break
                    continueRoutine = False  # will revert to True if at least one component still running
                    for thisComponent in fixComponents:
                        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                            continueRoutine = True
                            break  # at least one component has not yet finished
                    
                    # refresh the screen
                    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                        win.flip()
                
                # --- Ending Routine "fix" ---
                for thisComponent in fixComponents:
                    if hasattr(thisComponent, "setAutoDraw"):
                        thisComponent.setAutoDraw(False)
                thisExp.addData('fix.stopped', globalClock.getTime(format='float'))
                # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
                if routineForceEnded:
                    routineTimer.reset()
                else:
                    routineTimer.addTime(-0.150000)
                thisExp.nextEntry()
                
                if thisSession is not None:
                    # if running in a Session with a Liaison client, send data up to now
                    thisSession.sendExperimentData()
            # completed 999.0 repeats of 'testing_loop'
            
            thisExp.nextEntry()
            
            if thisSession is not None:
                # if running in a Session with a Liaison client, send data up to now
                thisSession.sendExperimentData()
        # completed 2.0 repeats of 'testing_loop_rep'
        
        
        # --- Prepare to start Routine "between_blocks_break" ---
        continueRoutine = True
        # update component parameters for each repeat
        thisExp.addData('between_blocks_break.started', globalClock.getTime(format='float'))
        # keep track of which components have finished
        between_blocks_breakComponents = [text_countdown]
        for thisComponent in between_blocks_breakComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "between_blocks_break" ---
        routineForceEnded = not continueRoutine
        while continueRoutine and routineTimer.getTime() < 10.0:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *text_countdown* updates
            
            # if text_countdown is starting this frame...
            if text_countdown.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                text_countdown.frameNStart = frameN  # exact frame index
                text_countdown.tStart = t  # local t and not account for scr refresh
                text_countdown.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(text_countdown, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'text_countdown.started')
                # update status
                text_countdown.status = STARTED
                text_countdown.setAutoDraw(True)
            
            # if text_countdown is active this frame...
            if text_countdown.status == STARTED:
                # update params
                text_countdown.setText(str(10-int(t)), log=False)
            
            # if text_countdown is stopping this frame...
            if text_countdown.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > text_countdown.tStartRefresh + 10-frameTolerance:
                    # keep track of stop time/frame for later
                    text_countdown.tStop = t  # not accounting for scr refresh
                    text_countdown.tStopRefresh = tThisFlipGlobal  # on global time
                    text_countdown.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'text_countdown.stopped')
                    # update status
                    text_countdown.status = FINISHED
                    text_countdown.setAutoDraw(False)
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in between_blocks_breakComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "between_blocks_break" ---
        for thisComponent in between_blocks_breakComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        thisExp.addData('between_blocks_break.stopped', globalClock.getTime(format='float'))
        # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
        if routineForceEnded:
            routineTimer.reset()
        else:
            routineTimer.addTime(-10.000000)
        thisExp.nextEntry()
        
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
    # completed 2.0 repeats of 'testing_blocks'
    
    
    # --- Prepare to start Routine "finished" ---
    continueRoutine = True
    # update component parameters for each repeat
    thisExp.addData('finished.started', globalClock.getTime(format='float'))
    # create starting attributes for end_key_resp
    end_key_resp.keys = []
    end_key_resp.rt = []
    _end_key_resp_allKeys = []
    # keep track of which components have finished
    finishedComponents = [thank_you, end_key_resp]
    for thisComponent in finishedComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "finished" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *thank_you* updates
        
        # if thank_you is starting this frame...
        if thank_you.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            thank_you.frameNStart = frameN  # exact frame index
            thank_you.tStart = t  # local t and not account for scr refresh
            thank_you.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(thank_you, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'thank_you.started')
            # update status
            thank_you.status = STARTED
            thank_you.setAutoDraw(True)
        
        # if thank_you is active this frame...
        if thank_you.status == STARTED:
            # update params
            pass
        
        # *end_key_resp* updates
        waitOnFlip = False
        
        # if end_key_resp is starting this frame...
        if end_key_resp.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            end_key_resp.frameNStart = frameN  # exact frame index
            end_key_resp.tStart = t  # local t and not account for scr refresh
            end_key_resp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(end_key_resp, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'end_key_resp.started')
            # update status
            end_key_resp.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(end_key_resp.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(end_key_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if end_key_resp.status == STARTED and not waitOnFlip:
            theseKeys = end_key_resp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
            _end_key_resp_allKeys.extend(theseKeys)
            if len(_end_key_resp_allKeys):
                end_key_resp.keys = _end_key_resp_allKeys[-1].name  # just the last key pressed
                end_key_resp.rt = _end_key_resp_allKeys[-1].rt
                end_key_resp.duration = _end_key_resp_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in finishedComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "finished" ---
    for thisComponent in finishedComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    thisExp.addData('finished.stopped', globalClock.getTime(format='float'))
    # check responses
    if end_key_resp.keys in ['', [], None]:  # No response was made
        end_key_resp.keys = None
    thisExp.addData('end_key_resp.keys',end_key_resp.keys)
    if end_key_resp.keys != None:  # we had a response
        thisExp.addData('end_key_resp.rt', end_key_resp.rt)
        thisExp.addData('end_key_resp.duration', end_key_resp.duration)
    thisExp.nextEntry()
    # the Routine "finished" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # mark experiment as finished
    endExperiment(thisExp, win=win)


def saveData(thisExp):
    """
    Save data from this experiment
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    """
    filename = thisExp.dataFileName
    # these shouldn't be strictly necessary (should auto-save)
    thisExp.saveAsWideText(filename + '.csv', delim='auto')
    thisExp.saveAsPickle(filename)


def endExperiment(thisExp, win=None):
    """
    End this experiment, performing final shut down operations.
    
    This function does NOT close the window or end the Python process - use `quit` for this.
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    win : psychopy.visual.Window
        Window for this experiment.
    """
    if win is not None:
        # remove autodraw from all current components
        win.clearAutoDraw()
        # Flip one final time so any remaining win.callOnFlip() 
        # and win.timeOnFlip() tasks get executed
        win.flip()
    # mark experiment handler as finished
    thisExp.status = FINISHED
    # shut down eyetracker, if there is one
    if deviceManager.getDevice('eyetracker') is not None:
        deviceManager.removeDevice('eyetracker')
    logging.flush()


def quit(thisExp, win=None, thisSession=None):
    """
    Fully quit, closing the window and ending the Python process.
    
    Parameters
    ==========
    win : psychopy.visual.Window
        Window to close.
    thisSession : psychopy.session.Session or None
        Handle of the Session object this experiment is being run from, if any.
    """
    thisExp.abort()  # or data files will save again on exit
    # make sure everything is closed down
    if win is not None:
        # Flip one final time so any remaining win.callOnFlip() 
        # and win.timeOnFlip() tasks get executed before quitting
        win.flip()
        win.close()
    # shut down eyetracker, if there is one
    if deviceManager.getDevice('eyetracker') is not None:
        deviceManager.removeDevice('eyetracker')
    logging.flush()
    if thisSession is not None:
        thisSession.stop()
    # terminate Python process
    core.quit()


# if running this experiment as a script...
if __name__ == '__main__':
    # call all functions in order
    expInfo = showExpInfoDlg(expInfo=expInfo)
    thisExp = setupData(expInfo=expInfo)
    logFile = setupLogging(filename=thisExp.dataFileName)
    win = setupWindow(expInfo=expInfo)
    setupDevices(expInfo=expInfo, thisExp=thisExp, win=win)
    run(
        expInfo=expInfo, 
        thisExp=thisExp, 
        win=win,
        globalClock='float'
    )
    saveData(thisExp=thisExp)
    quit(thisExp=thisExp, win=win)
