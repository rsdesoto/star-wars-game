/////////////////////////////////////////////////////////////////
/////////////////////////// VARIABLES ///////////////////////////
/////////////////////////////////////////////////////////////////

// heroes array for generating interactive buttons
heroesArray = ["bastila", "revan", "kreia", "exile"];

// hero stat objects
var kreiaobj = {
    name: "kreia",
    health: 500,
    attack: 20,
    counter: 20
};

var revanobj = {
    name: "revan",
    health: 25,
    attack: 20,
    counter: 10
};

var bastilaobj = {
    name: "bastila",
    health: 75,
    attack: 5,
    counter: 10
};

var exileobj = {
    name: "exile",
    health: 90,
    attack: 5,
    counter: 30
};

function setObj() {
    // hero stat objects
    kreiaobj.health = 500;
    kreiaobj.attack = 20;

    revanobj.health = 25;
    revanobj.attack = 20;

    bastilaobj.health = 75;
    bastilaobj.attack = 5;

    exileobj.health = 90;
    exileobj.attack = 5;
}

// associative array (for getting from text strings to objects -- i.e., if i have the string
// "bastila", i want to be able to translate that to the OBJECT bastila)
var heroObj = {
    bastila: bastilaobj,
    kreia: kreiaobj,
    revan: revanobj,
    exile: exileobj
};

// generate each character's stats

// 1. on first click, move the fighter up to the fighter section
// 2. on second click, move the opponent down to the opponent section
// on second click, also unhide the attack button

// game control stats -- boolean values for if the hero and opponent have been chosen yet
var heroChosen;
var opponentChosen;

// game control stats -- hero and opponent chosen (will change each round)
var fighter;
var opponent;

// game control stats -- how many enemies are left before end of game
var remainingEnemy;

// game control stats -- how many rounds you have fought. This is what the attack score each round is multiplied by.
var roundcount;

/////////////////////////////////////////////////////////////////
/////////////////////////// FUNCTIONS ///////////////////////////
/////////////////////////////////////////////////////////////////

function attack(fighter, opponent, roundcount) {
    // for the fighter - use attack power and multiply by how many times they have attacked
    fighterAttack = fighter.attack * roundcount;
    fighterHealth = fighter.health;

    // for the opponent - only use the counter attack, and do not multiply by what round it is
    opponentAttack = opponent.counter;
    opponentHealth = opponent.health;

    // calculate the updated health for both fighter and opponent and update the objects
    fighter.health = fighterHealth - opponentAttack;
    opponent.health = opponentHealth - fighterAttack;

    // create updates on stats
    $("#actionUpdate1").html(
        fighter.name +
            " has hit " +
            opponent.name +
            " for " +
            fighterAttack +
            " points of damage! " +
            opponent.name +
            " has " +
            opponent.health +
            " hit points left!"
    );
    $("#actionUpdate2").html(
        opponent.name +
            " has hit " +
            fighter.name +
            " for " +
            opponentAttack +
            " points of damage! " +
            fighter.name +
            " has " +
            fighter.health +
            " hit points left!"
    );

    // check to see if a fighter is out
    checkEndCondition(fighter.health, opponent.health);
}

// make a function to check for game end -- if either party's health is below 0, round (and possibly game) end
function checkEndCondition(fighterHealth, opponentHealth) {
    if (fighterHealth < 0 && opponentHealth < 0) {
        $("#matchup").html("<h2>You have defeated each other! Game over</h2>");
        $("#attackbutton").hide();
        $("#resetbutton").show();
        $("#loserDisplay").show();
        $("#my-hero").empty();
        $("#enemy").empty();
    } else if (fighterHealth < 0) {
        $("#matchup").html("<h2>You lose :c</h2>");
        $("#attackbutton").hide();
        $("#resetbutton").show();
        $("#loserDisplay").show();
        $("#my-hero").empty();
        $("#enemy").empty();
    } else if (opponentHealth < 0) {
        $("#matchup").html("<h2>You win!</h2>");
        remainingEnemy--;
        if (remainingEnemy > 0) {
            $("#attackbutton").hide();
            $("#roundbutton").show();
        } else {
            winGame();
        }
    }
}

// initialize/reset the game

function resetGame() {
    heroChosen = false;
    opponentChosen = false;
    roundcount = 0;

    // empty out all information updated through the game
    $("#pick-hero").empty();
    $("#my-hero").empty();
    $("#enemy").empty();
    $("#actionUpdate1").html("Pick your fighter!");
    $("#actionUpdate2").html("");
    $("#matchup").html("");
    $("#winnerDisplay").hide();
    $("#loserDisplay").hide();

    // show the hero selection again
    $("#pick-hero").show();

    // reset the objects containing health and attack scores
    setObj();

    for (i = 0; i < heroesArray.length; i++) {
        newImg = $("<img src='assets/images/" + heroesArray[i] + ".jpg'>");
        newImg.attr("class", "hero");
        newImg.attr("id", heroesArray[i]);
        $("#pick-hero").append(newImg);
    }
    // set how many enemies are remaining
    remainingEnemy = 3;

    // hide functionality buttons
    $("#attackbutton").hide();
    $("#roundbutton").hide();
    $("#resetbutton").hide();
}

// if the round was won, remove the defeated enemy and prompt the user to pick a new enemy
function nextRound() {
    heroChosen = true;
    opponentChosen = false;
    // remove the defeated enemy;
    $("#enemy").empty();
    // hide the button
    $("#roundbutton").hide();
    $("#actionUpdate1").html("<h2>Pick your opponent!</h2>");
    $("#actionUpdate2").html("");
    $("#matchup").html("");
    $("#pick-hero").show();
}

// on total win, show win screen!
function winGame() {
    $("#enemy").empty();
    $("#my-hero").empty();
    $("#attackbutton").hide();
    alert("Win!");
    $("#resetbutton").show();
    $("#winnerDisplay").show();
}

////////////////////////////////////////////////////////////////////
/////////////////////////// GAME CONTROL ///////////////////////////
////////////////////////////////////////////////////////////////////

// on click event to set the hero and the opponent. For each, grab the ID of the picture clicked
// then move the img with that ID from the pick-hero section to the "my hero" or "enemy" areas, respectively.
$("#pick-hero").on("click", ".hero", function(event) {
    if (!heroChosen) {
        fighter = $(event.target).attr("id");
        var gameDiv = $("#" + fighter);
        gameDiv.appendTo($("#my-hero"));
        heroChosen = true;
        $("#actionUpdate1").html("Pick your opponent!");
    } else if (!opponentChosen) {
        opponent = $(event.target).attr("id");
        var gameDiv = $("#" + opponent);
        gameDiv.appendTo($("#enemy"));
        opponentChosen = true;
        $("#attackbutton").show();
        $("#actionUpdate1").html("");
        $("#matchup").html("<h2>" + fighter + " vs. " + opponent + "</h2>");
        // hide all other opponents
        $("#pick-hero").hide();
    }
});

// on click event to ramp up attack power and run the attack function with the inputs for current
// fighter, current opponent, and current attack power factor
$("#attackbutton").on("click", function() {
    roundcount++;
    attack(heroObj[fighter], heroObj[opponent], roundcount);
});

// clicking on the reset button should restart the game entirely
$("#resetbutton").on("click", resetGame);

// clicking on the next round button should start the next round
$("#roundbutton").on("click", nextRound);

resetGame();
