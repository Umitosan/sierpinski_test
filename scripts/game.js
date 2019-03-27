/*jshint esversion: 6 */


function Box(x,y,color,size,vel) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size =  size;
  this.xVel = vel;
  this.yVel = vel;

  this.draw = function() {
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.size,this.size);
    ctx.fillStyle = this.color;
    ctx.fill();
    // ctx.stroke();
  };

  this.update = function() {
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

} // end box

function Game(updateDur) {
  this.timeGap = 0;
  this.lastUpdate = 0;
  this.lastDirKeyX = undefined;
  this.lastDirKeyY = undefined;
  this.updateDuration = updateDur; // milliseconds duration between update()
  this.paused = false;
  this.bg = new Image();
  this.boxy = undefined;
  this.pausedTxt = undefined;
  this.mode = 'init';
  this.myTriGroup = undefined;

  this.init = function() {
    this.bg.src = 'bg1.png';
    this.boxy = new Box(20,20,myColors.boxColorOn,20,1);
    this.myTriGroup = new TriGroup();
    this.myTriGroup.init();
    this.lastUpdate = performance.now();
  };

  this.pauseIt = function() {
    myGame.paused = true;
    // this.pausedTxt.show = true;
  };
  this.unpauseIt = function() {
    myGame.paused = false;
    this.lastUpdate = performance.now();
    this.timeGap = 0;
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
            // this.timeGap = performance.now() - this.lastUpdate;
            //
            // if ( this.timeGap >= this.updateDuration ) { // this update is restricted to updateDuration
            //   let timesToUpdate = this.timeGap / this.updateDuration;
            //   for (let i=1; i < timesToUpdate; i++) { // update children objects
            //     // if (timesToUpdate > 2) {
            //     //   console.log('timesToUpdate = ', timesToUpdate);
            //     // }
            //     // general update area
            //   }
            //   this.lastUpdate = performance.now();
            // } // end if

            this.boxy.update();
            this.myTriGroup.update();

            // if (this.mode === "draw") { // run this every update cycle regardless of timing
            //   // general draw area
            // } else {
            //   // mode is none
            // }

      } else if (this.paused === true) {
        // PAUSED! do nothin
      } else {
        console.log('game pause issue');
      }

  }; // end update

} // end myGame
