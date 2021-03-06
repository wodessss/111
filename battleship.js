var view ={
  displayMessage: function(msg){
    var messageArea =document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location){
      var cell = document.getElementById(location);
      cell.setAttribute("class","hit");
  },
  displayMiss: function(location){
    var cell = document.getElementById(location);
    cell.setAttribute("class","hit");
  }
};
var model ={
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships:[{location:["06","16","26"],hits: ["", "", ""]},
         {location:["24","34","44"],hits: ["", "", ""]},
         {location:["10","11","12"],hits: ["", "", ""]}],
  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
        var ship = this.ships[i];
        var locations = ship.locations; 
        var index = locations.indexOf(guess);
        if (index >= 0){
          ship.hits[index] = "hit";
          view.displayHit(guess);
          view.displayMessage("HIT!");
          if (this.isSunk(ship)) {
            view.displayMessage("You sank my battleship!");
              this.shipsSunk++;
          }
          return true;
          // 击中了战舰！
        }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },
  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++){
      if (ship.hits[i] !== "hit"){
        return false;
      }
    }
    return true;
  }
};

function parseGuess(guess){
  var alphabet = ["A", "B","C","D","E","F","G"];
  if (guess === null || guess.length !== 2) {
     alert("Oops, please enter a letter and a number on the board");
  }else{
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert("Oops, that isn't on the board.");
    }else if (row<0 || row >= model.boardSize ||
                    column < 0 || column >= model.boardSize){
      alert("Oops, that's off the board!");
    }else{
      return row + column;
    }
  }
  return null;
}
var controller = {
  guess:0,

  processGuess: function(guess){
    var location = parseGuess(guess);
    if (location){
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips){
        view.displayMessage("You sank all my battleships, in "+ this.guesses +"guesses");
    
      }
    }
  }
};
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");

