import numpy as np
import webcolors
from color_code import color_code
from random import randint
import json
import time, threading
# from kelvin_test_com import runTest
# Note holds velocity and pitch values along with ways to access them in
# velocity, octave, note letter format


class Note:

    def __init__(self, velocity, pitch, channel):
        self.pitch = pitch
        self.velocity = velocity
        self.channel = channel
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
frame_test = Frame(Note(64, 74, 120), Genre("Blues"))

# Frames can have no notes at all ???
# ERROR HERE
# frame_test_2 = Frame([], Genre(1))

# These two lists are for the x-value look-up
note_list1 = ["C", "C#", "D", "D#", "E", "F"]
note_list2 = ["B", "A#", "A", "G#", "G", "F#"]

# This list is for the color_index look-up
note_color_list = ["C", "C#", "D", "D#", "E",
"F", "B", "A#", "A", "G#", "G", "F#"]
 
# Depending on the note value, the range of y varies
y_range1 = [0, 1, 2]
y_range2 = [5, 4, 3]
note_y = []

# The matrix_array(str) will be ued to store the hex code
matrix_array = np.zeros((6, 6, 6))
matrix_array = matrix_array.astype('str')

tem_array = np.zeros((6, 6, 6))
tem_array = matrix_array.astype('str')

default_color = '255,255,255.'
channel_visualCase = 0
brightLevel = 0


def x_value(node_value):
    """this function returns the x-value of the relevant note

    Note:
                    note_list1 and note_list2 are pre-defined const arrays

    Args:
                    note_value(string): the note number, such as "C", "C#", "D"

    Returns:
                    index(int): the x-value of relevant note
                    """
    if node_value in note_list1:
        return (note_list1.index(node_value))
    else:
        return (note_list2.index(node_value))

def y_value(node_value):
    """this function returns the x-value of the relevant note

    Note:
                    note_y, y_range1, y_range2 are pre-defined arrays

    Args:
                    note_value(string): the note number, such as "C", "C#", "D"

    Returns:
                    note_y[index](int): the y-value of relevant note
                    """
    if node_value in note_list1:
        return y_range1[0]
    else:
        return y_range2[0]


"""
The value of z can be decided by the value of ocatve
since octave ranging from 1 to 6, and the value of z rangeing from 0 to 5
so z = octave - 1;
"""

def str_to_rgb(color_string):
    """ this function converts the color string to 3 rgb values in a list
            Args:
                    color_string(str): the string thats stored in the matrix_array, format: "r_value, g_value, b_value."
            Returns:
                    tem(str): a list of 3
                    """
    tem = color_string.split(",", 2)
    tem[2] = tem[2][:len(tem[2]) - 1]
    for i in range(3):
        tem[i] = int(tem[i])
        return tem

def rgb_to_str(rgb_list):
    return str(rgb_list[0]) + ',' + str(rgb_list[1]) + ',' + str(rgb_list[2])


def colorStack(x_value, y_value, z_value, color_code):
    """This function will store the color_code in relevant position in the matrix_array
                    and the positions that shares same x_value and y_value, but has smaller z_values

    Args:
                    x_value(int): the x_value of the note
                    y_value(int): the y_value of the note
                    z_value(int): the z_value of the note
                    color_code(string): the relevant color_code of the note,
                    """
    if matrix_array[0][y_value][x_value] != '0.0':
        for i in range(6):
            matrix_array[i][y_value][x_value] = '0, 0, 0.'
            
    for i in range(z_value+1):
        matrix_array[i][y_value][x_value] = rgb_to_str(color_code)

def clearStack(node_x, node_y):
    # write something
    print("1")

def fadeStack(x, y, z):
    # write something
    print("1")

