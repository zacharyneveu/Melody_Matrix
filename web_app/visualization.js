//These two lists are for the x-value look-up
const note_list1 = ["C", "C#", "D", "D#", "E", "F"]
const note_list2 = ["B", "A#", "A", "G#", "G", "F#"]

//This list is for the color_index look-up
const note_full_list = ["C", "C#", "D", "D#", "E", "F", "B", "A#", "A", "G#", "G", "F#"]

//Depending on the note value, the range of y varies
const y_range1 = [0, 1, 2]
const y_range2 = [5, 4, 3]

const defaultColor = '0, 0, 0'

const color_codes = {
    'class': ["#924341", "#B26A42", "#D29044", "#F2B745", "#F5C667", "#F8D489", "#FBE3AB", "#FCECC2", "#FEF6D9", "#fffff0", "#DBC0B6", "#B6827B"],
    'pop': ["#F2499A", "#F66AA9", "#FB8BB9", "#FFACC8", "#EEC3A7", "#DEDB85", "#CDF264", "#D0F676", "#D2F988", "#D5FD9A", "#DFC19A", "#E8859A"],
    'r&b': ["#6A439E", "#4F43B5", "#3542CB", "#1A42E2", "#5D4AD7", "#9F52CB", "#E25AC0", "#EC61C1", "#F567C3", "#FF6EC4", "#CD60B7", "#9C51AB"],
    'folk': ["#7A2D0F", "#90521D", "#A7782A", "#BD9D38", "#C98D2E", "#D47D24", "#E06D1A", "#E98629", "#F19F38", "#FAB847", "#CF8A34", "#A55B22"],
    'hiphop': ['#035A2D', '#205F34', '#3C633A', '#596841', '#5C674D', '#60655A', '#636466', '#72777E', '#828996', '#919CAE', '#628683', '#327058'],
    'edm': ['#B245FF', '#C06FF5', '#CE99EA', '#DCC3E0', '#A6D79C', '#6FEB58', '#39FF14', '#6AFF0D', '#9BFF07', '#CCFF00', '#C3C155', '#BB83AA'],
    'rock': ['#CE110B', '#DE0B07', '#EF0604', '#FF0000', '#FF3700', '#FF6E00', '#ffa500', '#FFC107', '#FFDC0E', '#FFF815', '#EFAB12', '#DE5E0E'],
    'blues': ['#13264E', '#2E3B56', '#484F5E', '#636466', '#735B5C', '#825153', '#924849', '#78437A', '#5E3FAA', '#443ADB', '#3433AC', '#232D7D'],
    'default': ["#AB0034", "#AA667B", "#BC448B", "#BB75FC", "#9000FF", "#808CFC", "#8ECAFF", "#C3F1FF", "#32CD34", "#FFFF01", "#FF8814", "#ff0000"],
}

var C_color, Cb_color, D_color, Db_color, E_color, F_color, Fb_color, G_color, Gb_color, A_color, Ab_color, B_color

//The matrix_array(str) will be ued to store the hex code
const length = 6;
let range = new Array(length).fill();
let matrix_array = range.map(e => range.map(e => range.map(e => e)));
//initializeArray()
matrix_array.forEach(function (row) {
    row.forEach(function (col) {
        col.forEach(function (item, index) {
            col[index] = defaultColor
        })
    })
})


function getX(node_value) {
    if (!note_full_list.includes(node_value)) {
        console.log("Invalid node value!")
    }

    if (note_list1.includes(node_value)) {
        return note_list1.indexOf(node_value)
    } else {
        return note_list2.indexOf(node_value)
    }
}

function getY(node_value, x_value) {
    let tem_arr = []
    if (note_list1.includes(node_value)) {
        tem_arr = y_range1

    } else {
        tem_arr = y_range2
    }

    if (matrix_array[0][tem_arr[0]][x_value] == defaultColor) {
        return tem_arr[0]
    }
    else if (matrix_array[0][tem_arr[1]][x_value] == defaultColor) {
        return tem_arr[1]
    }
    else if (matrix_array[0][tem_arr[2]][x_value] == defaultColor) {
        return tem_arr[2]
    }
    else {
        return tem_arr[0]
    }
}


