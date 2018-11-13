// 0. take all 4 fighters and assign them to the choose your fighter screen. prompt the
// user to choose their fighter

var kreia = {
    name: kreia,
    health: 50,
    attack: 10,
    counter: 20
};

var revan = {
    name: revan,
    health: 25,
    attack: 20,
    counter: 10
};

// generate each character's stats

// 1. on first click, move the fighter up to the fighter section

// 2. on second click, move the opponent down to the opponent section

// 3. on attack button click, do the attack/defense. check for game end condition.

// 4. on game end, reset everything

// on every click of attack, attack = attack + attack(base)
// on every click of attack, take dmg equal to opponent's counter

// on button click - roundcount goes up by one and
// is input into attack

function attack(fighter, opponent, roundcount) {
    fighterAttack = fighter.attack * roundcount;
    fighterHealth = fighter.health;

    opponentAttack = opponent.counter;
    opponentHealth = opponent.health;

    console.log("hero has " + (fighterHealth - opponentAttack));
    console.log("opponent has " + (opponentHealth - fighterAttack));

    opponent.health = opponentHealth - fighterAttack;
    fighter.health = fighterHealth - opponentAttack;
}

// attack(kreia, revan, 3);

roundcount = 0;
in1 = kreia;
in2 = revan;
$("#attackbutton").on("click", function() {
    roundcount++;
    attack(in1, in2, roundcount);
});
