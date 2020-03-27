let sphereModel = require('./sphere_demo_model.js');

class CubeController {
    constructor () {
        this.cubeModel = new sphereModel.CubeModel();
    }

    dataRequest() {
        this.cubeModel.updateNotes();
        // TODO: figure out how to only updateGenre() every n seconds or something
        this.cubeModel.updateGenre(); 
        console.log(JSON.stringify(this.cubeModel.modelData));
        return this.cubeModel.modelData;
    }

    handleReceiveData(jsonData) {
        this.cubeModel.updateData(jsonData);
    }
};

module.exports.CubeController = CubeController;

// need to add some sort of listener for incoming data from the ML... not sure how to implement this yet.