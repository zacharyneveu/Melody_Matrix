
# Pytorch Stuff
import torch
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms, utils
import torch.nn as nn
import torch.nn.functional as F
import torchaudio as ta
import torchaudio.functional as taf

# Librosa for audio stuff/plotting spectrograms
import numpy as np
import librosa as lr
from librosa.display import *


# Plotting
import matplotlib.pyplot as plt
import matplotlib
matplotlib.rcParams['figure.figsize'] = [10, 8]

# Utilities
from IPython.display import Audio
from tqdm import tqdm_notebook as tqdm # progress bars
import random
from pathlib import Path
Path.ls = lambda x: list(x.iterdir())
