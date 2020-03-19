var datas;
fetch('http://127.0.0.1:5500/data.json').then((response) => {
    return response.json()
})
    .then((data) => {
        datas = data
    });

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    easycam = createEasyCam();
    document.oncontextmenu = () => false;
    easycam.setDistance(1500, 0);
}

function draw() {
    // let maxOffset = min(400, width / 2, height / 2)

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
    // translate(0, 0, -500);
    // rotateX(PI/4)
    // rotateX(millis() / 2000);
    //rotateZ(millis() / 2000);
    //rotateY(millis() / 1000);
    // const cosOverTime = cos(millis() / 2000)
    // const changingMaxRadius = createVector(map(cosOverTime, -1, 1, maxOffset, maxOffset * 2), 0, 0);

    forRange(x => forRange(y => forRange(z => {
        let pos = createVector(x, y, z);
        // const shrinkNeeded = changingMaxRadius.mag() / pos.mag();
        // if (shrinkNeeded < 1) {
        //     pos = pos.mult(shrinkNeeded);
        // }
        noStroke()
        push();
        translate(pos.x, pos.y, pos.z);
        let index_x = coordToIndex(x)
        let index_y = coordToIndex(y)
        let index_z = coordToIndex(z)
        let tem_arr = colorPart(index_x, index_y, index_z)
        // if(index_y == 0){
        //     fill(255, 0 ,0)
        // }
        fill(parseInt(tem_arr[0]), parseInt(tem_arr[1]), parseInt(tem_arr[2]));
        sphere(18)
        pop();
    })))

}