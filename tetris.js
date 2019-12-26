const tetris = document.querySelector('#table');
let currentBlock;
let nextBlock;
let currentTopLeft = [0, 3];
let tetrisData = [];
const blocks = [
    {
        name: 'square',
        numCode: 1,
        color: 'red',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [0, 1, 1],
                [0, 1, 1],
            ],
        ],
    },
    {
        name: 'T',
        numCode: 2,
        color: 'orange',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ],
        ],
    },
    {
        name: 'Z',
        numCode: 3,
        color: 'yellow',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ],
        ],
    },
    {
        name: 'rZ',
        numCode: 4,
        color: 'green',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1],
            ],
        ],
    },
    {
        name: 'L',
        numCode: 5,
        color: 'blue',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ],
        ],
    },
    {
        name: 'rL',
        numCode: 6,
        color: 'navy',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
            ],
        ],
    },
    {
        name: 'I',
        numCode: 7,
        color: 'purple',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
            ],
        ],
    },
]

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple'];

function makeCell() {//make tetris playing place.
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 20; i++) {
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        for (let j = 0; j < 10; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);
        }
        const column = Array(10).fill(0);
        tetrisData.push(column);
    }
    tetris.appendChild(fragment);
}

function drawNext() {
    const nextTable = document.getElementById('next-table');
    nextTable.querySelectorAll('tr').forEach((col, i) => {
        Array.from(col.children).forEach((row, j) => {
            if (nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0) {
                nextTable.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numCode - 1];
            } else {
                nextTable.querySelectorAll('tr')[i].children[j].className = 'white';
            }
        });
    });
}

function draw() {
    tetrisData.forEach((col, i) => {
        col.forEach((row, j) => {
            if (row > 0) {
                const color = tetrisData[i][j] >= 10 ? colors[tetrisData[i][j] / 10 - 1] : colors[tetrisData[i][j] - 1];
                tetris.children[i].children[j].className = color;
            } else {
                tetris.children[i].children[j].className = 'white';
            }
        })
    })
}

function generateBlock() {
    if (!currentBlock) {
        currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
    } else {
        currentBlock = nextBlock;
    }
    currentBlock.currentShapeIndex = 0;
    nextBlock = blocks[Math.floor(Math.random() * blocks.length)];//generate next Block.
    console.log(currentBlock);
    drawNext();
    currentTopLeft = [-1, 3];
    let isGameOver = false;
    currentBlock.shape[0].slice(1).forEach((col, i) => {//judgment game over.
        col.forEach((row, j) => {
            if (row && tetrisData[i][j + 3]) {
                isGameOver = true;
            }
        });
    });
    currentBlock.shape[0].slice(1).forEach((col, i) => {//generate block data.
        console.log(currentBlock.shape[0], currentBlock.shape[0].slice(1), col);
        col.forEach((row, j) => {
            if (row) {
                tetrisData[i][j + 3] = currentBlock.numCode;
            }
        });
    });
    if (isGameOver) {
        clearInterval(interval);
        draw();
        alert('Game Over!!');
    } else {
        draw();
    }
}

const isActiveBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10);

function checkRows() {//inspection full the line
    const fullRows = [];
    tetrisData.forEach((col, i) => {
        let count = 0;
        col.forEach((row, j) => {
            if (row > 0) {
                count++;
            }
        });
        if (count === 10) {
            fullRows.push(i);
        }
    });
    const fullRowsCount = fullRows.length;
    tetrisData = tetrisData.filter((row, i) => !fullRows.includes(i));
    for (let i = 0; i < fullRowsCount; i++) {
        tetrisData.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    console.log(fullRows);
    let score = parseInt(document.getElementById('score').textContent, 10);
    score += fullRowsCount ** 2;
    document.getElementById('score').textContent = String(score);
}

function tick() {//down one step
    const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1]];
    const activeBlocks = [];
    let canGoDown = true;
    let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
    for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {
        if (i < 0 || i >= 20) {
            continue;
        }
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
            console.log(i, j);
            if (isActiveBlock(tetrisData[i][j])) {
                activeBlocks.push([i, j]);
                if (isInvalidBlock(tetrisData[i + 1] && tetrisData[i + 1][j])) {
                    console.log('no', i, j, tetrisData[i][j], tetrisData[i + 1] && tetrisData[i + 1][j])
                    canGoDown = false;
                }
            }
        }
    }
    if (!canGoDown) {
        activeBlocks.forEach((blocks) => {
            tetrisData[blocks[0]][blocks[1]] *= 10;
        });
        checkRows();
        generateBlock();
        return false;
    } else if (canGoDown) {
        for (let i = tetrisData.length - 1; i >= 0; i--) {
            const col = tetrisData[i];
            col.forEach((row, j) => {
                if (row < 10 && tetrisData[i + 1] && tetrisData[i + 1][j] < 10) {
                    tetrisData[i + 1][j] = row;
                    tetrisData[i][j] = 0;
                }
            });
        }
        currentTopLeft = nextTopLeft;
        draw()
        return true;
    }
}

