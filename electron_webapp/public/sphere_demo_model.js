let modelData = require('./assets/data_new.json');
let colors    = require('./assets/colors_rgb.json');

class CubeModel {
    constructor(){
        this.modelData = modelData;
    }
    updateData(){
        function note2Coords(noteVal, energyVal){

        }
        let x,y,z;
        let freq, energy, color;
        let maxenergy = 255;
        let thresh = 0.3;
        let spectrum = fft.analyze();
        for (var midiNote = 0; midiNote<72; midiNote++){
            freq = midiToFreq(midiNote);
            energy = fft.getEnergy(freq)/maxenergy;
            if(energy > thresh){
                energy = (energy-thresh)/(1-thresh);
                color = colors["edm"][midiNote%12].map(x => x * energy);
                y = Math.floor(midiNote/12)%6;
                z = midiNote%6;
                for (x=0; x<6; x++){
                    this.modelData[x][y][z] = color.concat(energy);
                }
            }
        }
    }
}

module.exports.CubeModel = CubeModel;