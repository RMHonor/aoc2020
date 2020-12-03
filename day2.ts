import fs from "fs";

const raw = fs.readFileSync("./day2.txt");
const input = raw.toString().split("\n");
input.pop();

// part 1
interface Password1 {
  criteria: {
    minimum: number;
    maximum: number;
    letter: string;
  };
  value: string;
}

const part1 = input.map<Password1>((line) => {
  const [criteria, pw] = line.split(": ");
  const [minimum, rest] = criteria.split("-");
  const [maximum, letter] = rest.split(" ");

  return {
    criteria: {
      minimum: Number(minimum),
      maximum: Number(maximum),
      letter,
    },
    value: pw,
  };
});

const validPasswords1 = part1.filter(({ value, criteria }) => {
  const occurences = value.match(new RegExp(criteria.letter, "g"))?.length || 0;
  return occurences >= criteria.minimum && occurences <= criteria.maximum;
});

console.log("Part 1:", validPasswords1.length);


// part 2
interface Password2 {
  criteria: {
    pos1: number;
    pos2: number;
    letter: string;
  };
  value: string;
}

const part2 = input.map<Password2>((line) => {
  const [criteria, pw] = line.split(": ");
  const [pos1, rest] = criteria.split("-");
  const [pos2, letter] = rest.split(" ");

  return {
    criteria: {
      pos1: Number(pos1),
      pos2: Number(pos2),
      letter,
    },
    value: pw,
  };
});

const validPasswords2 = part2.filter(({ value, criteria }) => {
  return (value[criteria.pos1 - 1] === criteria.letter) !== (value[criteria.pos2 - 1] === criteria.letter);
});

console.log("Part 2:", validPasswords2.length);
