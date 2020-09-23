function updateAttackToMonitor(opponent,damage){
    const message = `${opponent} caused ${parseInt( Math.ceil(damage) )} damage!`;
    monitor.innerHTML = message;
}

function updateHealToMonitor(opponent){
    const message = `${opponent} ${USER_HEAL_MSG} ${parseInt(Math.ceil( currentPlayerHealth))}`;
    monitor.innerHTML = message;
}

function updateMonitor(message){
    monitor.innerHTML = message;
}