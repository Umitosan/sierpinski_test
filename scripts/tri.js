/*jshint esversion: 6 */


var DEPTH = 3;
var tris;
var totalRecursions = 0;

function getNewTriXY(x,y,w,h,recurLevel) {
  let curLvl = recurLevel;
  let newTriLeft = new Tri(x-(w/4),y+(h/2),w/2,h/2);
  let newTriRight = new Tri(x+(w/4), y+(h/2), w/2, h/2);
  tris.push(newTriLeft);
  tris.push(newTriRight);
  if (curLvl >= DEPTH) {
    console.log('depth met, recursions = ', totalRecursions);
    return;
  } else {
    totalRecursions += 1;
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

  this.init = function() {
    tris = [];
    tris.push(new Tri(this.x,this.y,this.width,this.height));
    getNewTriXY(this.x,this.y,this.width,this.height,0);
    console.log('totalRecursions = ', totalRecursions);
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
    // for (let i = 0; i < tris.length; i++) {
    //   tris[i].update();
    // }
  };

}



function Tri(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.color = myColors.red;

  this.init = function() {
  };

  this.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = myColors.red;
    ctx.rect(this.x-3,this.y-3,6,6);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.translate(this.x,this.y);
    ctx.moveTo(0,0);
    ctx.lineTo(this.width/2,this.height);
    ctx.lineTo(-this.width/2,this.height);
    ctx.lineTo(0,0);
    ctx.fillStyle = myColors.blue;
    ctx.strokeStyle = myColors.green;
    ctx.stroke();
    // ctx.fill();
    ctx.restore();
  };

  this.update = function() {
  };

}
