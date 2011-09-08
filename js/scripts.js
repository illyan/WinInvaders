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
  x: 220,
  y: 270,
  width: 32,
  height: 32,
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
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
  
  setInterval(function() {
    update();
    draw()
  }, 1000/FPS);

  player.sprite = Sprite("tux");

  player.draw = function() {
    this.sprite.draw(canvas, this.x, this.y);
  };
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
    player.x -= 5;
  }

  if (keydown.right) {
    player.x += 5;
  }
  player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);

}

function draw() {
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  player.draw();
}

