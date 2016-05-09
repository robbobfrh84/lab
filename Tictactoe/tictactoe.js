// wait for DOM to load before running JS
$(document).ready(function(){

  var turnCounter = 0; //variable that counts whos turn it is
  var board = ['-','-','-','-','-','-','-','-','-'];
  var win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  var cat = false;

$("div.col-xs-4.box").on("click", function(){
  //make x the id of the circle clicked. id's are set to 0,1,2,3,4,5,6,7, or 8.
  var x = parseInt($(this).context.id);
  
  if(board[x] === '-'){

    if(turnCounter % 2 !== 0){
      $(this).text("0");
      board[x] = '0';
    } else {
      $(this).text("X");
      board[x] = 'X';
    }
    // now lets see if anyone won!?
    for (var i = 0; i < 8; i++){
      if (board[win[i][0]] === 'X'
      && board[win[i][1]] === 'X'
      && board[win[i][2]] === 'X'){
        alert('X wins!');
        location.reload();
        board = ['-','-','-','-','-','-','-','-','-'];
        break
      }
      if (board[win[i][0]] === '0'
      && board[win[i][1]] === '0'
      && board[win[i][2]] === '0'){
        alert('0 wins!');
        location.reload();
        board = ['-','-','-','-','-','-','-','-','-'];
        break
      }
    }
    for (var i = 0; i < 8; i++){
      if (board[i] !== '-'){
        var cat = true;
      } else {
        cat = false;
        break
      }
    }
    if (cat === true){
      alert("CAT'S GAME!");
      board = ['-','-','-','-','-','-','-','-','-'];
      location.reload();
    }
    cat = false;
    console.log(board);
    turnCounter++;
  }

});

$("button.replay").on("click", function(){
  location.reload();
});

});

// DON't HAVE TO USE THE OBJECTS ID TO ACCESS A SPECIFIC OBJECT. YOU COULD GIVE
// IT A VARIABLE WITH LIKE THIS...
//this.poop = 'plop!';
//console.log(this.poop);
//   THIS WILL LOG 'plop!'.
// SO YOU COULD DO SOMETHING LIKE...
//   this.boardposition = 'row2column3'
// OR:  this.boardposition = 5;
//
//   (OR; JUST '5', FOR THE FIFTH POSTION). I THINK IT'S EASIER TO GIVE IT THE
//   MOST SIMPLE IDENTIFIERS THAT ALSO COUNT OUT IN ORDER OF THERE LOCATION.
//   SO FOR THIS PROJECT IT'S OK TO HAVE TO ID MATCH THE LOCATION ON THE BOARD.
//   BUT FOR OTHER PROJECTS THAT ID NAME MAY BE MORE IMPORTANT WHEN IDENTIFING
//   THE OBJECT. WONDER WHAT THE REAL SOLUTION IS. JUST MY THOUGHTS.
