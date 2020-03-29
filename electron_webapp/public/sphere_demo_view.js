let blankCube      = require('./assets/data_new.json');
let colors         = require('./assets/colors_rgb.json');
let cubeController = require('./sphere_demo_controller.js');
const defaultColor = [0,0,0];
//Depending on the note value, the range of y varies
const y_range1 = [0, 1, 2]
const y_range2 = [5, 4, 3]
//The matrix_array(str) will be ued to store the hex code
const length = 6;
let range = new Array(length).fill();
let matrix_array = range.map(e => range.map(e => range.map(e => e)));

var controller;

let fr = 500;
let fft, sound;

function preload(){
    sound = loadSound('assets/clair_de_lune.flac');
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
    easycam = createEasyCam();
    easycam = createEasyCam(this._renderer, {distance:1000});
    document.oncontextmenu = () => false;
    sound.amp(1);
    sound.loop();
    fft = new p5.FFT();

    controller = new cubeController.CubeController();
    controller.start();
}

function draw() {

    function value_limit(val, min, max) {
        return val < min ? min : (val > max ? max : val);
      }

    function getX(node_value) {
        return node_value%6;
    }

    function getY(node_value, x_value, z_value) {
        let tem_arr = []
        if (node_value<6) {
            tem_arr = y_range1
    
        } else {
            tem_arr = y_range2
        }
    
        if (matrix_array[z_value][tem_arr[0]][x_value] == defaultColor) {
            return tem_arr[0]
        }
        else if (matrix_array[z_value][tem_arr[1]][x_value] == defaultColor) {
            return tem_arr[1]
        }
        else if (matrix_array[z_value][tem_arr[2]][x_value] == defaultColor) {
            return tem_arr[2]
        }
        else {
            colorStack(x_value, tem_arr[0], z_value, defaultColor)
            colorStack(x_value, tem_arr[1], z_value, defaultColor)
            colorStack(x_value, tem_arr[2], z_value, defaultColor)
            return tem_arr[0]
        }
    }

    function colorStack(x, y, z, colorString) {
        if (matrix_array[0][y][x] != defaultColor) {
            for (let i = 0; i < 6; i++)
                matrix_array[i][y][x] = defaultColor
        }
        for (let j = 0; j <= z; j++)
            matrix_array[j][y][x] = colorString
    }

    function initMatrixArray(){
        matrix_array.forEach(function (row) {
            row.forEach(function (col) {
                col.forEach(function (item, index) {
                    col[index] = defaultColor
                })
            })
        })
    }

    function getFrame(x_value, y_value, z_value) {
        initMatrixArray();
        let modelData = controller.dataRequest();
        let frame = blankCube;
        let node, octave, color;
        let xPos, yPos, zPos;
        modelData.notes.forEach(note => {
            node = note.midiVal%12;
            octave = Math.floor(note.midiVal/12);
            xPos = getX(node);
            zPos = value_limit(octave,0,5);
            yPos = getY(node, xPos, zPos);
            color = colors[modelData.genre][node].map(x => x * note.energy);
            colorStack(xPos, yPos, zPos, color);
            frame[xPos][yPos][zPos] = color.concat(note.energy);
        });

        return frame
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

    background(0);

    datas = getFrame();

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
            fill(tem_arr[0], tem_arr[1], tem_arr[2]);
            sphere(1+20*tem_arr[3]);
            pop();
        }
    })))

}
