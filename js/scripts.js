// Global variables are bad, it's not one of the good parts of javascript
// but this is quick and dirty
var CANVAS_WIDTH  = 600;
var CANVAS_HEIGHT = 800;
var NUM_STARS = 100;
var P_SPEED = 20;
var FPS           = 30;
// define the canvas element
var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas        = canvasElement.get(0).getContext("2d");

var playing = true;
var score = 0;

var starArray = new Array();
var bulletArray = new Array();
var bulletTimer = 0;

// Set up the starfield
for(var i = 0; i < NUM_STARS; i++){
  starArray[i] = [Math.floor(Math.random()*600),
  Math.floor(Math.random()*800),
  Math.floor(Math.random()*2)+5];
}

var player = {
  color: "#00A",
  x: 300,
  y: 660,
  width: 128,
  height: 128,
  sprite: Sprite("ship2"), 
 draw: function() {
  // canvas.fillStyle = this.color;
  // canvas.fillRect(this.x, this.y, this.width, this.height);
  this.sprite.draw(canvas, this.x, this.y);

  }
};

var enemy = {
  color: "#00A",
  x: Math.floor(Math.random()*500),
  y: -128,
  width: 128,
  height: 128,
  speed: 3,
  sprite: Sprite("win2"), 
 draw: function() {
  // canvas.fillStyle = this.color;
  // canvas.fillRect(this.x, this.y, this.width, this.height);
  this.sprite.draw(canvas, this.x, this.y);

  }
};

var border = {
	color:"#00A",
	x:0,
	y:0,
	width:600,
	height:500,
	sprite: Sprite("border"),
	draw: function() { this.sprite.draw(canvas, this.x, this.y); }
};

/*******************************************************************************
 *
 *
 *           All of the JavaScript that should excute on page load
 *
 *
 *******************************************************************************/
$(window).load(function() {
  // append canvas to document body
  canvasElement.appendTo('body');
  
  // start the game loop  
  
  setInterval(function() {
    update();   // if key is pressed, move the sprites, shoot, etc.
    draw();      // redraw the sprites on the canvas
  }, 1000/FPS); 

});

/*******************************************************************************
 *
 *
 *            Functions and such
 *
 *
 *******************************************************************************/
function update() {

  // Player movement (just for looks)
  player.y = 650 + Math.floor(Math.random()*3);
  
  // Bullet cooldown timer
  bulletTimer--;
  
  // Move enemy
  enemy.y+=enemy.speed;
  
  // Bullet collision / screen bounds check
  for(var i = 0; i < bulletArray.length; i++){
	if (bulletArray[i][1] < 0){
      bulletArray.splice(i,1);
	}
	else {
		if (bulletArray[i][0] > enemy.x && bulletArray[i][0] < (enemy.x + 128)){
			if (bulletArray[i][1] > enemy.y && bulletArray[i][1] < (enemy.y + 128)){
				enemy.y = -128;
				enemy.x = Math.floor(Math.random()*500);
				enemy.speed++;
				bulletArray.splice(i,1);
				score += 10;
			}
		}
	}
  }
  
  // Reset enemy
  if (enemy.y > CANVAS_HEIGHT){
	enemy.y = -128;
	enemy.x = Math.floor(Math.random()*500);
	score -= 100;
	//playing = false;
  }
  
  // Keyboard input
  if (keydown.left) {
    player.x -= P_SPEED;
	player.dir = 1;
  }

  if (keydown.right) {
    player.x += P_SPEED;
	player.dir = 1;
  }
 
  if (keydown.space) {
    if (bulletTimer <= 0){
	  // Set bullet cooldown
      bulletTimer = 10;
	  // Add a bullet
      bulletArray.push([player.x+64, player.y, 20]);
	}
  }


  /*
  if (keydown.up) {
    player.y -= 10;
  }

  if (keydown.down) {
    player.y += 10;
  }
  */
  
  player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
  player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);
}

function draw() {

  //document.write(score);
  
  // wipe everything off the canvas
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.fillStyle = "rgb(0, 0, 0)";
  canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  // draw and update the starField
  for(var i = 0; i < NUM_STARS; i++){
    starArray[i][1]+=starArray[i][2];
	if (starArray[i][1] > CANVAS_HEIGHT){
      starArray[i][0] = Math.floor(Math.random()*600);
      starArray[i][1] = 0;
	}
	canvas.fillStyle = "rgb(255, 255, 255)";
	canvas.fillRect(starArray[i][0], starArray[i][1], 4, 4);
  }
    
  // draw and update bullets
  for(var i = 0; i < bulletArray.length; i++){
    bulletArray[i][1]-=bulletArray[i][2];
	canvas.fillStyle = "rgb(128, 0, 0)";
	canvas.fillRect(bulletArray[i][0]-4, bulletArray[i][1]-4, 16, 16);
	canvas.fillStyle = "rgb(255, 0, 0)";
	canvas.fillRect(bulletArray[i][0], bulletArray[i][1], 8, 8);
  }
  
  // draw the player
  player.draw();
  enemy.draw()
  canvas.lineWidth = 4;
  canvas.strokeStyle = "rgb(32, 32, 32)";
  canvas.strokeRect(2, 2, CANVAS_WIDTH-4, CANVAS_HEIGHT-4);
  canvas.strokeStyle = "rgb(64, 64, 64)";
  canvas.strokeRect(6, 6, CANVAS_WIDTH-12, CANVAS_HEIGHT-12);
  
  canvas.font = 'bold 24px Unknown Font, sans-serif';
  canvas.fillStyle = "rgb(0, 255, 0)";
  canvas.fillText("SCORE: "+score, 16, 32);
}