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

const COUNTDOWN_INTERVAL = 1000;
const SECONDS_TO_COUNT= 0;

////colors scheme
const ACTIVE_COLOR_BACKGROUND= '#ff0062';
const ACTIVE_HOVER_COLOR = '#a927f5';


function resetMonitor(){
  let i=SECONDS_TO_COUNT;
  toggleControlButtons(DISABLE_BUTTONS);
  monitor.innerHTML = "get ready!";
  let myInterval = setInterval(()=>{
    monitor.innerHTML = i;
    if(i==0) {
      monitor.innerHTML = "FIGHT!"; 
      toggleControlButtons(ENABLE_BUTTONS);
      clearInterval(myInterval);
    }
    i=i-1;
  },COUNTDOWN_INTERVAL)

}


function toggleHealButton(mode){
  background =  borderColor = mode ? 'grey' : '#ff0062';
  document.getElementById(healBtn.id).disabled = true;
  document.getElementById(healBtn.id).style.background=background;
  document.getElementById(healBtn.id).style.borderColor =borderColor;
}


function toggleControlButtons(disable){
  let css
  if(disable){
    css = `button {
          background: grey;
          border: 1px solid grey;
          display: none;
         }
          button:hover,
          button:active {
          background: grey;
          border-color: grey;
          }`;
  }
  else{
    css =`button {background: #ff0062;
          border: 1px solid #ff0062;
          display : inline;
          }
          button:hover,
          button:active {
          background: #a927f5;
          border-color: #a927f5;
          }`;
        }

  let style = document.createElement('style');
  
  if (style.styleSheet) {
        style.styleSheet.cssText = css;
  } else {
      style.appendChild(document.createTextNode(css));
  }
    document.getElementsByTagName('head')[0].appendChild(style);
  
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
  toggleHealButton(ENABLE_BUTTONS);
  toggleControlButtons(ENABLE_BUTTONS);
  document.getElementById(healBtn.id).disabled = false;
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
