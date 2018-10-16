// Rover Object Goes Here
// ======================
var rover1 = {
  id: "rover1",
  direction: "N",
  x: 0,
  y: 0,
  travelLog: ["[0,0]"],
  isMyturn: true
};
var rover2 = {
  id: "Rover 2",
  direction: "N",
  x: 0,
  y: 7,
  travelLog: [],
  isMyTurn: false
};
var rovers = [rover1, rover2];
var cuadricula = [
  [rover1, null, null, "rift", null, null, null, null, null, rover2],
  [null, "rift", null, null, null, null, null, null, null, null],
  ["crater", null, null, null, null, null, null, null, "rift", null],
  [null, "rift", null, null, null, null, null, null, null, null],
  [null, null, null, null, "rift", null, null, null, null, null],
  [null, null, null, "crater", null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, "rift"],
  ["rift", null, null, null, null, null, null, null, null, null],
  [null, "rift", null, null, null, null, null, "rift", null, null],
  [null, null, null, null, "crater", null, null, null, null, null]
];
// ======================
function turnLeft(rover){
  console.log("turnLeft was called!");
  calculatePosition(rover.direction, "left", rover);
}

function turnRight(rover){
  console.log("turnRight was called!");
  calculatePosition(rover.direction, "right", rover);
}

function moveForward(rover){
  console.log("moveForward was called!");
  var moved = makeMove (rover, "forward");
  registmove(rover, moved);
  nxtturn(rover);
}

function moveBackward(rover){
  console.log("moveBackward was called!");
   var hasMoved = makeMove (rover, "backward");
   registerMovement(rover, hasMoved);
   nxtturn(rover);
}
function makeMove (rover, movement){
  console.log(rover.id + "current position: [" + rover.x + "," + rover.y + "]");
  var moved = true;
  switch (rover.direction) {
    case "N":
      if (movement === "forward")
        moved = moveCheck(rover.x - 1, rover.y, rover);
      if (movement === "backward")
        moved = moveCheck(rover.x + 1, rover.y, rover);
      break;
    case "W":
      if (movement === "forward")
        moved = moveCheck(rover.x, rover.y - 1, rover);
      if (movement === "backward")
        moved = moveCheck(rover.x, rover.y + 1, rover);
      break;
    case "S":
      if (movement === "forward")
        moved = moveCheck(rover.x + 1, rover.y, rover);
      if (movement === "backward")
        moved = moveCheck(rover.x - 1, rover.y, rover);
      break;
    case "E":
      if (movement === "forward")
        moved = moveCheck(rover.x, rover.y + 1, rover);
      if (movement === "backward")
        moved = moveCheck(rover.x, rover.y - 1, rover);
      break;
  }
  return moved;
}

function moveCheck(roverNxtY, roverNxtX, rover) {
  var moved = true;
  if(roverNxtX === -1 || roverNextY === -1){
    console.log(rover.id + " can't go out of boundaries");
    moved = false;
  } else {
    if(grid[roverNxtX][roverNxtY] === null) {
      grid[rover.x][rover.y] = null;
      grid[roverNxtX][roverNxtY] = rover;
      rover.x = roverNxtX;
      rover.y = roverNxtY;
    }else{
      if(typeof grid[roverNxtX][roverNxtY] === "string"){
        console.log("¡Obstacle Found!" + grid[roverNxtX][roverNxtY]);
        moved = false;
      } else {
        console.log("¡Obstacle Found! " + grid[roverNxtX][roverNxtY].id);
        moved = false;
      }
    }
  }
  return moved;
  
}
function registerMove(rover, moved){
  if (moved) {
    rover.travelLog.push("[" + rover.x + "," + rover.y + "]");
    console.log(rover.id + " is moving to " + rover.direction + ". Next position: [" +
     rover.x + "," + rover.y + "]");
  } else {
     console.log(rover.id + " is not moving to " + rover.direction + ". Stays in: [" +
      rover.x + "," + rover.y + "]");
  }
}

function calculatePosition(currentDirect, turnTo){
  switch (currentDirect){
    case "N":
    if (turnTo === "right") rover.direction = "E";
    else if (turnTo === "left") rover.direction = "W";
    break;
    case "W":
    if (turnTo === "right") rover.direction = "N";
    else if (turnTo === "left") rover.direction = "S";
    break;
    case "S":
    if (turnTo === "right") rover.direction = "W";
    else if (turnTo === "left") rover.direction = "E";
    break;
    case "E":
    if (turnTo === "right") rover.direction = "S";
    else if (turnTo === "left") rover.direction = "N";
    break;
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
function exeCommandsList (commands) {
  var rover;
  for (var i=0; i<commands.length; i++){
    rover = checkRoverWithTurn();
    if(rover.travelLog.length === 0)
      rover.travelLog.push("[" + rover.x + "," + rover.y + "]");

    if(commands[i] === "f") moveForward(rover);
    else if (commands[i] === "b") moveBackward(rover);
    else if (commands[i] === "l") turnLeft(rover);
    else if (commands[i] === "r") turnRight(rover);
    else console.log("Command NOT correct, you can only use 'f', 'b', 'r' and 'l'");
  }
  for (var roverX in rovers) {
  printMovements(rovers[roverX]);
 }
}
function printMovements(rover){
  console.log(rover.id)
  for(var move in rover.travelLog){
    console.log(rover.travelLog[movement]);
  }
}