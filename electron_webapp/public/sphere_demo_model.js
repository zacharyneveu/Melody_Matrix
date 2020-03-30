const genres = require("./assets/genres.json")

class CubeModel {
    constructor(){
        this.modelData = {
            genre: "default",
            notes: []
        };
        this.thresh = 0.3;
        this.maxenergy = 255;
        this.spectrum;
        this.nframes = 0;
        this.frames = [];
        this.height  = 431; // model takes 431 pixel tall images
        this.width = 513;  // model takes 512 pixel wide images
        this.session = new onnx.InferenceSession({backendHint: 'webgl'}); 
        const url = "https://github.com/zacharyneveu/genre_classification_onnx/blob/master/genre_classifier.onnx?raw=true"

        this.session.loadModel(url);
        console.log("ML: Model loaded!");
    }

    clearNotes() {
        // console.log(JSON.stringify(this.modelData));
        this.modelData.notes.length = 0;      // clear note array
        // console.log(JSON.stringify(this.modelData));
    }

    pushNote(noteObject) {
        this.modelData.notes.push(noteObject);
    }

    updateGenre(g="default"){
        this.modelData.genre = g;
        // TODO: put the genre detection stuff here
    }

    accumulate(amp) {
        if(this.nframes >= this.width-1) {
            this.frames.push(...amp.slice(0,this.height));
            this.nframes = 0;
            this.infer();
            this.frames = [];
        }
        else {
            this.frames.push(...amp.slice(0, this.height));
            this.nframes += 1;
        }
    }

    async infer() {
        const inputTensor = new onnx.Tensor(this.frames, 'float32', [1, 1, this.width, this.height]);
        const outputMap = await this.session.run([inputTensor]);
        const outputData = outputMap.values().next().value.data;
        // pred = argmax(outputData);
        let pred = outputData.indexOf(Math.max(...outputData));
        console.log("ML: Prediction: ", pred, genres["genres"][pred]);
        this.updateGenre(genres["genres"][pred]);
    }
}

module.exports.CubeModel = CubeModel;


