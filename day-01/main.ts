import { createReadStream } from 'fs';
import * as readline from 'readline';

const inputFile = `${__dirname}\\input.txt`;

const readInterface = readline.createInterface({
    input: createReadStream(inputFile),
    output: undefined
})

const totals = new Map<number, number>();
let currentElf = 0;

// Read lines
readInterface.on('line', count => {
    if (count === '') {
        currentElf++;
        return;
    }

    const currentCount = totals.get(currentElf) ?? 0;
    totals.set(currentElf, currentCount + Number(count));
});

readInterface.on('close', () => {
    // # Part One
    const maxValue = Math.max(...totals.values());
    console.log(`#Part one: Most amount of carried calories: ${maxValue}`);

    // # Part Two
    const sortedValues = [...totals.values()].sort().reverse();
    const topThree = sortedValues.slice(0, 3);
    const sum = topThree.reduce((sum, value) => sum + value, 0);
    console.log(`#Part Two: Sm of top three Calories: ${sum}`);
})
