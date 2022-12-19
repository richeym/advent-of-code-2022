import * as path from "path";

import { getPart1Answer, getPart2Answer, parseInput, parseMonkey } from ".";
import { calculateNewWorryLevel } from "./services/WorryLevelCalculator";
import { Monkey, MonkeyTestExpression } from "./types";
import { readFileToString } from "../../util";
import { getMonkeyToThrowTo } from "./services/ItemThrowCalculator";
import { MonkeyService } from "./services/MonkeyService";

describe("Day 11", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );
  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("parses input line into a monkey status", () => {
    const input = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3`;

    const expectedMonkey: Monkey = {
      items: [79, 98],
      operation: "old * 19",
      testExpression: {
        divisor: 23,
        monkeyIfTrue: 2,
        monkeyIfFalse: 3,
      },
    };

    const monkey = parseMonkey(input);

    expect(monkey).toEqual(expectedMonkey);
  });

  it("parses input into expected number of monkeys", () => {
    const monkeys = parseInput(sampleInput);
    expect(monkeys).toHaveLength(4);
  });

  const operationParsingTestCases = [
    [79, "old * 19", 500],
    [54, "old + 6", 20],
  ];

  test.each(operationParsingTestCases)(
    "calculates new worry level. Old: %p, Expression: %p, New: %p",
    (oldWorryLevel, operation, expectedNewWorryLevel) => {
      const newWorryLevel = calculateNewWorryLevel(
        oldWorryLevel as number,
        operation as string
      );

      expect(newWorryLevel).toBe(expectedNewWorryLevel);
    }
  );

  const monkeyThrowTestCases = [
    [500, 23, 1], // not divisible
    [2080, 13, 2], // divisible
  ];

  test.each(monkeyThrowTestCases)(
    "calculates who to throw item to. Worry level: %p, Test: %p, Target monkey: %p",
    (worryLevel, divisor, expectedMonkey) => {
      const expression: MonkeyTestExpression = {
        divisor,
        monkeyIfTrue: 2,
        monkeyIfFalse: 1,
      };

      const monkey = getMonkeyToThrowTo(worryLevel, expression);

      expect(monkey).toBe(expectedMonkey);
    }
  );

  it("solves sample input", () => {
    const monkeys = parseInput(sampleInput);
    const monkeyService = new MonkeyService(monkeys);

    const result = monkeyService.execute(20);

    expect(monkeys[0].items).toEqual([10, 12, 14, 26, 34]);
    expect(monkeys[1].items).toEqual([245, 93, 53, 199, 115]);
    expect(monkeys[2].items).toHaveLength(0);
    expect(monkeys[3].items).toHaveLength(0);

    expect(result.partOne).toBe(10605);
  });

  it("solves part 1", () => {
    const result = getPart1Answer(realInput);

    expect(result).toBe(102399);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