function pitchToOctave(pitch_num) {
    if (pitch_num <= 35) {
        return 1
    }
    if (pitch_num > 83) {
        return 6
    }
    return Math.floor(pitch_num / 12) - 1
    // if midi_num <= 35:
    //         return 1
    // elif midi_num >= 36 and midi_num <= 47:
    //     return 2
    // elif midi_num >= 48 and midi_num <= 59:
    //     return 3
    // elif midi_num >= 60 and midi_num <= 71:
    //     return 4
    // elif midi_num >= 72 and midi_num <= 83:
    //     return 5
    // else:
    //     return 6
}


function pitchToNode(pitch_num) {
    tem = pitch_num % 12
    return note_full_list[tem]
}



function hexToRGB(h) {
    // you can choose whether you want the output to be:
    // a string
    // or an array
    let r = 0, g = 0, b = 0;
    let arr = []
    r = "0x" + h[1] + h[2];
    arr.push("" + + r)
    g = "0x" + h[3] + h[4];
    arr.push("" + + g)
    b = "0x" + h[5] + h[6];
    arr.push("" + + b)

    return "" + + r + "," + +g + "," + +b;
    //return arr
}


function genreToColor(g_name) {
    let color_arr = color_codes[g_name]
    color_arr.forEach(function (item, index) {
        color_arr[index] = hexToRGB(item)
    })

    //ES6 destructing assignment not supported?
    C_color = color_arr[0]
    Cb_color = color_arr[1]
    D_color = color_arr[2]
    Db_color = color_arr[3]
    E_color = color_arr[4]
    F_color = color_arr[5]
    Fb_color = color_arr[6]
    G_color = color_arr[7]
    Gb_color = color_arr[8]
    A_color = color_arr[9]
    Ab_color = color_arr[10]
    B_color = color_arr[11]
}

function colorStack(x, y, z, colorString) {
    if (matrix_array[0][y][x] != defaultColor) {
        for (let i = 0; i < 6; i++)
            matrix_array[i][y][x] = defaultColor
    }
    for (let j = 0; j <= z; j++)
        matrix_array[j][y][x] = colorString
}

function generateFrames(genreName) {
    let randNode = { pitch: Math.floor(Math.random() * 128), velocity: Math.floor(Math.random() * 128) }
    let randGenre = genreName
    return { Node: randNode, Genre: randGenre }
}

// this function will handle 
function displayFrame() {

    frame = generateFrames('pop')
    //console.log('frame', frame)
    //get the genre
    let genreName = frame.Genre
    let pitchValue = frame.Node.pitch

    //console.log('This is the pitchValue: ' + pitchValue)
    let nodeValue = pitchToNode(pitchValue)
    let octave = pitchToOctave(pitchValue)

    //console.log('This is the nodeValue: ' + nodeValue)
    //console.log('This is the octave', octave)

    //calculate the x y z
    let xValue = getX(nodeValue)
    //console.log('This is the xValue: ' + xValue)
    let yValue = getY(nodeValue, xValue)
    //console.log('This is the yValue: ' + yValue)
    let zValue = octave - 1
    //console.log('This is the zValue: ' + zValue)

    let colorIndex = note_full_list.indexOf(nodeValue)
    let colorString = color_codes[genreName.toLowerCase()][colorIndex]
    //console.log('This is the colorstring: ', hexToRGB(colorString))
    //console.log('This is the colorstring in hex format: ', colorString)
    //update the matrix
    colorStack(xValue, yValue, zValue, hexToRGB(colorString))

    //colorStack(xValue, yValue, zValue)
    //export the matrix
    localStorage.setItem("color_data", JSON.stringify(matrix_array));

}

setInterval(displayFrame, 300)