class CubeModel {
    constructor(){
        this.modelData = {
            genre: "default",
            notes: []
        };
        this.thresh = 0.5;
        this.maxenergy = 255;
        this.spectrum;
    }
    updateNotes(){
        this.modelData.notes.length = 0;      // clear note array
        console.log(JSON.stringify(this.modelData));
        this.spectrum = fft.analyze();  // spectral analysis
        let amp;
        for (var midiNote = 0; midiNote<127; midiNote++){
            var note_obj = {
                midiVal: 0,
                energy: 0
            }
            // get energy of the note
            amp = fft.getEnergy(midiToFreq(midiNote))/this.maxenergy;
            // if energy surpasses threshold, add note to list
            if(amp > this.thresh){
                note_obj.midiVal = midiNote;
                note_obj.energy  = (amp-this.thresh)/(1-this.thresh);        
                this.modelData.notes.push(note_obj);
                console.log(JSON.stringify(this.modelData));
            }
        }
    }
    updateGenre(){
        this.modelData.genre = "default";
        // TODO: put the genre detection stuff here
    }
}

module.exports.CubeModel = CubeModel;