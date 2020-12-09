import fs from "fs";

const raw = fs.readFileSync("./day9.txt");
const input = raw
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let part1 = 0;
for (let i = 25; i < input.length; i++) {
  const target = input[i];
  let found = false;
  for (let j = i - 1; j + 25 > i; j--) {
    const factor1 = input[j];
    const factor2 = input.slice(i - 25, i).find((num) => (num + factor1 === target) && (num !== factor1));
    if (factor2) {
      found = true;
      break;
    }
  }
  if (!found) {
    part1 = input[i];
    break;
  }
}

console.log("Part 1:", part1);
const part1Index = input.findIndex((num) => num === part1)
let set: number[] = [];

for (let i = 0; i < part1Index; i++) {
  for (let j = part1Index; j > i; j--) {
    const sum = input.slice(i, j).reduce((acc, next) => acc + next);
    if (sum === part1) {
      set = input.slice(i, j);
      break;
    }
    if (sum < part1) {
      break;
    }
  }
  if (set.length) {
    break;
  }
}

set.sort((a, b) => a - b);

console.log("Part 2:", set[0] + set[set.length - 1]);
