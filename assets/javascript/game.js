/////////////////////////////////////////////////////////////////
/////////////////////////// VARIABLES ///////////////////////////
/////////////////////////////////////////////////////////////////

// heroes array for generating interactive buttons
heroesArray = ["bastila", "revan", "kreia", "exile"];

// hero stat objects
var kreiaobj = {
    name: "Kreia"
};

var revanobj = {
    name: "Revan"
};

var bastilaobj = {
    name: "Bastila"
};

var exileobj = {
    name: "Exile"
};

function setObj() {
    kreiaobj.health = 80;
    kreiaobj.attack = 20;
    kreiaobj.counter = 20;

    revanobj.health = 125;
    revanobj.attack = 25;
    revanobj.counter = 10;

    bastilaobj.health = 100;
    bastilaobj.attack = 30;
    bastilaobj.counter = 25;

    exileobj.health = 90;
    exileobj.attack = 15;
    exileobj.counter = 25;
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

    // update HP totals;
    // newText.attr("id", heroesArray[i] + "hp");
    $("#" + fighter.name.toLowerCase() + "hp").text(
        fighter.name + ": " + fighter.health + " hp"
    );
    $("#" + opponent.name.toLowerCase() + "hp").text(
        opponent.name + ": " + opponent.health + " hp"
    );

    // check to see if a fighter is out
    checkEndCondition(fighter.health, opponent.health);
}

// make a function to check for game end -- if either party's health is below 0, round (and possibly game) end
function checkEndCondition(fighterHealth, opponentHealth) {
    if (fighterHealth <= 0 && opponentHealth <= 0) {
        $("#matchup").html("<h2>You have defeated each other! Game over</h2>");
        loseGame();
    } else if (fighterHealth <= 0) {
        $("#matchup").html("<h2>You lose :c</h2>");
        loseGame();
    } else if (opponentHealth <= 0) {
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
        // let's write some bootstrap in jquery!!!
        // create card
        var newDiv = $("<div>");
        newDiv.attr("class", "card hero");
        newDiv.attr("id", heroesArray[i]);

        // add image
        var newImg = $("<img>");
        newImg.attr("class", "card-img-top");
        newImg.attr("src", "./assets/images/" + heroesArray[i] + ".jpg");

        newDiv.append(newImg);

        // add text
        var newBody = $("<div>");
        newBody.attr("class", "card-body");

        var newText = $("<div>");
        newText.attr("class", "card-text");
        newText.text(
            heroObj[heroesArray[i]].name +
                ": " +
                heroObj[heroesArray[i]].health +
                " hp"
        );
        newText.attr("id", heroesArray[i] + "hp");

        newBody.append(newText);

        newDiv.append(newBody);

        newDiv.width("200px");

        $("#pick-hero").append(newDiv);
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
    $("#resetbutton").show();
    $("#winnerDisplay").show();
}

function loseGame() {
    $("#attackbutton").hide();
    $("#resetbutton").show();
    $("#loserDisplay").show();
    $("#my-hero").empty();
    $("#enemy").empty();
}

////////////////////////////////////////////////////////////////////
/////////////////////////// GAME CONTROL ///////////////////////////
////////////////////////////////////////////////////////////////////

// on click event to set the hero and the opponent. For each, grab the ID of the picture clicked
// then move the img with that ID from the pick-hero section to the "my hero" or "enemy" areas, respectively.

// question: why does "(event.target) not work but (this) does?"
$("#pick-hero").on("click", ".hero", function(event) {
    if (!heroChosen) {
        //console.log($(this));
        fighter = $(this).attr("id");
        var gameDiv = $("#" + fighter);
        gameDiv.appendTo($("#my-hero"));
        heroChosen = true;
        //alert(fighter);
        $("#actionUpdate1").html("Pick your opponent!");
    } else if (!opponentChosen) {
        opponent = $(this).attr("id");
        var gameDiv = $("#" + opponent);
        gameDiv.appendTo($("#enemy"));
        opponentChosen = true;
        $("#attackbutton").show();
        $("#actionUpdate1").html("");
        $("#matchup").html(
            "<h2>" +
                heroObj[fighter].name +
                " vs. " +
                heroObj[opponent].name +
                "</h2>"
        );
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
