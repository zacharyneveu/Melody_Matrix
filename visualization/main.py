import numpy as np
from color_code_2 import color_code
from midi_note import midi_note
# Note holds velocity and pitch values along with ways to access them in
# velocity, octave, note letter format


class Note:

    def __init__(self, velocity, pitch):
        self.pitch = pitch
        self.velocity = velocity
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
        assert type(notes) is Note, "notes should be an array of type `Note`"
        self.genre = genre
        assert type(genre) is Genre, "genre should be of type Genre"

# Frames can have multiple notes
frame_test = Frame(Note(64, 74), Genre("Blues"))

# Frames can have no notes at all ???
# ERROR HERE
# frame_test_2 = Frame([], Genre(1))

# these two list are to get the x-value
note_list1 = ["C", "C#", "D", "D#", "E", "F"]
note_list2 = ["B", "A#", "A", "G#", "G", "F#"]

# this list is to get the responding index of color hex code
note_color_list = ["C", "C#", "D", "D#", "E",
                   "F", "B", "A#", "A", "G#", "G", "F#"]

# depending on the note value, the range of y varies
y_range1 = [0, 1, 2]
y_range2 = [5, 4, 3]
note_y = []

# matrix_array will be ued to store the hex code
# data type is tr
matrix_array = np.zeros((6, 6, 6))
matrix_array = matrix_array.astype('str')


"""
This is to get the value of x
"""


def x_value(node_value):
    if node_value in note_list1:
        return (note_list1.index(node_value))
    else:
        return (note_list2.index(node_value))


"""
the value of z can be decided by the value of ocatve
since octave ranging from 1 to 6, and the value of z rangeing from 0 to 5
z = octave - 1;
"""

# the value of y will be decided by occupied places


def y_value(node_value, note_x):
    if node_value in note_list1:
        note_y = y_range1
    else:
        note_y = y_range2

    if(matrix_array[note_x][note_y[0]][0] == 0):
        y_value = note_y[0]
    elif(matrix_array[note_x][note_y[1]][0] == 0):
        y_value = note_y[1]
    elif (matrix_array[note_x][note_y[2]][0] == 0):
        y_value = note_y[2]
    else:
        # if all three stacks were occupied, then the new note takes the first
        # stack
        y_value = note_y[0]
        # the other two stack needs to be cleaned for the future use
        # clearStack(node.x, 1)
        # clearStack(node.y, 2)
    return y_value
# after confirm the x, y, z value,
# there should also be a function to color the relevant codes


def colorStack(node_x, node_y, z):
    # write something
    print("1")


def clearStack(node_x, node_y):
    # write something
    print("1")


def fadeStack(x, y, z):
    # write something
    print("1")


def genre_to_color(genre_name, node_index):
    return color_code[genre_name.lower()][node_index]


# use the midi number to get the octave value
def midi_to_octave(midi_num):
    raw_note = midi_note[midi_num]
    return raw_note[len(raw_note) - 1]


# use the midi number to get the music note value
def midi_to_note(midi_num):
    raw_note = midi_note[midi_num]
    if(len(raw_note) == 2):
        return raw_note[0]
    else:
        return raw_note[0:2]


def coords2Index(x, y, z):
    if(x % 2 == 1):
        i = 6 * x + (5 - y % 6) + 36 * z
    else:
        i = 6 * x + y + 36 * z
    return i

def traverseMatrix(matrix_array):
	color_list = [None] * 216
	for z in range(6):
		for y in range(6):
			for x in range(6):
				color_list[coords2Index(x,y,z)] = matrix_array[z][y][x]

	return color_list


"""
This will be the function receiving the input and executing
"""


def test_function(frame_note):
    pitch_value = frame_note.notes.pitch
    genre_value = frame_note.genre.genre
    print('This is the pitch number we got from frame_test: ',
          pitch_value)
    print('and this is the genre we got: ', genre_value)
    # Frames can have multiple notes
    # frame_test = Frame(Note(64, 74), Genre("Blues"))
    # print(type(frame_test.notes.pitch))
    print('')
    print('After look up in the midi_note dictionary, we could know that')
    octave_num = midi_to_octave(str(pitch_value))
    print('The octave number of this pitch is: ', octave_num)

    note_num = midi_to_note(str(pitch_value))
    print('The relevant music note is: ', note_num)
    # note_color_list = ["C", "C#", "D", "D#", "E", "F", "B", "A#", "A", "G#",
    # "G", "F#"]
    # print(note_color_list.index(note_num))
    print('')
    print('Based on the genre provided, ')
    color_num = genre_to_color(
        genre_value, note_color_list.index(note_num))
    print('we know the color hex code is: ', color_num)

    print('')
    print('The value of node and octave can help decide on the spatial value')
    note_x = x_value(note_num)
    print('This will be the value of x: ', x_value(note_num))

    note_y = y_value(note_num, note_x)
    print('This will be the value of y: ', y_value(note_num, note_x))

    note_z = int(octave_num) - 1
    print('This will be the value of z: ', note_z)

    # stores the color code to the 3d matrix
    matrix_array[note_z][note_y][note_x] = color_num


# if __name__ == "__main__":
#     main()

# frame_test = Frame(Note(64, 74), Genre("Blues"))
test_function(frame_test)
print(matrix_array)
output_list = traverseMatrix(matrix_array)
print(output_list)
# X = 2, Y =0, Z = 4, 
# X%2 !== 1 => 
# 6 * X + Y + 36 * Z = 12 + 0 + 144 = 156
print(output_list.index('484F5E'))