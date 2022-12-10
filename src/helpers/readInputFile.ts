import { createReadStream } from 'fs';
import * as readline from 'readline';

export const readInputFile = async (day: string): Promise<string[]> => {
    const readInterface = readline.createInterface({
        input: createReadStream(`src/day-${day}\\input.txt`),
        output: undefined
    })

    return new Promise<string[]>((resolve, reject) => {
        let lines: string[] = [];
        readInterface.on('line', line => {
            lines.push(line);
        })

        readInterface.on('close', () => {
            resolve(lines);
        })

        readInterface.on('error', err => {
            reject(err);
        })
    })
}