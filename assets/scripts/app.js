print = console.log;
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE=17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const TIME_WATING_FOR_ATTACK = 1000;
const USER_HEAL_MSG = ' just used heal! total user health is: '

let use_heal = false;
let chosenMaxLife = 20;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife; 


adjustHealthBars(chosenMaxLife);
resetMonitor();


function attackHandler(){
    attackMonster(MODE_ATTACK);
}


function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}

function attackMonster(mode){

    let maxDamage =getAttackMode(mode);
    
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth = currentMonsterHealth - damage;
    updateAttackToMonitor('user',damage);
    
    attackUser();
    endRound(currentMonsterHealth,currentPlayerHealth);

}

function attackUser(){
    setTimeout(()=>{
        const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
        currentPlayerHealth = currentPlayerHealth- playerDamage;
        updateAttackToMonitor('monster',playerDamage);
    },1000);
}

function resetGameHandler(){

    if (currentMonsterHealth<= 0 || currentPlayerHealth<=0){
        currentMonsterHealth =  currentPlayerHealth = chosenMaxLife; 
        resetGame(chosenMaxLife);
        use_heal = false;
        }
    else{
        alert("the game is still running!");
    }
}

function endRound(currentMonsterHealth,currentPlayerHealth){
    if (currentMonsterHealth<= 0 && currentPlayerHealth<=0){
        updateMonitor("It's a DRAW!")
    }
    else if (currentMonsterHealth <= 0){
        updateMonitor("You Won!")
    }
    else if(currentPlayerHealth <=0){
        updateMonitor("You Lost");
    }
}

function getAttackMode(mode){
    let maxDamage;
    if(mode == MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
    }
    else if (mode == MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK_VALUE;
    }
    return maxDamage;
}

function healPlayerHandler(){

    if(!use_heal){
        use_heal = true;
        toggleHealButton(use_heal);
        
        let healValue;

        if (currentPlayerHealth +HEAL_VALUE <=chosenMaxLife){
            healValue = HEAL_VALUE;
            currentPlayerHealth = currentPlayerHealth+HEAL_VALUE;
        }
        else{
            healValue = currentPlayerHealth -HEAL_VALUE;
            currentPlayerHealth = chosenMaxLife;
        }

        increasePlayerHealth(healValue);
        updateHealToMonitor('user');
        endRound();
    }
    
}


//----------------------
//setting the amount of life for the charecters
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
resetBtn.addEventListener('click',resetGameHandler);