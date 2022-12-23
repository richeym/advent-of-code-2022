import * as path from "path";

import { getPart1Answer, getPart2Answer, parseInput } from ".";
import { RouteFinder } from "./RouteFinder";
import { readFileToString } from "../../util";
import util from "util";

describe("Day 12", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );

  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("parses input", () => {
    const parsedInput = parseInput(sampleInput);

    console.log(util.inspect(parsedInput, { depth: 2 }));
    //expect(parsedInput).toHaveLength(5);
  });

  it.only("solves sample input", () => {
    const heightMap = parseInput(sampleInput);
    const routeFinder = new RouteFinder(heightMap);
    const output = routeFinder.findShortest();
    expect(output).toBe(31);
  });

  it("solves part 1", () => {
    const answer = getPart1Answer(realInput);
    expect(answer).toBe(2);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
