import * as path from "path";

import {
  getItemInBothCompartments,
  getItemPriority,
  getPart1Answer,
  getPart2Answer,
  parseInput,
  compartmentalise,
  sumPriorities,
} from ".";
import { readFileToString } from "../../util";

describe("Day 03", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );
  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("parses input correctly", () => {
    const parsedInput = parseInput(sampleInput);

    expect(parsedInput).toEqual([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ]);
  });

  it("sorts items into compartments", () => {
    const rearranged = compartmentalise([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
    ]);

    expect(rearranged).toEqual([
      ["vJrwpWtwJgWr", "hcsFMMfFFhFp"],
      ["jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL"],
      ["PmmdzqPrV", "vPwwTWBwg"],
    ]);
  });

  const rearrangedCompartments = [
    ["vJrwpWtwJgWr", "hcsFMMfFFhFp", "p"],
    ["jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL", "L"],
    ["PmmdzqPrV", "vPwwTWBwg", "P"],
  ];

  test.each(rearrangedCompartments)(
    "gets item in both comparments for %p and %p as %p",
    (a, b, expected) => {
      const itemInBothCompartments = getItemInBothCompartments(a, b);

      expect(itemInBothCompartments).toEqual(expected);
    }
  );

  it("calculates priority of items", () => {
    const lAlphabet = Array.from(Array(26))
      .map((e, i) => i + "a".charCodeAt(0))
      .map((x) => String.fromCharCode(x));

    const uAlphabet = Array.from(Array(26))
      .map((e, i) => i + "A".charCodeAt(0))
      .map((x) => String.fromCharCode(x));

    const alphabet = lAlphabet.concat(uAlphabet);

    for (let i = 0; i < 52; i++) {
      const priority = getItemPriority(alphabet[i]);
      expect(priority).toBe(i + 1);
    }
  });

  it("sums item priorities", () => {
    const priorities = sumPriorities([16, 38, 42, 22, 20, 19]);
    expect(priorities).toBe(157);
  });

  it("solves part 1", () => {
    const answer = getPart1Answer(realInput);
    expect(answer).toBe(7872);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
