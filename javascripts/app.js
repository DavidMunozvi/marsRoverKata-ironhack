// Rover Object Goes Here
// ======================
var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: ["[0,0]"]
};

var cuadricula = [
  [null, null, "rift", null, null, null, null, null],
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
  calculatePosition(rover.direction, "left");
}

function turnRight(rover){
  console.log("turnRight was called!");
  calculatePosition(rover.direction, "right");
}

function moveForward(rover){
  console.log("moveForward was called!");
  var moved = makeMove (rover.direction, "forward");
  registmove(rover, moved);
}
function moveBackward(rover){
  console.log("moveBackward was called!");
   var hasMoved = makeMove (rover.direction, "backward");
   registerMovement(rover, hasMoved);
}
function makeMove (currentDirection, movement){
  console.log("Rover current position: [" + rover.x + "," + rover.y + "]");
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

function moveCheck(roverNxtX, roverNxtY, rover) {
  var moved = true;
  if(roverNxtX === -1 || roverNextY === -1){
    console.log(rover.id + " can't go out of boundaries");
    moved = false;
  } else {
    if(grid[roverNxtX][roverNxtY] === null) {
      // Move rover on the grid
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
function exeCommandsList (commands) {
  for (var i=0; i<commands.lenght; i++){
    if(commands[i] !== "f" && commands[i] !== "r" && commands[i] !== "l")
    console.log("Command NOT correct, you can only use 'f', 'r' and 'l'");
    else{
      if(commands[i] === "f") moveForward(rover);
      if(commands[i] === "r") moveForward(rover);
      if(commands[i] === "l") moveForward(rover);
    }
  }
  for (var roverX in rovers) {
  printMovements();
 }
}
function printMovements(){
  console.log("Travel Log: \n")
  for(var move in rover.travelLog){
    console.log(rover.travelLog[move]);
  }
}