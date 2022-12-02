const playerOneRock = "A";
const playerOnePaper = "B";
const playerTwoRock = "X";
const playerTwoPaper = "Y";
const playerTwoScissors = "Z";

export interface StrategyGuideEntry {
  opponent: string;
  you: string;
}

type ScoreMap = {
  weapon: string;
  score: number;
};

const scoreMap: ScoreMap[] = [
  { weapon: "X", score: 1 },
  { weapon: "Y", score: 2 },
  { weapon: "Z", score: 3 },
];

export const readStrategyGuide = (input: string): StrategyGuideEntry[] => {
  const guide: StrategyGuideEntry[] = input
    .trim()
    .split("\n")
    .map((value): StrategyGuideEntry => {
      return { opponent: value[0], you: value[2] };
    });

  return guide;
};

export const calculateScore = (
  strategyGuideEntries: StrategyGuideEntry[]
): number => {
  let score: number = 0;

  strategyGuideEntries.forEach((entry) => {
    score += scoreMap.find((x) => x.weapon === entry.you)!.score;

    if (entry.opponent == playerOneRock) {
      score +=
        entry.you === playerTwoRock ? 3 : entry.you === playerTwoPaper ? 6 : 0;
    } else if (entry.opponent == playerOnePaper) {
      score +=
        entry.you === playerTwoPaper
          ? 3
          : entry.you === playerTwoScissors
          ? 6
          : 0;
    } else {
      score +=
        entry.you === playerTwoScissors
          ? 3
          : entry.you === playerTwoRock
          ? 6
          : 0;
    }
  });

  return score;
};

export const getPart1Answer = (input: string): number => {
  const strategyGuide = readStrategyGuide(input);
  return calculateScore(strategyGuide);
};

export const getPart2Answer = (input: string): void => {
  return;
};
