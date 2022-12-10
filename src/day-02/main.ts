import { readInputFile } from "../helpers/readInputFile";

const lines = await readInputFile('02');

enum Hands {
    OPPONENT_ROCK = 'A',
    OPPONENT_PAPER = 'B',
    OPPONENT_SCISSORS = 'C',

    SELF_ROCK = 'X',
    SELF_PAPER = 'Y',
    SELF_SCISSORS = 'Z'
}

type HandNames = 'rock'|'paper'|'scissors';

const HandNameMap: { [key in Hands]: HandNames } = {
    [Hands.OPPONENT_ROCK]: "rock",
    [Hands.OPPONENT_PAPER]: "paper",
    [Hands.OPPONENT_SCISSORS]: "scissors",
    [Hands.SELF_ROCK]: "rock",
    [Hands.SELF_PAPER]: "paper",
    [Hands.SELF_SCISSORS]: "scissors"
}

enum Score {
    WIN = 6,
    TIE = 3,
    LOSS = 0
}

type WinResult = 'win'|'tie'|'loss';

const determineResult = (opponent: HandNames, self: HandNames): WinResult|null => {
    switch (opponent) {
        case 'rock': {
            if (self === 'paper') return 'win';
            if (self === 'rock') return 'tie';
            return 'loss';
        }
        case 'paper': {
            if (self === 'scissors') return 'win';
            if (self === 'paper') return 'tie';
            return 'loss';
        }
        case 'scissors': {
            if (self === 'rock') return 'win';
            if (self === 'scissors') return 'tie';
            return 'loss';
        }
        default: return null;
    }
}

const determineWinScore = (opponent: HandNames, self: HandNames): number => {
    const result = determineResult(opponent, self);
    switch (result) {
        case 'win': return Score.WIN;
        case 'tie': return Score.TIE;
        default: return Score.LOSS;
    }
}

const determineMoveScore = (self: HandNames): number => {
    switch (self) {
        case 'rock': return 1;
        case 'paper': return 2;
        default: return 3;
    }
}

// # Part One
let score = 0;
lines.forEach(line => {
    const [opponent, self] = line.split(' ');
    const opponentHand = HandNameMap[opponent as Hands];
    const selfHand = HandNameMap[self as Hands];

    score += determineWinScore(opponentHand, selfHand);
    score += determineMoveScore(selfHand);
});

console.log(`# Part One: Total score is: ${score}`);

// # Part Two
let score2 = 0;

const ExpectedResultMap: { [key: string]: WinResult } = {
    'X': 'loss',
    'Y': 'tie',
    'Z': 'win',
}

lines.forEach(line => {
    const [opponent, self] = line.split(' ');
    const opponentHand = HandNameMap[opponent as Hands];
    const expectedResult = ExpectedResultMap[self];

    const rockScore = determineResult(opponentHand, 'rock');
    const paperScore = determineResult(opponentHand, 'paper');
    const scissorsScore = determineResult(opponentHand, 'scissors');

    let selfHandToPick: HandNames = 'rock';
    if (rockScore === expectedResult) selfHandToPick = 'rock';
    else if (paperScore === expectedResult) selfHandToPick = 'paper';
    else if (scissorsScore === expectedResult) selfHandToPick = 'scissors';

    score2 += determineWinScore(opponentHand, selfHandToPick);
    score2 += determineMoveScore(selfHandToPick);
});

console.log(`# Part Two: Total score is: ${score2}`);