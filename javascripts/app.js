 /*
    -Iteration 1  The Rover Object
    -Iteration 2  Turning the Rover
    -Iteration 3  Moving the Rover
    -Iteration 4  Commands
    -Iteration 5  Tracking
  */


// Rover Object Goes Here
// ======================
var rover = {
  id: "Rover",
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
  isMyTurn: true
};

var teddy = {
  id: "Teddy",
  direction: "N",
  x: 2,
  y: 0,
  travelLog: [],
  isMyTurn: false
};

var ironRover = {
  id: "ironrover",
  direction: "N",
  x: 4,
  y: 0,
  travelLog: [],
  isMyTurn: false
};

var rovers = [rover, teddy, ironRover];
//Cuadricula
var mars = [
  [rover, null, null, "rift", null, null, null, null, null, null],
  [null, "rift", null, null, null, null, "ovni", null, null, null],
  [teddy, null, null, null, "crater", null, null, null, "rift", null],
  [null, "rift", null, null, null, null, null, null, null, null],
  [ironRover, null, null, null, "rift", null, null, null, null, null],
  [null, null, null, "rift", null, null, null, "alien", null, null],
  [null, null, null, null, null, null, null, null, null, "rift"],
  ["rift", null, null, null, null, null, "ovni", null, null, null],
  [null, "rift", null, null, null, null, null, "rift", null, null],
  [null, null, null, null, "rift", null, null, null, null, null]
];

// ======================

//movimientos

//movimientos izquierda y derecha
function turnLeft(rover){
  console.log("turnLeft was called!");
  rightLeftDirection(rover.direction, "left", rover);
}

function turnRight(rover){
  rightLeftDirection(rover.direction, "right", rover);
  console.log("turnRight was called!");
  
}

function rightLeftDirection(currentDirection, turn, rover){
  switch (currentDirection) {
    case "N":
      if (turn === "right") rover.direction = "E";
      else if (turn === "left") rover.direction = "W";
      break;

    case "W":
      if (turn === "right") rover.direction = "N";
      else if (turn === "left") rover.direction = "S";
      break;

    case "S":
      if (turn === "right") rover.direction = "W";
      else if (turn === "left") rover.direction = "E";
      break;
      
    case "E":
      if (turn === "right") rover.direction = "S";
      else if (turn === "left") rover.direction = "N";
      break;
  }
}
//movimientos adelante atrás
function moveForward(rover){
  console.log("turn forward was called!");
  var moved = backForwMove (rover, "forward");

  registMove(rover, moved);
  nextTurn(rover);
}

function moveBackward(rover){
  console.log("turn backward was called!");
  var moved = backForwMove (rover, "backward");

  registMove(rover, moved);
  nextTurn(rover);
}

function backForwMove (rover, movement){
  console.log(rover.id + " is here: [" + rover.x + "," + rover.y + "]");
  var moved = true;

  switch (rover.direction) {
    case "N":
      if (movement === "forward")
        moved = checkMovement(rover.x - 1, rover.y, rover);
      if (movement === "backward")
        moved = checkMovement(rover.x + 1, rover.y, rover);
      break;

    case "W":
      if (movement === "forward"){
        moved = checkMovement(rover.x, rover.y - 1, rover);}
      if (movement === "backward"){
        moved = checkMovement(rover.x, rover.y + 1, rover);}
      break;
      
    case "S":
      if (movement === "forward"){
        moved = checkMovement(rover.x + 1, rover.y, rover);}
      if (movement === "backward"){
        moved = checkMovement(rover.x - 1, rover.y, rover);}
      break;

    case "E":
      if (movement === "forward"){
        moved = checkMovement(rover.x, rover.y + 1, rover);}
      if (movement === "backward"){
        moved = checkMovement(rover.x, rover.y - 1, rover);}
      break;
  }
  return moved;
}
//Comandos
function checkMovement (roverNextX, roverNextY, rover){
  var moved = true;

  if(roverNextX === -1 || roverNextY === -1){
    console.log("Sorry, " + rover.id + " can't go out of boundaries");
    moved = false;
  } else {
    if(mars[roverNextX][roverNextY] === null) {
      mars[rover.x][rover.y] = null;
      mars[roverNextX][roverNextY] = rover;
      rover.x = roverNextX;
      rover.y = roverNextY;
    }else{
      if(typeof mars[roverNextX][roverNextY] === "string"){
        console.log("¡Obstacle found! => " + mars[roverNextX][roverNextY]);
        moved = false;
      } else {
        console.log("¡Obstacle found! => " + mars[roverNextX][roverNextY].id);
        moved = false;
      }
    }
  }
  return moved;
}

function registMove(rover, moved){
  if (moved) {
    rover.travelLog.push("[" + rover.x + "," + rover.y + "]");
    console.log(rover.id + " is moving to " + rover.direction + ". Next position: [" +
     rover.x + "," + rover.y + "]");
  } else {
     console.log(rover.id + " is not moving to " + rover.direction + ". Stays in: [" +
      rover.x + "," + rover.y + "]");
  }
}

function checkRoverWithTurn(){
  var roverWithTurn;
  for (var rover in rovers){
    if (rovers[rover].isMyTurn) roverWithTurn = rovers[rover];
  }
  return roverWithTurn;
}

function nextTurn(currentRover){
  var indexOfCurrentRover = rovers.indexOf(currentRover);
  currentRover.isMyTurn = false;
  if(indexOfCurrentRover === rovers.length - 1)
    rovers[0].isMyTurn = true;
  else
    rovers[indexOfCurrentRover + 1].isMyTurn = true;
}

function commandsExe (commands) {
  var rover;
  for (var i=0; i<commands.length; i++){
    rover = checkRoverWithTurn();
    if(rover.travelLog.length === 0)
      rover.travelLog.push("[" + rover.x + "," + rover.y + "]");

    if(commands[i] === "f") moveForward(rover);
    else if (commands[i] === "b") moveBackward(rover);
    else if (commands[i] === "l") turnLeft(rover);
    else if (commands[i] === "r") turnRight(rover);
    else console.log("INCORRECT COMMAND, use 'f', 'b', 'r' and 'l'");
  }

  for (var roverX in rovers) {
    logTravel (rovers[roverX]);
  }
}

function logTravel(rover){
  console.log(rover.id + "\'s Was here: \n");
  for(var movement in rover.travelLog){
    console.log(rover.travelLog[movement]);
  }
}
