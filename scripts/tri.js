/*jshint esversion: 6 */


var DEPTH = 6;
var tris;
var totalRecursions = 0;
var randomize = false;
var fill = false;

function getNewTriXY(x,y,w,h,recurLevel) {  // used for init only
  let curLvl = recurLevel;
  let newTriTop = new Tri(x, y, w/2, h/2);
  let newTriLeft = new Tri(x-(w/4),y+(h/2),w/2,h/2);
  let newTriRight = new Tri(x+(w/4), y+(h/2), w/2, h/2);
  tris.push(newTriTop);
  tris.push(newTriLeft);
  tris.push(newTriRight);
  totalRecursions += 1;
  if (curLvl >= DEPTH) {
    // console.log('depth met, recursions = ', totalRecursions);
    return;
  } else {
    getNewTriXY(x, y, w/2, h/2,curLvl+1);
    getNewTriXY(x-(w/4), y+(h/2), w/2, h/2,curLvl+1);
    getNewTriXY(x+(w/4), y+(h/2), w/2, h/2,curLvl+1);
  }
}





function TriGroup() {
  // small pixel offsets are to show borders better
  this.x = canW / 2;  // top of the triangle
  this.y = 1;         // top of the triangle
  this.width = canW-2;
  this.height = canH-2;
  this.currentDepth = 0;
  this.clock = 1;
  this.lastClockTick = undefined;
  this.clockTimer = 3000;

  this.init = function() {
    tris = [];
    tris.push(new Tri(this.x,this.y,this.width,this.height));
    getNewTriXY(this.x,this.y,this.width,this.height,0);
    for (let i = 0; i < tris.length; i++) {
      tris[i].init();
    }
    console.log('totalRecursions = ', totalRecursions);
    this.lastClockTick = performance.now();
  };

  this.draw = function() {
    for (let i = 0; i < tris.length; i++) {
      tris[i].draw();
    }
  };

  this.update = function() {
    if (randomize) {
      if ((performance.now() - this.lastClockTick) > this.clockTimer) {
        let diff = performance.now() - this.lastClockTick;
        this.lastClockTick = performance.now();
        if (this.clock === 1) {
          this.clock = 0;
          // console.log('----TICK--------'+diff);
        } else {
          this.clock = 1;
          // console.log('--------TOCK----'+diff);
        }
        for (let i = 0; i < tris.length; i++) {
          tris[i].lineColor = randColor('rgba');
          tris[i].fillColor = randColor('rgba');
        }
      }
    }
  };

}



function Tri(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.baseLineColor = myColors.boxColorOn;
  this.lineColor = myColors.boxColorOn;
  this.fillColor = randColor('rgba');
  this.lineW = 0.7;
}

Tri.prototype.init = function() {
}; // init


/*
red dot-box at top for location start
ctx.beginPath();
ctx.fillStyle = myColors.red;
ctx.rect(this.x-1,this.y-1,2,2);
ctx.fill();
*/
Tri.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth = this.lineW;
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x+this.width/2, this.y+this.height);
  ctx.lineTo(this.x-this.width/2, this.y+this.height);
  ctx.lineTo(this.x, this.y);
  if (randomize) {
    ctx.strokeStyle = this.lineColor;
  } else {
    ctx.strokeStyle = this.baseLineColor;
  }
  if (fill) {
    ctx.fillStyle = this.fillColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
};  // draw

Tri.prototype.update = function() {
}; //update
