import * as path from "path";

import {
  countVisibleTrees,
  getPart1Answer,
  getPart2Answer,
  getScenicScore,
  parseInput,
} from ".";
import { readFileToString } from "../../util";

describe("Day 08", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );
  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  const expectedParsedInput = [
    [3, 0, 3, 7, 3],
    [2, 5, 5, 1, 2],
    [6, 5, 3, 3, 2],
    [3, 3, 5, 4, 9],
    [3, 5, 3, 9, 0],
  ];

  it("parses input data", () => {
    const data = parseInput(sampleInput);
    expect(data).toEqual(expectedParsedInput);
  });

  it("counts visible trees from sample dataset", () => {
    const visibleTrees = countVisibleTrees(expectedParsedInput);

    expect(visibleTrees).toEqual(21);
  });

  const scenicScoreTestCases = [
    // [1, 2, 4],
    [3, 2, 8],
  ];

  test.each(scenicScoreTestCases)(
    "finds scenic score row: %p, col: %p, expected score: %p",
    (row, col, expectedScore) => {
      const scenicScore = getScenicScore(expectedParsedInput, row, col);
      expect(scenicScore).toEqual(expectedScore);
    }
  );

  it("solves part 1", () => {
    const visibileTrees = getPart1Answer(realInput);
    expect(visibileTrees).toEqual(1809);
  });

  it("solves part 2", () => {
    const bestScenicScore = getPart2Answer(realInput);
    expect(bestScenicScore).toEqual(3130512);
  });
});
