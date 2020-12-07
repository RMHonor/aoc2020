import fs from "fs";

const raw = fs.readFileSync("./day7.txt");
const input = raw
  .toString()
  .trim()
  .split("\n");

// bag: [parent, how many fit in parent]
type Bag = [parent: string, howManyFit: number];

const bags = input.reduce<Record<string, Bag[]>>((acc, next) => {
  if (next.includes("contain no other bags")) {
    return acc;
  }
  const [parentBagName, children] = next.split(" bags contain ")

  children.split(", ").forEach((child) => {
    const [childBagName] = child.substr(2).split(" bag");
    acc[childBagName] = acc[childBagName] ?? [];
    acc[childBagName].push([parentBagName, Number(child.substr(0, 1))]);
  });

  return acc;
}, {});

const evaluateBag = (set: Set<string>, bagList: Bag[]): Set<string> => {
  const bagSet = bagList.map(([name]) => {
    set.add(name);
    if (bags[name]) {
      return evaluateBag(set, bags[name]);
    }

    return set;
  });

  return new Set([...set, ...bagSet.reduce((acc, next) => new Set([...acc, ...next]))]);
};

console.log("Part 1:", evaluateBag(new Set(), bags["shiny gold"]).size);

const countBags = (searchName: string): number => {
  let total = 0;
  Object.keys(bags).filter((bagName) => {
    const children = bags[bagName].filter(([name]) => name === searchName);

    if (children.length) {
      const [, count] = children[0];
      total += count + (countBags(bagName) * count);
    }
  });

  return total;
}

console.log("Part 2:", countBags("shiny gold"));