let interval = setInterval(tick, 2000);
makeCell();
generateBlock();

document.getElementById('stop').addEventListener('click', function () {
    clearInterval(interval);
});
document.getElementById('start').addEventListener('click', function () {
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(tick, 2000);
});
document.getElementById('reset').addEventListener('click', function () {
    location.reload();
})

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowLeft': {//click left key
            const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] - 1];
            let isMovable = true;
            let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
            for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {//check left place
                if (!isMovable) {
                    break;
                }
                for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                    if (!tetrisData[i] || !tetrisData[i][j]) {
                        continue;
                    }
                    if (isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j - 1])) {
                        console.log(i, j, tetrisData[i][j], tetrisData[i][j - 1]);
                        isMovable = false;
                    }
                }
            }
            console.log('left', 'isMovable', isMovable);
            if (isMovable) {
                currentTopLeft = nextTopLeft;
                tetrisData.forEach((col, i) => {
                    col.forEach((row, j) => {
                        if (tetrisData[i][j - 1] === 0 && row < 10) {
                            tetrisData[i][j - 1] = row;
                            tetrisData[i][j] = 0;
                        }
                    });
                });
                draw();
            }
            break;
        }
        case 'ArrowRight': { // click right key
            const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] + 1];
            let isMovable = true;
            let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
            for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // check right place
                if (!isMovable) {
                    break;
                }
                for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                    if (!tetrisData[i] || !tetrisData[i][j]) {
                        continue;
                    }
                    if (isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j + 1])) {
                        console.log(i, j);
                        isMovable = false;
                    }
                }
            }
            console.log('right', 'isMovable', isMovable);
            if (isMovable) {
                currentTopLeft = nextTopLeft;
                tetrisData.forEach((col, i) => {
                    for (let j = col.length - 1; j >= 0; j--) {
                        const row = col[j];
                        if (tetrisData[i][j + 1] === 0 && row < 10) {
                            tetrisData[i][j + 1] = row;
                            tetrisData[i][j] = 0;
                        }
                    }
                });
                draw();
            }
            break;
        }
        case 'ArrowDown': {//click down key
            tick();
        }

    }
});

window.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowUp': {//change direction
            let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
            let isChangeable = true;
            const nextShapeIndex = currentBlock.currentShapeIndex + 1 === currentBlock.shape.length ? 0 : currentBlock.currentShapeIndex + 1;
            const nextBlockShape = currentBlock.shape[nextShapeIndex];
            for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { //after change direction, check the place
                if (!isChangeable) {
                    break;
                }
                for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                    if (!tetrisData[i]) {
                        continue;
                    }
                    if (nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]] > 0 && isInvalidBlock(tetrisData[i] && tetrisData[i][j])) {
                        console.log(i, j);
                        isChangeable = false;
                    }
                }
            }
            console.log('isChangeable', isChangeable);
            if (isChangeable) {
                console.log('isChangeable', nextBlockShape);
                while (currentTopLeft[0] < 0) {
                    tick();
                }
                for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { //after change direction, check the place
                    for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
                        if (!tetrisData[i]) {
                            continue;
                        }
                        let nextBlockShapeCell = nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]];
                        if (nextBlockShapeCell > 0 && tetrisData[i][j] === 0) {//exist next shape,but no exist current cell
                            tetrisData[i][j] = currentBlock.numCode;
                        } else if (nextBlockShapeCell === 0 && tetrisData[i][j] && tetrisData[i][j] < 10) {//exist current cell, but no exist next shape
                            tetrisData[i][j] = 0;
                        }
                    }
                }
                currentBlock.currentShapeIndex = nextShapeIndex;
            }
            draw();
            break;
        }
        case 'Space': {//maximum down
            while (tick()) { }
            break;
        }
    }
});