def genre_to_color(genre_name, node_num):
    """this function looks up and return the color code
                    based on the genre name and the index of node_value

    Args:
                    genre_name(string): the genre name
                    node_index(int): the relevant node_index based on node_value,
                                                                                                    e.g. node_index of 'C' would be 0

    Returns:
                    color_code(string): the relevant hex color code

                    """
    hex_code = color_code[genre_name.lower()][note_color_list.index(node_num)]
    rgb_code = webcolors.hex_to_rgb(hex_code)
    return rgb_code
    # color_string = rgb_to_str(rgb_code)
    # return color_string
    

def midi_to_octave(midi_num):
    """ this function returns the octave num based on midi_num

    Args:
                midi_num(int): the midi number we got from the pitch property of frame

    Returns:
            octave(int): the relevant octave, ranging from 1 to 6
    """
    midi_num = int(midi_num)
    if midi_num <= 35:
            return 1
    elif midi_num >= 36 and midi_num <= 47:
        return 2
    elif midi_num >= 48 and midi_num <= 59:
        return 3
    elif midi_num >= 60 and midi_num <= 71:
        return 4
    elif midi_num >= 72 and midi_num <= 83:
        return 5
    else:
        return 6

def midi_to_note(midi_num):
    """ this function returns the node value based on midi_num

    Args:
                midi_num(int): the midi number we got from the pitch property of frame

    Returns:
                node_value(string): the relevant node value, including 'C', 'C#', ... 'A', 'B'
    """
    tem = int(midi_num) % 12
    return note_color_list[tem]

def coords2Index(x, y, z):
    """ coverts the x, y, z value of a node to the index

    Args:
                x(int): x_value
                y(int): y_value
                z(int): z_value

    Returns:
                index(int): the index in the output array
    """
    if(x % 2 == 1):
        i = 6 * x + (5 - y % 6) + 36 * z
    else:
        i = 6 * x + y + 36 * z
        return i

def traverseMatrix(matrix_array):
    """ this function travser the matrix and put the value in the output array

                Notes:
                                the coords2Index() calculate the relevant index of node based on their x, y, z value

                Args:
                                matrix_array(string): the 3D array that stores the hex color code

                Returns:
                                color_list(string): an array that contains the hex color code
    """
    tem_string = ''
    color_list = [None] * 216
    for z in range(6):
        for y in range(6):
            for x in range(6):
                if(matrix_array[z][y][x] == '0.0'):
                    color_list[coords2Index(x, y, z)] = '0,0,0.'
                else:
                    color_list[coords2Index(x, y, z)] = matrix_array[z][y][x]

                    return '<' + tem_string.join(color_list) + '>'

def velocity_to_brightLevel(note_velocity):
    """this function will decide on the brightLevel based on the velocity value of node

                Args:
                                note_velocity(int): the velocity value of node

                Returns:
                                brightLevel(int): the brightLevel that decides on
                                 how much a color code will be brightened or darkened

    """
    if note_velocity < 26:
        return -1
    elif note_velocity < 52 and note_velocity >= 26:
        return 0
    elif note_velocity < 78 and note_velocity >= 52:
        return 1
    elif note_velocity < 104 and note_velocity >= 78:
        return 2
        return 3

def hexcode_Brightness(color_string, level_num):
    """this function takes in one color string
                and produce the relevant color code in certain brightness level

                Args:
                                hex_color(string): the hex color code of node
                                level_num(int): the brightLevel that decides on
                                                                 how much a color code will be brightened or darkened

                Returns:
                                tem_hex_color(string): the hex color code of node that has been adjusted
    """
    tem_list = str_to_rgb(color_string)
    for i in range(len(tem_list)):
        tem_list[i] += level_num * 25
        if(tem_list[i] > 255):
            tem_list[i] = 255
            if(tem_list[i] < 0):
                tem_list[i] = 0

                tem_string = rgb_to_str(tem_list)

    return tem_string


