// 0. take all 4 fighters and assign them to the choose your fighter screen. prompt the
// user to choose their fighter

var kreiaobj = {
    name: "kreia",
    health: 50,
    attack: 10,
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

var heroObj = {
    bastila: bastilaobj,
    kreia: kreiaobj,
    revan: revanobj,
    exile: exileobj
};

function temphide() {
    $("#attackbutton").hide();
}

temphide();

// generate each character's stats

// 1. on first click, move the fighter up to the fighter section
// 2. on second click, move the opponent down to the opponent section
// on second click, also unhide the attack button

var heroChosen = false;
var opponentChosen = false;

var fighter;
var opponent;

$(".hero").on("click", function(event) {
    if (!heroChosen) {
        fighter = $(event.target).attr("id");
        console.log(fighter);
        var temp = $("#" + fighter);
        console.log(temp.attr("class"));
        temp.appendTo($("#my-hero"));
        heroChosen = true;
    } else if (!opponentChosen) {
        opponent = $(event.target).attr("id");
        console.log(opponent);
        var temp = $("#" + opponent);
        console.log(temp.attr("class"));
        temp.appendTo($("#enemy"));
        opponentChosen = true;

        $("#attackbutton").show();
    }
});

// 3. on attack button click, do the attack/defense. check for game end condition.

// 4. on game end, reset everything

// on every click of attack, attack = attack + attack(base)
// on every click of attack, take dmg equal to opponent's counter

// on button click - roundcount goes up by one and
// is input into attack

// attack(kreia, revan, 3);

roundcount = 0;
$("#attackbutton").on("click", function() {
    roundcount++;
    console.log(roundcount);
    console.log(fighter);
    console.log(opponent);
    attack(heroObj[fighter], heroObj[opponent], roundcount);
});

function attack(fighter, opponent, roundcount) {
    fighterAttack = fighter.attack * roundcount;
    fighterHealth = fighter.health;

    alert(fighter.name);
    alert(opponent.name);

    // for the opponent - only use the counter attack, and do not multiply by what round it is
    opponentAttack = opponent.counter;
    opponentHealth = opponent.health;

    fighter.health = fighterHealth - opponentAttack;
    opponent.health = opponentHealth - fighterAttack;

    console.log(
        fighter.name +
            " has hit " +
            opponent.name +
            " for " +
            fighterAttack +
            " points of damage!"
    );
    console.log(
        opponent.name +
            " has hit " +
            fighter.name +
            " for " +
            opponentAttack +
            " points of damage!"
    );

    console.log(fighter.name + " has " + fighter.health + " hit points left!");
    console.log(
        opponent.name + " has " + opponent.health + " hit points left!"
    );
}

// // attack(heroObj[fighter], heroObj[opponent], 2);
// //console.log(bastila.name);

// console.log(heroObj[fighter].name);
