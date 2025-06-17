const words = ["apple", "berry", "grape", "lemon", "mango"];
const word = words[Math.floor(Math.random() * words.length)].toUpperCase();
let currentRow = 0;
let currentCol = 0;

const grid = document.querySelector('.grid');
const keyboard = document.querySelector('.keyboard');

function createGrid() {
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        grid.appendChild(cell);
    }
}

function createKeyboard() {
    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    keys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.textContent = key;
        keyElement.addEventListener('click', () => handleKeyPress(key));
        keyboard.appendChild(keyElement);
    });
}

function handleKeyPress(key) {
    if (currentCol < 5 && currentRow < 5) {
        const cell = grid.children[currentRow * 5 + currentCol];
        cell.textContent = key;
        currentCol++;
    }
}

function handleEnter() {
    if (currentCol === 5) {
        const guess = Array.from(grid.children)
            .slice(currentRow * 5, currentRow * 5 + 5)
            .map(cell => cell.textContent)
            .join('');

        if (guess === word) {
            alert('🎉 You guessed the word!');
        } else {
            currentRow++;
            currentCol = 0;
            if (currentRow === 5) {
                alert(`❌ Game over! The word was ${word}`);
            }
        }
    }
}

function handleBackspace() {
    if (currentCol > 0) {
        currentCol--;
        const cell = grid.children[currentRow * 5 + currentCol];
        cell.textContent = '';
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleEnter();
    } else if (event.key === 'Backspace') {
        handleBackspace();
    } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKeyPress(event.key.toUpperCase());
    }
});

createGrid();
createKeyboard();