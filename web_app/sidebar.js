var customColor = [[255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0]];

let isHidden = true
var useCustom = true

if (localStorage.getItem('custom') == null) {
    localStorage.setItem('custom', JSON.stringify(customColor))
}
customColor = JSON.parse(localStorage.getItem('custom'))


window.onload = function () {
    customColor.forEach((item, index) => {
        let tem_id = "color" + index
        console.log(rgbToHex(item))
        document.getElementById(tem_id).setAttribute('defaultValue', '#' + rgbToHex(item));
    })
}

function aaa(){
    return '#ffff00'
}

function getColor(){
    customColor.forEach((item, index) => {
        let tem_id = "color" + index
        console.log(rgbToHex(item))
        document.getElementById(tem_id).setAttribute('defaultValue', '#' + rgbToHex(item));
    })
}


window.addEventListener('mousemove', function (e) {
    if (e.x <= 250 && isHidden) {
        document.getElementById("arrow-left").style.display = "block"
    } else {
        document.getElementById("arrow-left").style.display = "none"
    }
})

function handleChange(item, id) {
    console.log(id.length)
    let index = id.length < 7 ? parseInt(id.slice(-1)) : parseInt(id.slice(-2)) 
    let str = hexToRGB(item)
    let arr = str.split(',')
    arr = arr.map(Number)
    console.log(arr)
    customColor[index] = arr
    localStorage.setItem('custom', JSON.stringify(customColor))
}

function toggleNav() {
    isHidden = !isHidden
    if (isHidden) {
        document.getElementById("mySidebar").style.display = "none"
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("arrow-right").style.display = "none"
    } else {
        document.getElementById("mySidebar").style.display = "table-cell"
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("arrow-left").style.display = "none"
        document.getElementById("arrow-right").style.display = "block"
    }
}

function hexToRGB(h) {
    let hex = h.slice(0)
    let arr = new Array(3)
    let r = (hex >> 16) & 255;
    arr[0] = parseInt(r)
    let g = (hex >> 8) & 255;
    arr[1] = parseInt(g)
    let b = hex & 255;
    arr[2] = parseInt(b)

    return arr
}

function rgbToHex(rgb) {
    let str = ""
    rgb.forEach(e => {
        let hex = Number(e).toString(16)
        if (hex.length < 2) {
            hex = "0" + hex
        }
        str += hex
    })
    return '#' + str
}
