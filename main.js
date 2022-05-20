const CANVAS_WIDTH = 600;
const CELL_SIZE = 5;
let n = Math.floor(CANVAS_WIDTH / CELL_SIZE);
let field = initializeGame(n)[0];
let population = initializeGame(n)[1];
setInterval(loop, 100);

function loop() {
    let nextGen = new Array(n);
    for (let i = 0; i < n; i++) {
        nextGen[i] = new Array(n);
        for (let j = 0; j < n; j++) {
            let neighbours = neighboursAmount(field, i, j);
            if (field[i][j] == 1 && (neighbours == 2 || neighbours == 3)) {
                nextGen[i][j] = field[i][j];
                continue;
            }
            if (field[i][j] == 0 && neighbours == 3) {
                nextGen[i][j] = 1;
                population++;
            }
            else {
                if (field[i][j]) population--;
                nextGen[i][j] = 0;             
            }       
        }
    }
    console.log("call");
    field = nextGen;
    drawField(field, CELL_SIZE);
}

function initializeGame(n) {
    let population = 0;
    let field = new Array(n);
    for (let i = 0; i < n; i++) {
        field[i] = new Array(n);
        for (let j = 0; j < n; j++) {
            if (Math.random() >= 0.5) {
                field[i][j] = 1;
                population++;
            }
            else {
                field[i][j] = 0;
            }
        }
    }
    return [field, population];
}

function drawField(field, ratio) {
    let populationCount = document.getElementById("population");
    populationCount.textContent = "POPULATION: " + population;
    let canvas = document.getElementById("field");
    let ctx = canvas.getContext("2d");
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            ctx.beginPath();
            if (field[i][j] == 1) {            
                ctx.rect(j * ratio, i * ratio, ratio, ratio);
                ctx.fillStyle = "gainsboro";           
            }
            else {       
                ctx.rect(j * ratio, i * ratio, ratio, ratio);
                ctx.fillStyle = "rgb(10, 0, 60)";        
            }
            ctx.fill();
        }
    }
}

function neighboursAmount(array, i, j) {
    let neigbours = 0;
    let len = array.length;
    if (i-1 >= 0 && array[i-1][j] == 1) neigbours++;
    if (i+1 < len && array[i+1][j] == 1) neigbours++;
    if (j-1 >= 0 && array[i][j-1] == 1) neigbours++;
    if (j+1 < len && array[i][j+1] == 1) neigbours++;
    if (i-1 >= 0 && j-1 >= 0 && array[i-1][j-1] == 1) neigbours++;
    if (i-1 >= 0 && j+1 < len && array[i-1][j+1] == 1) neigbours++;
    if (i+1 < len && j-1 >= 0 && array[i+1][j-1] == 1) neigbours++;
    if (i+1 < len && j+1 < len && array[i+1][j+1] == 1) neigbours++;
    return neigbours;
}