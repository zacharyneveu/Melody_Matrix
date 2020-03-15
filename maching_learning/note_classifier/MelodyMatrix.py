import numpy as np
#from color_code_2 import color_code
#from midi_note import midi_note
# Note holds velocity and pitch values along with ways to access them in
# velocity, octave, note letter format


class Note:

    def __init__(self, velocity, pitch, pan):
        self.pitch = pitch
        self.velocity = velocity
        self.pan = pan
        assert 0 <= pitch <= 127,       "Pitch must be between 0 and 127"
        # what does velocity do here?
        assert 0 <= velocity <= 127, "Velocity must be between 0 and 127"


class Genre:

    def __init__(self, g):
        self.possible_genres = {0: 'Pop', 1: 'Blues', 2: 'Folk', 3: 'Rock',
                                4: 'Hip-Hop', 5: 'EDM', 6: 'R&B', 7: 'Classical', 8: 'Default'}
        if type(g) is int:
            self.genre = self.possible_genres[g]
        else:
            self.genre = g
        assert self.genre in self.possible_genres.values(), "Genre does not exist"

# Frame holds a list of notes and a genre


class Frame:
    def __init__(self, notes, genre):
        self.notes = notes
        assert type(notes[0]) is Note, "notes should be an array of type `Note`"
        self.genre = genre
        assert type(genre) is Genre, "genre should be of type Genre"