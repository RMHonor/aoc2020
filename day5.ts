import fs from "fs";

const raw = fs.readFileSync("./day5.txt");
const input = raw
  .toString()
  .split('\n')
  .slice(0, -1);

const seats = input.map((seat) => {
  const row = seat
    .substr(0, 7)
    .split("")
    .reduce((acc, next) => {
      return acc << 1 | Number(next === "B");
    }, 0);
  const column = seat
    .substr(7, 3)
    .split("")
    .reduce((acc, next) => {
      return acc << 1 | Number(next === "R");
    }, 0);

  return row * 8 + column;
});

seats.sort((a, b) => a - b)

console.log("Part 1:", seats[seats.length - 1]);

const ourSeat = seats.find((seat, i) => seat - seats[i + 1] !== -1)! + 1;

console.log("Part 2:", ourSeat);
