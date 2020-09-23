print = console.log;
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE=17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const TIME_WATING_FOR_ATTACK = 1000;
const USER_HEAL_MSG = ' just used heal! total user health is: '
const MONSTER = 'MONSTER';
const USER = "USER";

let use_heal = false;
let chosenMaxLife = 50;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife; 

adjustHealthBars(chosenMaxLife);
resetMonitor();


function verifyCanPlay(){    
    if (currentPlayerHealth<=0 || gameStarted==false){
        return false;
    }
    if (!canPlay){
        alert("please wait !")
        return false;
    }
    return true;
}

function performAttack(attack){
    let canPlay = verifyCanPlay();

    if(canPlay){
        attackMonster(attack)
    }
}

function attackMonster(mode){
    canPlay=false; // this alters every time when user attack monster
    let maxDamage =getAttackMode(mode);
    changeBgColor(MONSTER);

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth = currentMonsterHealth - damage;

    updateAttackToMonitor(USER,damage); 
    let continueRound = endRound(currentMonsterHealth,currentPlayerHealth);
    if (continueRound)
        attackUser();
}


function attackUser(){
    setTimeout(()=>{
        const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
        currentPlayerHealth = currentPlayerHealth- playerDamage;
        changeBgColor(USER);
        updateAttackToMonitor(MONSTER,playerDamage);
        endRound(currentMonsterHealth,currentPlayerHealth);
        canPlay = true;
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
    let continueRound = true;
    if (currentMonsterHealth<= 0 || currentPlayerHealth<=0){
        continueRound = false;
    }
    if (currentMonsterHealth<= 0 && currentPlayerHealth<=0){
        updateMonitor("It's a DRAW!")
    }
    else if (currentMonsterHealth <= 0){
        updateMonitor("You Won!")
    }
    else if(currentPlayerHealth <=0){
        updateMonitor("You Lost");
    }
    return continueRound;
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

    if(!use_heal && verifyCanPlay()){
        use_heal = true;
        toggleHealButton(DISABLE_BUTTONS);
        
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
        attackUser();
        endRound();
    }
    
}


//----------------------
attackBtn.addEventListener('click',()=>performAttack(MODE_ATTACK));
strongAttackBtn.addEventListener('click',()=>performAttack(MODE_STRONG_ATTACK));
healBtn.addEventListener('click',healPlayerHandler);
resetBtn.addEventListener('click',resetGameHandler);