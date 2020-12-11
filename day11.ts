import fs from "fs";

const raw = fs.readFileSync("./day11.txt");
const input = raw
  .toString()
  .trim();

type Cell = "." | "#" | "L";

type State = Cell[][];

const initialState: State = input
  .split("\n")
  .map((line) => line.split("") as Cell[]);

const isEqual = (a: State, b: State): boolean => {
  return a.map((line) => line.join()).join() === b.map((line) => line.join()).join();
}

const adjacentOccupiedSeats = (x: number, y: number, state: State): number => {
  let result = 0;
  if (state[x - 1] && state[x - 1][y - 1] === "#") {
    result += 1;
  }
  if (state[x] && state[x][y - 1] === "#") {
    result += 1;
  }
  if (state[x + 1] && state[x + 1][y - 1] === "#") {
    result += 1;
  }
  if (state[x - 1] && state[x - 1][y] === "#") {
    result += 1;
  }
  if (state[x + 1] && state[x + 1][y] === "#") {
    result += 1;
  }
  if (state[x - 1] && state[x - 1][y + 1] === "#") {
    result += 1;
  }
  if (state[x] && state[x][y + 1] === "#") {
    result += 1;
  }
  if (state[x + 1] && state[x + 1][y + 1] === "#") {
    result += 1;
  }
  return result;
};

const visibleOccupiedSeats = (x: number, y: number, state: State): number => {
  let result = 0;
  // left
  for (let i = x, j = y - 1; state[i] && state[i][j]; j -= 1) {
    if (state[i][j] === "#") {
      result += 1;
      break;
    } else if (state[i][j] === "L") {
      break;
    }
  }
  // left-up
  for (let i = x - 1, j = y - 1; state[i] && state[i][j]; i -= 1, j -= 1) {
    if (state[i][j] === "#") {
      result += 1;
      break;
    } else if (state[i][j] === "L") {
      break;
    }
  }
  // up
  for (let i = x - 1, j = y; state[i] && state[i][j]; i -= 1) {
    if (state[i][j] === "#") {
      result += 1;
      break;
    } else if (state[i][j] === "L") {
      break;
    }
  }
  // right-up
  for (let i = x - 1, j = y + 1; state[i] && state[i][j]; i -= 1, j += 1) {
    if (state[i][j] === "#") {
      result += 1;
      break;
    } else if (state[i][j] === "L") {
      break;
    }
  }
  // right
  for (let i = x, j = y + 1; state[i] && state[i][j]; j += 1) {
    if (state[i][j] === "#") {
      result += 1;
      break;
    } else if (state[i][j] === "L") {
      break;
    }
  }
  // right-down
  for (let i = x + 1, j = y + 1; state[i] && state[i][j]; i += 1, j += 1) {
    if (state[i][j] === "#") {
      result += 1;
      break;
    } else if (state[i][j] === "L") {
      break;
    }
  }
  // down
  for (let i = x + 1, j = y; state[i] && state[i][j]; i += 1) {
    if (state[i][j] === "#") {
      result += 1;
      break;
    } else if (state[i][j] === "L") {
      break;
    }
  }
  // left-down
  for (let i = x + 1, j = y - 1; state[i] && state[i][j]; i += 1, j -= 1) {
    if (state[i][j] === "#") {
      result += 1;
      break;
    } else if (state[i][j] === "L") {
      break;
    }
  }
  return result;
};
const simulation = [initialState];

while (simulation.length <= 1 || !isEqual(simulation[simulation.length - 1], simulation[simulation.length - 2])) {
  const previousState = simulation[simulation.length - 1];
  const nextState: State = [];
  for (let i = 0; i < previousState.length; i += 1) {
    nextState[i] = [];
    for (let j = 0; j < previousState[i].length; j += 1) {
      if (previousState[i][j] === "L" && adjacentOccupiedSeats(i, j, previousState) === 0) {
        nextState[i][j] = "#";
      } else if (previousState[i][j] === "#" && adjacentOccupiedSeats(i, j, previousState) >= 4) {
        nextState[i][j] = "L";
      } else {
        nextState[i][j] = previousState[i][j];
      }
    }
  }
  simulation.push(nextState);
}

const seatsOccupied1 = simulation[simulation.length - 1].map((line) => line.join()).join().match(new RegExp("#", "g"))?.length;

console.log("Part 1:", seatsOccupied1);


const simulation2 = [initialState];

while (simulation2.length <= 1 || !isEqual(simulation2[simulation2.length - 1], simulation2[simulation2.length - 2])) {
  const previousState = simulation2[simulation2.length - 1];
  const nextState: State = [];
  for (let i = 0; i < previousState.length; i += 1) {
    nextState[i] = [];
    for (let j = 0; j < previousState[i].length; j += 1) {
      if (previousState[i][j] === "L" && visibleOccupiedSeats(i, j, previousState) === 0) {
        nextState[i][j] = "#";
      } else if (previousState[i][j] === "#" && visibleOccupiedSeats(i, j, previousState) >= 5) {
        nextState[i][j] = "L";
      } else {
        nextState[i][j] = previousState[i][j];
      }
    }
  }
  simulation2.push(nextState);
}

const seatsOccupied2 = simulation2[simulation2.length - 1].map((line) => line.join()).join().match(new RegExp("#", "g"))?.length;

console.log("Part 2:", seatsOccupied2);
