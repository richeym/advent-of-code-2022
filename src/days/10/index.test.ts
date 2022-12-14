import * as path from "path";

import { getPart1Answer, getPart2Answer, parseInput } from ".";
import { Device } from "./Device";
import { AddxCommand } from "./commands/AddxCommand";
import { NoopCommand } from "./commands/NoopCommand";
import { readFileToString } from "../../util";
import { DeviceCycle } from "./types";

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

  it("executes noop command successfully", () => {
    const command = new NoopCommand("");

    let response = command.startOrContinueExecution();
    expect(response.completed).toBeTruthy();
    expect(response.value).toBe(0);
  });

  it("executes addx command successfully", () => {
    const command = new AddxCommand("15");

    let response = command.startOrContinueExecution();
    expect(response.completed).toBeFalsy();
    expect(response.value).toBe(0);

    response = command.startOrContinueExecution();
    expect(response.completed).toBeTruthy();
    expect(response.value).toBe(15);
  });

  const sampleCycleStrengthTestCases = [
    [20, 21, 420],
    [60, 19, 1140],
    [100, 18, 1800],
    [140, 21, 2940],
    [180, 16, 2880],
    [220, 18, 3960],
  ];

  test.each(sampleCycleStrengthTestCases)(
    "calculates  X and signal strength. Cycle: %p, expected X: %p, expected strength: %p",
    (cycleNo: number, expectedX: number, expectedStrength: number) => {
      const commands = parseInput(sampleInput);
      const device = new Device();

      const response = device.execute(commands);
      const cycle = response.cycles.find(
        (c: DeviceCycle) => c.cycleNo === cycleNo
      )!;

      expect(cycle.signalStrength).toBe(expectedStrength);
      expect(cycle.x).toBe(expectedX);
    }
  );

  it("solves part 1", () => {
    const answer = getPart1Answer(realInput);
    expect(answer).toBe(14420);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
