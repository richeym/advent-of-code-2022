export interface StrategyGuideEntry {
  opponent: string;
  you: string;
}

interface Move {
  yourMove: string;
  value: number;
  A: number;
  B: number;
  C: number;
}

const scoreMap: Move[] = [
  { yourMove: "X", value: 1, A: 3, B: 0, C: 6 },
  { yourMove: "Y", value: 2, A: 6, B: 3, C: 0 },
  { yourMove: "Z", value: 3, A: 0, B: 6, C: 3 },
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
    const move = scoreMap.find((x) => x.yourMove == entry.you)!;

    type ObjectKey = keyof typeof move;
    const key = entry.opponent as ObjectKey;

    const bonus = move[key];
    if (typeof bonus === "number") {
      score += move.value + bonus;
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
