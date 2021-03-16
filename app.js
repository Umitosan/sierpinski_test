/*jshint esversion: 6 */


var CANVAS,
    canH,
    canW,
    ctx,
    myGame;
var myColors = new Colors();

var defaultSimSpeed = 100;

function Colors() {
  this.black = 'rgba(0, 0, 0, 1)';
  this.darkGrey = 'rgba(50, 50, 50, 1)';
  this.lightGreyTrans = 'rgba(50, 50, 50, 0.3)';
  this.greyReset = 'rgb(211,211,211)';
  this.lighterGreyReset = 'rgb(240,240,240)';
  this.lightGreyBox = 'rgba(220, 220, 220, 1)';
  this.white = 'rgba(250, 250, 250, 1)';
  this.red = 'rgba(230, 0, 0, 1)';
  this.cherry = 'rgba(242,47,8,1)';
  this.green = 'rgba(0, 230, 0, 1)';
  this.blue = 'rgba(0, 0, 230, 1)';
  this.electricBlue = 'rgba(20, 30, 230, 1)';
  this.boxColorOn = 'rgba(127, 255, 212,1)';
  this.boxColorOff = 'rgba(126, 126, 126, 1)';
}

var State = {
  myReq: undefined,
  loopRunning: false,
  gameStarted: false,
  lastFrameTimeMs: 0, // The last time the loop was run
  maxFPS: 60, // The maximum FPS allowed
  simSpeed: defaultSimSpeed, // speed of simulation loop
  playTime: 0,
  frameCounter: 0
};

function softReset() {
  console.log('soft reset!');
  myGame = undefined;
  tris = undefined;
  totalRecursions = 0;
  fill = false;
  randomize = false;
  State = {
    myReq: undefined,
    loopRunning: false,
    gameStarted: false,
    lastFrameTimeMs: 0, // The last time the loop was run
    maxFPS: 60, // The maximum FPS allowed
    simSpeed: defaultSimSpeed, // speed of simulation loop
    playTime: 0,
    frameCounter: 0,
  };
}







//////////////////////////////////////////////////////////////////////////////////
// GAME LOOP
//////////////////////////////////////////////////////////////////////////////////
function gameLoop(timestamp) {
  // timestamp is automatically returnd from requestAnimationFrame
  // timestamp uses performance.now() to compute the time
  State.myReq = requestAnimationFrame(gameLoop);

  if (State.gameStarted === true) { myGame.update(); }

  clearCanvas();
  if (State.gameStarted === true) {
    myGame.draw();
  } else {
    myGame.drawBG();
  }

}




function resetRandState() {
  $('#random-btn').css("background-color","lightgreen");
  $('#random-btn').css("border-color","green");
  $('#fill-btn').css("background-color","lightgreen");
  $('#fill-btn').css("border-color","green");
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {

  CANVAS =  $('#canvas')[0];
  ctx =  CANVAS.getContext('2d');
  canH = CANVAS.height;
  canW = CANVAS.width;
  $('body').on('contextmenu', '#canvas', function(e){ return false; }); // prevent right click context menu default action
  // CANVAS.addEventListener('mousemove', function(evt) {
  //     let rect = CANVAS.getBoundingClientRect();
  //     State.mouseX = evt.clientX - rect.left + -0.5;
  //     State.mouseY = evt.clientY - rect.top;
  //     $("#coords-x").text(State.mouseX);
  //     $("#coords-y").text(State.mouseY);
  // }, false);

  //INPUT
  var leftMouseDown = false;

  // this is to correct for canvas blurryness on single pixel wide lines etc
  // important when animating to reduce rendering artifacts and other oddities
  // ctx.translate(0.5, 0.5);

  // start things up!
  myGame = new Game(State.simSpeed); // ms per update()
  myGame.init();
  State.myReq = requestAnimationFrame(gameLoop);
  State.loopRunning = true;
  State.gameStarted = false;
  myGame.mode = 'draw';

  myGame.mode = 'sim';
  console.log('mode now sim');
  State.gameStarted = true;
  // $('#mode-current-status')[0].innerText = 'simulate';

  $('#start-btn').click(function() {
    console.log("reset button clicked");
    generalLoopReset();
    State.loopRunning = true;
    State.gameStarted = true;
    myGame.mode = 'sim';
    $('#pause-btn')[0].innerText = 'PAUSE';
    resetRandState();
  });

  $('#reset-btn').click(function() {
    console.log("reset button clicked");
    generalLoopReset();
    State.loopRunning = true;
    State.gameStarted = true;
    myGame.mode = 'sim';
    $('#pause-btn')[0].innerText = 'PAUSE';
    resetRandState();
  });

  $('#pause-btn').click(function() {
    console.log("pause button clicked");
    if (myGame.paused === false) {
      myGame.pauseIt();
      $('#pause-btn')[0].innerText = 'UN-PAUSE';
    } else if (myGame.paused === true) {
      myGame.unpauseIt();
      $('#pause-btn')[0].innerText = 'PAUSE';
    }
  });

  let randomBtnDown = false;
  $('#random-btn').click(function() {
    if (randomBtnDown) {
      resetRandState();
      fill = false;
      randomize = false;
      randomBtnDown = false;
    } else {
      resetRandState();
      fill = false;
      randomize = true;
      $('#random-btn').css("background-color","pink");
      $('#random-btn').css("order-color","pink");
      for (let i = 0; i < tris.length; i++) {
        tris[i].lineColor = randColor('rgba');
        tris[i].fillColor = randColor('rgba');
      }
      randomBtnDown = true;
      fillBtnDown = false;
    }
  });

  let fillBtnDown = false;
  $('#fill-btn').click(function() {
    if (fillBtnDown) {
      resetRandState();
      fill = false;
      randomize = false;
      fillBtnDown = false;
    } else {
      resetRandState();
      fill = true;
      randomize = true;
      $('#fill-btn').css("background-color","pink");
      $('#fill-btn').css("border-color","pink");
      fillBtnDown = true;
      randomBtnDown = false;
    }
  });

  $('#depth').on('change', function(e) {
    let newDepth = parseInt($("#depth").val());
    DEPTH = newDepth;
    generalLoopReset();
    State.loopRunning = true;
    State.gameStarted = true;
    myGame.mode = 'sim';
    $('#pause-btn')[0].innerText = 'PAUSE';
    resetRandState();
  });

});
