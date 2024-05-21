let players = [];
let currentIndex = -1;
let rounds = 0;
let currentPlayerIndex = null;

function addPlayer() {
    const playerName = document.getElementById('playerName').value;
    const initiativeRoll = document.getElementById('initiativeRoll').value;

    if (playerName && initiativeRoll) {
        players.push({ name: playerName, roll: parseInt(initiativeRoll), conditions: [] });
        renderPlayers();
        document.getElementById('playerName').value = '';
        document.getElementById('initiativeRoll').value = '';
    }
}

function removePlayer(index) {
    if (index === currentIndex) {
        if (players.length === 1) {
            currentIndex = -1;
            rounds = 0;
        } else {
            advancePlayer();
            currentIndex--;
            if (index === players.length - 1) {
                rounds++;
                currentIndex = 0;
            }
        }
    } else if (currentIndex > index) {
        currentIndex--;
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

function clearAll() {
    players = [];
    currentIndex = -1;
    rounds = 0;
    document.getElementById('roundCounter').textContent = `Rounds: ${rounds}`;
    renderPlayers();
}

function renderPlayers() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    players.forEach((player, index) => {
        const playerItem = document.createElement('div');
        playerItem.classList.add('player-item');
        if (index === currentIndex) {
            playerItem.classList.add('active');
        }

        playerItem.innerHTML = `
            <div class="player-header">
                <span>${player.name} (Initiative: ${player.roll})</span>
                <div class="controls">
                    <button class="move-up" onclick="movePlayerUp(${index})">&#x25B2;</button>
                    <button class="move-down" onclick="movePlayerDown(${index})">&#x25BC;</button>
                    <button class="remove" onclick="removePlayer(${index})">Remove</button>
                    <button onclick="openConditionModal(${index})">Add Condition</button>
                </div>
            </div>
            <div class="condition-list">
                ${player.conditions.map((condition, i) => `<span onclick="removeCondition(${index}, ${i})">${condition}</span>`).join('')}
            </div>
        `;

        playerList.appendChild(playerItem);
    });
}

function openConditionModal(index) {
    currentPlayerIndex = index;
    document.getElementById('conditionModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('conditionModal').style.display = 'none';
    currentPlayerIndex = null;
}

function applyCondition() {
    const conditionSelect = document.getElementById('conditionSelect');
    const condition = conditionSelect.value;

    if (condition && currentPlayerIndex !== null && !players[currentPlayerIndex].conditions.includes(condition)) {
        players[currentPlayerIndex].conditions.push(condition);
        renderPlayers();
    }

    closeModal();
}

function removeCondition(playerIndex, conditionIndex) {
    players[playerIndex].conditions.splice(conditionIndex, 1);
    renderPlayers();
}

function changeTheme() {
    const theme = document.getElementById('theme').value;
    let root = document.documentElement;

    switch (theme) {
        case 'dark':
            root.style.setProperty('--bg-color', '#2b2b2b');
            root.style.setProperty('--container-bg-color', '#1a1a1a');
            root.style.setProperty('--border-color', '#ff6347');
            root.style.setProperty('--text-color', '#d3d3d3');
            root.style.setProperty('--button-bg-color', '#ff4500');
            root.style.setProperty('--button-hover-bg-color', '#ff6347');
            root.style.setProperty('--player-item-bg-color', '#4b0082');
            root.style.setProperty('--active-player-bg-color', '#8b0000');
            root.style.setProperty('--remove-button-bg-color', '#ff6347');
            root.style.setProperty('--remove-button-hover-bg-color', '#ff7f50');
            break;
        case 'forest':
            root.style.setProperty('--bg-color', '#d2f0d2');
            root.style.setProperty('--container-bg-color', '#a8d5a8');
            root.style.setProperty('--border-color', '#556b2f');
            root.style.setProperty('--text-color', '#4b5320');
            root.style.setProperty('--button-bg-color', '#6b8e23');
            root.style.setProperty('--button-hover-bg-color', '#556b2f');
            root.style.setProperty('--player-item-bg-color', '#98fb98');
            root.style.setProperty('--active-player-bg-color', '#66cdaa');
            root.style.setProperty('--remove-button-bg-color', '#556b2f');
            root.style.setProperty('--remove-button-hover-bg-color', '#6b8e23');
            break;
        case 'ocean':
            root.style.setProperty('--bg-color', '#e0ffff');
            root.style.setProperty('--container-bg-color', '#afeeee');
            root.style.setProperty('--border-color', '#4682b4');
            root.style.setProperty('--text-color', '#2f4f4f');
            root.style.setProperty('--button-bg-color', '#5f9ea0');
            root.style.setProperty('--button-hover-bg-color', '#4682b4');
            root.style.setProperty('--player-item-bg-color', '#b0e0e6');
            root.style.setProperty('--active-player-bg-color', '#00ced1');
            root.style.setProperty('--remove-button-bg-color', '#4682b4');
            root.style.setProperty('--remove-button-hover-bg-color', '#5f9ea0');
            break;
        default:
            root.style.setProperty('--bg-color', '#f0f8ff');
            root.style.setProperty('--container-bg-color', '#fff8dc');
            root.style.setProperty('--border-color', '#8b4513');
            root.style.setProperty('--text-color', '#333');
            root.style.setProperty('--button-bg-color', '#8b4513');
            root.style.setProperty('--button-hover-bg-color', '#a0522d');
            root.style.setProperty('--player-item-bg-color', '#ffe4b5');
            root.style.setProperty('--active-player-bg-color', '#f0e68c');
            root.style.setProperty('--remove-button-bg-color', '#b22222');
            root.style.setProperty('--remove-button-hover-bg-color', '#dc143c');
            break;
    }
}

document.addEventListener('DOMContentLoaded', renderPlayers);
