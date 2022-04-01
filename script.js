const prompt = require("prompt-sync")();
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

// create object for each player
playersObj = [];
for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const task = tasks[i];
    const playerObj = {
        name: player,
        task: task,
    };
    playersObj.push(playerObj);
}

// create object for mafia
mafiaObj = {};
doctorObj = {};
copObj = {};
villagerObj = {};

for (let i = 0; i < playersObj.length; i++) {
    const player = playersObj[i];
    if (player.task === "mafia") {
        mafiaObj[player.name] = player;
    } else if (player.task === "doctor") {
        doctorObj[player.name] = player;
    } else if (player.task === "cop") {
        copObj[player.name] = player;
    } else if (player.task === "villager") {
        villagerObj[player.name] = player;
    }
}

while (true) {
    if (Object.size(villagerObj) === 0) {
        console.log("Mafia Wins");
        break;
    } else if (Object.size(mafiaObj) === 0) {
        console.log("Villager Wins");
        break;
    }

    let show = prompt("Do you want to show the players? (y/n) ");
    if (show === "y") {
        // print names from mafiaObj
        console.log("Mafia: ");
        for (let key in mafiaObj) {
            console.log(mafiaObj[key].name);
        }

        console.log(" ");

        console.log("Vilagers: ");
        for (let key in villagerObj) {
            console.log(villagerObj[key].name);
        }
        console.log("Doctors: ");
        for (let key in doctorObj) {
            console.log(doctorObj[key].name);
        }
        console.log("Cops: ");
        for (let key in copObj) {
            console.log(copObj[key].name);
        }
    }

    console.log(" ");
    console.log("For Mafias: ");
    const noofplayerToBeExecuted = prompt(
        "Enter the number of the person to be executed: "
    );
    const playerToBeExecuted = playersObj[noofplayerToBeExecuted - 1].name;

    console.log(" ");
    console.log("For Doctor: ");
    playerToBeSaved = 0;
    if (Object.size(doctorObj) > 0) {
        const noofplayerToBeSaved = prompt(
            "Enter the number of the person to be saved: "
        );
        playerToBeSaved = playersObj[noofplayerToBeSaved - 1].name;
    }
    console.log(" ");
    let announcement = "No one Died";
    let copsGuess = "null";
    if (Object.size(copObj) > 0) {

        console.log("For Cop: ");

        let noofcopGuess = prompt("Enter your suspect: ");
        let copGuess = "player" + noofcopGuess;
        for (let key in mafiaObj) {
            if (mafiaObj[key].name === copGuess) {

                copsGuess = "cops guess is right";
            }
        }
        if (copsGuess === "null") {
            copsGuess = "cops guess is wrong";
        }

    }


    if (!(playerToBeExecuted === playerToBeSaved)) {
        // check if player to be executed is mafia
        for (let key in villagerObj) {
            if (villagerObj[key].name === playerToBeExecuted) {
                announcement = "the " + playerToBeExecuted + "(villager) is executed";
                //remove that object
                delete villagerObj[key];
                // remove from array
                removePlayer(playerToBeExecuted);
            }
        }
        for (let key in doctorObj) {
            if (doctorObj[key].name === playerToBeExecuted) {
                announcement = "the " + playerToBeExecuted + "(Doctor) is executed";
                //remove that object
                delete doctorObj[key];
                // remove from array
                removePlayer(playerToBeExecuted);
            }
        }
        for (let key in copObj) {
            if (copObj[key].name === playerToBeExecuted) {
                announcement = "the " + playerToBeExecuted + "(cop) is executed";
                //remove that object
                delete copObj[key];
                // remove from array
                removePlayer(playerToBeExecuted);
            }
        }
    }
    console.log(" ");


    console.log(" ");
    console.log("Day: ");
    console.log(announcement);
    if (copsGuess !== "null") {
        console.log(copsGuess);
    }
    console.log(" ");
    // voting among players
    console.log("Voting: ");


    // show players list

    show = prompt("Do you want to show the availabe players? (y/n) ");
    console.log("Players: ");
    if (show === "y") {
        for (let i = 0; i < players.length; i++)
            console.log(players[i]);
    }
    let index = 0;
    while (true) {
        votes = [0, 0, 0, 0, 0, 0];
        for (let key in players) {
            console.log("Vote for " + players[key] + ": ");
            const vote = prompt("Enter the number of the player to be voted: ");
            votes[vote - 1]++;

        }
        console.log(votes);
        // index of max of vote
        let max = Math.max(...votes);
        if (!(votes.count(max) > 1)) {
            index = votes.indexOf(max) + 1;
            break;
        }
        else {
            console.log(" ");
            console.log("There is a tie");
            console.log("Vote again");
            console.log(" ");
        }


    }


    console.log("player" + index + " is voted out");
    // print his task
    console.log(" ");
    console.log("player" + index + " is a " + playersObj[index - 1].task);
    console.log(" ");
    // remove the player from the obj
    for (let key in mafiaObj) {
        if (mafiaObj[key].name === "player" + index) {
            delete mafiaObj[key];
            // remove from array
            removePlayer("player" + index);


        }
    }
    for (let key in villagerObj) {
        if (villagerObj[key].name === "player" + index) {
            delete villagerObj[key];
            // remove from array
            removePlayer("player" + index);


        }

    }
    for (let key in doctorObj) {
        if (doctorObj[key].name === "player" + index) {
            delete doctorObj[key];
            // remove from array
            removePlayer("player" + index);

        }
    }

    for (let key in copObj) {
        if (copObj[key].name === "player" + index) {
            delete copObj[key];
            // remove from array
            removePlayer("player" + index);

        }
    }
    console.log(" ");
}
