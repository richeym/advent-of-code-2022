import * as path from "path";

import {
  countContainedAssignments,
  countOverlappingAssignments,
  getPart1Answer,
  getPart2Answer,
  isAssignmentContained,
  isAssignmentOverlapping,
  readAssignments,
} from ".";
import { readFileToString } from "../../util";

describe("Day 04", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );

  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("reads elf assignments", () => {
    const assignments = readAssignments(sampleInput);
    expect(assignments).toEqual([
      ["2-4", "6-8"],
      ["2-3", "4-5"],
      ["5-7", "7-9"],
      ["2-8", "3-7"],
      ["6-6", "4-6"],
      ["2-6", "4-8"],
    ]);
  });

  const uncontainedAssignments = [
    [["2-4", "6-8"]],
    [["2-3", "4-5"]],
    [["5-7", "7-9"]],
    [["2-6", "4-8"]],
  ];

  test.each(uncontainedAssignments)(
    "returns false if not contained - %p",
    (assignment) => {
      const isContained = isAssignmentContained(assignment[0], assignment[1]);
      expect(isContained).toBeFalsy();
    }
  );

  const containedAssignments = [[["2-8", "3-7"]], [["6-6", "4-6"]]];

  test.each(containedAssignments)(
    "returns true if contained - %p",
    (assignment) => {
      const isContained = isAssignmentContained(assignment[0], assignment[1]);
      expect(isContained).toBeTruthy();
    }
  );

  it("counts contained assignments", () => {
    const input = [
      ["2-4", "6-8"], // false
      ["2-8", "3-7"], // true
    ];

    const count = countContainedAssignments(input);
    expect(count).toEqual(1);
  });

  const overlappingAssignments = [
    [["5-7", "7-9"]],
    [["2-8", "3-7"]],
    [["6-6", "4-6"]],
    [["2-6", "4-8"]],
  ];

  test.each(overlappingAssignments)(
    "returns true if overlapping - %p",
    (assignment) => {
      const isContained = isAssignmentOverlapping(assignment[0], assignment[1]);
      expect(isContained).toBeTruthy();
    }
  );

  const nonOverlappingAssignments = [[["2-4", "6-8"]], [["2-3", "4-5"]]];

  test.each(nonOverlappingAssignments)(
    "returns false if not overlapping - %p",
    (assignment) => {
      const isContained = isAssignmentOverlapping(assignment[0], assignment[1]);
      expect(isContained).toBeFalsy();
    }
  );

  it("counts overlapping assignments", () => {
    const input = [
      ["2-4", "6-8"], // false
      ["5-7", "7-9"], // true
    ];

    const count = countOverlappingAssignments(input);
    expect(count).toEqual(1);
  });

  it("solves part 1", () => {
    const output = getPart1Answer(realInput);
    expect(output).toEqual(444);
  });

  it("solves part 2", () => {
    const output = getPart2Answer(realInput);
    expect(output).toEqual(801);
  });
});
