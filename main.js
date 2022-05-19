let canvasWidth = 1000;
let canvas = document.getElementById("field");
let ctx = canvas.getContext("2d");

let ratio = 20;
let n = canvasWidth / ratio;
let field = new Array(n);
let states = ["dead", "alive"]

for (let i = 0; i < n; i++) {
    field[i] = new Array(n);
    for (let j = 0; j < n; j++) {
        if (Math.floor(Math.random() * 100000) % 2 == 0) {
            field[i][j] = states[1];
            ctx.beginPath();
            ctx.rect(j * ratio, i * ratio, ratio, ratio);
            ctx.fillStyle = "black";
            ctx.fill();
        }
        else {
            field[i][j] = states[0];
        }
    }
}

drawField(field, states);

let times = 5;
while (times > 0) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let neighbours = neighboursAmount(field, states, i, j);
            if (field[i][j] == states[1] && (neighbours.length == 2 || neighbours.length == 3)) {
                continue;
            }
            if (field[i][j] == states[0] && neighbours.length == 3) {
                field[i][j] = states[1];
                for (let k = 0; k < neighbours.length; k++) {
                    let spot = neighbours[k];
                    field[spot[0]][spot[1]] = states[0];
                }
            }
            else {
                field[i][j] = states[0];
            }
        }
    }
    drawField(field, states);
    times--;
}

function drawField(field, states) {
    // for (let i = 0; i < field.length; i++) {
    //     for (let j = 0; j < field.length; j++) {
    //         if (field[i][j] == states[1]) {
    //             process.stdout.write("*");
    //         }
    //         else {
    //             process.stdout.write(".");
    //         }
    //     }
    //     console.log("\n");
    // }
    console.table(field);

    console.log("\n");
    console.log("\n");
}

function neighboursAmount(array, states, i, j) {
    let neigbours = [];
    let len = array.length;
    if (i-1 >= 0 && array[i-1][j] == states[1]) neigbours.push([i-1, j]);
    if (i+1 < len && array[i+1][j] == states[1]) neigbours.push([i+1, j]);
    if (j-1 >= 0 && array[i][j-1] == states[1]) neigbours.push([i, j-1]);
    if (j+1 < len && array[i][j+1] == states[1]) neigbours.push([i, j+1]);
    if (i-1 >= 0 && j-1 >= 0 && array[i-1][j-1] == states[1]) neigbours.push([i-1, j-1]);
    if (i-1 >= 0 && j+1 < len && array[i-1][j+1] == states[1]) neigbours.push([i-1, j+1]);
    if (i+1 < len && j-1 >= 0 && array[i+1][j-1] == states[1]) neigbours.push([i+1, j-1]);
    if (i+1 < len && j+1 < len && array[i+1][j+1] == states[1]) neigbours.push([i+1, j+1]);
    return neigbours;
}