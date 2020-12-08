import fs from "fs";

const raw = fs.readFileSync("./day8.txt");
const input = raw
  .toString()
  .trim()
  .split("\n");

type Instruction = {
  operator: "nop" | "acc" | "jmp";
  operand: number;
  count: number;
}

const instructions = (): Instruction[] => input.map((line) => {
  const [operator, operand] = line.split(" ");
  return {
    operator,
    operand: Number(operand),
    count: 0,
   } as Instruction;
});

const evaluateInstructions = (program: Instruction[]): [acc: number, terminated: boolean] => {
  let acc = 0;
  let i = 0;

  while (true) {
    if (!program[i]) {
      return [acc, true];
    }
    const {operator, operand, count} = program[i];
    if (count === 1) {
      return [acc, false];
    }
    program[i].count += 1;
    switch (operator) {
      case "acc": {
        acc += operand;
        i += 1;
        break;
      }
      case "jmp": {
        i += operand;
        break;
      }
      case "nop": {
        i += 1;
        break;
      }
    }
  }
}

console.log("Part 1:", evaluateInstructions(instructions()));

for (let i = 0; i < input.length; i += 1) {
  const program = instructions();
  if (program[i].operator === "nop") {
    program[i].operator = "jmp";
  } else if (program[i].operator === "jmp") {
    program[i].operator = "nop";
  }

  const [acc, success] = evaluateInstructions(program);

  if (success) {
    console.log("Part 2:", acc);
    break;
  }
}
