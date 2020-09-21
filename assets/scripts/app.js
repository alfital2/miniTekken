print = console.log;
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife; 


function attackHandler(){
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth = currentMonsterHealth - damage;
    
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth = currentPlayerHealth- playerDamage;

        if (currentMonsterHealth<= 0 && currentPlayerHealth<=0){
            alert("It's a TIE!")
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

