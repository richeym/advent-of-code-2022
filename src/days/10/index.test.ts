import * as path from "path";

import {
  AddxCommand,
  Device,
  getPart1Answer,
  getPart2Answer,
  NoopCommand,
  parseInput,
} from ".";
import { readFileToString } from "../../util";

describe("Day 10", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );
  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("parses input", () => {
    const parsedInput = parseInput(sampleInput);

    expect(parsedInput).toHaveLength(146);
    expect(parsedInput[0]).toBeInstanceOf(AddxCommand);
    expect(parsedInput[0].params).toBe("15");
    expect(parsedInput[145]).toBeInstanceOf(NoopCommand);
    expect(parsedInput[145].params).toBeUndefined();
  });

  const sampleCycleTestCases = [
    [20, 420],
    [60, 1140],
    [100, 1800],
    [140, 2940],
    [180, 2880],
    [220, 3960],
  ];

  test.each(sampleCycleTestCases)(
    "calculates signal strength. Cycle: %p, expected strength: %p",
    (cycle: number, expectedStrength: number) => {
      const commands = parseInput(sampleInput);
      const device = new Device(commands);
    }
  );

  it("solves part 1", () => {
    getPart1Answer(realInput);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
