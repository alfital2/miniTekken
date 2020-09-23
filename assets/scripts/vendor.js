print = console.log;
const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');

const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const resetBtn = document.getElementById('reset-btn');
const monitor= document.getElementById('monitor');

const ENABLE_BUTTONS= false;
const DISABLE_BUTTONS= true;

const ALL_BUTTONS = 'button';
const HEAL_BUTTON = '#heal-btn';
const STRONG_ADDACK_BUTTON = '#strong-attack-btn';

const COUNTDOWN_INTERVAL = 1000;
const SECONDS_TO_COUNT= 3;
const TIMEֹֹ_PAUSE_ATTACK=80;

////colors scheme
const ACTIVE_COLOR_BACKGROUND= '#ff0062';
const ACTIVE_HOVER_COLOR = '#a927f5';

let canPlay = false;
let gameStarted;


function resetMonitor(){
  let i=SECONDS_TO_COUNT;
  gameStarted = false;
  toggleControlButtons(DISABLE_BUTTONS,ALL_BUTTONS);
  monitor.innerHTML = "get ready!";
  let myInterval = setInterval(()=>{
    monitor.innerHTML = i;
    if(i==0) {
      monitor.innerHTML = "FIGHT!"; 
      toggleControlButtons(ENABLE_BUTTONS,ALL_BUTTONS);
      toggleControlButtons(ENABLE_BUTTONS,HEAL_BUTTON);
      toggleControlButtons(ENABLE_BUTTONS,STRONG_ADDACK_BUTTON);
      gameStarted = true;
      clearInterval(myInterval);
    }
    i=i-1;
  },COUNTDOWN_INTERVAL)
}

function getOpponentHtmlElement(opponent){

  if (opponent == MONSTER){
    return document.getElementsByClassName('monsterImg');
  }
  else if(opponent == USER){
    return document.getElementsByClassName('userImg');
  }
}

function changeBgColor(opponent){
  let element ;
  element = getOpponentHtmlElement(opponent);
 
  element[0].style.backgroundColor = 'red';
  setTimeout(()=>{
    element[0].style.backgroundColor = 'white';
  },TIMEֹֹ_PAUSE_ATTACK);

}

function toggleHealButton(mode){
  toggleControlButtons(mode,HEAL_BUTTON);
}

function toggleStrongAttackButton(mode){
  toggleControlButtons(mode,STRONG_ADDACK_BUTTON);
}

function updateStyle(css){
  let style = document.createElement('style');
  if (style.styleSheet) {
        style.styleSheet.cssText = css;
  } else {
      style.appendChild(document.createTextNode(css));
  }
    document.getElementsByTagName('head')[0].appendChild(style);
}


function creartCss(css,element){
  return css.replace(/dynamicElement/gi, element);
}


function toggleControlButtons(disable,element){
  let css;

  if(disable){
    canPlay = false;
    css = creartCss(blockedButtons,element); //source value at dynamicUpdates.js
  }
  else{
    canPlay = true;
    css =creartCss(unBlockesButtons,element);//source value at dynamicUpdates.js
  }
  print(css);
  updateStyle(css);
}


function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(value) {
  resetMonitor();
  toggleHealButton(DISABLE_BUTTONS);
  toggleStrongAttackButton(DISABLE_BUTTONS);
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}


function setPlayerHealth(health) {
  playerHealthBar.value = health;
}


  // const btns = document.querySelectorAll(".btns");
	// for (const btn of btns) {
  //   // document.getElementsByTagName('head')[0].appendChild(style);
  //   // let sheetParent = btn.parentNode;
  //   // sheetParent.removeChild(btn.styleSheet);
	// }