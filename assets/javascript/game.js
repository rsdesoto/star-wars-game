// 0. take all 4 fighters and assign them to the choose your fighter screen. prompt the
// user to choose their fighter

var kreia = {
    name: "kreia",
    health: 50,
    attack: 10,
    counter: 20
};

var revan = {
    name: "revan",
    health: 25,
    attack: 20,
    counter: 10
};

var bastila = {
    name: "bastila",
    health: 75,
    attack: 5,
    counter: 10
};

var exile = {
    name: "exile",
    health: 90,
    attack: 5,
    counter: 30
};

var heroObj = {
    bastila: bastila,
    kreia: kreia,
    revan: revan,
    exile: exile
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
    attack(fighter, opponent, roundcount);
});

function attack(param1, param2, param3) {
    alert(param1);
    alert(param2);
    alert(param3);

    //alert("hi");
    // meAttack = parseInt(me.attack) * parseInt(fround);
    // meHealth = parseInt(me.health);
    // console.log(meAttack);
    // console.log(meHealth);
    // console.log(me.name);
    // youAttack = you.counter;
    // youHealth = you.health;
    // console.log("hero has " + (meHealth - youAttack));
    // console.log("opponent has " + (youHealth - meAttack));
    // opponent.health = opponentHealth - fighterAttack;
    // fighter.health = fighterHealth - opponentAttack;
}

fighter = "kreia";
opponent = "bastila";

attack(heroObj.fighter, heroObj.opponent, 2);
//console.log(bastila.name);

//console.log(heroObj.kreia);
