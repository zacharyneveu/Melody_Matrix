class CubeModel {
    constructor(){
        this.modelData = {
            genre: "default",
            notes: []
        };
        this.thresh = 0.3;
        this.maxenergy = 255;
        this.spectrum;
    }

    clearNotes() {
        console.log(JSON.stringify(this.modelData));
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
}

module.exports.CubeModel = CubeModel;