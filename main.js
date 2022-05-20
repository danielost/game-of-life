let canvasWidth = 1000;
let ratio = 12;
let n = Math.floor(canvasWidth / ratio);
let field = new Array(n);
let states = ["dead", "alive"]
let cells = 0;

for (let i = 0; i < n; i++) {
    field[i] = new Array(n);
    for (let j = 0; j < n; j++) {
        if (Math.floor(Math.random() * 100000) % 2 == 0) {
            field[i][j] = states[1];
            cells++;
        }
        else {
            field[i][j] = states[0];
        }
    }
}
console.log(cells);

setInterval(loop, 100);

function loop() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let neighbours = neighboursAmount(field, states, i, j);
            if (field[i][j] == states[1] && (neighbours.length == 2 || neighbours.length == 3)) {
                continue;
            }
            if (field[i][j] == states[0] && neighbours.length == 3) {
                field[i][j] = states[1];
                cells += 1;
                // for (let k = 0; k < neighbours.length; k++) {
                //     cells -= 1;
                //     let spot = neighbours[k];
                //     field[spot[0]][spot[1]] = states[0];
                // }
            }
            else {
                if (field[i][j] == states[1]) {
                    cells -= 1;
                }
                field[i][j] = states[0];
            }
            
        }
    }
    console.log("call");
    console.log(cells);
    drawField(field, states);
}

function drawField(field, states) {
    let canvas = document.getElementById("field");
    let ctx = canvas.getContext("2d");
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (field[i][j] == states[1]) {
                ctx.beginPath();
                ctx.rect(j * ratio, i * ratio, ratio, ratio);
                ctx.fillStyle = "black";
                ctx.fill();
            }
            else {
                ctx.beginPath();
                ctx.rect(j * ratio, i * ratio, ratio, ratio);
                ctx.fillStyle = "white";
                ctx.fill();
            }
        }
    }
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