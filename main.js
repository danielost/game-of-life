let n = 5;
let field = new Array(n);
let states = ["dead", "alive"]

for (let i = 0; i < n; i++) {
    field[i] = new Array(n);
    for (let j = 0; j < n; j++) {
        field[i][j] = states[0];
    }
}