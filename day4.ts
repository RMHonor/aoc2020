import fs from "fs";

const raw = fs.readFileSync("./day4.txt");
const input = raw
  .toString()
  .split('\n\n')
  .map(s => s.replace(/\n/g, ' '));

interface Passport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
}

const fields: Array<keyof Passport> = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  'cid',
];

const parsed = input.map((pp) => {
  const resp: Passport = {};
  fields.forEach((field) => {
    if (pp.includes(`${field}:`)) {
      resp[field] = pp.split(`${field}:`)[1].split(' ')[0];
    }
  });

  return resp;
});

const present = parsed.filter((pp) => pp.byr && pp.iyr && pp.eyr && pp.hgt && pp.hcl && pp.ecl && pp.pid);

console.log('Part 1:', present.length);

const valid = present.filter((pp) => {
  if (Number(pp.byr) < 1920 || Number(pp.byr) > 2002) {
    return false;
  }
  if (Number(pp.iyr) < 2010 || Number(pp.iyr) > 2020) {
    return false;
  }
  if (Number(pp.eyr) < 2020 || Number(pp.eyr) > 2030) {
    return false;
  }
  if (pp.hgt!.includes('cm')) {
    const cm = pp.hgt!.split('cm')[0];
    if (Number(cm) < 150 || Number(cm) > 193) {
      return false;
    }
  } else if (pp.hgt!.includes('in')) {
    const inch = pp.hgt!.split('inch')[0];
    if (Number(inch) < 59 || Number(inch) > 76) {
      return false
    }
  } else {
    return false;
  }

  if (!/^\#[a-f0-9]{6}$/.test(pp.hcl!)) {
    return false;
  }

  if (!/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(pp.ecl!)) {
    return false;
  }

  if (pp.pid!.length !== 9 || !/^0{0,9}[0-9]{0,9}$/.test(pp.pid!)) {
    return false;
  }

  console.log(JSON.stringify(pp));
  return true;
});

console.log('Part 2:', valid.length);
