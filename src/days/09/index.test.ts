import * as path from "path";

import {
  Coordinate,
  getPart1Answer,
  getPart2Answer,
  move,
  runSimulation,
  parseInput,
  Vector,
} from ".";
import { readFileToString } from "../../util";

describe("Day 09", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );

  const expectedParsedInput: Vector[] = [
    {
      direction: "R",
      distance: 4,
    },
    {
      direction: "U",
      distance: 4,
    },
    {
      direction: "L",
      distance: 3,
    },
    {
      direction: "D",
      distance: 1,
    },
    {
      direction: "R",
      distance: 4,
    },
    {
      direction: "D",
      distance: 1,
    },
    {
      direction: "L",
      distance: 5,
    },
    {
      direction: "R",
      distance: 2,
    },
  ];

  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("parses input", () => {
    const input = parseInput(sampleInput);
    expect(input).toEqual(expectedParsedInput);
  });

  const headMoveTestCases: (Vector | Coordinate)[][] = [
    [
      { direction: "R", distance: 1 },
      { x: 1, y: 0 },
    ],
    [
      { direction: "U", distance: 2 },
      { x: 0, y: -2 },
    ],
    [
      { direction: "D", distance: 3 },
      { x: 0, y: 3 },
    ],
    [
      { direction: "L", distance: 4 },
      { x: -4, y: 0 },
    ],
  ];

  test.each(headMoveTestCases)("Moves head %p", (vector, coord) => {
    const h: Coordinate = { x: 0, y: 0 };
    const t: Coordinate = { x: 0, y: 0 };
    const expectedMoveResult = move(vector as Vector, h, t);
    expect(expectedMoveResult.h).toEqual(coord as Coordinate);
  });

  const tailNotFollowingHeadOnInitialMoveTestCases: (Vector | Coordinate)[][] =
    [
      [
        { direction: "R", distance: 1 },
        { x: 0, y: 0 },
      ],
      [
        { direction: "L", distance: 1 },
        { x: 0, y: 0 },
      ],
      [
        { direction: "U", distance: 1 },
        { x: 0, y: 0 },
      ],
      [
        { direction: "D", distance: 1 },
        { x: 0, y: 0 },
      ],
      [
        { direction: "R", distance: 3 },
        { x: 2, y: 0 },
      ],
    ];

  test.each(tailNotFollowingHeadOnInitialMoveTestCases)(
    "tail does not follows if adjacent. Direction: %p, End position: %p",
    (vector, expectedPosition) => {
      const h: Coordinate = { x: 0, y: 0 };
      const t: Coordinate = { x: 0, y: 0 };

      const expectedMoveResult = move(vector as Vector, h, t);
      expect(expectedMoveResult.t).toEqual(expectedPosition);
    }
  );

  it("solves sample input", () => {
    const result = runSimulation(expectedParsedInput);
    expect(result).toEqual(13);
  });

  it("solves part 1", () => {
    const result = getPart1Answer(realInput);
    expect(result).toEqual(1);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
