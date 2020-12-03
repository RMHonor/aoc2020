import fs from "fs";

const raw = fs.readFileSync("./day3.txt");
const input = raw.toString().split("\n");
input.pop();

type Tile = '.' | '#'
type Map = Tile[][]

const map: Map = input.map((line) => line.split('') as Tile[]);

// Part 1

let x = 0;
let y = 0;
let trees = 0;

while (map[y]) {
  if (map[y][x] === '#') {
    trees += 1;
  }

  y += 1;
  x = (x + 3) % map[0].length;
}

console.log('Part 1:', trees);

// Part 2

const slopes = [
  { right: 1, down: 1},
  { right: 3, down: 1},
  { right: 5, down: 1},
  { right: 7, down: 1},
  { right: 1, down: 2},
];

const results = slopes.map(({ right, down }) => {
  let x = 0;
  let y = 0;
  let trees = 0;

  while (map[y]) {
    if (map[y][x] === '#') {
      trees += 1;
    }

    y += down;
    x = (x + right) % map[0].length;
  }

  return trees;
});

const multiply = results.reduce((acc, next) => acc * next);

console.log("Part 2:", multiply);
