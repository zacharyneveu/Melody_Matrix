#!/usr/bin/env python3

# Note holds velocity and pitch values along with ways to access them in 
# velocity, octave, note letter format
class Note:
    def __init__(self, velocity, pitch):
        self.velocity = velocity
        self.pitch = pitch
        assert 0 <= pitch <= 127,     #  "Pitch must be between 0 and 127"
        assert 0 <= velocity <= 127, #"Velocity must be between 0 and 127"
    # Add functions to get octave and note separately ?????? 
    # note = Note(64,74)
    # pitch = note.pitch
    # velocity = note.velocity
        # get pitch 
    #def getPitch(note):
     #   return note.pitch

class Genre:
    def __init__(self, g):
        self.possible_genres = {1: "jazz", 2: "pop", 3: "etc..."}
        if type(g) is int:
            self.genre = self.possible_genres[genre_num]
        else:
            self.genre = g
        assert self.genre in self.possible_genres.values(), #"Genre does not exist"
        
​
# Frame holds a list of notes and a genre
# CHANGE: ADD __update
class Frame:
    def __init__(self, notes, genre): # self.notes = [], iterable
        self.notes = notes
        self.__update(notes)
        assert type(notes[0]) is Note, #"notes should be an array of type `Note`"
        self.genre = genre
        assert type(genre) is Genre, #"genre should be of type Genre"

    def update(self, iterable):
        for item in iterable:
            self.items_list.append(item)
    __update = update   # private copy of original update() method

#########HELPERS###############
# set element in the list
def setElement(index, value):
    List[index] = value

# convert (x,y,z) to corresponding index
def coords2Index(x,y,z):
    if(x%2==1):
        i = 6*x + (5-y%6) + 36*z
    else:
        i = 6*x + y + 36*z
    return i

# determine genre, we can also do it opposite way, by given a genre and get an index
def getGenre(index):
    if(index == 1):
        genre =  "jazz"
    elif(index == 2):
        genre =  "pop"
    elif(index == 3):
        genre = "..."
    # more genres.....
    else:
        genre = "..."
    return genre

# determine genre, we can also do it opposite way, by given a genre and get an index
def getGenre(genre):
    if(genre == "jazz"):
        i = 1 #jazz
    elif(genre == "pop"):
        i = 2
    elif(genre == "..."):
        i = 3
    # more genres.....
    else:
        i = 4
    return i

# generate frame
def initFrame(notes, genre):
    n = []
    g = Genre(genre)
    return Frame(n,g)



######MAIN##############
def main():
# Creating a List without any elements
    List = [-1 for i in range(216)]
    print("Intial blank List: ") 
    print(List) # this list contains 216 '-1' as initail value
# initial value confirmation????

    
# example: replace the first 12 elements to 10
# n1[0:11] = [10] * 10 

# list.append(123)l
# list.insert(0, 234);
# list.index(123) -> get the index of current value
# list[23] = 10; change the element where index = 23 to 10



#run main
if __name__== "__main__":
  main()



  
