// Global variables are bad, it's not one of the good parts of javascript
// but this is quick and dirty
var CANVAS_WIDTH  = 600;
var CANVAS_HEIGHT = 500;
var FPS           = 30;
// define the canvas element
var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas        = canvasElement.get(0).getContext("2d");

var player = {
  color: "#00A",
  x: 300,
  y: 270,
  width: 100,
  height: 100,
  sprite: Sprite("tux"), 
 draw: function() {
  // canvas.fillStyle = this.color;
  // canvas.fillRect(this.x, this.y, this.width, this.height);
  this.sprite.draw(canvas, this.x, this.y);

  }
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
    draw()      // redraw the sprites on the canvas
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
  if (keydown.left) {
    player.x -= 7;
  }

  if (keydown.right) {
    player.x += 7;
  }
  player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);

}

function draw() {
  // wipe everything off the canvas
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // draw the player
  player.draw();
}

