let block = document.querySelector('.block')
    input = document.querySelector('.input'),
    btn = document.querySelector('.btn'),
    timeOut = document.querySelector('.time'),
    box = document.querySelector('.box'),
    score = 0,
    time = 0,
    interval = 0;

btn.addEventListener('click', (event) => {
    event.preventDefault()
    if (input.value != '') {
        time = input.value
        input.value = '';
        score = 0;
        clearInterval(interval)
        start();
        let result = document.querySelector('.result');
        result.style.display = 'none'
    }
})


box.addEventListener('click', (event) => {
    if (event.target.classList.contains('ball')) {
        score++
        event.target.remove()
        createBall()
    }
})


function start() {
    interval = setInterval(() => decreaseTime(), 1000)
    createBall()
}



function decreaseTime() {
    if (time === 0) {
        timeOut.classList.remove('attention')
        block.classList.remove('shake')
        endGame()
    } else {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = '0' + currentTime
            timeOut.classList.add('attention')
            block.classList.add('shake')
        }
        timeOut.innerHTML = '00:' + currentTime
    }
}

function endGame() {
    box.innerHTML = `<h1 class="result">Вы набрали: <span>${score}</span> очков</h1>`
}

function createBall() {
    let ball = document.createElement('div');
    let size = random(20, 80);
    let coordinates = box.getBoundingClientRect()
    let x = random(0, coordinates.width - size);
    let y = random(0, coordinates.height - size);

    ball.style.width = size + 'px';
    ball.style.height = size + 'px';
    ball.classList.add('ball')
    ball.classList.add(figures[random(0, 4)])
    ball.style.background = colors[random(0, 4)];
    ball.style.top = y + 'px';
    ball.style.left = x + 'px';

    box.append(ball)
}

function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}

let colors = ['red', 'green', 'gold', 'blue', 'pink']
let figures = ['close', 'cross', 'custom', 'frame', 'decagon']