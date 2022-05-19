let n = 4;
let field = new Array(n);
let states = ["dead", "alive"]

for (let i = 0; i < n; i++) {
    field[i] = new Array(n);
    for (let j = 0; j < n; j++) {
        field[i][j] = states[0];
    }
}

// field[1][1]=states[1];
// field[1][2]=states[1];
// field[2][1]=states[1];
// field[3][2]=states[1];

// for (let i = 0; i < n; i++) {
//     for (let j = 0; j < n; j++) {
//         console.log(i + " " + j + ": " + neighboursAmount(field, states, i, j) + "\n");
//     }
//     console.log("\n");
// }

function neighboursAmount(array, states, i, j) {
    let sum = 0;
    let len = array.length;
    if (i-1 >= 0 && array[i-1][j] == states[1]) sum++;
    if (i+1 < len && array[i+1][j] == states[1]) sum++;
    if (j-1 >= 0 && array[i][j-1] == states[1]) sum++;
    if (j+1 < len && array[i][j+1] == states[1]) sum++;
    if (i-1 >= 0 && j-1 >= 0 && array[i-1][j-1] == states[1]) sum++;
    if (i-1 >= 0 && j+1 < len && array[i-1][j+1] == states[1]) sum++;
    if (i+1 < len && j-1 >= 0 && array[i+1][j-1] == states[1]) sum++;
    if (i+1 < len && j+1 < len && array[i+1][j+1] == states[1]) sum++;
    return sum;
}