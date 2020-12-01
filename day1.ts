import fs from "fs";

const raw = fs.readFileSync("./day1.txt");
const input = raw.toString().split("\n").map(Number);

// part 1
const TARGET = 2020;

for (const i of input) {
  if (input.includes(TARGET - i)) {
    console.log(`Part 1: ${i * (TARGET - i)}`);
    break;
  }
}

// part 2

for (const i of input) {
  for (const j of input) {
    if (input.includes(TARGET - i - j)) {
      console.log(`Part 2: ${i * j * (TARGET - i - j)}`);
      break;
    }
  }
}
