
const noteList = ["C", "C#", "D", "D#", "E", "F", "B", "A#", "A", "G#", "G", "F#"]

//Depending on the note value, the range of y varies
const y_range1 = [0, 1, 2]
const y_range2 = [5, 4, 3]

const defaultColor = 0

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


const note_names = ["C_color", "Cb_color", "D_color", "Db_color", "E_color", "F_color", "Fb_color", "G_color", "Gb_color", "A_color", "Ab_color", "B_color"]


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
    if (!noteList.includes(node_value)) {
        console.log("Invalid node value!")
    }
    let nodeIndex = noteList.indexOf(node_value)
    return nodeIndex < 6 ? nodeIndex : nodeIndex - 6
}

function getY(node_value, x_value) {
    let tem_arr = []
    let nodeIndex = noteList.indexOf(node_value)
    if (nodeIndex < 6) {
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
        colorStack(x_value, tem_arr[0], 0, defaultColor)
        colorStack(x_value, tem_arr[1], 0, defaultColor)
        colorStack(x_value, tem_arr[2], 0, defaultColor)
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
}


function pitchToNode(pitch_num) {
    tem = pitch_num % 12
    return noteList[tem]
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

var global_genre

function displayFrame() {
    
    frame = generateFrames('pop')

    // this part is to test how the rendering handle the sudden changes of genre
    let tempArr = ['pop', 'rock', 'edm', 'class', 'r&b', 'folk', 'hiphop', 'blues', 'default']
    let tempGenre = tempArr[Math.floor(Math.random() * 9)]

    // the globalGenre will be handed to spehre_demo for color look up
    globalGenre = tempGenre
    //get the genre
    let genreName = frame.Genre
    let pitchValue = frame.Node.pitch

    let nodeValue = pitchToNode(pitchValue)
    let octave = pitchToOctave(pitchValue)

    //calculate the x y z
    let xValue = getX(nodeValue)
    let yValue = getY(nodeValue, xValue)
    let zValue = octave - 1


    //update the matrix
    colorStack(xValue, yValue, zValue, 1)

    //export the matrix to the other file

}

setInterval(displayFrame, 300)