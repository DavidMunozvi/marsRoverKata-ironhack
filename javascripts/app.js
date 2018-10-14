// Rover Object Goes Here
// ======================
var rover = {
  direction: "N"
};
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
  console.log("moveForward was called")
}
function calculatePosition(currentDirection, turnTo){
  switch (currentDirection){
    case "N":
    if (turnTo === "right") rover.direction = "E";
    if (turnTo === "left") rover.direction = "W";
    break;
    case "W":
    if (turnTo === "right") rover.direction = "N";
    if (turnTo === "left") rover.direction = "S";
    break;
    case "S":
    if (turnTo === "right") rover.direction = "W";
    if (turnTo === "left") rover.direction = "E";
    break;
    case "E":
    if (turnTo === "right") rover.direction = "S";
    if (turnTo === "left") rover.direction = "N";
    break;
  }
}