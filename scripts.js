let players = [];
let currentIndex = -1;
let rounds = 0;

function addPlayer() {
    const playerName = document.getElementById('playerName').value;
    const initiativeRoll = document.getElementById('initiativeRoll').value;

    if (playerName && initiativeRoll) {
        players.push({ name: playerName, roll: parseInt(initiativeRoll) });
        renderPlayers();
        document.getElementById('playerName').value = '';
        document.getElementById('initiativeRoll').value = '';
    }
}

function removePlayer(index) {
    if (index === currentIndex) {
        advancePlayer();
        currentIndex--; // Adjust because the array will shrink
    }

    players.splice(index, 1);

    if (players.length === 0) {
        currentIndex = -1;
        rounds = 0;
    } else if (currentIndex >= index) {
        currentIndex = currentIndex % players.length;
    }
    renderPlayers();
}

function sortPlayers() {
    players.sort((a, b) => b.roll - a.roll);
    renderPlayers();
}

function movePlayerUp(index) {
    if (index > 0) {
        [players[index], players[index - 1]] = [players[index - 1], players[index]];
        renderPlayers();
    }
}

function movePlayerDown(index) {
    if (index < players.length - 1) {
        [players[index], players[index + 1]] = [players[index + 1], players[index]];
        renderPlayers();
    }
}

function startInitiative() {
    if (players.length > 0) {
        currentIndex = 0;
        rounds = 1;
        document.getElementById('roundCounter').textContent = `Rounds: ${rounds}`;
        renderPlayers();
    }
}

function advancePlayer() {
    if (currentIndex !== -1 && players.length > 0) {
        currentIndex = (currentIndex + 1) % players.length;
        if (currentIndex === 0) {
            rounds++;
            document.getElementById('roundCounter').textContent = `Rounds: ${rounds}`;
        }
        renderPlayers();
    }
}

function resetRounds() {
    rounds = 0;
    document.getElementById('roundCounter').textContent = `Rounds: ${rounds}`;
}

function renderPlayers() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    players.forEach((player, index) => {
        const playerItem = document.createElement('div');
        playerItem.className = 'player-item' + (index === currentIndex ? ' active' : '');
        playerItem.innerHTML = `
            <span>${player.name} - ${player.roll}</span>
            <div class="controls">
                <button class="move-up" onclick="movePlayerUp(${index})">&#9650;</button>
                <button class="move-down" onclick="movePlayerDown(${index})">&#9660;</button>
                <button onclick="removePlayer(${index})">Remove</button>
            </div>
        `;
        playerList.appendChild(playerItem);
    });
}

document.addEventListener('DOMContentLoaded', renderPlayers);
