import * as path from "path";

import {
  getPart1Answer,
  getPart2Answer,
  getElfCalorieCounts,
  getElfCarryingMostCalories,
} from ".";
import { readFileToString } from "../../util";

describe("Day 1", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sampleinput.txt")
  );
  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("gets calorie counts for each elf", () => {
    const output = getElfCalorieCounts(sampleInput);
    expect(output).toEqual([6000, 4000, 11000, 24000, 10000]);
  });

  it("gets elf carrying most calories", () => {
    const output = getElfCarryingMostCalories(sampleInput);
    expect(output).toEqual(4);
  });

  it("solves part 1", () => {
    const output = getPart1Answer(realInput);
    console.log(output);
  });

  it("solves part 2", () => {
    const output = getPart2Answer(realInput);
    console.log(output);
  });
});
