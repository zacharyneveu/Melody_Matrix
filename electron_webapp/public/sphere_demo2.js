const datas = require('./data.json');

let fr = 500;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(fr);
    Dw.EasyCam.prototype.apply = function(n) {
        var o = this.cam;
        n = n || o.renderer,
          n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
      };
    easycam = createEasyCam();
    document.oncontextmenu = () => false;
    easycam.setDistance(1000, 0);
}

function draw() {

    function colorPart(x_value, y_value, z_value) {
        let arr = datas[5 - y_value][5 - z_value][x_value]
        return arr.split(',')
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
    
    rotateY(millis() / 1000);

    forRange(x => forRange(y => forRange(z => {
        let pos = createVector(x, y, z);
        noStroke()
        push();
        translate(pos.x, pos.y, pos.z);
        let index_x = coordToIndex(x)
        let index_y = coordToIndex(y)
        let index_z = coordToIndex(z)
        let tem_arr = colorPart(index_x, index_y, index_z)
        fill(parseInt(tem_arr[0]), parseInt(tem_arr[1]), parseInt(tem_arr[2]));
        sphere(18)
        pop();
    })))

}
