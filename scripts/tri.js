/*jshint esversion: 6 */


var DEPTH = 6;
var tris;
var totalRecursions = 0;
var randomize = false;
var fill = false;

function getNewTriXY(x,y,w,h,recurLevel,colorFam) {
  let curLvl = recurLevel;
  let newTriTop = new Tri(x, y, w/2, h/2, colorFam);
  let newTriLeft = new Tri(x-(w/4),y+(h/2),w/2,h/2, colorFam);
  let newTriRight = new Tri(x+(w/4), y+(h/2), w/2, h/2, colorFam);
  tris.push(newTriTop);
  tris.push(newTriLeft);
  tris.push(newTriRight);
  totalRecursions += 1;
  if (curLvl >= DEPTH) {
    // console.log('depth met, recursions = ', totalRecursions);
    return;
  } else {
    if (curLvl === 0) {
      getNewTriXY(x, y, w/2, h/2, curLvl+1, 'red');
      getNewTriXY(x-(w/4), y+(h/2), w/2, h/2, curLvl+1, 'green');
      getNewTriXY(x+(w/4), y+(h/2), w/2, h/2, curLvl+1, 'blue');
    } else {
      getNewTriXY(x, y, w/2, h/2, curLvl+1, colorFam);
      getNewTriXY(x-(w/4), y+(h/2), w/2, h/2, curLvl+1, colorFam);
      getNewTriXY(x+(w/4), y+(h/2), w/2, h/2, curLvl+1, colorFam);
    }
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
    getNewTriXY(this.x,this.y,this.width,this.height,0,'nothin');
    for (let i = 0; i < tris.length; i++) {
      tris[i].init();
    }
    console.log('totalRecursions = ', totalRecursions);
    this.lastClockTick = performance.now();
  };

  this.draw = function() {
    if (tris.length < 1) {
      console.log('nothing');
    }
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
          // tris[i].fillColor = randColor('rgba');
        }
      }
    }
  };

}



function Tri(x,y,w,h,colorFam) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.baseLineColor = myColors.boxColorOn;
  this.lineColor = myColors.boxColorOn;
  this.fillColor = undefined;
  this.lineW = 0.7;

  this.init = function() {
    if (colorFam === 'red') {
      this.fillColor = randRed();
    } else if (colorFam === 'green') {
      this.fillColor = randGreen();
    } else if (colorFam === 'blue') {
      this.fillColor = randBlue();
    } else {
      // nothin
    }
  };

  this.draw = function() {
    // box at top for indication
    // ctx.beginPath();
    // ctx.fillStyle = myColors.red;
    // ctx.rect(this.x-1,this.y-1,2,2);
    // ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = this.lineW;
    ctx.translate(this.x,this.y);
    ctx.moveTo(0,0);
    ctx.lineTo(this.width/2,this.height);
    ctx.lineTo(-this.width/2,this.height);
    ctx.lineTo(0,0);
    // ctx.lineTo(0,this.height);
    ctx.fillStyle = this.fillColor;
    if (randomize) {
      ctx.strokeStyle = this.lineColor;
    } else {
      ctx.strokeStyle = this.baseLineColor;
    }
    if (fill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
    ctx.restore();
  };

  this.update = function() {
  };

}
