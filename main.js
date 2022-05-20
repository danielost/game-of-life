const CANVAS_WIDTH = 1000;
let ratio = 12;
let n = Math.floor(CANVAS_WIDTH / ratio);
let field = new Array(n);

for (let i = 0; i < n; i++) {
    field[i] = new Array(n);
    for (let j = 0; j < n; j++) {
        if (Math.floor(Math.random() * 100000) % 2 == 0) {
            field[i][j] = 1;
        }
        else {
            field[i][j] = 0;
        }
    }
}

setInterval(loop, 120);

function loop() {
    let nextGen = new Array(n);
    for (let i = 0; i < n; i++) {
        nextGen[i] = new Array(n);
        for (let j = 0; j < n; j++) {
            let neighbours = neighboursAmount(field, i, j);
            if (field[i][j] == 1 && (neighbours.length == 2 || neighbours.length == 3)) {
                nextGen[i][j] = field[i][j];
                continue;
            }
            if (field[i][j] == 0 && neighbours.length == 3) {
                nextGen[i][j] = 1;
            }
            else {
                nextGen[i][j] = 0;             
            }
            
        }
    }
    console.log("call");
    field = nextGen;
    drawField(field);
}

function drawField(field) {
    let canvas = document.getElementById("field");
    let ctx = canvas.getContext("2d");
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            ctx.beginPath();
            if (field[i][j] == 1) {            
                ctx.rect(j * ratio, i * ratio, ratio, ratio);
                ctx.fillStyle = "black";           
            }
            else {       
                ctx.rect(j * ratio, i * ratio, ratio, ratio);
                ctx.fillStyle = "white";        
            }
            ctx.fill();
        }
    }
}

function neighboursAmount(array, i, j) {
    let neigbours = [];
    let len = array.length;
    if (i-1 >= 0 && array[i-1][j] == 1) neigbours.push([i-1, j]);
    if (i+1 < len && array[i+1][j] == 1) neigbours.push([i+1, j]);
    if (j-1 >= 0 && array[i][j-1] == 1) neigbours.push([i, j-1]);
    if (j+1 < len && array[i][j+1] == 1) neigbours.push([i, j+1]);
    if (i-1 >= 0 && j-1 >= 0 && array[i-1][j-1] == 1) neigbours.push([i-1, j-1]);
    if (i-1 >= 0 && j+1 < len && array[i-1][j+1] == 1) neigbours.push([i-1, j+1]);
    if (i+1 < len && j-1 >= 0 && array[i+1][j-1] == 1) neigbours.push([i+1, j-1]);
    if (i+1 < len && j+1 < len && array[i+1][j+1] == 1) neigbours.push([i+1, j+1]);
    return neigbours;
}