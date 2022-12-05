import * as path from "path";

import {
  getDuplicateItem,
  getItemPriority,
  getPart1Answer,
  getPart2Answer,
  parseInput,
  compartmentalise,
  sumPriorities,
  groupRucksacks,
} from ".";
import { readFileToString } from "../../util";

describe("Day 03", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );

  const parsedSampleInput = sampleInput.split("\n");

  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("parses input correctly", () => {
    const parsedInput = parseInput(sampleInput);

    expect(parsedInput).toEqual(parsedSampleInput);
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
      const itemInBothCompartments = getDuplicateItem([a, b]);

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

  it("divides rucksacks into groups of three", () => {
    const groupedRucksacks = groupRucksacks(parsedSampleInput);

    expect(groupedRucksacks).toEqual([
      [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
      ],
      [
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw",
      ],
    ]);
  });

  it("finds item that appears in all grouped rucksacks", () => {
    const groupedRucksack = [
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
    ];

    const item = getDuplicateItem(groupedRucksack);
    expect(item).toEqual("r");
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
    const answer = getPart2Answer(realInput);
    expect(answer).toBe(2497);
  });
});
