var customColor = [ [255, 255, 255],  [255, 255, 255],  [255, 255, 255],  [255, 255, 255],  [255, 255, 255],  [255, 255, 255],  [255, 255, 255],  [255, 255, 255],  [255, 255, 255],  [255, 255, 255],  [255, 255, 255],  [255, 255, 255]];

let isHidden = true
// set useCustom to true to use the custom color palette
// set useCustom to false to use the detected genre color palette
var useCustom = false

if (localStorage.getItem('custom') == null) {
    localStorage.setItem('custom', JSON.stringify(customColor))
}
customColor = JSON.parse(localStorage.getItem('custom'))

window.onload = function () {
    customColor.forEach((item, index) => {
        let tem_id = "color" + index
        document.getElementById(tem_id).setAttribute('value', rgbToHex(item));
    })
    
}

window.addEventListener('mousemove', function (e) {
    if (e.x <= 250 && isHidden) {
        document.getElementById("arrow-left").style.display = "block"
    } else {
        document.getElementById("arrow-left").style.display = "none"
    }
})


function getColor(){
    customColor.forEach((item, index) => {
        let tem_id = "color" + index
        document.getElementById(tem_id).setAttribute('value', rgbToHex(item));
    })
}

function toggleCustom(){
    useCustom = !useCustom
    if(useCustom){
        getColor()
    }
}

function handleChange(item, id) {
    let index = id.length < 7 ? parseInt(id.slice(-1)) : parseInt(id.slice(-2)) 
    let colorstr = hexToRGB(item)
    let arr = colorstr.split(',').map(Number)
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
    let hex = parseInt(h.slice(1), 16)
    let r = (hex >> 16) & 255;
    let g = (hex >> 8) & 255;
    let b = hex & 255;

    return r + "," + g + "," + b;
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
