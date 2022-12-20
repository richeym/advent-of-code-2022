import * as path from "path";

import { getPart1Answer, getPart2Answer, parseInput } from ".";
import { readFileToString } from "../../util";

describe("Day 12", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );
  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("parses input", () => {
    const parsedInput = parseInput(sampleInput);

    expect(parsedInput).toEqual([
      ["S", "a", "b", "q", "p", "o", "n", "m"],
      ["a", "b", "c", "r", "y", "x", "x", "l"],
      ["a", "c", "c", "s", "z", "E", "x", "k"],
      ["a", "c", "c", "t", "u", "v", "w", "j"],
      ["a", "b", "d", "e", "f", "g", "h", "i"],
    ]);
  });

  it("solves part 1", () => {
    getPart1Answer(realInput);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
