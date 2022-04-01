const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});
playerId = [];
const players = [
    "player1",
    "player2",
    "player3",
    "player4",
    "player5",
    "player6",
];
const tasks = ["mafia", "mafia", "doctor", "cop", "villager", "villager"];

// function to remove a player from the game
function removePlayer(player) {
    let index = players.indexOf(player);
    if (index > -1) {
        players.splice(index, 1);
    }
}

Object.defineProperties(Array.prototype, {
    count: {
        value: function (value) {
            return this.filter(x => x == value).length;
        }
    }
});



Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

tasks.sort(function (a, b) {
    return 0.5 - Math.random();
});



io.on('connection', (socket) => {
    playerId.push(socket.id);
    let currentPlayer = "player" + (playerId.indexOf(socket.id) + 1);

    console.log(currentPlayer + " connected");
    io.to(socket.id).emit('playerId', currentPlayer);
    io.to(socket.id).emit('playerId', tasks[playerId.indexOf(socket.id)]);


});




// playerId.push(socket.id);
//         let currentPlayer = "player" + (playerId.indexOf(socket.id) + 1);
//         // create an object with the player's name and the task and socket id
//         // display task for player
//         io.emit('message', tasks[playerId.indexOf(socket.id)]);




//     socket.on('message', (message) =>     {
//         console.log(message);
//         playerId.push(socket.id);
//         let currentPlayer = "player"+(playerId.indexOf(socket.id)+1);
//         // create an object with the player's name and the task and socket id
//         let playerObj = {
//             name: currentPlayer,
//             task: tasks[playerId.indexOf(socket.id)],
//             id: socket.id
//         };

//         io.emit('message', `${currentPlayer} said ${message}` );   
//     });
// });
http.listen(8080, () => console.log('listening on http://localhost:8080'));


