// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // mario effect, reset enemy position when they go off the canvas
    if (this.x > 510) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 510);
    }
    this.checkCollision();
};

// detects collision
Enemy.prototype.checkCollision = function() {
    if (player.y + 140 >= this.y + 80 &&
        player.y + 75 <= this.y + 120 &&
        player.x + 30 <= this.x + 95 &&
        player.x + 70 >= this.x + 10) {
        console.log('collision');
        gameReset();
    }
}; // added the .checkCollision function to help keep track of the game reset
  // as opposed to my old code

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-cat-girl.png';
};
Player.prototype.update = function() {};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//this enables the player from going off the canvas
//unlike the code above, this code helps when using the keys, especially when going right

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.x = (this.x - this.speed + 510) % 510; // the canvas axis length match these numbers for better functionality in game
    } else if (key == 'right') {
        this.x = (this.x + this.speed) % 510;
    } else if (key == 'up') {
        this.y = (this.y - this.speed + 605) % 605; //nearing the top
        if (this.y <= (85 - 50)) {
            gameWon();
            return;
        }
    } else {
        this.y = (this.y + this.speed) % 606;
        if (this.y > 400) {
            this.y = 400;
        }
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
    if (this.x > 450) {
        this.x = 450;
    }
};

// starting position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];


var player = new Player(0, 0, 50);
var scoreDiv = document.createElement('div');
gameReset(); // resets the canvas and player as well as enemies
var canvasDiv = document.getElementsByTagName('canvas')[0];
document.body.insertBefore(scoreDiv, canvasDiv);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// helps increase the score
var score = 0;

//if player gets hit, resets the score
function gameReset() {
    player.reset();
    score = 0;
    scoreBoard();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0, Math.random() * 125 + 60, Math.random() * 100 + 50),
        new Enemy(0, Math.random() * 125 + 80, Math.random() * 100 + 70)
    );
};

// tallies a score when you reach the water
function gameWon() {
    player.reset();
    score += 1;
    scoreBoard();
    if (score % 2 == 0 && allEnemies.length < 6) {
        allEnemies.push(new Enemy(0, Math.random() * 150 + 50, Math.random() * 100 + 75));
    }
}

//keeps track of the score
function scoreBoard() {
    scoreDiv.innerHTML = 'Score: ' + score;
};
