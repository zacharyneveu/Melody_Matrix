
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
    
    pans = r_vec / l_vec
    pans /= max(pans)
    pans *= 127
    velocities = [max(l_vec[i,0], r_vec[i,0]) for i in range(l_vec.shape[0])]
    for pitch,vel,pan in zip(range(l_vec.shape[0]), velocities, pans):
        if vel > thresh:
            notes.append(Note(pitch, vel, pans[pitch]))
        
    print()
    frame = Frame(notes, genre)
    return frame
