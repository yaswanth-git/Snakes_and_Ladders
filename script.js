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
player1_icon.setAttribute("src", "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyB0cmFuc2Zvcm09IiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjOWI1OWI2Ij48cGF0aCBkPSJNNzQuNTMzMzMsMTEuNDY2Njd2MTEuNDY2NjdoLTUuNzMzMzN2MTEuNDY2NjdoNS43MzMzM3YxMS40NjY2N2gyMi45MzMzM3YtMTEuNDY2NjdoNS43MzMzM3YtMTEuNDY2NjdoLTUuNzMzMzN2LTExLjQ2NjY3ek02OC44LDU3LjMzMzMzdjExLjQ2NjY3aC0xMS40NjY2N3Y1MS42aDExLjQ2NjY3djE3LjJoLTUuNzMzMzN2MjIuOTMzMzNoMTEuNDY2Njd2LTIyLjkzMzMzaDUuNzMzMzN2LTE3LjJoMTEuNDY2Njd2MTcuMmg1LjczMzMzdjIyLjkzMzMzaDExLjQ2NjY3di0yMi45MzMzM2gtNS43MzMzM3YtMTcuMmgxMS40NjY2N3YtNTEuNmgtMTEuNDY2Njd2LTExLjQ2NjY3eiI+PC9wYXRoPjwvZz48cGF0aCBkPSIiIGZpbGw9Im5vbmUiPjwvcGF0aD48cGF0aCBkPSIiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==");
player1_icon.setAttribute("alt", "p1");

const player2_icon = document.createElement('img');
player2_icon.setAttribute("class", "player");
player2_icon.setAttribute("src", "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyB0cmFuc2Zvcm09IiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjOGVlYzEzIj48cGF0aCBkPSJNNzQuNTMzMzMsMTEuNDY2Njd2MTEuNDY2NjdoLTUuNzMzMzN2MTEuNDY2NjdoNS43MzMzM3YxMS40NjY2N2gyMi45MzMzM3YtMTEuNDY2NjdoNS43MzMzM3YtMTEuNDY2NjdoLTUuNzMzMzN2LTExLjQ2NjY3ek02OC44LDU3LjMzMzMzdjExLjQ2NjY3aC0xMS40NjY2N3Y1MS42aDExLjQ2NjY3djE3LjJoLTUuNzMzMzN2MjIuOTMzMzNoMTEuNDY2Njd2LTIyLjkzMzMzaDUuNzMzMzN2LTE3LjJoMTEuNDY2Njd2MTcuMmg1LjczMzMzdjIyLjkzMzMzaDExLjQ2NjY3di0yMi45MzMzM2gtNS43MzMzM3YtMTcuMmgxMS40NjY2N3YtNTEuNmgtMTEuNDY2Njd2LTExLjQ2NjY3eiI+PC9wYXRoPjwvZz48cGF0aCBkPSIiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==");
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
        // if(currentPlayer == "player1's move"){
        //     currentPlayer = "player2's move";
        // }
        // else{
        //     currentPlayer = "player1's move";
        // }
        // document.getElementById("currentPlayer").textContent = currentPlayer;
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