function updateAttackToMonitor(opponent,damage){
    const message = `${opponent} caused ${parseInt( damage )} damage!`;
    monitor.innerHTML = message;
}

function updateHealToMonitor(opponent){
    const message = `${opponent} ${USER_HEAL_MSG} ${parseInt(currentPlayerHealth)}`;
    monitor.innerHTML = message;
}

function updateMonitor(message){
    monitor.innerHTML = message;
}