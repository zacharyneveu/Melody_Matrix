import torch
import torch.nn as nn
import torch.nn.functional as F

def encoder_block(sizes, i, kernel_size, padding):
    return nn.Sequential(
        nn.Conv1d(sizes[i-1][1], sizes[i][1], kernel_size, 2, padding, dilation=1),
        nn.BatchNorm1d(sizes[i][1]),
        nn.Tanh(),
        nn.Dropout(0.1)
    )

class Audio2Midi(nn.Module):
    def __init__(self, kernel_size):
        super(Audio2Midi, self).__init__()
        sizes = [(256, 64), (128, 128), (64, 64), (32, 32), (16, 16)]
        self.sizes = sizes
        padding = kernel_size // 2
        self.input = nn.Conv1d(1, sizes[0][1], kernel_size, 1, padding)
        
        self.encoder = nn.Sequential(
            *[encoder_block(sizes, i, kernel_size, padding) for i in range(1, len(sizes))]
        )
        
        self.linear = nn.Linear(sizes[-1][0]*sizes[-1][1], 88)
        self.rnn = nn.GRU(128, 88)
        self.rnn_state = None
        
    def forward(self, x):
        x = self.input(x)
        #print(x.shape)
        for l in self.encoder:
            x = l(x)
            #print(x.shape)
        x = x.flatten(1)
        #print(x.shape)
        x = self.linear(x)
        #x,self.rnn_state = self.rnn(x.unsqueeze(0))
        #print(x.shape)
        return F.relu(x).squeeze(0)
    
