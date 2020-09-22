print = console.log;
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE=17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife; 


function attackHandler(){
    attackMonster('ATTACK');
}

function strongAttackHandler(){
    attackMonster('STRONG_ATTACK');
}

function attackMonster(mode){
    let maxDamage;
    
    if(mode == 'ATTACK'){
        maxDamage = ATTACK_VALUE;
    }
    else if (mode == 'STRONG_ATTACK'){
        maxDamage = STRONG_ATTACK_VALUE;
    }
    
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth = currentMonsterHealth - damage;
    
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth = currentPlayerHealth- playerDamage;

        if (currentMonsterHealth<= 0 && currentPlayerHealth<=0){
            alert("It's a DRAW!")
        }
        else if (currentMonsterHealth <= 0){
            alert("You Won!")
        }
        else if(currentPlayerHealth <=0){
            alert("You Lost");
        }
}

//----------------------
//setting the amount of life for the charecters
adjustHealthBars(chosenMaxLife);
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
