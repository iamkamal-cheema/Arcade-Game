// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // To calculate speed of enemies
    this.speed = Math.floor(Math.random() * 150) + 120;


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var enemy = new Enemy();

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 550) {
        this.x += this.speed * dt;
    } else {
        this.x = -20;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Different instances of enemies
var enemy1 = new Enemy(5, 240);
var enemy2 = new Enemy(5, 150);
var enemy3 = new Enemy(5, 70);
var enemy4 = new Enemy(5, 315);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy, enemy1, enemy2, enemy3, enemy4];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.movement = 50;

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {
    var check = new player.checkCollisions();

};

//target object

var Goal = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Key.png';
};
var goal = new Goal(200, -30);

//render object on screen
Goal.prototype.render = function () {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function () {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Place the player object in a variable called player
var player = new Player(200, 389);
//Collision detection
Player.prototype.checkCollisions = function () {
    var reset = function () {
        player.x = 200;
        player.y = 389;
    };
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x <= (player.x + 30) &&
            (allEnemies[i].x + 30) >= player.x &&
            allEnemies[i].y <= (player.y + 30) &&
            (allEnemies[i].y + 30) >= player.y) {
            alert("Game Over!");
            reset();
        }
    }
    if (player.y < -10) {
        alert("You Won!");
        reset();
    }
};




Player.prototype.handleInput = function (keyCode) {
    if (keyCode == 'left') {
        this.x -= this.movement;
    } else if (keyCode == 'right') {
        this.x += this.movement;
    } else if (keyCode == 'down') {
        this.y += this.movement;
    } else {
        this.y -= this.movement;
    }
    if (keyCode == 'left' && this.x + this.movement <= 0) {
        this.x = this.x + this.movement;
    } else if (keyCode == 'right' && this.x - this.movement >= 400) {
        this.x = this.x - this.movement;
    }
    if (keyCode == 'up' && this.y + this.movement >= 450) {
        this.y = this.y - this.movement;
        //reset();
    } else if (keyCode == 'down' && this.y + this.movement <= 0) {
        this.y = this.y + this.movement;
    }
};
var keystrokes = new player.handleInput();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
