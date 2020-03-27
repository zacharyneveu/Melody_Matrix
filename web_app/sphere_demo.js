let color_data = { "0": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] }, "1": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] }, "2": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] }, "3": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] }, "4": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] }, "5": { "0": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "1": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "2": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "3": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "4": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"], "5": ["0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0", "0,0,0"] } }

let volume = 1
let spheres = []
const fr = 500

function setup() {
    forRange(x => forRange(y => forRange(z => {
        let color_arr = []
        spheres.push({ x, y, z, color_arr })
    })))

    createCanvas(windowWidth, windowHeight, WEBGL);
    setInterval(loadData, 500)

    //setInterval(changeVolume, 100)
    frameRate(fr);
    Dw.EasyCam.prototype.apply = function (n) {
        var o = this.cam;
        n = n || o.renderer,
            n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
    };
    easycam = createEasyCam(this._renderer, { distance: 1000 });
    document.oncontextmenu = () => false;
}

function loadData() {
    color_data = JSON.parse(sessionStorage.getItem("color_data"));
    changeColor()
}

function changeColor() {
    if (color_data) {
        spheres.forEach(obj => {
            let index_x = coordToIndex(obj.x)
            let index_y = coordToIndex(obj.y)
            let index_z = coordToIndex(obj.z)
            obj.color_arr = colorPart(index_x, index_y, index_z)
        })
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function changeVolume() {
    volume = Math.random() % 10 + 1
}

function colorPart(x_value, y_value, z_value) {
    let arr = color_data[5 - y_value][5 - z_value][x_value]
    if (arr) {
        let note_value = 5 - z_value < 3 ? note_names[x_value] : note_names[x_value + 6]

        let colorString = sessionStorage.getItem(note_value)

        return colorString.split(',').map(Number)
    } else {
        return [0, 0, 0]
    }
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

function draw() {
    // comment out this line below and see magic happens
    background(155);

    // translate(0, 0, -500);

    //rotateY(millis() / 2000);

    let volume = 1
    if (color_data) {
        spheres.forEach(obj => {
            //let pos = createVector(obj.x, obj.y, obj.z);
            noStroke()
            push();
            translate(volume * obj.x, volume * obj.y, volume * obj.z);
            fill(obj.color_arr[0], obj.color_arr[1], obj.color_arr[2]);
            sphere(18)
            pop();
        })
    }

}
