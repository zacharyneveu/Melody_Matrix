let sphereModel = require('./sphere_demo_model.js');

class CubeController {
    constructor () {
        this.cubeModel = new sphereModel.CubeModel();
        this.thresh = 0.3;
        this.maxenergy = 255;
        this.spectrum;
    }

    start() {
        this.updateModel();
        // this.timer = setInterval(() => this.updateModel(), 1000);
    }

    updateNotes() {
        this.cubeModel.clearNotes();
        this.spectrum = fft.analyze();  // spectral analysis
        this.cubeModel.accumulate(this.spectrum);
        // console.log(this.spectrum)

        let amp;
        for (var midiNote = 0; midiNote<127; midiNote++){
            var note_obj = {
                midiVal: 0,
                energy: 0
            }
            // get energy of the note
            amp = fft.getEnergy(midiToFreq(midiNote))/this.maxenergy;
            // console.log(amp);

			// call model with amp here
            // if energy surpasses threshold, add note to list
            if(amp > this.thresh){
                note_obj.midiVal = midiNote;
                note_obj.energy  = (amp-this.thresh)/(1-this.thresh);
                //console.log(note_obj);        
                this.cubeModel.pushNote(note_obj);
            }
        }
        // console.log(JSON.stringify(this.cubeModel.modelData));
    }

    dataRequest() {
        this.updateNotes();
        // console.log(JSON.stringify(this.cubeModel.modelData));
        return this.cubeModel.modelData;
    }

    updateModel() {
        // this.updateNotes(); this part needs to be within the dataRequest function by the nature of the p5 fft library...
        this.cubeModel.updateGenre();
    }

    handleReceiveData(jsonData) {
        this.cubeModel.updateData(jsonData);
    }
};

module.exports.CubeController = CubeController;
