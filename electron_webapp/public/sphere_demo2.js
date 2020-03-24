const datas = require('./assets/data_new.json');
const colors = require('./assets/colors_rgb.json');

let fr = 500;
// let mic;
let fft, sound, amplitude;

function preload(){
    sound = loadSound('assets/event_horizon_test.wav');
}

function setup() {
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
    easycam = createEasyCam(this._renderer, {distance:1000});
    document.oncontextmenu = () => false;
    // mic = new p5.AudioIn(); 
    // mic.start();
    sound.amp(1);
    sound.loop();
    fft = new p5.FFT();
    amplitude = new p5.Amplitude();
}

function draw() {
    let x,y,z;
    let freq, energy, maxenergy, color;

    function reset() {
        for( var xp=0;xp<6;xp++){
            for( var yp=0;yp<6;yp++){
                for( var zp=0;zp<6;zp++){
                    datas[xp][yp][zp] = (0,0,0);
                }
            }
        }
    }

    function buildDatas() {
        let spectrum = fft.analyze();
        maxenergy = 0;
        for (var midiNote = 0; midiNote<128; midiNote++){
            freq = midiToFreq(midiNote);
            energy = fft.getEnergy(freq);
            if(energy > maxenergy){
                maxenergy = energy;
            }
        }
        for (var midiNote = 0; midiNote<128; midiNote++){
            freq = midiToFreq(midiNote);
            energy = fft.getEnergy(freq)/maxenergy;
            color = colors["default"][midiNote%12];
            y = Math.floor(midiNote/12)%6;
            z = Math.floor(5*energy);
            for (x=0; x<6; x++){
                datas[x][y][z] = color;
            }
        }
    }

    function colorPart(x_value, y_value, z_value) {
        let arr = datas[5 - y_value][5 - z_value][x_value]
        return arr
    }

    function forRange(fn) {
        const cubeSpacing = 100
        for (let i = -250; i <= 250; i += cubeSpacing) {
            fn(i);
        }
    }

    function coordToIndex(num) {
        return (num / 50 + 5) / 2
    }

    background(155);
    
    // rotateY(millis() / 1000);
    reset();
    buildDatas();

    forRange(x => forRange(y => forRange(z => {
        let pos = createVector(x, y, z);
        noStroke();
        push();
        translate(pos.x, pos.y, pos.z);
        let index_x = coordToIndex(x);
        let index_y = coordToIndex(y);
        let index_z = coordToIndex(z);
        if(datas){
            let tem_arr = colorPart(index_x, index_y, index_z)
            fill(tem_arr[0], tem_arr[1], tem_arr[2]);
        }
        sphere(10+10*amplitude.getLevel());
        pop();
    })))

}
