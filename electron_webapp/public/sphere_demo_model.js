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

    updateGenre(){
        this.modelData.genre = "default";
        // TODO: put the genre detection stuff here
    }

    accumulate(amp) {
        if(this.nframes >= 511) {
            this.frames.push(...amp);
            this.nframes = 0;
            this.infer();
            this.frames = [];
        }
        else {
            this.frames.push(...amp);
            this.nframes += 1;
        }
    }

    async infer() {
        console.log("frames: ");
        console.log(this.frames.length);
        const inputTensor = new onnx.Tensor(this.frames, 'float32', [1024, 512]);
        const outputMap = await this.session.run([inputTensor]);
        const outputData = outputMap.values().next().value.data;
        console.log("ML Output: ");
        console.log(outputData);
    }
}

module.exports.CubeModel = CubeModel;


