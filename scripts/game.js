/*jshint esversion: 6 */


function Box(x,y,color,size,vel) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size =  size;
  this.xVel = vel;
  this.yVel = vel;
} // end box

Box.prototype.draw = function() {
  ctx.beginPath();
  ctx.rect(this.x,this.y,this.size,this.size);
  ctx.fillStyle = this.color;
  ctx.fill();
};


Box.prototype.update = function() {
  if ((this.xVel > 0) && ((this.x + this.size + this.xVel) > canW/9)) {
    this.xVel *= -1;
  }
  if ((this.xVel < 0) && ((this.x + this.xVel) < 0)) {
    this.xVel *= -1;
  }
  if ((this.yVel > 0) && ((this.y + this.size + this.yVel) > canH/10)) {
    this.yVel *= -1;
  }
  if ((this.yVel < 0) && ((this.y + this.yVel) < 0)) {
    this.yVel *= -1;
  }
  this.x += this.xVel;
  this.y += this.yVel;
};



function Game(updateDur) {
  this.updateDuration = updateDur; // milliseconds duration between update()
  this.paused = false;
  this.bg = new Image();
  this.boxy = undefined;
  this.pausedTxt = undefined;
  this.mode = 'init';
  this.myTriGroup = undefined;

  this.init = function() {
    this.bg.src = 'bg1.png';
    // Box(x,y,color,size,vel)
    this.boxy = new Box(20,20,myColors.boxColorOn,10,0.6);
    this.myTriGroup = new TriGroup();
    this.myTriGroup.init();
  };

  this.pauseIt = function() {
    myGame.paused = true;
    // this.pausedTxt.show = true;
  };
  this.unpauseIt = function() {
    myGame.paused = false;
  };


  this.drawBG = function() { // display background over canvas
    ctx.imageSmoothingEnabled = false;  // turns off AntiAliasing
    ctx.drawImage(this.bg,0,0,CANVAS.width,CANVAS.height);
  };

  this.draw = function() {  // draw everything!
    this.boxy.draw();
    this.myTriGroup.draw();
  }; // end draw

  this.update = function() {
      if (this.paused === false) { // performance based update: myGame.update() runs every myGame.updateDuration milliseconds

            this.boxy.update();
            this.myTriGroup.update();

      } else if (this.paused === true) {
        // PAUSED! do nothin
      } else {
        console.log('game pause issue');
      }

  }; // end update

} // end myGame
