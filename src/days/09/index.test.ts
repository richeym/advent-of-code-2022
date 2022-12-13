import * as path from "path";

import {
  Coordinate,
  getPart1Answer,
  getPart2Answer,
  parseInput,
  Rope,
  Vector,
} from ".";
import { readFileToString } from "../../util";

describe("Day 09", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );

  const sampleInput2 = readFileToString(
    path.join(__dirname, "input/sample-input-2.2.txt")
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
    const rope = new Rope();

    rope.move(vector as Vector);
    expect(rope.knotPositions[0]).toEqual(coord as Coordinate);
  });

  const tailNotFollowingHeadOnInitialMoveTestCases: (Vector | Coordinate)[][] =
    [
      [
        { direction: "R", distance: 2 },
        { x: 1, y: 0 },
      ],
      [
        { direction: "L", distance: 2 },
        { x: -1, y: 0 },
      ],
      [
        { direction: "U", distance: 2 },
        { x: 0, y: -1 },
      ],
      [
        { direction: "D", distance: 2 },
        { x: 0, y: 1 },
      ],
    ];

  test.each(tailNotFollowingHeadOnInitialMoveTestCases)(
    "tail does not follows if adjacent. Direction: %p, End position: %p",
    (vector, expectedPosition) => {
      const rope = new Rope();

      rope.move(vector as Vector);
      expect(rope.knotPositions[1]).toEqual(expectedPosition);
    }
  );

  it("solves sample input part 1", () => {
    const rope = new Rope();
    const result = rope.simulate(expectedParsedInput);
    expect(result).toEqual(13);
  });

  it("solves sample input part 2", () => {
    const rope = new Rope(10);
    const input = parseInput(sampleInput);
    const result = rope.simulate(input);
    expect(result).toEqual(1);
  });

  it("solves sample input part 2 - larger data set", () => {
    const input = parseInput(sampleInput2);
    const rope = new Rope(10);
    const result = rope.simulate(input);
    expect(result).toEqual(36);
  });

  it("solves part 1", () => {
    const result = getPart1Answer(realInput);
    expect(result).toEqual(6057);
  });

  it("solves part 2", () => {
    const result = getPart2Answer(realInput);
    expect(result).toEqual(2514);
  });
});
