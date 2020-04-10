import soundcard as sc
import torchaudio as ta
import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from random import randint

from note_model import *
from zach_visualization import *

import IPython.display as ipd


mic = sc.default_microphone()
speaker = sc.default_speaker()
print(mic,speaker)
SR = 16000     # highest piano note is ~4k, shouldn't need more than double that range
NMELS = 256    # set by the model, don't change here
# c = Cube(6)

def mel_scale(data, SR=16000, NFFT=4095, N_MELS=256):
    """ converts spectrum to MEL spectrum without using librosa/torchaudio because they're broken on Jetson
        Note: only works with single channel
        Arguments:
            SR: sample rate
            NFFT: length of FFT (except *2-1 because of implementation?)
            N_MELS: size of output vector
    """
    low_freq_mel = 0
    high_freq_mel = (2595 * np.log10(1 + (SR / 2) / 700))  # Convert Hz to Mel
    mel_points = np.linspace(low_freq_mel, high_freq_mel, N_MELS + 2)  # Equally spaced in Mel scale
    hz_points = (700 * (10**(mel_points / 2595) - 1))  # Convert Mel to Hz
    bin = np.floor((NFFT + 1) * hz_points / SR)

    fbank = np.zeros((N_MELS, int(np.floor(NFFT / 2 + 1))))
    for m in range(1, N_MELS + 1):
        f_m_minus = int(bin[m - 1])   # left
        f_m = int(bin[m])             # center
        f_m_plus = int(bin[m + 1])    # right

        for k in range(f_m_minus, f_m):
            fbank[m - 1, k] = (k - bin[m - 1]) / (bin[m] - bin[m - 1])
        for k in range(f_m, f_m_plus):
            fbank[m - 1, k] = (bin[m + 1] - k) / (bin[m + 1] - bin[m])
    filter_banks = np.dot(data, fbank.T)
    filter_banks = np.where(filter_banks == 0, np.finfo(float).eps, filter_banks)  # Numerical Stability
    filter_banks = 20 * np.log10(filter_banks)  # dB
    return filter_banks

def make_frame(l_vec, r_vec, genre, thresh):
    """
    Creates a frame for visualization stack out of left and right machine learning outputs
    Arguments:
        l_vec: velocity vector for left channel
        r_vec: velocity vector for right channel
        genre: genre to pass through to frame
        thresh: velocity value under which to ignore note
    """
    notes = []

    pans = torch.round(63.5 + torch.clamp(r_vec / l_vec, -63, 63))
    velocities = torch.max(torch.cat((l_vec.unsqueeze(1), r_vec.unsqueeze(1)), dim=1), dim=1).values
    for pitch in range(velocities.shape[0]):
        if 127 >= velocities[pitch].item() >= thresh:
            notes.append(Note(velocities[pitch].item(), pitch, pans[pitch].item()))

    frame = Frame(notes, genre)
    return frame

def doTheThing():
    g = Genre('default')
    mean_val = 0
    with mic.recorder(samplerate=SR, blocksize=32) as m:
        #for j in range(SR//2048*30):
        while True:
            data = m.record(numframes=2048) + 0.0001
            data /= np.max(np.abs(data))
            fframe = np.abs(np.fft.rfft(data))
            fframe = np.log(np.clip(fframe, 1e-5, None))
            lframe = mel_scale(np.abs(fframe[:,0]))
            rframe = mel_scale(np.abs(fframe[:,0]))
            mean_val = np.mean(lframe)
            offset = 20
            lout = torch.from_numpy(lframe[offset:128+offset])
            rout = torch.from_numpy(rframe[offset:128+offset])
            f = make_frame(lout.detach(), rout.detach(), g, thresh=10)
            print(f.notes)
            print(data)
            # c.process_frame(f)
            # c.display()

def doTest():
    #notes = [Note(64,i,64) for i in range(0, 72+0)]
    for i in range(12, 127):
        print(f"i: {i}")
        notes = [Note(127, i, 64)]
        f = Frame(notes, Genre('default'))
        print(f.notes)
        # c.clear()
        # c.process_frame(f)
        # c.display()
        time.sleep(0.1)

def doAnimation():
    c.arduino.testAnimation(c.size**3)

# doAnimation()
# doTest()
# doTheThing()

print('recording\n')
data = mic.record(samplerate=44100, numframes=44100*10) + 0.0000001
print('playing\n')
speaker.play(data/np.max(data), samplerate=44100)
