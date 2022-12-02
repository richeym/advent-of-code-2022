import * as path from "path";

import {
  getPart1Answer,
  getPart2Answer,
  readStrategyGuide,
  calculateScore,
} from ".";
import { readFileToString } from "../../util";

describe("Day 02", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );
  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("reads strategy guide correctly", () => {
    const guide = readStrategyGuide(sampleInput);

    expect(guide).toHaveLength(3);
    expect(guide).toEqual([
      { opponent: "A", you: "Y" },
      { opponent: "B", you: "X" },
      { opponent: "C", you: "Z" },
    ]);
  });

  it("calculates score correctly", () => {
    const guide = readStrategyGuide(sampleInput);
    const score = calculateScore(guide);

    expect(score).toBe(15);
  });

  it("solves part 1", () => {
    const answer = getPart1Answer(realInput);
    expect(answer).toEqual(14531);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
