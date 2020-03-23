var color_data = { "0": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] }, "1": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] }, "2": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] }, "3": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] }, "4": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] }, "5": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] } }

var urls = "http://127.0.0.1:5500/web_app/data.json";
let fr = 500

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    setInterval(loadData, 100)
    frameRate(fr);
    Dw.EasyCam.prototype.apply = function(n) {
        var o = this.cam;
        n = n || o.renderer,
          n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
      };
    easycam = createEasyCam(this._renderer, {distance:1000});
    document.oncontextmenu = () => false;
}

function gotData(data) {
    color_data = data
}

function loadData() {
    loadJSON(urls, gotData)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function draw() {

    function colorPart(x_value, y_value, z_value) {
        let arr = color_data[5 - y_value][5 - z_value][x_value]
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

    // translate(0, 0, -500);

    rotateY(millis() / 2000);

    // let size = Math.random() % 10 *25
    // let volume = Math.random() % 1 + 1
    let volume = 1

    forRange(x => forRange(y => forRange(z => {
        let pos = createVector(x, y, z);
        noStroke()
        push();
        translate(volume * pos.x, volume * pos.y, volume * pos.z);
        let index_x = coordToIndex(x)
        let index_y = coordToIndex(y)
        let index_z = coordToIndex(z)
        if (color_data) {
            let tem_arr = colorPart(index_x, index_y, index_z)
            fill(parseInt(tem_arr[0]), parseInt(tem_arr[1]), parseInt(tem_arr[2]));
        }
        sphere(18)
        pop();
    })))

}