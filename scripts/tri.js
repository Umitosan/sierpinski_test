/*jshint esversion: 6 */


var DEPTH = 6;
var tris;
var totalRecursions = 0;

function getNewTriXY(x,y,w,h,recurLevel) {
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
  this.x = canW / 2;  // top of the triangle
  this.y = 0;         // top of the triangle
  this.width = canW;
  this.height = canH;
  this.currentDepth = 0;
  this.clock = 1;
  this.lastClockTick = undefined;

  this.init = function() {
    tris = [];
    tris.push(new Tri(this.x,this.y,this.width,this.height));
    getNewTriXY(this.x,this.y,this.width,this.height,0);
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
    if (DEPTH < 6) {
      if ((performance.now() % 1000) <= 17) {
        let diff = performance.now() - this.lastClockTick;
        this.lastClockTick = performance.now();
        if (this.clock === 1) {
          this.clock = 0;
          console.log('----TICK--------'+diff);
        } else {
          this.clock = 1;
          console.log('--------TOCK----'+diff);
        }
        for (let i = 0; i < tris.length; i++) {
          tris[i].lineColor = randColor('rgba');
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
  this.lineColor = myColors.boxColorOn;
  this.fillColor = myColors.green;

  this.init = function() {
  };

  this.draw = function() {
    // box at top for indication
    // ctx.beginPath();
    // ctx.fillStyle = myColors.red;
    // ctx.rect(this.x-2,this.y-2,4,4);
    // ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.translate(this.x,this.y);
    ctx.moveTo(0,0);
    ctx.lineTo(this.width/2,this.height);
    ctx.lineTo(-this.width/2,this.height);
    ctx.lineTo(0,0);
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.lineColor;
    ctx.stroke();
    // ctx.fill();
    ctx.restore();
  };

  this.update = function() {
  };

}
