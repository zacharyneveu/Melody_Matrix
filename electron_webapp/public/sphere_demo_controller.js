let sphereModel = require('./sphere_demo_model.js');

class CubeController {
    constructor () {
        this.cubeModel = new sphereModel.CubeModel();
	this.timer = this.createTimer();
    }

    dataRequest() {
	this.cubeModel.updateNotes();
	this.cubeModel.updateGenre();
        console.log(JSON.stringify(this.cubeModel.modelData));
        return this.cubeModel.modelData;
    }

    updateModel() {
        this.cubeModel.updateNotes();
        this.cubeModel.updateGenre();
    }

    handleReceiveData(jsonData) {
        this.cubeModel.updateData(jsonData);
    }

    createTimer() {
	return setInterval(this.updateModel, 1000); 
    }
};

module.exports.CubeController = CubeController;

// need to add some sort of listener for incoming data from the ML... not sure how to implement this yet.
