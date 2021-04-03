// inserting blocks into the board 
const board = document.getElementById("board");
for (let i = 9; i >= 0; i--) {
    const div = document.createElement('div');
    div.setAttribute("class", "row");
    if (i % 2 == 0) {
        for (let j = 1; j < 11; j++) {
            const div1 = document.createElement('div');
            div1.setAttribute("id", i * 10 + j);
            div.appendChild(div1);
        }
    }
    else {
        for (let j = 10; j > 0; j--) {
            const div1 = document.createElement('div');
            div1.setAttribute("id", i * 10 + j);
            div.appendChild(div1);
        }
    }
    board.appendChild(div);
}

const snakePos = { 26: 10, 37: 3, 47: 16, 75: 32, 94: 71, 96: 42 };
const ladderPos = { 4: 56, 12: 50, 14: 55, 22: 58, 41: 79, 54: 88 };


const player1_icon = document.createElement("img");
player1_icon.setAttribute("class", "player");
player1_icon.setAttribute("src", "https://img.icons8.com/plasticine/2x/elf.png");
player1_icon.setAttribute("alt", "p1");

const player2_icon = document.createElement('img');
player2_icon.setAttribute("class", "player");
player2_icon.setAttribute("src", "https://img.icons8.com/plasticine/2x/super-mario.png");
player2_icon.setAttribute("alt", "p2");

let currentPlayer = "player1's move";
let pos1 = 1;
let pos2 = 1;
document.getElementById("1").appendChild(player1_icon);
document.getElementById("1").appendChild(player2_icon);


const restart = () => {
    currentPlayer = "player1's move";
    pos1 = 1;
    pos2 = 1;
    for (let i = 1; i < 101; i++) {
        document.getElementById(i).innerHTML = "";
    }
    document.getElementById("1").appendChild(player1_icon);
    document.getElementById("1").appendChild(player2_icon);
    const button = document.getElementById("button");
    button.setAttribute("onclick", "roll()");
    button.textContent = "Roll";
    document.getElementById("roll").textContent = "";
    document.getElementById("currentPlayer").textContent = currentPlayer;
}

const moves = (end, player) => {
    if (end <= 100) {
        if (player == "player1's move") {
            document.getElementById(pos1).removeChild(player1_icon);
            document.getElementById(end).appendChild(player1_icon);
            pos1 = end;
        }
        else {
            document.getElementById(pos2).removeChild(player2_icon);
            document.getElementById(end).appendChild(player2_icon);
            pos2 = end;
        }
        if (Object.keys(snakePos).includes(end.toString())) {
            moves(snakePos[end], currentPlayer);
            alert(currentPlayer.substring(0, 7) + " is swallod by a snake");
        }
        else if (Object.keys(ladderPos).includes(end.toString())) {
            moves(ladderPos[end], currentPlayer);
            alert(currentPlayer.substring(0, 7) + " climbed a ladder");
        }
    }
    if (end == 100) {
        const dice = document.getElementById("roll");
        dice.textContent = "click to restart the game";
        const button = document.getElementById("button");
        button.setAttribute("onclick", "restart()");
        button.textContent = "restart";
        currentPlayer = currentPlayer.substring(0, 7) + " won the game"
        document.getElementById("currentPlayer").textContent = currentPlayer;

    }

}

const roll = () => {

    let rand = Math.floor(Math.random() * 6) + 1;
    document.getElementById("roll").textContent = rand;
    moves(currentPlayer == "player1's move" ? pos1 + rand : pos2 + rand, currentPlayer);

    if (currentPlayer == "player1's move") {
        currentPlayer = "player2's move";
    }
    else if (currentPlayer == "player2's move") {
        currentPlayer = "player1's move";
    }
    document.getElementById("currentPlayer").textContent = currentPlayer;
}
