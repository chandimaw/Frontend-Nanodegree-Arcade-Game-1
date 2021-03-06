// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    this.sprite     = 'images/enemy-bug.png';
    this.x          = x;
    this.y          = y;
    this.initX      = x;
    this.speed      = speed;

};

// Move enemy accross screen and reset when moves off screen
Enemy.prototype.update = function(dt) {

    if(this.x >= 909){

        this.enemyReset();

    }
    
    this.x += this.speed * dt;

};

// Render the enemy on screen
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Reset enemy to initial x position
Enemy.prototype.enemyReset = function(){

    this.x = this.initX;

}

// The hero enters the game!
var Player = function(sprite, x, y, charc){

    this.sprite     = sprite;
    this.charc      = charc;
    this.x          = x;
    this.y          = y; 
    this.initPlayX  = x;
    this.initPlayY  = y;  
    this.score      = 0;

};


// Update the hero and check if they stay on course, do not bump into bugs or obstacles, and reset if they do. Score updates.
Player.prototype.update = function(){

    // if the hero reaches the top, reset
    if(this.y <= 0 && this.x <= 909){

        this.score +=10;

        alert(this.charc+" has reached the water! You get 10 points. Score is now "+ this.score +"!");

        for(var i=0; i < allEnemies.length; i++){
            allEnemies[i].enemyReset();
        }

        this.playerReset();

    }else 

    // check if the hero is blocked by obstacle
    if(this.blocked() || this.collide()){

        this.playerReset();

    } 

}

// Render the player on screen
Player.prototype.render = function(){

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Update the x & y based on the key movements with a switch case
Player.prototype.handleInput = function(key){
   
    switch(key){

        case "left":

            if(this.x != 0) this.x-=101;
            
        break;

        case "right":

            if(this.x != 808) this.x+=101;
            

        break;

        case "up":

            if(this.y != -40) this.y-=83;

        break;

        case "down":

            if(this.y != 545) this.y+=83;

        break;     
       
    }

};

// Player Collision function 
// I was stuck here, but I read through the P3 Forums to get a better understanding of what I needed to do!
Player.prototype.collide = function (){

    for(var i=0; i < allEnemies.length; i++){

        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            this.y + 50 > allEnemies[i].y){

            this.score-=5;
            this.playerReset();
            alert(this.charc+" has collided with a bug! You lose 5 points. Score is now "+ this.score);

        }

    }

}

// Player blocked function to stop player
// For now, my player resets at an obstacle. I plan for the player to be blocked by the obstacle instead later.
Player.prototype.blocked = function(){

    for(var i=0; i < allObstacles.length; i++){

        if(this.x == allObstacles[i].x && this.y == allObstacles[i].y){
            
            this.score-=2;
            this.playerReset();
            alert(this.charc+" collided with an Obstacle! You lose 2 points. Score is now "+ this.score);
        }

    }

}

// Reset player to initial starting point
Player.prototype.playerReset = function(){

    this.x = this.initPlayX;
    this.y = this.initPlayY;

}

// Create obstacle object
var Obstacle = function(x, y){

    this.obj = 'images/Rock.png';
    this.x = x;
    this.y = y;

}

// Render obstacle
Obstacle.prototype.render = function(){
    ctx.drawImage(Resources.get(this.obj), this.x, this.y);
};

// I wanted to give the user a choice of hero
var charc;
var title;
var answer = prompt("Are you a boy, girl, or girl cat?");
var script = "If you get to the water, you get 10 points. Hit a bug and you lose 5 points. Hit a rock and you lose 2 points. Have fun!";

// Start game with character choice
switch(answer){

    case "boy":
    case "man":
        charc = 'images/char-boy.png';
        title = "Insect Boy";
        alert("You are "+title+". "+script);
    break;

    case "girl":
    case "woman":
        charc = 'images/char-princess-girl.png';
        title = "Pretty Princess";
        alert("You are "+title+"! "+script);
    break;

    case "cat":
    case "kitten":
    case "girl cat":
        charc = 'images/char-cat-girl.png';
        title = "Cat Girl";
        alert("You are "+title+"! "+script);
    break;

    default:
        charc = 'images/char-horn-girl.png';
        title = "Horn Girl";
        alert("None of the options selected. You are "+title+"! "+script);
    break;     
   
}

// Create the New Player
var player = new Player(charc, 404, 545, title);

// Create a few enemies
var enemy1 = new Enemy(2, 47, 80);
var enemy2 = new Enemy(-50, 140, 100);
var enemy3 = new Enemy(-100, 220, 60);
var enemy4 = new Enemy(-20, 380, 120);

// Build array for enemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Create a few obstacles
var obstacle1 = new Obstacle(0, 296);
var obstacle2 = new Obstacle(202, 296);
var obstacle3 = new Obstacle(404, 296);
var obstacle4 = new Obstacle(606, 296);
var obstacle5 = new Obstacle(808, 296);

// Build array for obstacles
var allObstacles = [obstacle1, obstacle2, obstacle3, obstacle4, obstacle5];

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
