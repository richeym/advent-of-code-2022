import * as path from "path";

import { getPart1Answer, getPart2Answer, parseInput, RouteFinder } from ".";
import { readFileToString } from "../../util";

describe("Day 12", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );

  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("parses input", () => {
    const parsedInput = parseInput(sampleInput);

    expect(parsedInput.grid).toHaveLength(5);
  });

  it("solves sample input", () => {
    const parsedInput = parseInput(sampleInput);
    const routeFinder = new RouteFinder(parsedInput);

    // expect(output).toBe(31);
  });

  it("solves part 1", () => {
    getPart1Answer(realInput);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