def hexcode_brightness_dynamic(color_string, velocity_value):
    """this function takes in one color string
                and produce the relevant color code in certain brightness level

                Args:
                                hex_color(string): the hex color code of node
                                velocity_value(int): the velocity value of a node,
                                                                        the difference between 26 and velocity decides on how
                                                                        the brghtness of color will be changed

                Returns:
                                tem_hex_color(string): the hex color code of node that has been adjusted
    """
    tem_list = str_to_rgb(color_string)
    param = velocity_value - 26
    for i in range(len(tem_list)):
        tem_list[i] += param
        if(tem_list[i] > 255):
            tem_list[i] = 255
            if(tem_list[i] < 0):
                tem_list[i] = 0

                tem_string = rgb_to_str(tem_list)

                return tem_string


def channelCase(channel_num):
    """this function decides on which case will be used for channel visualization
        based on channel number

                Args:
                                channel_num: the channel value of a node


                Returns:
                                case number(int): the case number representing the channel visualization case
    """
    if channel_num >= 0 and channel_num <= 13:
        return 0
    elif channel_num >= 14 and channel_num <= 38:
        return 1
    elif channel_num >= 39 and channel_num <= 63:
        return 2
    elif channel_num >= 64 and channel_num <= 88:
        return 3
    elif channel_num >= 89 and channel_num <= 113:
        return 4
    else:
        return 5

default_color = str_to_rgb(default_color)
def channel_to_stack(case_num):
    """this function takes in case number and visualize the channel

    Args:
        case_num(int): the case number representing the channel visualization case
    """

    if(case_num == 0):
        for i in range(6):
            colorStack(5, 0, i, default_color)
            colorStack(4, 1, i, default_color)
            colorStack(3, 2, i, default_color)
            colorStack(2, 3, i, default_color)
            colorStack(1, 4, i, default_color)
            colorStack(0, 5, i, default_color)

    if(case_num == 1):
        for i in range(6):
            colorStack(4, 0, i, default_color)
            colorStack(5, 1, i, default_color)
            colorStack(4, 2, i, default_color)
            colorStack(3, 3, i, default_color)
            colorStack(2, 4, i, default_color)
            colorStack(1, 5, i, default_color)

    if(case_num == 2):
        for i in range(6):
            colorStack(3, 0, i, default_color)
            colorStack(4, 1, i, default_color)
            colorStack(5, 2, i, default_color)
            colorStack(4, 3, i, default_color)
            colorStack(3, 4, i, default_color)
            colorStack(2, 5, i, default_color)

    if(case_num == 3):
        for i in range(6):
            colorStack(2, 0, i, default_color)
            colorStack(3, 1, i, default_color)
            colorStack(4, 2, i, default_color)
            colorStack(5, 3, i, default_color)
            colorStack(4, 4, i, default_color)
            colorStack(3, 5, i, default_color)

    if(case_num == 4):
        for i in range(6):
            colorStack(1, 0, i, default_color)
            colorStack(2, 1, i, default_color)
            colorStack(3, 2, i, default_color)
            colorStack(4, 3, i, default_color)
            colorStack(5, 4, i, default_color)
            colorStack(4, 5, i, default_color)

    if(case_num == 5):
        for i in range(6):
            colorStack(0, 0, i, default_color)
            colorStack(1, 1, i, default_color)
            colorStack(2, 2, i, default_color)
            colorStack(3, 3, i, default_color)
            colorStack(4, 4, i, default_color)
            colorStack(5, 5, i, default_color)

def frame_generator(genre_name):
    """
    Output: a random frame class
    """
    test_note = Note(randint(0, 127), randint(0, 127), randint(0, 127))
    return Frame(test_note, Genre(genre_name))

