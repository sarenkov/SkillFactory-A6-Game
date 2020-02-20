const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;
let divSelector;
let number = 1;

function round() { 
  $(divSelector).removeClass("target");  
  $(divSelector).text("");

  divSelector = randomDivId();
  $(divSelector).removeClass("miss");
  $(divSelector).addClass("target");
  $(divSelector).text(number);
  number += 1;

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".fields").addClass("d-none");
  $(".retry").removeClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
  $(".miss-message").addClass("d-none");
  $(".hits").text("&#128515 "+ hits)
}

function handleClick(event) {  
  $(".miss-message").removeClass("d-none");
  $(".miss-text").text(miss);
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  else {
    $(event.target).addClass("miss");
    miss = miss + 1;
    $(".miss-text").text(miss);
  }
}

function start() {
    $(".fields").removeClass("d-none");
    round();
    $(".start").addClass("d-none");
    
}

function reload(){
  debugger
    location.reload();
  
}

function init() { 
  $(".start").click(start);  

  $(".game-field").click(handleClick);
  firstHitTime =  getTimestamp();
  $("#button-reload").click(reload);
}

$(document).ready(init);
