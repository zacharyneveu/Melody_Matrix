let datas;
let cubeController = require('./sphere_demo_controller.js');

var controller;

let fr = 500;
let fft, sound;

function preload(){
    sound = loadSound('assets/event_horizon_test.wav');
}

function setup() {
    controller = new cubeController.CubeController();
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(fr);
    Dw.EasyCam.prototype.apply = function(n) {
        var o = this.cam;
        n = n || o.renderer,
          n && (this.camEYE = this.getPosition(this.camEYE), 
                this.camLAT = this.getCenter(this.camLAT), 
                this.camRUP = this.getUpVector(this.camRUP), 
                n._curCamera.camera(this.camEYE[0], this.camEYE[1], 
                                    this.camEYE[2], this.camLAT[0], 
                                    this.camLAT[1], this.camLAT[2], 
                                    this.camRUP[0], this.camRUP[1], 
                                    this.camRUP[2]))
      };
    easycam = createEasyCam();
    easycam = createEasyCam(this._renderer, {distance:1000});
    document.oncontextmenu = () => false;
    sound.amp(1);
    sound.loop();
    fft = new p5.FFT();
}

function draw() {

    // function colorPart(x_value, y_value, z_value) {
    //     // this part where we update datas is where the controller is going to come into play,
    //     // worth considering whether the view triggers the controller or vice versa.
    //     // what is going to dictate the rate at which the frame refreshes...
    //     datas = controller.dataRequest();
    //     console.log(datas);
    //     let arr = datas[5 - y_value][5 - z_value][x_value]
    //     return arr
    // }

    function forRange(fn) {
        const cubeSpacing = 100
        for (let i = -250; i <= 250; i += cubeSpacing) {
            fn(i);
        }
    }

    function coordToIndex(num) {
        return (num / 50 + 5) / 2
    }

    background(0);

    datas = controller.dataRequest();

    forRange(x => forRange(y => forRange(z => {
        let pos = createVector(x, y, z);
        noStroke()
        push();
        translate(pos.x, pos.y, pos.z);
        let index_x = coordToIndex(x)
        let index_y = coordToIndex(y)
        let index_z = coordToIndex(z)
        if(datas){
            let tem_arr = datas[index_x][index_y][index_z];
            fill(parseInt(tem_arr[0]), parseInt(tem_arr[1]), parseInt(tem_arr[2]));
            sphere(0+20*tem_arr[3]);
            pop();
        }
    })))

}