def frame_visualization():
    """ this function receives one frame, and store all the relevant color in the array

        Args:
                frame_note: the variable of class frame
    """
    frame_note = frame_generator('Pop')

    pitch_value = frame_note.notes.pitch
    genre_value = frame_note.genre.genre
    channel_value = frame_note.notes.channel
    velocity_value = frame_note.notes.velocity
    
    # octave and node number can be decided by pitch
    octave_num = midi_to_octave(str(pitch_value))
    note_num = midi_to_note(str(pitch_value))
   
    # brightness is decided by velocity
    # brightLevel = velocity_to_brightLevel(velocity_value)

    # channel_visualCase = channelCase(channel_value)
    # channel_to_stack(channel_visualCase)

    print('')
    print('Based on the genre provided, ')
    color_string = genre_to_color(
        genre_value, note_num)
    print('we know the color string is: ', color_string)

    
    # color_num1 = hexcode_Brightness(color_string, brightLevel)
    # color_num2 = hexcode_brightness_dynamic(color_string, velocity_value)
    

    print('')
    print('The value of node and octave can help decide on the spatial value')
    note_x = x_value(note_num)
    print('This will be the value of x: ', x_value(note_num))

    note_y = y_value(note_num)
    print('This will be the value of y: ', note_y)

    note_z = int(octave_num) - 1
    print('This will be the value of z: ', note_z)
    colorStack(note_x, note_y, note_z, color_string)

    temDict = matrixToDictionary(matrix_array)
    #print('This is the dict \n', temDict)
    print(matrix_array)

    with open("data.json", "w") as outfile:
            json.dump(temDict, outfile)


def test_array_generator(genre_name):
    """ this function generates a complete array for visualization testing

    Args:
        genre_name(string): the name of the music genre
    """
    for i in range(6):
        tem_hex_code = color_code[genre_name.lower()][i]
        tem_rgb_code = webcolors.hex_to_rgb(tem_hex_code)

# color_string = rgb_to_str(tem_rgb_code)
    for j in range(3):
        colorStack(i, j, 5, tem_rgb_code)

    for m in range(6):
        tem_hex_code = color_code[genre_name.lower()][11 - m]
        tem_rgb_code = webcolors.hex_to_rgb(tem_hex_code)
        for n in range(3):
            colorStack(m, 5 - n, 5, tem_rgb_code)


def traverseMatrixII(sample_matrix):
    """this function traverse the matrix for the purpose of rendering on web

    """
    color_list = []
    for z in range(6):
        for y in range(6):
            for x in range(6):
                color_list.append(sample_matrix[z][y][x])
    return color_list


def matrixToDictionary(sample_matrix):
    """this functions takes in a 3d np-array and covert it into a dictionary

    Args: 
    sample_matrix, a 3-dimesional np-array
    """
    dicOfDicts = {}
    tem = []
    for m in range(0, 6):
        arr = sample_matrix[m]
        dictOfWords = {i: list(arr[i]) for i in range(0, len(arr))}
        tem.append(dictOfWords)
    
    dictOfDicts = {j: tem[j] for j in range(0, len(tem))}
    return(dictOfDicts)


def action():
    print('action ! -> time : {:.1f}s'.format(time.time()-StartTime))


class setInterval:
    def __init__(self, interval, action):
        self.interval = interval
        self.action = action
        self.stopEvent = threading.Event()
        thread = threading.Thread(target=self.__setInterval)
        thread.start()

    def __setInterval(self):
        nextTime = time.time()+self.interval
        while not self.stopEvent.wait(nextTime-time.time()):
            nextTime += self.interval
            self.action()

    def cancel(self):
        self.stopEvent.set()

StartTime = time.time()

def main():
    # test_array_generator('pop')
    # temDict = matrixToDictionary(matrix_array)
    
    # frame_visualization(frame_generator('Pop'))

    inter = setInterval(1, frame_visualization)
    
    t = threading.Timer(20, inter.cancel)
    t.start()

    # default_black = ['0', '0', '0']
    # for y in range(6):
    #     for x in range(6):
    #         colorStack(x, y, 5, default_black)

    # temDict = matrixToDictionary(matrix_array)

    # with open("data.json", "w") as outfile:
    #         json.dump(temDict, outfile)

if __name__ == "__main__":
    main()
