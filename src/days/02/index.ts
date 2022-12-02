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
): { part1Score: number; part2Score: number } => {
  let part1Score: number = 0;
  let part2Score: number = 0;

  strategyGuideEntries.forEach((entry) => {
    // part 1
    const move = scoreMap.find((x) => x.yourMove == entry.you)!;

    type ObjectKey = keyof typeof move;
    const key = entry.opponent as ObjectKey;

    const bonus = move[key];
    if (typeof bonus === "number") {
      part1Score += move.value + bonus;
    }

    // part 2 - bending the part 1 solution to fit :)
    let moveNeeded: string;
    if (entry.you === "Y") {
      moveNeeded =
        entry.opponent === "A" ? "X" : entry.opponent === "B" ? "Y" : "Z";
    } else if (entry.you === "X") {
      moveNeeded =
        entry.opponent === "A" ? "Z" : entry.opponent === "B" ? "X" : "Y";
    } else {
      moveNeeded =
        entry.opponent === "A" ? "Y" : entry.opponent === "B" ? "Z" : "X";
    }

    const part2Move = scoreMap.find((x) => x.yourMove == moveNeeded)!;
    const key2 = entry.opponent as ObjectKey;

    const bonus2 = part2Move[key];
    if (typeof bonus2 === "number") {
      part2Score += part2Move.value + bonus2;
    }
  });

  return { part1Score, part2Score };
};

export const getPart1Answer = (input: string): number => {
  const strategyGuide = readStrategyGuide(input);
  return calculateScore(strategyGuide).part1Score;
};

export const getPart2Answer = (input: string): number => {
  const strategyGuide = readStrategyGuide(input);
  return calculateScore(strategyGuide).part2Score;
};
