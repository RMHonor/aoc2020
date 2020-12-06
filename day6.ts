import fs from "fs";

const raw = fs.readFileSync("./day6.txt");
const input = raw
  .toString()
  .split("\n\n")

const groups = input.map((group) => {
  const set = new Set<string>();
  group
    .split("\n")
    .join("")
    .split("")
    .forEach((letter) => set.add(letter));
  return set;
});

const checksum = groups.reduce((acc, next) => acc + next.size, 0);

console.log("Part 1:", checksum);

const groups2 = input.map((group, i) => {
  const size = group.split("\n").length;

  const set = new Set<string>();
  group
    .split("\n")
    .join("")
    .split("")
    .forEach((letter) => set.add(letter));

  const allYes = Array.from(set)
    .filter((letter) => {
      return group.split('\n').join("").match(new RegExp(letter, "g"))?.length === size;
    });

  return allYes.length;
});

console.log(JSON.stringify(groups2))

const checksum2 = groups2.reduce((acc, next) => acc + next);

console.log("Part 2:", checksum2);
