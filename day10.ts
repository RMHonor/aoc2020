import fs from "fs";

const raw = fs.readFileSync("./day10.txt");
const input = raw
  .toString()
  .trim()
  .split("\n")
  .map(Number)
  .sort((a, b) => a - b);

const result = input.reduce(({ oneJolt, threeJolt, currentJoltage }, next, i) => {
  const voltageJump = next - currentJoltage;
  switch (voltageJump) {
    case 1:
      return {
        oneJolt: oneJolt + 1,
        threeJolt,
        currentJoltage: next,
      }
    case 3:
      return {
        oneJolt,
        threeJolt: threeJolt + 1,
        currentJoltage: next,
      };
    default:
      return {
        oneJolt,
        threeJolt,
        currentJoltage: next,
      }
  }
}, { oneJolt: 0, threeJolt: 0, currentJoltage: 0 });

// add a three jolt at the end of the list
result.threeJolt += 1;

console.log("Part 1:", result.oneJolt * result.threeJolt);

input.unshift(0);
input.push(input[input.length - 1] + 3);
const arrangements = new Map([[0, 1]]);

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; input[j] <= input[i] + 3; j += 1) {
    arrangements.set(
      j,
      (arrangements.get(j) || 0) + (arrangements.get(i) || 0),
    );
  }
}


console.log("Part 2:", arrangements.get(input.length - 1));
