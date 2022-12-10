import { readInputFile } from "../helpers/readInputFile";

const totals = new Map<number, number>();
let currentElf = 0;

const lines = await readInputFile('01');

lines.forEach(line => {
    if (line === '') {
        currentElf++;
        return;
    }

    const currentCount = totals.get(currentElf) ?? 0;
    totals.set(currentElf, currentCount + Number(line));
})

// # Part One
const maxValue = Math.max(...totals.values());
console.log(`# Part one: Most amount of carried calories: ${maxValue}`);

// # Part Two
const sortedValues = [...totals.values()].sort().reverse();
const topThree = sortedValues.slice(0, 3);
const sum = topThree.reduce((sum, value) => sum + value, 0);
console.log(`# Part Two: Sm of top three Calories: ${sum}`);